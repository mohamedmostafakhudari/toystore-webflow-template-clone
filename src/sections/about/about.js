import { appendChildren, createButton, createElement, createLink, isHomePage } from "../../utils";
import Handlebars from "handlebars";
import rawTemp from "!raw-loader!../../templates/aboutSection.hbs";
import { data } from "./data";
class AboutSection {
	constructor() {}
	render(container) {
		// py-16 md:py-24 lg:py-28
		const section = createElement("section", "mt-16", {
			id: "about",
		});
		const compiledTemp = Handlebars.compile(rawTemp);
		const temp = compiledTemp({});
		section.innerHTML = temp;

		// const aboutSubSectionContainer = section.querySelector(".about-subsection-container");

		// const buttons = ["get it now!"];
		// const buttonPlaceholders = section.querySelectorAll(".button-placeholder");
		// buttonPlaceholders.forEach((placeholder, i) => {
		// 	const buttonElem = createButton(
		// 		"bg-primary text-white w-fit mx-auto lg:mx-0 uppercase mt-8 hover:shadow-primary/50 hover:shadow-[0px_2px_4px_1px] hover:scale-[102%]",
		// 		{
		// 			href: "#",
		// 		},
		// 		buttons[i],
		// 		"link"
		// 	);
		// 	placeholder.replaceWith(buttonElem);
		// });
		const aboutContentContainer = section.querySelector(".about-content-container");
		if (isHomePage()) {
			const { heading, text, imgSrc, buttons, links } = data.home;
			const subsection = this.buildSubSection({ heading, text, imgSrc, buttons, links });
			aboutContentContainer.appendChild(subsection);
		} else {
			for (const [index, { heading, text, imgSrc, buttons, links }] of data.about.entries()) {
				const subsection = this.buildSubSection(index, { heading, text, imgSrc, buttons, links });

				aboutContentContainer.appendChild(subsection);
			}
		}
		container.appendChild(section);
	}
	buildSubSection(index, { heading, text, imgSrc, buttons = [], links = [] }) {
		const div = createElement("div", `flex flex-col ${index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-28 lg:items-center lg:[&>*]:flex-1`);

		const imageWrapper = createElement("div", "about__image rounded-xl overflow-hidden scale-[50%] opacity-0 lg:grid lg:place-items-center");
		imageWrapper.innerHTML = `<img src="${imgSrc}" class="h-64 md:h-[420px] lg:h-80 w-full object-cover object-center lg:max-w-md rounded-xl" alt="" />
`;
		const contentWrapper = createElement("div", "mt-12 lg:mt-0");
		contentWrapper.innerHTML = `
			<h2 class="text-3xl relative pb-6 lg:text-3.5xl">${heading}
				<div class="absolute bottom-0 left-1/2 lg:left-0 -translate-x-1/2 lg:-translate-x-0 h-0.5 bg-primary w-20"></div>
			</h2>
			<p class="text-zinc-500 leading-6 mt-6 lg:max-w-[46ch]">
				${text}
			</p>
		`;
		const buttonsContainer = createElement("div", "buttons-container mt-8");
		const linksContainer = createElement("div", "links-container");
		if (buttons.length) {
			for (const button of buttons) {
				const buttonElem = createButton(
					"bg-primary w-fit mx-auto lg:mx-0 text-white hover:shadow-primary/50 hover:shadow-[0px_2px_4px_1px] hover:scale-[102%]",
					{},
					button.label,
					button.type === "link" ? "link" : ""
				);
				if (button.type === "link") {
					buttonElem.setAttribute("href", button.href);
				}
				buttonsContainer.appendChild(buttonElem);
			}
		}
		if (links.length) {
			for (const link of links) {
				let linkElem = createLink(
					"w-fit mx-auto lg:mx-0",
					{
						href: link.href,
					},
					link.label,
					link.iconSrc
				);
				linksContainer.appendChild(linkElem);
			}
		}
		appendChildren(contentWrapper, buttonsContainer, linksContainer);

		appendChildren(div, imageWrapper, contentWrapper);

		return div;
	}
}

const aboutSection = new AboutSection();

export default aboutSection;
