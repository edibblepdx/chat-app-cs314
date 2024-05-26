const express = require('express');
const router = express.Router();
const cors = require('cors');
const authenticateToken = require('../middleware/authenticateToken');
const { getAvailableChats
        , getSpecificChat
        , createChat
        , deleteChat
        , addUserToChat
        , removeUserFromChat
 } = require ('../controllers/chatController');

// middleware
router.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' // React app
}));

// GET get all available chats
router.get('/', authenticateToken, getAvailableChats);

// GET get a specific chat
router.get('/:chatId', authenticateToken, getSpecificChat);

// POST create a new chat room
router.post('/', authenticateToken, createChat);

// DELETE delete a specific chat room
router.delete('/:chatId', authenticateToken, deleteChat);

// POST add a new user to a chat
router.post('/:chatId/join', authenticateToken, addUserToChat);

// POST add a new user to a chat
router.post('/:chatId/leave', authenticateToken, removeUserFromChat);

module.exports = router;