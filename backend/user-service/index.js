require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 8000;	// PORT
const app = express();					// express app

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// user routes
app.use('/', userRoutes);

// connect to database
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('connected to database')
		// start the Express server
		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err)
	});


