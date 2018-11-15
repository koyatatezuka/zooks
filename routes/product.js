const express = require('express');

const {
	getAddProduct,
	postAddProduct,
	postEditProduct,
  postFinishEdit,
  postDeleteProduct
} = require('../controllers/product');

const router = express.Router();

// get request for add product page
router.get('/', getAddProduct);

// post request for add product page
router.post('/', postAddProduct);

// handle post request for editing a product
router.post('/edit-product', postEditProduct);

// handle post request for finishing editing
router.post('/post-edit', postFinishEdit);

// handle post request for deleting product
router.post('/delete-product', postDeleteProduct);

module.exports = router;
