const express = require('express');

const { 
  getShop, 
  getCart, 
  getOrder,
  getProductType 
} = require('../controllers/shop');

const router = express.Router();

// handle shop page request
router.get('/', getShop);

// handle shop request by product type
router.get('/products/:productTypeId', getProductType)

// handle cart page request
router.get('/cart', getCart);

// handle order page request
router.get('/order', getOrder);

module.exports = router;
