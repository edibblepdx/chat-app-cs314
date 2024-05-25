require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');

const Message = require('./models/messageModel');
const chatRoutes = require('./routes/chatRoutes');

const PORT = process.env.PORT || 8000;	// PORT
const app = express();					// express app
const server = createServer(app);		// express server
const io = new Server(server);			// socket.io

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
})

// chat routes
app.use('/', chatRoutes);

// socket.io
io.on('connection', (socket) => {
	// user connect
  	console.log('a user connected');
	// on a message run a callback function to...
	socket.on('chat message', (msg) => {
		// print the message to the console
		console.log('message: ' + msg);	
		// emit the message to all users
		io.emit('chat message', msg);
		try {
			// save the message to the database
			const message = Message({message: msg});
			message.save();
		} catch (err) {
			console.log(err.message)	
		}
	});
	// user disconnect
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

// connect to database
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('connected to database')
		// start the Express server
		server.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err)
	});


