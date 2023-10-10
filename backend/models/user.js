const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		required: true,
		type: String,
	},

	businessName: {
		required: true,
		type: String,
	},

	// TODO: add password hashing
	password: { 
		required: true,
		type: String,
	},
});

module.exports = mongoose.model('User', userSchema, 'users');