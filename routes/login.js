const express = require('express');
const passport = require('passport');

const User = require('../models/user');
const {
	getSignIn,
	postSignIn,
	getLogOut,
	getRegister,
	postRegister,
	getFailedSignIn
} = require('../controllers/login');

const router = express.Router();

// handle get request for login page
router.get('/', getSignIn);

// handle failed attempt login page
router.get('/failed', getFailedSignIn);

// handle post for login page
router.post('/in', postSignIn);

// handle log out
router.get('/out', getLogOut);

// handle get register page
router.get('/register', getRegister);

// handle post new user
router.post('/register', postRegister);

module.exports = router;
