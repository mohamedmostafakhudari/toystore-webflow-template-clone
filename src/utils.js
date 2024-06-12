export async function loadImage(imgSrc) {
	const module = await import("./assets/" + imgSrc);
	return module.default;
}

export function createElement(tag = "div", className = "", attributes = {}, textContent = "") {
	const elem = document.createElement(tag);
	elem.textContent = textContent;
	elem.className = className;
	for (const key in attributes) {
		elem.setAttribute(key, attributes[key]);
	}
	return elem;
}
export function createButton(className, attributes, textContent, variation = "button") {
	if (variation == "button") {
		return createElement("button", `rounded-full p-3 px-8 font-bold duration-200 ${className}`, attributes, textContent);
	} else if (variation == "link") {
		return createElement("a", `block rounded-full p-3 px-8 font-bold duration-200 ${className}`, attributes, textContent);
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
