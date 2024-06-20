import breadcrumb from "../components/BreadCrumb";
import ToysSection from "../sections/toys";
import { createElement } from "../utils";

export default class Catalog {
	async render(container) {
		const toysSection = new ToysSection();

		breadcrumb.render(container);
		const wrapper = createElement("div", "wrapper my-16 md:my-28 md:mt-20 lg:mt-28");
		await toysSection.render(wrapper);
		container.appendChild(wrapper);
	}
}
