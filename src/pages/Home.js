import aboutSection from "../sections/about";
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
		aboutSection.render(container);

		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("animate-fadyScaleUp");
					}
				});
			},
			{
				rootMargin: "0px",
				threshold: 0.3,
			}
		);
		setTimeout(() => {
			const targets = [
				container.querySelector("#hero .hero__box"),
				...container.querySelectorAll("#shopWindows .shopwindows__box"),
				...container.querySelectorAll("#toys .card"),
				container.querySelector("#video .video__text"),
				container.querySelector("#about .about__image"),
			];
			for (const target of targets) {
				observer.observe(target);
			}
		}, 400);
	}
}
