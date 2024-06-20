import aboutSection from "../sections/about/about";
import heroSection from "../sections/hero";
import shopWindowsSection from "../sections/shopWindows";
import ToysSection from "../sections/toys";
import videoSection from "../sections/video";
import { createElement } from "../utils";

export default class Home {
	async render(container) {
		heroSection.render(container);
		shopWindowsSection.render(container);

		const toysWrapper = createElement("div", "wrapper space-y-20 md:space-y-24 lg:space-y-32");

		const stuffedAnimalsSection = new ToysSection("Stuffed Animals", true);
		const woodenToysSection = new ToysSection("Wooden Toys", true);
		await stuffedAnimalsSection.render(toysWrapper, 4);
		await woodenToysSection.render(toysWrapper, 4);
		container.appendChild(toysWrapper);

		videoSection.render(container);
		aboutSection.render(container);

		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("animate-fadyScaleUp");
						if (entry.target.tagName === "SECTION") {
							entry.target.removeAttribute("data-visited", false);
							entry.target.setAttribute("data-visited", true);
						}
					}
				});
			},
			{
				rootMargin: "0px",
				threshold: 0.3,
			}
		);
		const targets = [
			container.querySelector("#hero .hero__box"),
			...container.querySelectorAll("#shopWindows .shopwindows__box"),
			...container.querySelectorAll("#stuffedAnimals .card, #woodenToys .card"),
			container.querySelector("#video .video__text"),
			container.querySelector("#about .about__image"),
		];
		console.log(targets);
		for (const target of targets) {
			observer.observe(target);
		}
	}
}
