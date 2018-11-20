const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

// login container
const login = {};

// handle login get request
login.getSignIn = (req, res) => {
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
	if (isSignedIn) return res.redirect('/');
	
	res.render('login', {
		pageTitle: 'Log In',
		loginCss: true,
		cartQty,
		isAdmin,
		isSignedIn
	});
};

// handle failed login in attempt
login.getFailedSignIn = (req, res) => {
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
	if (isSignedIn) return res.redirect('/');
	
	res.render('login', {
		pageTitle: 'Log In',
		loginCss: true,
		failedAttempt: true,
		cartQty,
		isAdmin,
		isSignedIn
	});
}

// handle post log in request
login.postSignIn = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/log/failed'
});

// handle log out request
login.getLogOut = (req, res) => {
	req.logout();
	res.redirect('/');
};

// handle register page request
login.getRegister = (req, res) => {
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

	res.render('register', {
		pageTitle: 'Register',
		registerCss: true,
		cartQty
	});
};

// handle register post request
login.postRegister = async (req, res) => {
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
	// check if user with the same email already exists
	const checkUser = await User.find({ email: req.body.email });

	// if email exist route back to register with message
	if (checkUser.length > 0) {
		return res.render('register', {
			pageTitle: 'Register',
			registerCss: true,
			emailExists: true,
			cartQty,
			isAdmin,
			isSignedIn
		})
	}

	const email = req.body.email;
	const password = req.body.password;
	const address = {
		street: req.body.street,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip
	};

	const saltRounds = 10;
	// hash password
	bcrypt.genSalt(saltRounds, function(err, salt) {
		bcrypt.hash(password, saltRounds, function(err, hash) {

			const user = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email,
				password: hash,
				address,
				admin: false
			});

			user.save().then(() => {
				res.redirect('/log');
			});
		});
	});
};

module.exports = login;
