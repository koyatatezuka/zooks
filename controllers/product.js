const Product = require('../models/product');
const Type = require('../models/type');

// product container
const product = {};

// handle get request
product.getAddProduct = (req, res) => {
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

	if (isAdmin) {
		res.render('product', {
			pageTitle: 'Add Product',
			activeAddProduct: true,
			productCss: true,
			isAdmin,
			isSignedIn,
			cartQty
		});
	} else {
		res.status(401).render('401', {
			pageTitle: 'Unauthorized'
		});
	}
};

// handle post request for adding product
product.postAddProduct = async (req, res) => {
	const productType = await Type.findOne({ _id: req.body.type });

	const sale = req.body.sale === 'yes' ? true : false;

	const product = new Product({
		name: req.body.name,
		imageUrl: req.body.imageUrl,
		price: req.body.price,
		description: req.body.description,
		productType,
		sale
	});

	product
		.save()
		.then(result => {
			res.redirect('/shop');
		})
		.catch(err => {
			console.log(err);
		});
};

// handle post request for getting all input info on edit
product.postEditProduct = async (req, res) => {
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

	const product = await Product.findOne({ _id: req.body.productId }).populate(
		'productType'
	);

	const onSale = product.sale ? true : false;
	const notOnSale = product.sale ? false : true;

	let books = false,
		home = false,
		electronics = false,
		clothing = false,
		toys = false,
		movies = false,
		sports = false;

	// auto fill which type of product is being edited
	switch (product.productType.type) {
		case 'Books':
			books = true;
			break;
		case 'Home, Garden & Tools':
			home = true;
			break;
		case 'Electronics':
			electronics = true;
			break;
		case 'Clothing':
			clothing = true;
			break;
		case 'Toys, Kids & Baby':
			toys = true;
			break;
		case 'Movies, Music & Games':
			movies = true;
			break;
		case 'Sports & Outdoors':
			sports = true;
			break;
		default:
			break;
	}

	if (isAdmin) {
		res.render('product', {
			editing: true,
			pageTitle: 'Edit Product',
			activeAddProduct: true,
			productCss: true,
			isSignedIn,
			isAdmin,
			cartQty,
			onSale,
			notOnSale,
			product,
			books,
			home,
			electronics,
			clothing,
			toys,
			movies,
			sports
		});
	} else {
		res.status(401).render('401', {
			pageTitle: 'Unauthorized'
		});
	}
	
};

// handle posting the finish edited product
product.postFinishEdit = async (req, res) => {
	const productType = await Type.findOne({ _id: req.body.type });

	const sale = req.body.sale === 'yes' ? true : false;

	const updatedProduct = await Product.findOneAndUpdate(
		{ _id: req.body._id },
		{
			name: req.body.name,
			imageUrl: req.body.imageUrl,
			price: req.body.price,
			description: req.body.description,
			productType,
			sale
		}
	);

	res.redirect('/shop');
};

product.postDeleteProduct = async (req, res) => {
	const deletedProduct = await Product.findOneAndDelete({ _id: req.body.productId });

	res.redirect('/shop');
};

module.exports = product;
