import cart from "./Cart";
import cartDOM from "./CartDOM";
import socials from "./Socials";

const initialNav = [
	{
		id: 0,
		label: "catalog",
		selected: false,
		goto: "/catalog",
	},
	{
		id: 1,
		label: "delivery",
		selected: false,
		goto: "/delivery",
	},
	{
		id: 2,
		label: "about",
		selected: false,
		goto: "/about",
	},
	{
		id: 3,
		label: "contacts",
		selected: false,
		goto: "/contacts",
	},
];

class Navbar {
	constructor(items = initialNav) {
		this.navItems = items;
	}
	render(container) {
		if (!container) {
			container = this.container;
		}
		this.container = container;
		container.innerHTML = "";
		const nav = this.buildNavbar();
		container.appendChild(nav);
	}
	buildNavbar() {
		const nav = document.createElement("nav");
		nav.className = "lg:w-full shadow-lg shadow-slate-600/10 relative text-base text-slate-800 bg-white";
		const activeClasses = "text-blue-500 underline";
		nav.innerHTML = `
		<div class="bg-primary text-white relative z-20 text-xs py-0.5">
			<div class="container px-0 flex items-center justify-between">
				<div>
					Call Us: +1 2013 974-5898
				</div>
				<div class="socials-container flex items-center justify-start"></div>
			</div>
		</div>
		<div class="container px-0 bg-white relative z-20">
			<div class="flex justify-start gap-16">
				<div id="logo" class="text-lg text-slate-800 lg:text-xl">
					<a href="/" class="block py-5">ToyStore</a>
				</div>
				<!-- desktop -->
				<ul class="items-center gap-8 hidden lg:flex">
				${this.navItems
					.map(
						(item) => `
					<li class="${item.selected ? activeClasses : ""}" data-id="${item.id}">
						<a href="${item.goto}" class="py-2 capitalize hover:underline">${item.label}</a>
					</li>
				`
					)
					.join("")}
				</ul>
				<div class="ml-auto flex items-center gap-4">
					<button id="open-cart-button" class="flex items-center gap-3 py-1">	
						<span class="capitalize">cart</span>
						<div class="w-6">
									<svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
									<!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch -->
									<title>cart-icon</title>
									<desc>Created with Sketch.</desc>
									<defs>
											<path d="M4,6 C3.449219,6 3,6.449219 3,7 C3,7.550781 3.449219,8 4,8 L6.21875,8 L8.84375,18.5 C9.066406,19.390625 9.863281,20 10.78125,20 L22.25,20 C23.152344,20 23.917969,19.402344 24.15625,18.53125 L26.75,9 L10,9 L10.5,11 L24.15625,11 L22.25,18 L10.78125,18 L8.15625,7.5 C7.933594,6.609375 7.136719,6 6.21875,6 L4,6 Z M21,20 C19.355469,20 18,21.355469 18,23 C18,24.644531 19.355469,26 21,26 C22.644531,26 24,24.644531 24,23 C24,21.355469 22.644531,20 21,20 Z M12,20 C10.355469,20 9,21.355469 9,23 C9,24.644531 10.355469,26 12,26 C13.644531,26 15,24.644531 15,23 C15,21.355469 13.644531,20 12,20 Z M12,22 C12.5625,22 13,22.4375 13,23 C13,23.5625 12.5625,24 12,24 C11.4375,24 11,23.5625 11,23 C11,22.4375 11.4375,22 12,22 Z M21,22 C21.5625,22 22,22.4375 22,23 C22,23.5625 21.5625,24 21,24 C20.4375,24 20,23.5625 20,23 C20,22.4375 20.4375,22 21,22 Z" id="path-1"></path>
									</defs>
									<g id="cart-icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											<mask id="mask-2" fill="white">
													<use xlink:href="#path-1"></use>
											</mask>
											<use id="Mask" fill="#222222" fill-rule="nonzero" xlink:href="#path-1"></use>
									</g>
							</svg>
						</div>
						<div class="bg-primary text-white font-bold w-5 aspect-square rounded-full grid place-items-center">
							${cart.size()}
						</div>
					</button>
					<!-- mobile -->
					<div class="self-stretch lg:hidden">
						<button id="menu-button" class="h-full w-16 border-l border-l-slate-200">
							<i class="fa-solid fa-bars text-slate-800 fa-lg"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- mobile -->
		<div id="menu-container" class="lg:hidden absolute left-0 z-10 -translate-y-full top-[calc(100%+1px)] w-full overflow-hidden data-[close]:animate-menuSlideUp data-[open]:animate-menuSlideDown"></div>
		`;
		const socialsContainer = nav.querySelector(".socials-container");
		socials.renderSocials(socialsContainer);

		const menuContainer = nav.querySelector("#menu-container");
		const menu = this.buildMenu(this.navItems);
		menuContainer.appendChild(menu);
		this.bindEvents(nav);
		return nav;
	}
	buildMenu(navItems) {
		const ul = document.createElement("ul");
		ul.className = "flex flex-col";
		for (const item of navItems) {
			const li = document.createElement("li");
			li.dataset.id = item.id;
			const a = document.createElement("a");
			a.textContent = item.label;
			a.href = item.goto;
			a.className = "block border-b border-b-slate-200 bg-white pl-6 py-4 capitalize hover:underline";

			li.appendChild(a);

			ul.appendChild(li);
		}
		return ul;
	}
	handleNavItemClick(id) {
		this.selectNavItem(id);
	}
	handleMenuToggling() {
		const menuContainer = document.querySelector("#menu-container");
		if (menuContainer.hasAttribute("data-open")) {
			menuContainer.removeAttribute("data-open");
			menuContainer.setAttribute("data-close", "");
		} else {
			menuContainer.removeAttribute("data-close");
			menuContainer.setAttribute("data-open", "");
		}
	}
	selectNavItem(id) {
		const newNavItems = this.navItems.map((item) => {
			if (item.id === id) {
				return {
					...item,
					selected: true,
				};
			} else {
				return {
					...item,
					selected: false,
				};
			}
		});
		this.navItems = newNavItems;
		this.render();
	}
	clearSelection() {
		for (const item of this.navItems) {
			item.selected = false;
		}
		this.render();
	}
	bindEvents(comp) {
		const navItems = comp.querySelectorAll("nav li");
		navItems.forEach((item) => {
			item.addEventListener("click", (e) => {
				const target = e.target.closest("li");
				if (!target) return;
				const id = +target.dataset.id;
				this.handleNavItemClick(id);
			});
			const logo = comp.querySelector("#logo");
			logo.addEventListener("click", () => {
				this.clearSelection();
			});
		});

		comp.addEventListener("click", (e) => {
			if (e.target.closest("#open-cart-button")) {
				cartDOM.openCart();
			}
			if (e.target.closest("#menu-button")) {
				this.handleMenuToggling();
			}
		});
	}
}

const navbar = new Navbar();

export default navbar;
