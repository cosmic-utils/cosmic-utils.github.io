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

function parseStarCount(value) {
	const match = /^(\d+(?:\.\d+)?)([kKmM])?$/.exec(value);
	if (!match) return -1;
	const num = parseFloat(match[1]);
	const suffix = (match[2] || "").toLowerCase();
	if (suffix === "k") return Math.round(num * 1000);
	if (suffix === "m") return Math.round(num * 1000000);
	return Math.round(num);
}

const searchInput = document.getElementById("project-search");
const categorySelect = document.getElementById("project-category");
const sortSelect = document.getElementById("project-sort");
const sections = Array.from(document.querySelectorAll(".project-section"));

function reorder(container, orderedNodes) {
	const move = Object.hasOwn(Element.prototype, "moveBefore")
		? (node) => container.moveBefore(node, null)
		: (node) => container.append(node);
	for (const node of orderedNodes) move(node);
}

function compareCards(a, b, sortMode) {
	if (sortMode === "date-desc" || sortMode === "date-asc") {
		const ordA = Number(a.dataset.added ?? 0);
		const ordB = Number(b.dataset.added ?? 0);
		if (ordA !== ordB) {
			return sortMode === "date-desc" ? ordB - ordA : ordA - ordB;
		}
	}
	if (sortMode === "rating-desc" || sortMode === "rating-asc") {
		const starsA = Number(a.dataset.stars ?? -1);
		const starsB = Number(b.dataset.stars ?? -1);
		if (starsA !== starsB) {
			if (starsA < 0) return 1;
			if (starsB < 0) return -1;
			return sortMode === "rating-desc" ? starsB - starsA : starsA - starsB;
		}
	}
	const nameA = a.dataset.name || "";
	const nameB = b.dataset.name || "";
	const cmp = nameA.localeCompare(nameB, undefined, { sensitivity: "base" });
	return sortMode === "name-desc" ? -cmp : cmp;
}

function applyFiltersAndSort(shouldReorder = false) {
	const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
	const category = categorySelect ? categorySelect.value : "all";
	const sortMode = sortSelect ? sortSelect.value : "name-asc";

	for (const section of sections) {
		const grid = section.querySelector(".project-grid");
		if (!grid) continue;

		const cards = Array.from(grid.querySelectorAll(".project-card"));

		if (shouldReorder) {
			cards.sort((a, b) => compareCards(a, b, sortMode));
			reorder(grid, cards);
		}

		const categoryMatches = category === "all" || section.id === category;
		let visibleInSection = 0;

		for (const card of cards) {
			const name = (card.dataset.name || "").toLowerCase();
			const desc = (card.dataset.description || "").toLowerCase();
			const matchesQuery = !query || name.includes(query) || desc.includes(query);

			if (categoryMatches && matchesQuery) {
				card.hidden = false;
				visibleInSection++;
			} else {
				card.hidden = true;
			}
		}

		section.hidden = visibleInSection === 0;
	}
}

async function loadGithubStars(metric) {
	if (metric.dataset.loaded) return;
	metric.dataset.loaded = "true";

	const card = metric.closest(".project-card");
	const repo = card ? githubRepoSlug(card.href) : null;
	if (!repo) return;

	try {
		const response = await fetch(`https://img.shields.io/github/stars/${repo}.json`);
		if (!response.ok) return;

		const data = await response.json();
		const stars = String(data.value ?? "");
		const numericStars = parseStarCount(stars);
		if (numericStars < 0) return;

		card.dataset.stars = String(numericStars);
		metric.querySelector("[data-github-stars-count]").textContent = stars;
		metric.setAttribute("aria-label", `${stars} GitHub stars`);
		metric.title = `${stars} GitHub stars`;
		metric.hidden = false;

		const currentSort = sortSelect ? sortSelect.value : "name-asc";
		if (currentSort === "rating-desc" || currentSort === "rating-asc") {
			applyFiltersAndSort(true);
		}
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

applyFiltersAndSort(true);

if (searchInput) {
	searchInput.addEventListener("input", () => applyFiltersAndSort(false));
}

if (categorySelect) {
	categorySelect.addEventListener("change", () => applyFiltersAndSort(false));
}

if (sortSelect) {
	sortSelect.addEventListener("change", () => {
		const val = sortSelect.value;
		if (val === "rating-desc" || val === "rating-asc") {
			metrics.forEach(loadGithubStars);
		}
		applyFiltersAndSort(true);
	});
}
