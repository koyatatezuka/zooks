const express = require('express');

const { 
  getCart, 
  postCart,
  postDeleteProduct
 } = require('../controllers/cart')

const router = express.Router()

// handle cart page request
router.get('/', getCart);

// handle cart post
router.post('/', postCart);

// handle delete product from cart
router.post('/delete', postDeleteProduct)

module.exports = router