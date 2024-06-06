require('dotenv').config;
const User = require('../models/userModel');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const { OAuth2Client, UserRefreshClient } = require('google-auth-library');

const jwtSecret = process.env.JWT_SECRET;
const COOKIE_EXPIRATION_DAYS = 90; // cookie expires in 90 days
const expirationDate = new Date(
    Date.now() + COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000
);
const cookieOptions = {
    expires: expirationDate
    , secure: false
    , httpOnly: true
}
const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID
	, process.env.CLIENT_SECRET
	, process.env.REDIRECT_URL
);

// get a user by email
const getUser = async (req, res) => {
    try {
        const {email} = req.params;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        res.json(user);
    }
    catch (err) {
        console.error(err);
    }
}

// register endpoint
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        // check if name was entered
        if (!name) {
            return res.json({
                status: 400,
                error: 'name is required'
            });
        }
        // check if password is good
        if (!password || password.length < 6) {
            return res.json({
                status: 400,
                error: 'password must be at least 6 characters long'
            });
        }
        // check email
        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                status: 409,
                error: 'email is already in use'
            });
        }

        const hashedPassword = await hashPassword(password);
        // create user in database
        const user = await User.create({
            name
            , email
            , password: hashedPassword
        });

        return res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
    }
};

// login endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                status: 401,
                error: 'no user found'
            });
        }
        // check if passwords match
        const match = await comparePassword(password, user.password);
        if (match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                return res.cookie('token', token).json(user);
            });
        }
        else {
            return res.json({
                status: 401,
                error: 'passwords do not match'
            });
        }
    }
    catch (err) {
        console.error(err);
    }
};

// logout endpoint
const logoutUser = (req, res) => {
    res.clearCookie('token').json({message: 'logged out'});
};

const googleAuth = async (req, res) => {
    try {
        const {tokens} = await oAuth2Client.getToken(req.body.code);
        console.log(tokens);
        return res.cookie('token', tokens.access_token).json(tokens);
    }
    catch (err) {
        console.error(err);
    }
};

const googleRefresh = async (req, res) => {
    try {
        const user = new UserRefreshClient(
            clientId
            , clientSecret
            , req.body.refreshToken
        );
        const {credentials} = await user.refreshAccessToken();
        res.json(credentials);
    }
    catch (err) {
        console.error(err);
    }
};

const getProfile = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (token) {
            const user = jwt.verify(token, jwtSecret);
            if (!user) {
                return res.status(404).json({ error: 'user not found' });
            }
            return res.json(user);
        } else {
            return res.json(null);
        }
    } catch (err) {
        console.error(err);
    }
};

// search for users by email
const searchUsers = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const regex = new RegExp(searchTerm, 'i');

        const users = await User.find({ email: { $regex: regex } }).limit(5);

        res.json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'server error' });
    }
};

module.exports = {
    getUser
    , registerUser
    , loginUser
    , logoutUser
    , googleAuth
    , googleRefresh
    , getProfile
    , searchUsers
};