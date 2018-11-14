const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 2,
		maxlength: 50,
		trim: true,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		min: 0.01,
		required: true
	},
	description: {
		type: String,
		minlength: 3,
		maxlength: 250,
		trim: true,
		required: true
	},
	sale: {
		type: Boolean,
		required: true
	},
	productType: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Type',
		required: true
	}
});

module.exports = mongoose.model('Product', productSchema);
