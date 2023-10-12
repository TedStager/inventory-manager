const express = require('express');

const router = express.Router();
module.exports = router;

const Item = require('../models/item');

// Add item
router.post('/items', async (req, res) => {
	console.log("Request for new item:");
	console.log(req.body);

	const newItem = new Item({
		name: req.body.name,
		quantity: req.body.quantity,
		inStock: (req.body.quantity > 0) ? true : false,
		userID: req.body.userID
	});

	try {
		const saveResponse = await newItem.save();
		res.status(200).json(saveResponse);
	}

	catch (error) {
		res.status(400).json({message: error.message});
	}
});

// Get all items (by user ID)
router.get('/items', async (req, res) => {
	console.log("Request for all items:");
	console.log(req.headers);

	const currentUser = req.headers.userid;

	try {
		const items = await Item.find({userID: currentUser}).exec();
		res.status(200).json(items);
	}

	catch (error) {
		res.status(500).json({message: error.message});
	}
})

// Update quantity of item
router.patch('/items', async (req, res) => {
	console.log("Request to patch item:");
	console.log(req.body);

	try {
		const id = req.body.id;
		const oldItem = await Item.findById(id);

		const newQuant = oldItem.quantity - req.body.numSold;
		const newInStock = (newQuant > 0) ? true : false;

		const result = await Item.findOneAndUpdate(
			{_id: id}, {quantity: newQuant, inStock: newInStock}, {new: true}
		);

		res.send(result);
	}

	catch (error) {
		res.status(500).json({message: error.message});
	}
})