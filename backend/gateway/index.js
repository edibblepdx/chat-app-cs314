require('dotenv').config();
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();
const FrontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
const ChatServiceUrl = process.env.CHAT_SERVICE_URL || 'http://localhost:8001';
const UserServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:8002';
const PORT = process.env.PORT || 8000;

// middleware
app.use(cors({
    origin: FrontendUrl, // React app
    credentials: true
}));
app.use(express.json());

app.use('/chats', proxy(ChatServiceUrl));  // chats

app.use('/user', proxy(UserServiceUrl));  // user

app.listen(PORT, () => {
    console.log(`Gateway is listening on Port ${PORT}`);
})
