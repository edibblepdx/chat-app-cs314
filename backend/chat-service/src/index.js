require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const chatRoutes = require('./routes/chatRoutes');
const events = require('./events/chatEvents');

const PORT = process.env.PORT || 8000;	// PORT
const app = express();					// express app
const server = createServer(app);		// express server
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
	}
});			// socket.io

// middleware
app.use(cors({
	origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
})

// chat routes
app.use('/', chatRoutes);

// socket.io middleware
/*
io.engine.use((req, res, next) => {
  const isHandshake = req._query.sid === undefined;
  if (!isHandshake) {
    return next();
  }

  const header = req.headers["authorization"];

  if (!header) {
    return next(new Error("no token"));
  }

  if (!header.startsWith("bearer ")) {
    return next(new Error("invalid token"));
  }

  const token = header.substring(7);

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return next(new Error("invalid token"));
    }
    req.user = decoded.data;
    next();
  });
});
*/

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


