class Socials {
	constructor() {}
	renderSocials(container) {
		const icons = [
			'<i class="fa-brands fa-twitter mt-0.5 fa-lg"></i>',
			'<i class="fa-brands fa-square-facebook mt-0.5 fa-lg"></i>',
			'<i class="fa-brands fa-instagram mt-0.5 fa-lg"></i>',
			'<i class="fa-brands fa-pinterest mt-0.5 fa-lg"></i>',
			'<i class="fa-brands fa-youtube mt-0.5 fa-lg"></i>',
		];

		for (const icon of icons) {
			const iconElem = this.buildIcon(icon);
			container.appendChild(iconElem);
		}
	}
	buildIcon(icon) {
		const div = document.createElement("div");
		div.className = `text-white`;
		div.innerHTML = `
      <a href="#" class="bg-black/0 w-8 aspect-square grid place-items-center rounded-full duration-200 ease-in-out hover:bg-black/10">
        ${icon}
      </a>
    `;
		return div;
	}
}

const socials = new Socials();

export default socials;
