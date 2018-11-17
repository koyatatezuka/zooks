const Product = require('../models/product');
const User = require('../models/user');

// cart container
const cart = {};

// handle get cart request
cart.getCart = async (req, res) => {
	const user = await User.findOne({ _id: req.user._id }).populate('cart.productId')

	const cartArray = user.cart
	const total = cartArray.reduce((acc, item) => acc + item.total  ,0).toFixed(2)

	res.render('cart', {
		pageTitle: 'Cart',
		activeCart: true,
		cartCss: true,
		hasProduct: cartArray.length > 0,
		cartArray,
		total,
		user,
	});
};

// handle post cart request
cart.postCart = async (req, res) => {
	const product = await Product.findOne({ _id: req.body.productId })
	const updatedCart = await req.user.addToCart(product)

	res.redirect('/cart')	
}

// handle post cart delete product
cart.postDeleteProduct = async (req, res) => {
	const deletedProduct = await req.user.removeFromCart(req.body.cartItemId)

	res.redirect('/cart')
}

module.exports = cart;
