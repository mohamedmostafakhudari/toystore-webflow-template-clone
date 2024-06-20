// export async function loadImage(imgSrc) {
// 	const module = await import("./assets/" + imgSrc);
// 	return module.default;
// }

export function createElement(tag = "div", className = "", attributes = {}, textContent = "", innerHTML = "") {
	const elem = document.createElement(tag);
	elem.textContent = textContent;
	elem.className = className;
	for (const key in attributes) {
		elem.setAttribute(key, attributes[key]);
	}
	if (innerHTML) {
		elem.innerHTML = innerHTML;
	}
	return elem;
}
export function createButton(className, attributes, textContent, variation = "button") {
	if (variation == "button") {
		return createElement("button", `rounded-full p-3.5 px-8 font-bold duration-200 ${className}`, attributes, textContent);
	} else if (variation == "link") {
		return createElement("a", `block rounded-full p-3.5 px-8 font-bold duration-200 ${className}`, attributes, textContent);
	}
}
export function createResponsiveImage(src, srcset, sizes, alt, className) {
	const image = createElement("img", className, {
		src,
		srcset,
		sizes,
		alt,
	});
	return image;
}

export function createLink(className, attributes, textContent, iconSrc = "") {
	const elem = createElement(
		"a",
		`flex items-center gap-2 capitalize text-sm font-semibold border-b-2 border-slate-300 leading-6 duration-200 hover:border-primary ${className}`,
		attributes,
		textContent
	);
	if (iconSrc) {
		const icon = createIcon("", iconSrc);
		elem.appendChild(icon);
	}
	return elem;
}
export function createIcon(className, src) {
	return createElement("img", `w-3 block ${className}`, {
		src,
	});
}
export function appendChildren(parent, ...children) {
	children.forEach((child) => {
		parent.appendChild(child);
	});
}

export async function fetchData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
}
export function disableLink(linkElem) {
	linkElem.onclick = function (e) {
		console.log("abc");
		e.preventDefault();
		e.stopPropagation();
	};
}
export function toVariableName(string) {
	return string.split(" ").reduce((varName, part, i) => {
		if (i === 0) {
			varName += part.charAt(0).toLowerCase() + part.slice(1);
		} else {
			varName += part.charAt(0).toUpperCase() + part.slice(1);
		}
		return varName;
	}, "");
}

export function isProduction() {
	return window.location.hostname === "mohamedmostafakhudari.github.io";
}
export function isHomePage() {
	const route = isProduction() ? window.location.pathname.split("/")[2] : window.location.pathname.split("/")[1];
	return route === "";
}
