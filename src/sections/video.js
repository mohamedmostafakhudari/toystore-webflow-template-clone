import { createElement, isHomePage } from "../utils";
import Handlebars from "handlebars";
import rawTemp from "!raw-loader!../templates/videoSection.hbs";

class VideoSection {
	constructor() {}
	render(container) {
		const section = createElement(
			"section",
			"mt-20 md:mt-28 lg:mt-32 min-h-[55vh] h-[55vh] bg-[size:400%] bg-[position:50%,0] bg-fixed md:bg-[size:200%] lg:bg-[size:130%] bg-black/30 bg-blend-overlay bg-no-repeat text-white",
			{
				id: "video",
				style: `background-image: url('assets/5baf3d57ace69c149bb331b8_tim-gouw-165547-unsplash.jpg')`,
			}
		);
		const compiledTemp = Handlebars.compile(rawTemp);
		const temp = compiledTemp({});
		section.innerHTML = temp;

		container.appendChild(section);
	}
}

const videoSection = new VideoSection();

export default videoSection;
