
const buttons = document.querySelectorAll('.store__category-button');
const changeActiveBtn = (evt) => {
	const target = evt.target;
	buttons.forEach((button) => {
		button.classList.remove('store__category-button-active');
	})
	target.classList.add('store__category-button-active');
}
buttons.forEach((button) => {
	button.addEventListener('click', changeActiveBtn);
})
const API_URL = 'https://instinctive-windy-longship.glitch.me';
//   /api/products
//   /api/products/category/:category
//   /api/products/list/:ids
//   /api/products/:id
//   /api/orders

const productsList = document.querySelector('.store__list');

const createrProductCard = (product) => {
	const productCard = document.createElement('li');
	productCard.classList.add('store__item');
	productCard.innerHTML = `
	<article class="store__product product">
		<img class="product__image" width="388" height="261" src="${API_URL}${product.photoUrl}" alt="${product.name}">
		<h3 class="product__title">${product.name}</h3>
		<p class="product__price">${product.price}&nbsp;₽</p>
		<button class="product__btn-add-cart">Заказать</button>
	</article>
	`;
	return productCard;
}

const renderProducts = (products) => {
	productsList.textContent = '';
	products.forEach((product) => {
		const productCard = createrProductCard(product);

		productsList.appendChild(productCard);
	})
}

const fetchProductsByCategory = async (category) => {
	try {
		const response = await fetch(`${API_URL}/api/products/category/${category}`)
		if (!response.ok) {
			throw new Error('response.status')
		}

		const products = await response.json()
		renderProducts(products)

	} catch (error) {
		console.error(error);
	}
}
fetchProductsByCategory('Лежанки');
