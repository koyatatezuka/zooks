// cart container
const cart = {};

// handle get cart request
cart.getCart = (req, res) => {
	res.render('cart', {
		pageTitle: 'Cart',
		activeCart: true,
		cartCss: true
	});
};

module.exports = cart;
