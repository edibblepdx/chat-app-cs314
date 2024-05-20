const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getUser, registerUser } = require ('../controllers/userController');

// middleware
router.use(cors({
    credentials: true
    , origin: 'http://localhost:3000' // react
}));

// GET
router.get('/', getUser);
router.post('/register', registerUser);

/*
// GET a user
router.get('/:id', (req, res) => {
    res.json({msg: 'GET a user'});
});

// POST a new user
router.post('/:id', (req, res) => {
    res.json({msg: 'POST a new user'});
});
*/

module.exports = router;
