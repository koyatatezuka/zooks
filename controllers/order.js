const User = require('../models/user');
const Order = require('../models/order');

const { addOrderDate, addETA } = require('../util/helper')

// order container
const order = {};

// handle get order request
order.getOrder = async (req, res) => {
	// if orders exist for user
	try {
		// Array of order objects by user
		const orders = await Order.find({ user: req.user._id })

			 .populate('user')
			 .populate({
				 path: 'orderItems.productId',
				 model: 'Product'
			 });
		
		// util helper to add orderDate property to each order object
		addOrderDate(orders)

			// util helper to add ETA property to each order object
		addETA(orders)

		res.render('order', {
			pageTitle: 'Order',
			ordersExist: true,
			activeOrder: true,
			orderCss: true,
			orders
		});
	} catch (err) {
		res.render('order', {
			pageTitle: 'Order',
			activeOrder: true,
			orderCss: true
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
