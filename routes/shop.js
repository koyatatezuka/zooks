const express = require('express');

const { 
  getShop, 
  getProductType,
  getProduct,
  postSearchProduct 
} = require('../controllers/shop');

const router = express.Router();

// handle shop page request
router.get('/', getShop);

// handle shop request by product type
router.get('/products/:productTypeId', getProductType);

// handle get request by product
router.get('/product/:productId', getProduct)

// handle post request by product search
router.post('/search', postSearchProduct)

module.exports = router;
