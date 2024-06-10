export async function loadImage(imgSrc) {
	const module = await import("./assets/" + imgSrc);
	return module.default;
}

export function createElement(tag = "div", className = "", attributes = {}, textContent = "") {
	const elem = document.createElement(tag);
	elem.textContent = textContent;
	elem.className = className;
	for (key in attributes) {
		elem.setAttribute(key, attributes[key]);
	}
	return elem;
}
export function createButton(className, attributes, textContent) {
	return createElement("button", `rounded-full p-3 px-8 font-bold duration-200 ${className}`, attributes, textContent);
}

export function appendChildren(parent, ...children) {
	children.forEach((child) => {
		parent.appendChild(child);
	});
}
