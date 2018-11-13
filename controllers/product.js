const Product = require('../models/product');
const Type = require('../models/type');

// product container
const product = {};

// handle get request
product.getAddProduct = (req, res) => {
	res.render('product', {
		pageTitle: 'Add Product',
		activeAddProduct: true,
		productCss: true
	});
};

product.postAddProduct = async (req, res) => {
	const productType = await Type.findOne({ _id: req.body.type });

	const name = req.body.name;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const sale = req.body.sale === 'yes' ? true : false;

	const product = new Product({
		name,
		imageUrl,
		price,
		description,
		productType,
		sale
	});

	product
		.save()
		.then(result => {
			console.log('Added Product', result);
			res.redirect('/shop');
		})
		.catch(err => {
			console.log(err);
		});
};

module.exports = product;
