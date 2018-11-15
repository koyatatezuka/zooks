const express = require('express');

const { getOrder } = require('../controllers/order');

const router = express.Router();

router.get('/', getOrder);

module.exports = router;