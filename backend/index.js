require('dotenv').config();

//const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
//const records = require ('./routes/record.js');
const { MongoClient, ServerApiVersion } = require('mongodb');

// import authRoutes from './routes/auth.routes.js';

// PORT
const PORT = process.env.PORT || 5000;
// express app
const app = express();
// express server
const server = createServer(app);
// socket io
const io = new Server(server);

app.use(cors());

// middleware
app.use(express.json());
//app.use('/record', records);

app.get('/', (req, res) => {
	// root route http://localhost:5000/
	// res.send('Hello World');
	res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

// routes
// app.use('api/auth', authRoutes)

// connect to database
mongoose.connect(process.env.URI)
	.then(() => {
		// start the Express server
		server.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error)
	})



