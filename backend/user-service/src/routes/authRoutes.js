const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getUser
        , registerUser
        , loginUser
        , googleAuth
        , googleRefresh
        , getProfile 
} = require ('../controllers/authController');

// middleware
router.use(cors({
    credentials: true
    , origin: 'http://localhost:3000' // react
}));

router.get('/:email', getUser);                         // GET get a user by email
router.post('/register', registerUser);                 // POST register a new user
router.post('/login', loginUser);                       // POST login a user
//router.post('/logout', logoutUser);                   // POST logout a user
router.post('/google', googleAuth);                     // POST login with google
router.post('/google/refresh-token', googleRefresh);    // POST refresh google token
router.get('/profile', getProfile);                     // GET get user profile

module.exports = router;
