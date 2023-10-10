const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();
const mongoString = process.env.DATABASE_URL;

app.use(express.json());
app.use('/api', routes);

app.listen(3000, () => {
	console.log("Server started at ${3000}");
});

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
	console.log(error);
});

database.once('connected', () => {
	console.log("Database connected!");
});

