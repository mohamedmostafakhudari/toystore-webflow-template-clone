import Layout from "./layout.js";

import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Delivery from "./pages/Delivery";
import Catalog from "./pages/Catalog";

export const router = {
	routes: [
		{ path: /^\/?$/, view: Home },
		{ path: /about\/?$/, view: About },
		{ path: /catalog\/?$/, view: Catalog },
		{ path: /catalog\/wooden-toys\/?$/, view: Catalog },
		{ path: /catalog\/stuffed-animals\/?$/, view: Catalog },
		{ path: /delivery\/?$/, view: Delivery },
		{ path: /contacts\/?$/, view: Contacts },
	],
	init() {
		window.addEventListener("DOMContentLoaded", this.navigate.bind(this));
		window.addEventListener("popstate", this.navigate.bind(this));

		document.addEventListener("click", (e) => {
			if (e.target.matches('a[href^="/"')) {
				e.preventDefault();
				const href = e.target.getAttribute("href");
				this.navigateTo(href);
			}
		});
	},

	navigate() {
		const currentPath = window.location.pathname;
		this.loadRoute(currentPath);
	},

	navigateTo(path) {
		window.history.pushState(null, null, path);
		this.loadRoute(path);
	},

	loadRoute(path) {
		const isProduction = window.location.hostname === "https://mohamedmostafakhudari.github.io";
		// const processedPath = isProduction ? path.split("/").slice(2).join("/") : path.split("/").slice(1).join("/");
		const route = this.routes.find((route) => path.match(route.path));

		if (route) {
			const view = new route.view();
			Layout(view);
		}
	},
};
