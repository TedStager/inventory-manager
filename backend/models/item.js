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

	// id of the associated user/store
	userID: {
		required: true,
		type: String,
	},
});

module.exports = mongoose.model('Item', itemSchema, 'items');