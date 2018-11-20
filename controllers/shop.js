const Type = require('../models/type');
const Product = require('../models/product');
const { addSalesPrice } = require('../util/helper');

// shop container
const shop = {};

// handle get shop request
shop.getShop = async (req, res) => {
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

	const products = await Product.find();
	// retrieve all products on sale sort by price and limit to 8 results
	const saleProducts = await Product.find({ sale: true })
		.populate('productType')
		.sort('-price')
		.limit(8);
	// add salePrice property
	addSalesPrice(saleProducts);

	// finding if any products are on sale
	const productsOnSale = products.some(p => p.sale === true);

	res.render('shop', {
		pageTitle: 'Shop',
		activeShop: true,
		isOnMainShopPage: true,
		shopCss: true,
		isSignedIn,
		isAdmin,
		cartQty,
		productsOnSale,
		saleProducts
	});
};

// handle get shop product type request
shop.getProductType = async (req, res) => {
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
	try {
		const productTypeObj = await Type.findOne({ _id: req.params.productTypeId });
		const products = await Product.find({
			productType: req.params.productTypeId
		}).populate('productType');

		

		// if product is on sale add new sales price property
		// helper function from util/helper
		addSalesPrice(products);

		const hasProducts = products.length > 0;

		res.render('shop', {
			pageTitle: productTypeObj.type,
			products,
			hasProducts,
			isOnProductTypePage: true,
			activeShop: true,
			isAdmin,
			isSignedIn,
			cartQty,
			shopCss: true
		});
	} catch (err) {
		res.render('404', {
			pageTitle: 'Page Not Found',
			isAdmin,
			isSignedIn,
			cartQty
		});
	}
};

// handle get request for specfic product
shop.getProduct = async (req, res) => {
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
	// debug ----------------------------------------
	const pus = await Product.findOne({ _id : { $iod: '5beb958f7b50c05bf0b9c5d1'} }).populate(
		'productType'
	);

	console.log(pus, req.params.productId)
	// debug -------------------------------------

	try {
		const product = await Product.findOne({ _id: req.params.productId }).populate(
			'productType'
		);

		if (product.sale) {
			product.salePrice = (product.price - product.price * 0.25).toFixed(2);
		}

		res.render('shop', {
			pageTitle: product.name,
			isOnIndividualProductPage: true,
			activeShop: true,
			isAdmin,
			shopCss: true,
			product,
			isSignedIn,
			cartQty
		});
	} catch (err) {
		res.render('404', {
			pageTitle: 'Page Not Found',
			isAdmin,
			isSignedIn,
			cartQty
		});
	}
};

// handle post request by search input
shop.postSearchProduct = async (req, res) => {
	const searchInput = req.body.product.split(' ');
	const searchRegExpArray = searchInput.map(word => new RegExp('.*' + word + '.*', 'i'));

	let isAdmin = false;
	let isSignedIn = false;

	if (req.user) {
		isAdmin = req.user.admin;
		isSignedIn = true
	} 

	try {
		// find products by search word regular expression
		const products = await Product.find({ name: { $in: searchRegExpArray } }).populate(
			'productType'
		);

		// add sales price property if any is on sale
		addSalesPrice(products);

		res.render('shop', {
			pageTitle: req.body.product,
			activeShop: true,
			isOnSearchPage: true,
			shopCss: true,
			isAdmin,
			isSignedIn,
			productFound: products.length > 0,
			products
		});
	} catch (err) {
		res.status(400).render('shop', {
			pageTitle: req.body.product,
			activeShop: true,
			isOnSearchPage: true,
			shopCss: true,
			isAdmin,
			isSignedIn,
			productFound: false
		});
	}
};

module.exports = shop;
