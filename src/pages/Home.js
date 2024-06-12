import heroSection from "../sections/hero";
import shopWindowsSection from "../sections/shopWindows";
import toysSection from "../sections/toys";
import videoSection from "../sections/video";

export default class Home {
	render(container) {
		heroSection.render(container);
		shopWindowsSection.render(container);
		toysSection.render(container);
		videoSection.render(container);
	}
}
