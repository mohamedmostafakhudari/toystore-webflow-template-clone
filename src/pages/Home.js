import heroSection from "../sections/hero";

export default class Home {
	render(container) {
		console.log(container);
		heroSection.render(container);
		// return `<section >Welcome to the Home Page!</section>`;
	}
}
