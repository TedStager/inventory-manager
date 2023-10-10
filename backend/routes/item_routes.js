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
		inStock: (req.body.quantity > 0) ? true : false
	});

	try {
		const saveResponse = await newItem.save();
		res.status(200).json(saveResponse);
	}

	catch (error) {
		res.status(400).json({message: error.message});
	}
});