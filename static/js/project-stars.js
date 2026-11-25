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

const starRequests = new Map();

async function fetchGithubStars(repo) {
	try {
		const response = await fetch(`https://img.shields.io/github/stars/${repo}.json`, {
			signal: AbortSignal.timeout(7000),
		});
		if (!response.ok) return null;

		const data = await response.json();
		const label = String(data.value ?? "");
		const match = /^(\d+(?:\.\d+)?)([km]?)$/i.exec(label);
		if (!match) return null;

		const multiplier = { k: 1_000, m: 1_000_000 }[match[2].toLowerCase()] ?? 1;
		return { label, count: Number(match[1]) * multiplier };
	} catch {
		return null;
	}
}

async function loadGithubStars(metric) {
	const card = metric.closest(".project-card");
	const repo = card ? githubRepoSlug(card.href) : null;
	if (!repo) return;

	if (!starRequests.has(repo)) starRequests.set(repo, fetchGithubStars(repo));
	const stars = await starRequests.get(repo);
	if (!stars) return;

	metric.querySelector("[data-github-stars-count]").textContent = stars.label;
	metric.setAttribute("aria-label", `${stars.label} GitHub stars`);
	metric.title = `${stars.label} GitHub stars`;
	metric.hidden = false;
	card.dataset.stars = stars.count;
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

const sortControl = document.querySelector("#project-sort");

if (sortControl) {
	const grids = document.querySelectorAll(".project-grid");
	const status = document.querySelector(".sort-status");
	const collator = new Intl.Collator(document.documentElement.lang, { sensitivity: "base", numeric: true });
	const relativeTime = new Intl.RelativeTimeFormat(document.documentElement.lang, { numeric: "auto" });
	const today = new Date();
	const cardDetails = new Map(
		Array.from(document.querySelectorAll(".project-card"), (card) => {
			const time = card.querySelector("time");
			const created = time?.dateTime ?? "";
			if (created) {
				const date = new Date(`${created}T00:00:00Z`);
				let months = (today.getUTCFullYear() - date.getUTCFullYear()) * 12
					+ today.getUTCMonth() - date.getUTCMonth();
				if (today.getUTCDate() < date.getUTCDate()) months--;
				const days = Math.max(0, Math.floor((today - date) / 86_400_000));
				time.textContent = months >= 12 ? relativeTime.format(-Math.floor(months / 12), "year")
					: months > 0 ? relativeTime.format(-months, "month") : relativeTime.format(-days, "day");
				time.title = `Repository created ${created}`;
			}
			return [card, {
				name: card.querySelector("h4").textContent.trim(),
				hasIcon: Boolean(card.querySelector(".project-card__icon")),
				developer: card.querySelector("[data-developer]")?.textContent.trim() ?? "",
				created,
			}];
		}),
	);
	let allStars;

	async function updateSort() {
		const mode = sortControl.value;
		status.textContent = "";

		if (mode === "stars") {
			status.textContent = "Loading GitHub stars…";
			// Limit concurrent requests when sorting the entire catalog.
			allStars ??= Promise.all(Array.from({ length: 8 }, async (_, offset) => {
				for (let index = offset; index < metrics.length; index += 8) {
					await loadGithubStars(metrics[index]);
				}
			}));
			await allStars;
			if (sortControl.value !== mode) return;
			status.textContent = "";
		}

		for (const grid of grids) {
			const cards = Array.from(grid.children);
			cards.sort((a, b) => {
				const first = cardDetails.get(a);
				const second = cardDetails.get(b);
				const byName = collator.compare(first.name, second.name);
				if (mode === "default") {
					return Number(second.hasIcon) - Number(first.hasIcon) || byName;
				}
				if (mode === "developer") {
					return Number(!first.developer) - Number(!second.developer)
						|| collator.compare(first.developer, second.developer) || byName;
				}
				if (mode === "newest" || mode === "oldest") {
					const byDate = first.created.localeCompare(second.created);
					return Number(!first.created) - Number(!second.created)
						|| (mode === "newest" ? -byDate : byDate) || byName;
				}
				if (mode === "stars") {
					return Number(b.dataset.stars ?? -1) - Number(a.dataset.stars ?? -1) || byName;
				}
				return mode === "za" ? -byName : byName;
			});
			grid.append(...cards);
		}
	}

	sortControl.closest("label").hidden = false;
	sortControl.addEventListener("change", updateSort);
	updateSort();
}
