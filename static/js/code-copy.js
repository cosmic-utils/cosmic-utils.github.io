if (navigator.clipboard?.writeText) {
	for (const code of document.querySelectorAll(".guide__content pre > code")) {
		const pre = code.parentElement;
		const snippet = document.createElement("div");
		snippet.className = "guide__snippet";
		const button = document.createElement("button");
		button.type = "button";
		button.className = "guide__copy";
		button.setAttribute("aria-label", "Copy code");
		button.title = "Copy code";
		button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="3" width="8" height="4" rx="1"/><path d="M16 5h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3"/></svg>';

		const status = document.createElement("span");
		status.setAttribute("role", "status");

		let resetTimer;
		button.addEventListener("click", async () => {
			try {
				await navigator.clipboard.writeText(code.textContent);
				status.textContent = "Copied!";
			} catch {
				status.textContent = "Copy failed";
			}
			clearTimeout(resetTimer);
			resetTimer = setTimeout(() => { status.textContent = ""; }, 2000);
		});

		pre.before(snippet);
		const toolbar = document.createElement("div");
		toolbar.className = "guide__snippet-toolbar";
		toolbar.append(status, button);
		snippet.append(toolbar, pre);
	}
}
