// home container
const home = {};

// handle get request for home page
home.getHome = (req, res) => {
	res.render('home', {
		pageTitle: 'Zooks',
		activeHome: true,
		homeCss: true
	});
};

module.exports = home;
