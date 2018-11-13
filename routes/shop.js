const express = require('express');

const { getShop, getCart, getOrder } = require('../controllers/shop');

const router = express.Router();

// handle shop page request
router.get('/', getShop);

// handle cart page request
router.get('/cart', getCart);

// handle order page request
router.get('/order', getOrder);

module.exports = router;
