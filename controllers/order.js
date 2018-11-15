// order container
const order = {};

// handle get order request
order.getOrder = (req, res) => {
	res.render('order', {
		pageTitle: 'Order',
		activeOrder: true,
		orderCss: true
	});
};

module.exports = order;
