const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	address: {
		street: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		state: {
			type: String,
			required: true
		},
		zip: {
			type: Number,
			required: true
		}
	},
	password: {
		type: String,
		required: true
	},
	admin: {
		type: Boolean,
		default: false,
		required: true
	},
	cart: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true
			},
			quantity: {
				type: Number,
				required: true
			},
			total: {
				type: Number,
				required: true
			}
		}
	]
});

userSchema.methods.addToCart = async function(product) {
  // find if product exist by product id
	const cartProductIndex = this.cart.findIndex(cp => {
		return cp.productId.toString() === product._id.toString();
  });

	let newQuantity = 1;
	let price = product.price;
	// if product of sale change to sale price
	if (product.sale) {
		price = parseInt((product.price - (product.price * .25)).toFixed(2))
	}

  // copy cart array into updated array
	const updatedCartItems = [...this.cart];

  // if product exist in cart update quantity and price
	if (cartProductIndex > -1) {
		newQuantity = this.cart[cartProductIndex].quantity + 1;
		updatedCartItems[cartProductIndex].quantity = newQuantity;
		this.cart[cartProductIndex].total += price;
	} else {
		// if product isnt in cart add product to cart
		updatedCartItems.push({
			productId: product._id,
			quantity: newQuantity,
			total: price
		});
  }
  
  // save updated cart to user
  
  this.cart = updatedCartItems;

	return this.save();
};

userSchema.methods.removeFromCart = function(cartItemId) {
	const updatedCartItems = this.cart.filter(item => {
		return item._id.toString() !== cartItemId.toString();
	});
	this.cart = updatedCartItems;
	return this.save();
};

userSchema.methods.clearCart = function() {
	this.cart = [];
	return this.save();
};

module.exports = mongoose.model('User', userSchema);
