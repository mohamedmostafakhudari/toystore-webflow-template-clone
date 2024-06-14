import { appendChildren, createElement, createResponsiveImage, fetchData } from "../utils";

class ToysSection {
	constructor() {}
	async render(container) {
		const section = createElement("section", "", {
			id: "toys",
		});
		const loadingIndicator = createElement("p", "text-center", {}, "Loading...");

		section.appendChild(loadingIndicator);

		container.appendChild(section);
		try {
			const toys = await fetchData("assets/data.json");
			if (toys) {
				const stuffedAnimalsSubSection = this.buildCards(toys.stuffedAnimals, "Stuffed Animals");
				const woodenToysSubSection = this.buildCards(toys.woodenToys, "Wooden Toys");

				section.removeChild(loadingIndicator);
				section.appendChild(stuffedAnimalsSubSection);
				section.appendChild(woodenToysSubSection);
			}
		} catch (err) {
			console.log(err);
		}
	}
	buildCardsSectionWrapper(title) {
		const wrapper = createElement("div", "container text-slate-800");
		const heading = createElement("div", "");
		const subSectionTitle = createElement("h3", "relative capitalize text-2xl pb-7 lg:pb-8 border-b-2 font-medium border-slate-300 lg:text-3xl", {}, title);

		const border = createElement("div", "bg-primary h-0.5 absolute top-full -translate-y-1/4 w-36");
		const link = createElement(
			"a",
			"flex items-center gap-2 capitalize text-sm font-semibold border-b-2 border-slate-300 leading-6 absolute top-0 right-0",
			{
				href: "#",
			},
			"see all toys"
		);
		const icon = createElement("img", "w-3 block", {
			src: "assets/5baf79eb570913b9781a96f2_arrow-right-mini-icon.svg",
		});

		link.appendChild(icon);

		appendChildren(subSectionTitle, border, link);
		appendChildren(heading, subSectionTitle);
		wrapper.appendChild(heading);
		return wrapper;
	}
	buildCards(toys, title) {
		const wrapper = this.buildCardsSectionWrapper(title);

		const cardsWrapper = createElement("div", "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-4 md:gap-10 lg:gap-6 mt-12 mb-32 md:mt-16");
		for (const toy of toys.slice(0, 4)) {
			const { name, price, images } = toy;
			const card = this.buildCard({ name, price, images });
			cardsWrapper.appendChild(card);
		}
		wrapper.appendChild(cardsWrapper);
		return wrapper;
	}
	buildCard({ name, price, images }) {
		const boxLink = createElement(
			"a",
			"card flex flex-col gap-10 lg:gap-6 items-center bg-white rounded-xl py-8 pt-12 shadow shadow-black/10 transition-all duration-[400ms] scale-[50%] opacity-0 hover:elevate",
			{
				href: "#",
			}
		);

		const imageWrapper = createElement("div", "w-60 lg:w-48");
		const image = createResponsiveImage(`assets/${images[0]}`, `assets/${images[1] ?? images[0]} 500w, assets/${images[0]} 1200w`, "100vw", name);
		imageWrapper.appendChild(image);

		const infoWrapper = createElement("div", "text-center space-y-3");
		const productName = createElement("h6", "capitalize text-md text-slate-800", {}, name);
		const productPrice = createElement("div", "bg-primary rounded-full p-0.5 px-3 text-white text-sm", {}, `$ ${price.toFixed(2)} USD`);
		appendChildren(infoWrapper, productName, productPrice);

		appendChildren(boxLink, imageWrapper, infoWrapper);

		return boxLink;
	}
}

const toysSection = new ToysSection();

export default toysSection;
