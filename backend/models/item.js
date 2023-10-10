const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String,
	},

	inStock: {
		required: true,
		type: Boolean,
	},

	quantity: {
		required: true,
		type: Number
	},
});

module.exports = mongoose.model('Item', itemSchema, 'items');