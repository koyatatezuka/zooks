const express = require('express');

const { getCart } = require('../controllers/cart')

const router = express.Router()

// handle cart page request
router.get('/', getCart);


module.exports = router