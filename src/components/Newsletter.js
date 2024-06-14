import { appendChildren, createButton, createElement } from "../utils";

class NewsLetter {
	constructor() {}
	render(container) {
		const wrapper = createElement("div", "container");
		const newsLetterElem = this.build();
		wrapper.appendChild(newsLetterElem);
		container.appendChild(wrapper);
	}
	build() {
		const form = createElement(
			"form",
			"bg-white shadow shadow-black/30 p-8 py-10 w-full rounded-xl flex flex-col lg:flex-row gap-8 mx-auto max-w-[460px] md:mx-auto md:p-16 lg:items-center lg:max-w-none lg:p-12 lg:pb-16 lg:[&>*]:flex-1",
			{
				id: "newsletter",
			}
		);
		const wrapper_1 = createElement("div", "flex flex-col lg:flex-row items-center gap-4");

		const iconWrapper = createElement("div", "grid place-items-center bg-primary rounded-full w-16 aspect-square shrink-0");
		const icon = createElement("img", "", {
			src: "/assets/5baf56dcace69cfd39b34f7a_paperplane-icon-white.svg",
		});
		iconWrapper.appendChild(icon);

		const p = createElement(
			"p",
			"text-lg font-varela text-slate-800 text-center md:text-2xl lg:font-bold lg:text-start",
			{},
			"",
			"Subscribe to our newsletter & get <span class='text-primary'>10% discount!</span>"
		);
		appendChildren(wrapper_1, iconWrapper, p);

		const wrapper_2 = createElement("div", "flex flex-col lg:flex-row gap-4");

		const input = createElement("input", "border-2 border-slate-200 bg-slate-50 rounded-full py-3 text-center placeholder:text-zinc-400 placeholder:font-bold lg:flex-1 lg:text-left lg:pl-8", {
			type: "email",
			id: "email",
			name: "email",
			placeholder: "Enter your email address",
		});
		const button = createButton("bg-primary text-white hover:shadow-primary/50 hover:shadow-[0px_2px_4px_1px] hover:scale-[102%]", {}, "Subscribe");

		appendChildren(wrapper_2, input, button);

		appendChildren(form, wrapper_1, wrapper_2);

		return form;
	}
}

const newsLetter = new NewsLetter();
export default newsLetter;
