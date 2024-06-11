import heroSection from "../sections/hero";
import shopWindowsSection from "../sections/shopWindowsSection";

export default class Home {
	render(container) {
		heroSection.render(container);
		shopWindowsSection.render(container);
	}
}
