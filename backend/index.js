require('dotenv').config();

//const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const Message = require('./models/message');
const chatRoutes = require('./routes/chats');

// PORT
const PORT = process.env.PORT || 5000;
// express app
const app = express();
// express server
const server = createServer(app);
// socket io
const io = new Server(server);
// cross origin resource sharing
app.use(cors());

// middleware
app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
})

app.use('/chats', chatRoutes);

/*
app.get('/', (req, res) => {
	// root route http://localhost:5000/
	// res.send('Hello World');
	res.sendFile(join(__dirname, 'index.html'));
});
*/

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
	console.log('message: ' + msg);	
  	io.emit('chat message', msg);
	// save message document to database
	try {
		const message = Message({message: msg});
		message.save();
	} catch (err) {
		console.log(err.message)	
	}
  });
  socket.on('disconnect', () => {
	console.log('user disconnected');
  });
});

// connect to database
mongoose.connect(process.env.URI)
	.then(() => {
		// start the Express server
		server.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err)
	})



