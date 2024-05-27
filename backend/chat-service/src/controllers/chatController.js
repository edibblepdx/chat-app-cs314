const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');

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

const addUserToChat = async (req, res) => {
    try {
       
    }
    catch (err) {
        console.error(err);
    }
}

const removeUserFromChat = async (req, res) => {
    try {
       
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
}