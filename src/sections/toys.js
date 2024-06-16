import { appendChildren, createElement, createResponsiveImage, fetchData, toVariableName } from "../utils";
import rawTemp from "!raw-loader!../templates/toysSection.hbs";
import Handlebars from "handlebars";

class ToysSection {
	constructor(heading = "") {
		this.heading = heading;
	}
	async render(container, limit = "") {
		const section = createElement("section", "", {
			id: this.heading ? toVariableName(this.heading) : "toys",
			["data-visited"]: false,
		});
		const compiledTemp = Handlebars.compile(rawTemp);
		const isProduction = window.location.hostname === "https://mohamedmostafakhudari.github.io";
		const isHomePage = isProduction ? window.location.pathname.split("/")[2] === "" : window.location.pathname.split("/")[1] === "";
		const temp = compiledTemp({ heading: this.heading, home: isHomePage });

		section.innerHTML = temp;

		const loadingIndicator = createElement("p", "col-start-1 col-end-[-1] text-center", {}, "Loading...");

		const cardsContainer = section.querySelector(".cards__container");

		cardsContainer.appendChild(loadingIndicator);

		container.appendChild(section);
		try {
			const toys = await fetchData("assets/data.json");
			if (toys) {
				cardsContainer.removeChild(loadingIndicator);
				if (this.heading) {
					const cards = this.buildCards(toys[toVariableName(this.heading)], limit);
					cardsContainer.appendChild(cards);
				} else {
					const cardSets = [this.buildCards(toys.stuffedAnimals, limit), this.buildCards(toys.woodenToys, limit)];
					for (const set of cardSets) {
						cardsContainer.appendChild(set);
					}
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
	buildCards(toys, limit) {
		const fragment = document.createDocumentFragment();
		for (const toy of toys.slice(0, limit ? limit : -1)) {
			const { name, price, images } = toy;
			const card = this.buildCard({ name, price, images });
			fragment.appendChild(card);
		}
		return fragment;
	}
	buildCard({ name, price, images }) {
		const boxLink = createElement(
			"a",
			"card flex flex-col gap-10 lg:gap-6 items-center bg-white rounded-xl py-8 pt-12 shadow shadow-black/10 transition-all duration-[400ms] invisible hover:elevate",
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
		console.log(boxLink);
		return boxLink;
	}
}

export default ToysSection;
