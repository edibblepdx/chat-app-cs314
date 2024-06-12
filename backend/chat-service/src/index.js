require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const chatRoutes = require('./routes/chatRoutes');
const events = require('./events/chatEvents');

const FrontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
const PORT = process.env.PORT || 8000;	// PORT
const app = express();					// express app
const server = createServer(app);		// express server
const io = new Server(server, {
	cors: {
		origin: FrontendUrl,
		credentials: true
	},
});			// socket.io

// middleware
app.use(cors({
	origin: FrontendUrl,
	credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
})

// chat routes
app.use('/', chatRoutes);

// auth middleware
io.use((socket, next) => {
  const { id, email, name } = socket.handshake.auth;
  if (!id) {
    return next(new Error('invalid id'));
  }
  if (!email) {
    return next(new Error('invalid email'));
  }
  if (!name) {
    return next(new Error('invalid name'));
  }
  // set user
  socket.user = {id, email, name};
  next();
});

// socket.io events
events(io);

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


