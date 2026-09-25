#!/usr/bin/env python3
"""Fetch project data from cosmic-utils/cosmic-project-collection and convert
the RON files into JSON files that Zola's `data` loader can consume.

Usage: scripts/sync-projects.py [output_dir]
"""

import json
import re
import sys
import urllib.request
from pathlib import Path

SOURCE = "https://raw.githubusercontent.com/cosmic-utils/cosmic-project-collection/main"
CATEGORIES = ["applications", "applets", "services", "themes", "scripts"]

FIELD_RE = re.compile(r'(\w+)\s*:\s*"((?:[^"\\]|\\.)*)"')


def split_entries(body: str) -> list[str]:
    """Split the `list: [ (...), (...) ]` body into individual `(...)` entry
    strings, tracking quotes/escapes so parentheses inside string values
    (e.g. a description containing "(and privately)") don't break the split.
    """
    entries = []
    depth = 0
    in_string = False
    escaped = False
    current: list[str] = []
    for ch in body:
        if in_string:
            current.append(ch)
            if escaped:
                escaped = False
            elif ch == "\\":
                escaped = True
            elif ch == '"':
                in_string = False
            continue

        if ch == '"':
            in_string = True
            if depth > 0:
                current.append(ch)
            continue

        if ch == "(":
            depth += 1
            if depth > 1:
                current.append(ch)
            continue

        if ch == ")":
            depth -= 1
            if depth == 0:
                entries.append("".join(current))
                current = []
            else:
                current.append(ch)
            continue

        if depth > 0:
            current.append(ch)

    return entries


def parse_ron_list(text: str) -> list[dict]:
    """Parse the flat `list: [ (...), (...) ]` structure used by the RON files.

    These files only ever contain string fields (name, description, repo,
    image), so a small hand-rolled parser is enough and avoids a RON
    dependency for a one-shot build script.
    """
    list_start = text.index("list:")
    body = text[list_start:]
    entries = []
    for entry_text in split_entries(body):
        fields = dict(FIELD_RE.findall(entry_text))
        if fields:
            for key, value in fields.items():
                fields[key] = value.replace('\\"', '"')
            entries.append(fields)
    entries.sort(key=lambda project: project["name"].casefold())
    return entries


def main() -> None:
    out_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("data")
    out_dir.mkdir(parents=True, exist_ok=True)

    for category in CATEGORIES:
        url = f"{SOURCE}/{category}.ron"
        with urllib.request.urlopen(url, timeout=15) as response:
            ron_text = response.read().decode("utf-8")

        entries = parse_ron_list(ron_text)
        out_path = out_dir / f"{category}.json"
        out_path.write_text(json.dumps(entries, indent=2) + "\n")
        print(f"{category}: {len(entries)} entries -> {out_path}")


if __name__ == "__main__":
    main()
