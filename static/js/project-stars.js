function githubRepoSlug(url) {
	try {
		const parsed = new URL(url);
		if (parsed.hostname !== "github.com") return null;

		const parts = parsed.pathname.replace(/^\/+|\/+$/g, "").split("/");
		if (parts.length !== 2) return null;

		return `${parts[0]}/${parts[1].replace(/\.git$/, "")}`;
	} catch {
		return null;
	}
}

async function loadGithubStars(metric) {
	const card = metric.closest(".project-card");
	const repo = card ? githubRepoSlug(card.href) : null;
	if (!repo) return;

	try {
		const response = await fetch(`https://img.shields.io/github/stars/${repo}.json`);
		if (!response.ok) return;

		const data = await response.json();
		const stars = String(data.value ?? "");
		if (!/^\d+(?:\.\d+)?[kKmM]?$/.test(stars)) return;

		metric.querySelector("[data-github-stars-count]").textContent = stars;
		metric.setAttribute("aria-label", `${stars} GitHub stars`);
		metric.title = `${stars} GitHub stars`;
		metric.hidden = false;
	} catch {
		// Leave the optional metric hidden when the service is unavailable.
	}
}

const metrics = document.querySelectorAll("[data-github-stars]");

if ("IntersectionObserver" in window) {
	const observer = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (!entry.isIntersecting) continue;
			observer.unobserve(entry.target);

			const metric = entry.target.querySelector("[data-github-stars]");
			if (metric) loadGithubStars(metric);
		}
	}, { rootMargin: "400px" });

	metrics.forEach((metric) => {
		const card = metric.closest(".project-card");
		if (card) observer.observe(card);
	});
} else {
	metrics.forEach(loadGithubStars);
}
