class CartDOM {
	constructor() {}
	async renderCart(cart, bodyContainer = document.querySelector("#cart-body-container"), footerContainer = document.querySelector("#cart-footer-container")) {
		bodyContainer.innerHTML = "";
		footerContainer.innerHTML = "";
		if (cart.isEmpty()) {
			bodyContainer.setAttribute("data-empty", "");
			bodyContainer.innerHTML = `
        <p>No items found.</p>
      `;
		} else {
			bodyContainer.removeAttribute("data-empty");
			for (const obj of cart.cartItems()) {
				const cartItem = await this.buildCartItem(obj);
				bodyContainer.appendChild(cartItem);
			}
			const cartFooter = this.buildCartFooter({ subTotal: cart.subTotal() });
			footerContainer.appendChild(cartFooter);
		}
	}
	bindEventListeners(cart) {
		const closeCartButton = document.getElementById("close-cart-button");
		const cartBodyContainer = document.getElementById("cart-body-container");
		cartBodyContainer.addEventListener("click", (e) => {
			const target = e.target;
			if (target.matches(".remove-from-cart-button")) {
				const item = target.closest(".cartItem");
				const productId = item.dataset.productId;
				cart.removeItem(productId);
			}
		});
		cartBodyContainer.addEventListener("change", (e) => {
			const target = e.target;
			if (target.matches("[type=number]#quantity")) {
				const item = target.closest(".cartItem");
				const productId = item.dataset.productId;
				const updatedValue = target.value;
				cart.updateQuantity({ productId, updatedValue });
				this.updateCartFooter({ subTotal: cart.subTotal() });
			}
		});
		closeCartButton.addEventListener("click", () => {
			this.closeCart();
		});
	}
	updateCartFooter({ subTotal }) {
		const cartFooterContainer = document.querySelector("#cart-footer-container");
		cartFooterContainer.innerHTML = "";
		const cartFooter = this.buildCartFooter({ subTotal });
		cartFooterContainer.appendChild(cartFooter);
	}
	openCart() {
		const cartDialog = document.querySelector("#cart-dialog");
		cartDialog.showModal();
		cartDialog.classList.remove("animate-zoomOut");
		cartDialog.classList.add("animate-zoomIn");
	}
	closeCart() {
		const cartDialog = document.querySelector("#cart-dialog");
		cartDialog.classList.remove("animate-zoomIn");
		cartDialog.classList.add("animate-zoomOut");
		setTimeout(() => {
			cartDialog.close();
		}, 300);
	}
	async buildCartItem({ product, quantity }) {
		const li = document.createElement("li");
		li.className = "cartItem flex items-center justify-between w-full px-3";
		li.dataset.productId = product.id;
		li.innerHTML = `
    <div class="flex items-center justify-between gap-4">
      <div class="image-container w-16">
      </div>
      <div class="flex flex-col items-start">
        <h3 class="font-bold">Teddy Bear</h3>
        <p class="">$&nbsp;${product.price.toFixed(2)}&nbsp;USD</p>
        <button class="remove-from-cart-button text-red-500 underline">Remove</button>
      </div>
    </div>
    <input type="number" name="quantity" id="quantity" value=${quantity} defaultValue="1" class="w-20 h-12 rounded-full text-center pl-3 ring-1 ring-slate-300 bg-slate-100"/>
    `;
		const imageContainer = li.querySelector(".image-container");
		const image = product.imgSrc ? "/assets/" + product.imgSrc : null;
		if (image) {
			const imageElement = document.createElement("img");
			imageElement.src = image;
			imageContainer.appendChild(imageElement);
		}
		return li;
	}
	buildCartFooter({ subTotal }) {
		const div = document.createElement("div");
		div.className = "pt-3 pb-10 shadow-[0px_-2px_4px_0px] shadow-black/15 px-6 text-sm";
		div.innerHTML = `
    <div class="flex items-center justify-between">
      <h4>Subtotal</h4>
      <span class="font-bold">$&nbsp;${subTotal.toFixed(2)}&nbsp;USD</span>
    </div>
    <div class="mt-16">
      <button class="bg-primary text-white w-full py-3 rounded-full font-bold">Continue to Checkout</button>
    </div>
    `;
		return div;
	}
}

const cartDOM = new CartDOM();

export default cartDOM;
