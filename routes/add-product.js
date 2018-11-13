const express = require('express');

const { getAddProduct, postAddProduct } = require('../controllers/product');

const router = express.Router();

// get request for add product page
router.get('/', getAddProduct);

// post request for add product page
router.post('/', postAddProduct);

module.exports = router;
