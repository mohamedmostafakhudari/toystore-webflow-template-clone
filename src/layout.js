import cart from "./components/Cart";
import cartDOM from "./components/CartDOM";
import navbar from "./components/Navbar";
import newsLetter from "./components/Newsletter";
import instagramSection from "./sections/instagram";
import footerSection from "./sections/footer";

export default function Layout(content) {
	const app = document.getElementById("app");

	app.innerHTML = `
    <dialog id="cart-dialog" class="bg-white text-sm w-full max-w-none lg:max-w-96  min-h-screen lg:min-h-0 fixed open:flex flex-col lg:rounded-lg backdrop:bg-transparent lg:backdrop:bg-black/70">
      
          <div class="flex items-center justify-between py-5 px-6 shadow shadow-black/10">
            <h2 class="capitalize tracking-wide text-xl">your cart</h2>
            <button id="close-cart-button">
              <i class="fa-solid fa-xmark fa-xl"></i>
            </button>
          </div>
          <ul id="cart-body-container" class="mt-6 px-6 space-y-6 flex-1 data-[empty]:grid data-[empty]:place-items-center">
            
          </ul>
          <div id="cart-footer-container" class="mt-6"></div>
    </dialog>
    <div id="navbar-container" class="lg:sticky lg:top-0 lg:z-10"></div>
    <div id="page-content-container">
      
    </div>
		<div id="footer-container"></div>
  `;
	const pageContentContainer = document.getElementById("page-content-container");
	content.render(pageContentContainer);
	// render navbar
	const navbarContainer = document.getElementById("navbar-container");
	if (navbarContainer) {
		navbar.render(navbarContainer);
	}
	// render cart
	const cartBodyContainer = document.getElementById("cart-body-container");
	const cartFooterContainer = document.getElementById("cart-footer-container");
	if (cartBodyContainer && cartFooterContainer) {
		cartDOM.renderCart(cart, cartBodyContainer, cartFooterContainer);
		cartDOM.bindEventListeners(cart);
	}
	const footerContainer = document.getElementById("footer-container");
	if (footerContainer) {
		newsLetter.render(footerContainer);
		instagramSection.render(footerContainer);
		footerSection.render(footerContainer);
	}

	// observer
	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("animate-fadyScaleUp");
				}
			});
		},
		{
			rootMargin: "0px",
			threshold: 0.3,
		}
	);

	setTimeout(() => {
		const targets = [app.querySelector("#newsletter"), app.querySelector("#instagram .images-container")];

		for (const target of targets) {
			observer.observe(target);
		}
	}, 400);
}
