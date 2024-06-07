const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getUser
        , registerUser
        , loginUser
        , logoutUser
        , googleAuth
        , googleRefresh
        , getProfile 
        , searchUsers
} = require ('../controllers/authController');

// middleware
router.use(cors({
    credentials: true, 
    origin: 'http://localhost:3000' // react
}));

router.post('/register', registerUser);                                 // POST register a new user
router.post('/login', loginUser);                                       // POST login a user
router.post('/logout', logoutUser);                                     // POST logout a user
router.post('/google', googleAuth);                                     // POST login with google
router.post('/google/refresh-token', googleRefresh);                    // POST refresh google token
router.get('/profile', getProfile);                                     // GET get user profile
router.get('/find', searchUsers);                                       // GET search for users by email
router.get('/:userId', getUser);                                        // GET get a user by id -- KEEP THIS LAST!

module.exports = router;
