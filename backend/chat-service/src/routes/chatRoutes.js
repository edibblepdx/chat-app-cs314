const express = require('express');
const router = express.Router();
const cors = require('cors');
const authenticateToken = require('../middleware/authenticateToken');
const { getAvailableChats
        , getSpecificChat
        , createChat
        , deleteChat
        , sendMessage
        , getMessages
        , addUserToChat
        , removeUserFromChat
        , getUsers
 } = require ('../controllers/chatController');

// middleware
router.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' // React app
}));

router.get('/', authenticateToken, getAvailableChats);                  // GET get all available chats for a user
router.get('/:chatId', authenticateToken, getSpecificChat);             // GET get a specific chat
router.post('/', authenticateToken, createChat);                        // POST create a new chat room
router.delete('/:chatId', authenticateToken, deleteChat);               // DELETE delete a specific chat room
router.post('/:chatId/messages', authenticateToken, sendMessage);       // POST send a message
router.get('/:chatId/messages', authenticateToken, getMessages);        // GET get messages
router.post('/:chatId/join', authenticateToken, addUserToChat);         // POST add a new user to a chat
router.post('/:chatId/leave', authenticateToken, removeUserFromChat);   // POST add a new user to a chat
router.get('/:chatId/users', authenticateToken, getUsers);              // GET get users in a chat

module.exports = router;