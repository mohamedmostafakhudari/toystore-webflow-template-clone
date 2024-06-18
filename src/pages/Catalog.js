import breadcrumb from "../components/BreadCrumb";
import ToysSection from "../sections/toys";

export default class Catalog {
	async render(container) {
		const toysSection = new ToysSection();

		breadcrumb.render(container);
		await toysSection.render(container);
	}
}
