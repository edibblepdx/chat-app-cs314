const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const axios = require('axios');

// get all chats available to a user
const getAvailableChats = async (req, res) => {
    try {
        const { _id } = req.user;
        const chats = await Chat.find({ users: _id });
        res.json(chats);
    }
    catch (err) {
        console.error(err);
    }
}

// get a specific chat by id
const getSpecificChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        res.json(chat);
    }
    catch (err) {
        console.error(err);
    }
}

// create a chat
const createChat = async (req, res) => {
    try {
        const { name } = req.body;
        const { _id } = req.user;

        if (!name) {
            return res.json({error: 'chat name is required'});
        }
        const chat = new Chat({
            name: name,
            users: [_id],
            admin: _id,
            messages: []
        })
        await chat.save();
        res.json(chat);
    }
    catch (err) {
        console.error(err);
    }
}

// delete a chat as an admin
const deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { userId } = req.user;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        if (chat.admin !== userId) {
            return res.status(403).json({ error: 'You are not the admin of this chat' });
        }
        res.json(chat); 
    }
    catch (err) {
        console.error(err);
    }
}

// send a message to a chat
const sendMessage = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { message } = req.body;
        const { _id } = req.user;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        const newMessage = new Message({
            message: message,
            user: _id
        });
        await newMessage.save();
        chat.messages.push(newMessage);
        await chat.save();
        res.json(newMessage); 
    }
    catch (err) {
        console.error(err);
    }
}

// get all chat messages
const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        const messages = await Message.find({ _id: { $in: chat.messages } });
        res.json(messages);
    }
    catch (err) {
        console.error(err);
    }
}

// add a user to a chat by email as an admin
const addUserToChat = async (req, res) => {
    try {
        const { chatId } = req.params;      // chat to add user to
        const { _id } = req.user;           // current user
        const { userEmail } = req.body;     // user to add
        // find chat by id
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        // find user by email
        const user = await axios.get(`http://localhost:8002/${userEmail}`);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // extract user id from user object
        const userId = user._id; 
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }
        if (chat.admin !== _id) {
            return res.status(403).json({ error: 'You are not the admin of this chat' });
        }
        // add user to chat
        chat.users.push(userId);
        await chat.save();
        res.json(chat);
    }
    catch (err) {
        console.error(err);
    }
}

// cases:
// user leaves themselves
// admin removes user
// admin leaves chat (should not allow)
const removeUserFromChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { _id } = req.user;
        const { userId } = req.body;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }
        if (chat.admin !== _id) {
            return res.status(403).json({ error: 'You are not the admin of this chat' });
        }
        const userIndex = chat.users.indexOf(userId);  
        if (userIndex === -1) {
            return res.status(400).json({ error: 'User not found in chat' });
        }
        chat.users.splice(userIndex, 1);
        await chat.save();
        res.json(chat);
    }
    catch (err) {
        console.error(err);
    }
}

// return the users in a chat
const getUsers = async (req, res) => {
    try {
        const { chatId } = req.params;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        res.json(chat.users);
    }
    catch (err) {
        console.error(err);
    }
}

module.exports = {
    getAvailableChats
    , getSpecificChat
    , createChat
    , deleteChat
    , sendMessage
    , getMessages
    , addUserToChat
    , removeUserFromChat
    , getUsers
}