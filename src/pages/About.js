import rawTemp from "!raw-loader!../templates/aboutPage.hbs";
import Handlebars from "handlebars";
import { createElement, createLink } from "../utils.js";
import breadcrumb from "../components/BreadCrumb";
import videoSection from "../sections/video.js";
import aboutSection from "../sections/about/about.js";

export default class About {
	render(container) {
		breadcrumb.render(container);

		const section = createElement("section", "mt-16 lg:mt-24", {
			id: "about",
		});
		section.innerHTML = Handlebars.compile(rawTemp)({});
		videoSection.render(section);

		const aboutContainer = section.querySelector(".about-container");
		aboutSection.render(aboutContainer);

		const links = [
			{
				label: "More About Us",
				href: "#moreAbout",
			},
		];
		const linkPlaceholders = section.querySelectorAll(".link-placeholder");
		linkPlaceholders.forEach((placeholder, i) => {
			const linkElem = createLink(
				"w-fit mx-auto",
				{
					href: links[i].href,
				},
				links[i].label
			);
			placeholder.replaceWith(linkElem);
		});
		container.appendChild(section);

		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("animate-fadyScaleUp");
						if (entry.target.tagName === "SECTION") {
							entry.target.removeAttribute("data-visited", false);
							entry.target.setAttribute("data-visited", true);
						}
					}
				});
			},
			{
				rootMargin: "0px",
				threshold: 0.3,
			}
		);
		const targets = [container.querySelector("#video .video__text"), ...container.querySelectorAll("#about .about__image")];
		for (const target of targets) {
			observer.observe(target);
		}
	}
}
