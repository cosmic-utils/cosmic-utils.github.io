const submissionForm = document.querySelector("#project-submission");
const submissionEditor = document.querySelector("#submission-editor");
const submissionHandoff = document.querySelector("#submission-handoff");

function isPublicHttps(value) {
	try {
		const url = new URL(value);
		return url.protocol === "https:" && !url.username && !url.password && !/\s/.test(value);
	} catch {
		return false;
	}
}

const projectTypes = new Map([
	["applications", "application"],
	["applets", "applet"],
	["themes", "theme"],
	["services", "service"],
	["scripts", "script"],
]);

function repositoryFilename(category, value) {
	try {
		const url = new URL(value);
		const host = url.hostname.replace(/^www\./, "").toLowerCase();
		const hosts = new Map([["github.com", "github"], ["codeberg.org", "codeberg"], ["gitlab.com", "gitlab"]]);
		const parts = url.pathname.replace(/^\/+|\/+$/g, "").split("/").map(decodeURIComponent);
		if (!/^[a-z0-9.-]+$/.test(host) || parts.length < 2 || (["github.com", "codeberg.org"].includes(host) && parts.length !== 2)) return null;

		parts[parts.length - 1] = parts[parts.length - 1].replace(/\.git$/i, "");
		if (parts.some((part) => !/^[a-z0-9_][a-z0-9._-]*$/i.test(part))) return null;

		const type = projectTypes.get(category);
		if (!type) return null;
		const filename = [type, hosts.get(host) ?? host, ...parts].join("-").toLowerCase() + ".json";
		return filename.length <= 240 ? filename : null;
	} catch {
		return null;
	}
}

submissionForm.addEventListener("input", (event) => {
	event.target.setCustomValidity("");
	submissionHandoff.hidden = true;
});

submissionForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const project = Object.fromEntries(
		Array.from(new FormData(submissionForm), ([key, value]) => [key, value.trim()]),
	);

	for (const [key, value] of Object.entries(project)) {
		const field = submissionForm.elements.namedItem(key);
		if (!value) {
			field.setCustomValidity("Enter a value.");
		} else if ((key === "repo" || key === "icon") && !isPublicHttps(value)) {
			field.setCustomValidity("Enter a public HTTPS URL.");
		}
	}
	const filename = repositoryFilename(project.category, project.repo);
	if (isPublicHttps(project.repo) && !filename) {
		submissionForm.elements.namedItem("repo").setCustomValidity("Enter the repository’s main URL, including its owner and name.");
	}
	if (!submissionForm.reportValidity()) return;

	const json = JSON.stringify(project, null, 2) + "\n";
	const url = new URL(submissionForm.dataset.editor);
	url.search = new URLSearchParams({ filename, value: json, message: `Add ${project.name} to the catalog`, quick_pull: "1" }).toString();

	submissionEditor.href = url.href;
	document.querySelector("#submission-filename").textContent = filename;
	document.querySelector("#submission-json").textContent = json;
	submissionHandoff.hidden = false;
	submissionEditor.click();
});

submissionForm.hidden = false;
