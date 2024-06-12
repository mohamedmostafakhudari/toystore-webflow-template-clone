import { createButton, createElement } from "../utils";
import Handlebars from "handlebars";
import rawTemp from "!raw-loader!../templates/aboutSection.hbs";
class AboutSection {
	constructor() {}
	render(container) {
		const section = createElement("section", "py-16 md:py-24 lg:py-28", {
			id: "about",
		});
		const compiledTemp = Handlebars.compile(rawTemp);
		const temp = compiledTemp({});
		section.innerHTML = temp;

		const buttons = ["get it now!"];
		const buttonPlaceholders = section.querySelectorAll(".button-placeholder");
		buttonPlaceholders.forEach((placeholder, i) => {
			const buttonElem = createButton(
				"bg-primary text-white w-fit mx-auto lg:mx-0 uppercase mt-8",
				{
					href: "#",
				},
				buttons[i],
				"link"
			);
			placeholder.replaceWith(buttonElem);
		});
		container.appendChild(section);
	}
}

const aboutSection = new AboutSection();

export default aboutSection;
