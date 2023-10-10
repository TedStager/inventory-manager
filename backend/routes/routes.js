const express = require('express');
const Model = require('../model/model');

const router = express.Router();
module.exports = router;

// methods

// POST to db
router.post('/post', async (req, res) => {
	console.log(req.body);

	const data = new Model({
		name: req.body.name,
		age: req.body.age,
	});

	try {
		const dataToSave = await data.save();
		res.status(200).json(dataToSave);
	}

	catch (error) {
		res.status(400).json({message: error.message});
	}
});

// get all db
router.get('/getAll', (req, res) => {
	res.send('Get all db data');
});

// get by ID
router.get('/getOne/:id', (req, res) => {
	res.send(req.params.id);
});

// update by ID
router.patch('/update/:id', (req, res) => {
	res.send('Update by ID');
});

// delete by ID
router.delete('/delete/:id', (req, res) => {
	res.send('Delete by ID');
});