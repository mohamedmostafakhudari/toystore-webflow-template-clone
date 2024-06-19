import breadcrumb from "../components/BreadCrumb";
import rawTemp from "!raw-loader!../templates/deliverySection.hbs";
import Handlebars from "handlebars";
import { createButton, createElement } from "../utils";
export default class Delivery {
	render(container) {
		breadcrumb.render(container);

		const section = createElement("section", "mt-12 mb-16 md:mb-20 lg:mb-28 text-zinc-800", {
			id: "deliveryInfo",
		});
		const compiledTemp = Handlebars.compile(rawTemp);
		const temp = compiledTemp({});
		section.innerHTML = temp;

		const buttonPlaceholders = section.querySelectorAll(".button-placeholder");
		const buttons = ["contact us"];
		buttonPlaceholders.forEach((placeholder, i) => {
			const buttonElem = createButton(
				"py-3 bg-primary text-white text-sm capitalize w-fit mx-auto hover:shadow-primary/50 hover:shadow-[0px_2px_4px_1px] hover:scale-[102%]",
				{
					href: "/contacts",
				},
				buttons[i],
				"link"
			);
			placeholder.replaceWith(buttonElem);
		});
		container.appendChild(section);
	}
}
