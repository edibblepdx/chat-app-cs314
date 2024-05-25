//const User = require('../models/userModel');
//const jwt = require('jsonwebtoken');

const getChats = async (req, res) => {
    res.json({msg: 'GET all chats'});
}

module.exports = {
    getChats
}