const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getUser
        , registerUser
        , loginUser
        , googleAuth
        , googleRefresh
        , getProfile 
} = require ('../controllers/userController');

// middleware
router.use(cors({
    credentials: true
    , origin: 'http://localhost:3000' // react
}));

router.get('/', getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);
router.post('/google/refresh-token', googleRefresh);
router.get('/profile', getProfile);

module.exports = router;
