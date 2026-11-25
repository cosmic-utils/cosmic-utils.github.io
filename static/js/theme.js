(() => {
	const storageKey = "cosmic-orbit-theme";
	const root = document.documentElement;
	let theme = "system";

	function applyTheme(value) {
		theme = value === "light" || value === "dark" ? value : "system";
		if (theme === "system") delete root.dataset.theme;
		else root.dataset.theme = theme;
	}

	try {
		applyTheme(localStorage.getItem(storageKey));
	} catch {
		// The device preference still applies if local storage is unavailable.
	}

	document.addEventListener("DOMContentLoaded", () => {
		const control = document.querySelector(".theme-control");
		const trigger = control.querySelector("summary");
		const icon = trigger.querySelector("use");
		const options = control.querySelectorAll("[data-theme-choice]");

		const updateSelection = () => {
			for (const option of options) {
				const selected = option.dataset.themeChoice === theme;
				option.setAttribute("aria-pressed", selected);
				if (selected) trigger.setAttribute("aria-label", `Color theme: ${option.getAttribute("aria-label")}`);
			}
			icon.setAttribute("href", `#theme-${theme}-icon`);
		};

		updateSelection();
		control.hidden = false;

		for (const option of options) {
			option.addEventListener("click", () => {
				applyTheme(option.dataset.themeChoice);
				updateSelection();
				control.open = false;
				trigger.focus();

				try {
					if (theme === "system") localStorage.removeItem(storageKey);
					else localStorage.setItem(storageKey, theme);
				} catch {
					// The selected theme still applies on this page.
				}
			});
		}

		control.addEventListener("keydown", (event) => {
			if (event.key !== "Escape" || !control.open) return;
			event.preventDefault();
			control.open = false;
			trigger.focus();
		});

		document.addEventListener("pointerdown", (event) => {
			if (!control.contains(event.target)) control.open = false;
		});

		window.addEventListener("storage", (event) => {
			if (event.storageArea !== localStorage || (event.key !== storageKey && event.key !== null)) return;
			applyTheme(event.newValue);
			updateSelection();
		});
	});
})();
