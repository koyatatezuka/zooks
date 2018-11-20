// home container
const home = {};

// handle get request for home page
home.getHome = (req, res) => {
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

	res.render('home', {
		pageTitle: 'Zooks',
		activeHome: true,
		homeCss: true,
		isAdmin,
		isSignedIn,
		cartQty
	});
};

module.exports = home;
