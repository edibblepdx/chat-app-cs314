const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getUser, registerUser, loginUser, getProfile } = require ('../controllers/userController');

// middleware
router.use(cors({
    credentials: true
    , origin: 'http://localhost:3000' // react
}));

// GET
router.get('/', getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);

module.exports = router;
