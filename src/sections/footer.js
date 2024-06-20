import Handlebars from "handlebars";

import rawTemp from "!raw-loader!../templates/footerSection.hbs";
import { createElement } from "../utils";
import socials from "../components/Socials";

const footerLinks = [
	{
		id: 0,
		label: "home",
		goto: "/",
	},
	{
		id: 1,
		label: "catalog",
		goto: "/catalog",
	},
	{
		id: 2,
		label: "delivery",
		goto: "/delivery",
	},
	{
		id: 3,
		label: "about",
		goto: "/about",
	},
	{
		id: 4,
		label: "contacts",
		goto: "/contacts",
	},
];

class FooterSection {
	constructor(footerLinks) {
		this.footerLinks = footerLinks;
	}
	render(container) {
		const compiledTemp = Handlebars.compile(rawTemp);
		const temp = compiledTemp({});

		const footer = createElement("footer", "bg-primary text-white mt-16 md:mt-24 py-8 md:py-12");
		footer.innerHTML = temp;

		const footerLinksContainer = footer.querySelector(".footer-links-container");
		const socialsContainers = footer.querySelectorAll(".socials-container");

		for (const obj of footerLinks) {
			const linkElem = this.buildLink(obj);
			footerLinksContainer.appendChild(linkElem);
		}

		for (const socialsContainer of socialsContainers) {
			socials.renderSocials(socialsContainer);
		}

		container.appendChild(footer);
	}
	buildLink(link) {
		const li = createElement("li", "", {
			"data-id": link.id,
		});
		const a = createElement(
			"a",
			"capitalize hover:underline",
			{
				href: link.goto,
			},
			link.label
		);
		li.appendChild(a);
		return li;
	}
}

const footerSection = new FooterSection(footerLinks);
export default footerSection;
