const User = require('../models/user');
const Order = require('../models/order');

const { addOrderDate, addETA } = require('../util/helper')

// order container
const order = {};

// handle get order request
order.getOrder = async (req, res) => {
	let isAdmin = false;
	let isSignedIn = false;
	let cartQty = 0;

	if (req.user) {
		isAdmin = req.user.admin;
		isSignedIn = true

		if (req.user.cart.length > 0) {
			cartQty = req.user.cart.reduce((acc, qty) => acc + qty.quantity, 0)
		}
	} 
	// if orders exist for user
	try {
		// Array of order objects by user
		const orders = await Order.find({ user: req.user._id })
			 .populate('user')
			 .populate({
				 path: 'orderItems.productId',
				 model: 'Product'
			 });
		let ordersExist = false;

		if (orders.length > 0) ordersExist = true;
		
		// util helper to add orderDate property to each order object
		addOrderDate(orders)

			// util helper to add ETA property to each order object
		addETA(orders)

		res.render('order', {
			pageTitle: 'Order',
			activeOrder: true,
			orderCss: true,
			ordersExist,
			isAdmin,
			isSignedIn,
			orders,
			cartQty
		});
	} catch (err) {
		res.render('order', {
			pageTitle: 'Order',
			activeOrder: true,
			orderCss: true,
			isAdmin,
			isSignedIn,
			cartQty
		});
	}
};

// handle post order request
order.postOrder = async (req, res) => {
	const user = await User.findOne({ _id: req.user._id }).populate('cart.productId');

	const orderItems = user.cart;

	const order = new Order({
		user: user._id,
		orderItems,
		total: req.body.total,
		date: new Date()
	});

	order.save()
	.then(result => {
		user.clearCart()
		res.redirect('/order');
	})
	.catch(err => console.log(err));
};

module.exports = order;
