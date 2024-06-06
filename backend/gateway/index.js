const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

// middleware
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' // React app
}));
app.use(express.json());

app.use('/chats', proxy('http://localhost:8001'));  // chats
app.use('/user', proxy('http://localhost:8002'));   // user

app.listen(8000, () => {
    console.log('Gateway is listening on Port 8000');
})