const express = require('express');

const { getOrder, postOrder } = require('../controllers/order');

const router = express.Router();


// handle get request for order
router.get('/', getOrder);

// handle post request for order
router.post('/', postOrder);

module.exports = router;