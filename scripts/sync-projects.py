#!/usr/bin/env python3
"""Generate the catalog index Zola reads from the per-project JSON files.

Usage: scripts/sync-projects.py [output_dir]
"""

from concurrent.futures import ThreadPoolExecutor
from datetime import date
import json
import os
import re
import sys
import urllib.request
from urllib.parse import quote, unquote, urlsplit
from pathlib import Path

DATA_DIRECTORY = Path(__file__).resolve().parents[1] / "data"
SUBMISSIONS = DATA_DIRECTORY / "submissions"
PROJECT_TYPES = {
    "applications": "application",
    "applets": "applet",
    "services": "service",
    "themes": "theme",
    "scripts": "script",
}
HOST_LABELS = {"github.com": "github", "codeberg.org": "codeberg", "gitlab.com": "gitlab"}
FIELD_LIMITS = {"name": 100, "description": 400, "repo": 500, "icon": 500, "developer": 100}


def project_filename(category, repository):
    url = urlsplit(repository)
    host = url.hostname.removeprefix("www.")
    parts = [unquote(part, errors="strict") for part in url.path.strip("/").split("/")]
    if (not re.fullmatch(r"[a-z0-9.-]+", host) or len(parts) < 2
            or (host in {"github.com", "codeberg.org"} and len(parts) != 2)):
        raise ValueError("expected a repository URL with an owner and repository name")
    parts[-1] = re.sub(r"\.git$", "", parts[-1], flags=re.IGNORECASE)
    if any(not re.fullmatch(r"[a-zA-Z0-9_][a-zA-Z0-9._-]*", part) for part in parts):
        raise ValueError("invalid repository path")
    filename = "-".join([PROJECT_TYPES[category], HOST_LABELS.get(host, host), *parts]).lower() + ".json"
    if len(filename) > 240:
        raise ValueError("repository filename is too long")
    return filename


def read_project(path):
    try:
        project = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(project, dict):
            raise ValueError("expected a JSON object")
        category = project.pop("category", None)
        if not isinstance(category, str) or category not in PROJECT_TYPES:
            raise ValueError("unknown project category")
        for field, limit in FIELD_LIMITS.items():
            if field not in project and field not in {"name", "repo"}:
                continue
            value = project.get(field)
            if (not isinstance(value, str) or len(value.strip()) > limit
                    or (not value.strip() and field != "description")):
                raise ValueError(f"invalid {field}")
        for field in ("repo", "icon"):
            if field not in project:
                continue
            url = urlsplit(project[field])
            if (url.scheme != "https" or not url.hostname or url.username is not None
                    or url.password is not None or any(char.isspace() for char in project[field])):
                raise ValueError(f"{field} must be a public HTTPS URL")
        if "created_at" in project:
            created_at = project["created_at"]
            if not isinstance(created_at, str) or date.fromisoformat(created_at).isoformat() != created_at:
                raise ValueError("created_at must use YYYY-MM-DD")
        expected = project_filename(category, project["repo"])
        if path.name != expected:
            raise ValueError(f"expected filename {expected}")
        return category, project
    except ValueError as error:
        raise ValueError(f"{path.name}: {error}") from error


def read_submissions(directory):
    catalog = {category: [] for category in PROJECT_TYPES}
    for path in sorted(directory.glob("*.json")):
        category, project = read_project(path)
        catalog[category].append(project)
    for entries in catalog.values():
        entries.sort(key=lambda project: (not project.get("icon"), project["name"].casefold()))
    return catalog


REPOSITORY_APIS = {
    "github.com": "https://api.github.com/repos/",
    "codeberg.org": "https://codeberg.org/api/v1/repos/",
}


def repository_key(url):
    parsed = urlsplit(url)
    parts = parsed.path.strip("/").split("/")
    if parsed.hostname in REPOSITORY_APIS and len(parts) == 2 and all(parts):
        return parsed.hostname, parts[0], parts[1].removesuffix(".git")
    return None


def repository_date(key):
    host, owner, repo = key
    url = REPOSITORY_APIS[host] + "/".join(quote(part, safe="") for part in (owner, repo))
    request = urllib.request.Request(url, headers={
        "Accept": "application/json", "User-Agent": "COSMIC-Orbit-catalog",
    })
    if host == "github.com" and (token := os.environ.get("GITHUB_TOKEN")):
        request.add_unredirected_header("Authorization", f"Bearer {token}")

    try:
        with urllib.request.urlopen(request, timeout=5) as response:
            timestamp = json.load(response).get("created_at")
        return date.fromisoformat(timestamp[:10]).isoformat() if timestamp else None
    except (OSError, ValueError, TypeError):
        return None


def enrich_projects(catalog, previous_catalog):
    dates = {
        repository_key(project["repo"]): project["created_at"]
        for entries in (*previous_catalog.values(), *catalog.values())
        for project in entries
        if project.get("created_at")
    }
    projects = [project for entries in catalog.values() for project in entries]
    keys = {key for project in projects if (key := repository_key(project["repo"]))}
    missing = sorted(keys - dates.keys())
    with ThreadPoolExecutor(max_workers=8) as workers:
        dates.update(zip(missing, workers.map(repository_date, missing)))

    for project in projects:
        key = repository_key(project["repo"])
        if key:
            project.setdefault("developer", key[1])
            if dates.get(key):
                project["created_at"] = dates[key]


def main() -> None:
    out_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else DATA_DIRECTORY
    out_dir.mkdir(parents=True, exist_ok=True)

    catalog = read_submissions(SUBMISSIONS)
    output = out_dir / "catalog.json"
    previous = json.loads(output.read_text(encoding="utf-8")) if output.exists() else {}
    enrich_projects(catalog, previous)

    output.write_text(json.dumps(catalog, indent=2) + "\n", encoding="utf-8")
    print(f"{sum(map(len, catalog.values()))} projects -> {output}")


if __name__ == "__main__":
    main()
