import aboutSection from "../sections/about";
import heroSection from "../sections/hero";
import shopWindowsSection from "../sections/shopWindows";
import ToysSection from "../sections/toys";
import videoSection from "../sections/video";

export default class Home {
	async render(container) {
		heroSection.render(container);
		shopWindowsSection.render(container);

		const stuffedAnimalsSection = new ToysSection("Stuffed Animals", true);
		const woodenToysSection = new ToysSection("Wooden Toys", true);
		await stuffedAnimalsSection.render(container, 4);
		await woodenToysSection.render(container, 4);
		videoSection.render(container);
		aboutSection.render(container);

		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("animate-fadyScaleUp");
						console.log(entry.target);
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
		for (const target of targets) {
			observer.observe(target);
		}
	}
}
