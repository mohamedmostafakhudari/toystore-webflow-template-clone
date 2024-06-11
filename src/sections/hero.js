import { createElement, appendChildren, createButton } from "../utils";
import backgroundUrl from "../assets/5baddd4835e113c6299a48f5_li-tzuni-507346-unsplash.jpg";

class HeroSection {
	constructor() {}
	render(container) {
		container.innerHtml = "";
		const heroSection = this.build();
		container.appendChild(heroSection);
	}
	build() {
		const section = createElement("section", `min-h-[60vh] h-[60vh] md:min-h-[71.5vh] md:h-[71.5vh] lg:min-h-[80vh] lg:h-[80vh] bg-cover bg-center bg-no-repeat`);
		section.style.backgroundImage = `url(${backgroundUrl})`;
		const container = createElement("div", "container h-full grid place-items-center");
		const box = createElement("div", "rounded-[14px] p-12 py-10 lg:py-14 bg-white text-center space-y-4 max-w-[480px] scale-[50%] opacity-0 lg:max-w-[570px] animate-fadyScaleUp", {
			style: "animation-delay:1s;",
		});

		const p = createElement("p", "text-primary text-sm font-medium", {}, "Say Hello to Toystore!");
		const h1 = createElement("h1", "text-3.5xl lg:text-5xl leading-10 font-medium", {}, "Free Ecommerce Template for Webflow");

		const button = createButton("bg-primary text-white hover:shadow-primary/50 hover:shadow-[0px_2px_4px_1px]", {}, "Open Catalog");

		appendChildren(box, p, h1, button);

		container.appendChild(box);
		section.appendChild(container);
		return section;
	}
}

const heroSection = new HeroSection();

export default heroSection;
