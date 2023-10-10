const express = require('express');

const router = express.Router();
module.exports = router;

const User = require('../models/user');

// Add user
router.post('/users', async (req, res) => {
	console.log("Request for new user:");
	console.log(req.body);

	const newUser = new User({
		username: req.body.username,
		businessName: req.body.businessName,
		password: req.body.password,
	});

	try {
		const saveResponse = await newUser.save();
		res.status(200).json(saveResponse);
	}

	catch (error) {
		res.status(400).json({message: error.message});
	}
});