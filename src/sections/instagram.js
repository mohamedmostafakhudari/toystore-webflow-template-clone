import rawTemp from "!raw-loader!../templates/instagramSection.hbs";
import Handlebars from "handlebars";
import { createButton, createElement } from "../utils";

class InstagramSection {
	constructor() {}
	render(container) {
		const compiledTemp = Handlebars.compile(rawTemp);
		const temp = compiledTemp({});
		const wrapper = createElement("div", "container mt-16 md:mt-24", {
			id: "instagram",
		});
		wrapper.innerHTML = temp;

		const images = [
			"5badecf79395558fbeb88a49_instagram-01.jpg",
			"5badecf735e113f8679a57e6_instagram-02.jpg",
			"5badecf735e11327b99a57e7_instagram-03.jpg",
			"5badecf7939555df08b88a48_instagram-04.jpg",
			"5badecf7939555514eb88a4a_instagram-05.jpg",
			"5badecf71f2da2228d17155f_instagram-06.jpg",
		];
		const imagesContainer = wrapper.querySelector(".images-container");

		for (const image of images) {
			const imageWrapper = createElement("a", "block rounded-xl overflow-hidden duration-300 hover:scale-[105%] hover:shadow-lg hover:shadow-zinc-600/20", {
				href: "#",
			});
			const imageElem = createElement("img", "", {
				src: `assets/${image}`,
			});
			imageWrapper.appendChild(imageElem);
			imagesContainer.appendChild(imageWrapper);
		}

		const buttons = ["see more photos"];
		const buttonPlaceholders = wrapper.querySelectorAll(".button-placeholder");
		buttonPlaceholders.forEach((placeholder, i) => {
			const buttonElem = createButton(
				"bg-primary text-white capitalize w-fit mx-auto hover:shadow-primary/50 hover:shadow-[0px_2px_4px_1px] hover:scale-[102%]",
				{
					href: "#",
				},
				buttons[i],
				"link"
			);
			placeholder.replaceWith(buttonElem);
		});
		container.appendChild(wrapper);
	}
}

const instagramSection = new InstagramSection();
export default instagramSection;
