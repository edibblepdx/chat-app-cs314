require('dotenv').config();
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();
const url = BASE_URL || 'http://localhost';

// middleware
app.use(cors({
    credentials: true,
    origin: `${url}:3000` // React app
}));
app.use(express.json());

app.use('/chats', proxy(`${url}:8001`));  // chats
app.use('/user', proxy(`${url}:8002`));   // user

app.listen(8000, () => {
    console.log('Gateway is listening on Port 8000');
})