module.exports = (req, res) => {
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

	res.status(404).render('404', {
		pageTitle: 'Page Not Found',
		isAdmin,
		isSignedIn,
		cartQty
	});
};
