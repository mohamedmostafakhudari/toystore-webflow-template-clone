export async function loadImage(imgSrc) {
	const module = await import("./assets/" + imgSrc);
	return module.default;
}
