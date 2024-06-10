import cartDOM from "./CartDOM";

const mock = [
	{
		product: {
			id: 1,
			name: "abc",
			imgSrc: "5bae12942ca03553bf0d536c_33903-2-plush-toy-transparent-image-min.png",
			price: 30,
		},
		quantity: 1,
	},
	{
		product: {
			id: 2,
			name: "carrot",
			imgSrc: "5bae12942ca03553bf0d536c_33903-2-plush-toy-transparent-image-min.png",
			price: 50,
		},
		quantity: 2,
	},
];

class Cart {
	constructor(initialCart) {
		this.cart = initialCart || [];
	}
	addItem(product, quantity) {
		const cartItem = {
			product,
			quantity,
		};
		this.cart.push(cartItem);

		cartDOM.renderCart(this);
	}
	removeItem(id) {
		this.cart = this.cart.filter((item) => +item.product.id !== +id);
		cartDOM.renderCart(this);
	}
	updateQuantity({ productId, updatedValue }) {
		this.cart = this.cart.map((item) => {
			if (+item.product.id === +productId) {
				return {
					product: item.product,
					quantity: +updatedValue,
				};
			} else {
				return item;
			}
		});
	}
	subTotal() {
		return this.cart.reduce((acc, curr) => {
			const { product, quantity } = curr;
			return acc + Number.parseInt(product.price) * quantity;
		}, 0);
	}
	size() {
		return this.cart.length;
	}
	cartItems() {
		return this.cart;
	}
	isEmpty() {
		return this.cart.length === 0;
	}
}

const cart = new Cart(mock);

export default cart;
