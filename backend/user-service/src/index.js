require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
//const rabbitMQService = require('./services/rabbitMQService');

const URL = process.env.BASE_URL || 'http://localhost';
const FrontendUrl = process.env.FRONTEND_URL || 'http://localhost';
const PORT = process.env.PORT || 8000;	// PORT
const app = express();					// express app

// middleware
app.use(cors({
	origin: FrontendUrl,
	credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// user routes
app.use('/', authRoutes);

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

/*
// initialize rabbitMQ client
const initializeRabbitMQClient = async () => {
	try {
		await rabbitMQService.init();
		console.log("RabbitMQ client initialized and listening for messages.");
	} catch (err) {
		console.error("Failed to initialize RabbitMQ client:", err);
	}
};

initializeRabbitMQClient();
*/
