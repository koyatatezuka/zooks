const express = require('express');

const { getSignIn } = require('../controllers/login');

const router = express.Router();

router.get('/in', getSignIn)

module.exports = router;