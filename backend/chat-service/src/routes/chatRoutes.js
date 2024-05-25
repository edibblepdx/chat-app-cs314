const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getChats } = require ('../controllers/chatController');

// middleware
router.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' // React app
}));

// GET all chats
router.get('/', getChats);

// GET a single chat
router.get('/:id', (req, res) => {
    res.json({msg: 'GET a single chat'});
});

// POST a new chat
router.post('/', (req, res) => {
    res.json({msg: 'POST a new chat'});
});

// DELETE a chat
router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE a chat'});
});

// UPDATE a new chat
router.patch('/:id', (req, res) => {
    res.json({msg: 'UPDATE a chat'});
});

module.exports = router;