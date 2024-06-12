import Handlebars from "handlebars";
import rawTemp from "!raw-loader!../templates/shopWindowsSection.hbs";

import woodenToy500Image from "../assets/5badf2131f2da24c02171c72_33727-9-wooden-toy-transparent-image-min-p-500.png";
import woodenToyImage from "../assets/5badf2131f2da24c02171c72_33727-9-wooden-toy-transparent-image-min.png";
import plushToy500Image from "../assets/5badf21356ac5470c84dfbf4_33903-2-plush-toy-transparent-image-min-p-500.png";
import plushToyImage from "../assets/5bae12942ca03553bf0d536c_33903-2-plush-toy-transparent-image-min.png";
import { createButton, createElement } from "../utils";
class ShopWindowsSection {
	async render(container) {
		const section = createElement("section", "py-32", {
			id: "shopWindows",
		});
		const compiledTemp = Handlebars.compile(rawTemp);
		const temp = compiledTemp({ woodenToy500Image, woodenToyImage, plushToy500Image, plushToyImage });
		section.innerHTML = temp;
		const buttons = ["shop now", "shop now"];
		const buttonPlaceholders = section.querySelectorAll(".button-placeholder");
		buttonPlaceholders.forEach((placeholder, i) => {
			const buttonElem = createButton("bg-white text-slate-800 capitalize whitespace-nowrap hover:shadow-black/20 hover:shadow-[0px_3px_4px_2px]", {}, buttons[i]);
			placeholder.replaceWith(buttonElem);
		});
		container.appendChild(section);
	}
}

const shopWindowsSection = new ShopWindowsSection();

export default shopWindowsSection;
