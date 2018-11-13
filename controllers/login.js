// login container
const login = {};

login.getSignIn = (req, res) => {
	res.render('login', {
		pageTitle: 'Log In',
		loginCss: true
	});
};

module.exports = login;
