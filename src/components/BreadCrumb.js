import { appendChildren, createElement, disableLink } from "../utils";
import navbar from "./Navbar";

class BreadCrumb {
	constructor() {}
	render(container) {
		const isProduction = window.location.hostname === "https://mohamedmostafakhudari.github.io";
		const pathSegments = isProduction ? window.location.pathname.split("/").slice(2) : window.location.pathname.split("/").slice(1);
		const currentRoute = pathSegments[pathSegments.length - 1];

		const breadcrumbElem = this.build(pathSegments, currentRoute);
		container.appendChild(breadcrumbElem);
	}
	build(pathSegments, currentRoute) {
		const div = createElement("div", "container mt-5 mb-20 lg:mt-12 lg:mb-24 flex gap-2 items-center text-zinc-400 border-zinc-300 border rounded-full w-auto ml-4 mr-4 py-2 px-6 lg:py-3", {
			id: "breadcrumbs",
		});

		const homeLink = createElement(
			"a",
			"capitalize text-xs md:text-sm",
			{
				href: "/",
			},
			"home"
		);
		const icon = this.buildArrowIcon();
		appendChildren(div, homeLink, icon);
		for (const segment of pathSegments) {
			const a = createElement(
				"a",
				"capitalize text-xs md:text-sm",
				{
					href: "/" + segment,
				},
				segment
			);
			if (segment === currentRoute) {
				a.classList.add("cursor-text");
				disableLink(a);
			}
			div.appendChild(a);

			if (segment !== currentRoute) {
				const icon = this.buildArrowIcon();
				div.appendChild(icon);
			}
		}
		this.bindEvents(div);
		return div;
	}
	buildArrowIcon() {
		const icon = createElement("div", "text-zinc-300");
		icon.innerHTML = `<svg width="9px" height="9px" viewBox="0 0 9 9" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch -->
      <title>arrow-right-mini-icon</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g id="arrow-right-mini-icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <path d="M5.26464855,1.08848914 C7.1542971,2.27138187 8.86464855,4.12903527 8.91035145,4.2131742 C9,4.2989628 9,4.3831013 9,4.51013474 C9,4.59427325 8.9542971,4.72130669 8.91035145,4.80544519 C8.86464855,4.88958412 7.11035145,6.74723752 5.26464855,7.93013025 C5.1292971,8.01426918 4.95,8.01426918 4.77070335,7.97302434 C4.63535145,7.88888584 4.5,7.7618524 4.5,7.59192529 L4.5,6.02958276 C4.5,6.02958276 0.58535145,5.81841082 0.4042971,5.6913778 C0.1792971,5.43896102 0,4.93247863 0,4.46724023 C0,4.00200225 0.1792971,3.53841353 0.4042971,3.36848642 C0.58535145,3.2843475 4.5,2.98903663 4.5,2.98903663 L4.5,1.4266941 C4.5,1.25676699 4.58964855,1.13138365 4.77070335,1.04559505 C4.9042971,0.961456119 5.08535145,1.00435021 5.26464855,1.08848914 Z" id="Arrow" fill="currentColor" fill-rule="nonzero"></path>
      </g>
  </svg>`;
		return icon;
	}
	bindEvents(comp) {
		comp.addEventListener("click", (e) => {
			if (e.target.matches("a[href='/']")) {
				navbar.clearSelection();
			}
		});
	}
}

const breadcrumb = new BreadCrumb();

export default breadcrumb;
