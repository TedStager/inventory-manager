const express = require('express');

const router = express.Router();
module.exports = router;

const User = require('../models/user');

// Add user
router.post('/users', async (req, res) => {
	console.log("Request for new user:");
	console.log(req.body);

	// make sure username isn't taken
	const users = await User.find({username: req.body.username}).exec();
	if (users.length != 0) {
		res.status(409).json({message: "Error: username already taken."});
		return;
	}

	try {

		const newUser = new User({
			username: req.body.username,
			businessName: req.body.businessName,
			password: req.body.password,
		});

		const saveResponse = await newUser.save();
		res.status(200).json(saveResponse);
	}

	catch (error) {
		res.status(400).json({message: error.message});
	}
});

// User login
router.get('/users', async (req, res) => {
	console.log("Request to authenticate user:");
	console.log(req.body);

	const login_username = req.body.username;
	const login_pass = req.body.password;

	// get user from db
	const users = await User.find({username: login_username}).exec();
	user = users[0]; // usernames should be unique
	console.log(user);

	if (user.password === login_pass) {
		res.status(200).json({
			auth: true,
			userID: user.id
		});
	}
	else {
		res.status(401).json({
			auth: false,
			userID: null
		});
	}
});