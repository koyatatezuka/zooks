const Type = require('../models/type');
const Product = require('../models/product');
const { addSalesPrice } = require('../util/helper');

// shop container
const shop = {};

// handle get shop request
shop.getShop = async (req, res) => {
	const products = await Product.find();
	// retrieve all products on sale sort by price and limit to 8 results
	const saleProducts = await Product
	.find({ sale: true })
	.populate('productType')
	.sort('-price')
	.limit(8)
	// add salePrice property
	addSalesPrice(saleProducts)

	// finding if any products are on sale
	const productsOnSale = products.some(p => p.sale === true);

	res.render('shop', {
		pageTitle: 'Shop',
		activeShop: true,
		isOnMainShopPage: true,
		shopCss: true,
		productsOnSale,
		saleProducts
	});
};

// handle get shop product type request
shop.getProductType = async (req, res) => {
	try {
		const productTypeObj = await Type.findOne({ _id: req.params.productTypeId });
		const products = await Product.find({
			productType: req.params.productTypeId
		}).populate('productType');

		// if product is on sale add new sales price property
		// helper function from util/helper
		addSalesPrice(products)
		
		const hasProducts = products.length > 0;

		res.render('shop', {
			pageTitle: productTypeObj.type,
			products,
			hasProducts,
			isOnProductTypePage: true,
			activeShop: true,
			shopCss: true
		});
	} catch (err) {
		res.render('404', { pageTitle: 'Page Not Found' });
	}
};

// handle get cart request
shop.getCart = (req, res) => {
	res.render('cart', {
		pageTitle: 'Cart',
		activeCart: true,
		cartCss: true
	});
};

// handle get order request
shop.getOrder = (req, res) => {
	res.render('order', {
		pageTitle: 'Order',
		activeOrder: true,
		orderCss: true
	});
};

module.exports = shop;
