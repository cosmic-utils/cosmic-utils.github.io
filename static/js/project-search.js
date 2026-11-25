const projectSearch = document.querySelector("#project-search");
const searchStatus = document.querySelector(".search-status");
const projectSections = Array.from(document.querySelectorAll(".project-section"), (section) => ({
	section,
	link: document.querySelector(`.category-nav a[href="#${section.id}"]`),
	cards: Array.from(section.querySelectorAll(".project-card"), (card) => ({
		card,
		text: [card.querySelector("h4").textContent, card.querySelector("p")?.textContent,
			card.querySelector("[data-developer]")?.textContent, card.href].filter(Boolean).join(" ").toLowerCase(),
	})),
}));

function filterProjects() {
	const terms = projectSearch.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
	let matches = 0;

	for (const { section, link, cards } of projectSections) {
		let sectionMatches = 0;
		for (const { card, text } of cards) {
			card.hidden = !terms.every((term) => text.includes(term));
			if (!card.hidden) sectionMatches++;
		}
		section.hidden = terms.length > 0 && sectionMatches === 0;
		link.hidden = section.hidden;
		matches += sectionMatches;
	}

	searchStatus.textContent = terms.length > 0 && matches === 0 ? "No projects found." : "";
}

projectSearch.addEventListener("input", filterProjects);
projectSearch.hidden = false;
filterProjects();
