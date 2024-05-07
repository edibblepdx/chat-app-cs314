const express = require('express');

const router = express.Router();

// GET all chats
router.get('/', (req, res) => {
    res.json({msg: 'GET all chats'});
});

// GET a single chat
router.get('/:id', (req, res) => {
    res.json({msg: 'GET a single chat'});
});

// POST a new chat
router.post('/', (req, res) => {
    res.json({msg: 'POST a new chat'});
});

// DELETE a chat
router.delete('/:d', (req, res) => {
    res.json({msg: 'DELETE a chat'});
});

// UPDATE a new chat
router.patch('/:id', (req, res) => {
    res.json({msg: 'UPDATE a chat'});
});

module.exports = router;