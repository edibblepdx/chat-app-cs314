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

const getUser = (req, res) => {
    res.json({msg: 'GET a user'});
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

const googleAuth = async (req, res) => {
    try {
        const {tokens} = await oAuth2Client.getToken(req.body.code);
        console.log(tokens);
        res.json(tokens);
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

const getProfile = (req, res) => {
    try {
        const {token} = req.cookies;
        if (token) {
            jwt.verify(token, jwtSecret, {}, (err, user) => {
                if (err) throw err;
                res.json(user)
            })
        }
        else {
            res.json(null);
        }
    }
    catch (err) {
        console.error(err);
    }
};

module.exports = {
    getUser
    , registerUser
    , loginUser
    , googleAuth
    , googleRefresh
    , getProfile
};