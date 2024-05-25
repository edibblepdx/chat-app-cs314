require('dotenv').config;
const User = require('../models/userModel');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const { OAuth2Client, UserRefreshClient } = require('google-auth-library');

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
                error: 'name is required'
            }).status(400);
        }
        // check if password is good
        if (!password || password.length < 6) {
            return res.json({
                error: 'password must be at least 6 characters long'
            }).status(400);
        }
        // check email
        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                error: 'email is already in use'
            }).status(409);
        }

        const hashedPassword = await hashPassword(password);
        // create user in database
        const user = await User.create({
            name
            , email
            , password: hashedPassword
        });

        return res.json(user).status(200);
    }
    catch (err) {
        console.log(err);
    }
}

// login endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                error: 'no user found'
            }).status(401);
        }
        // check if passwords match
        const match = await comparePassword(password, user.password);
        if (match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user);
            });
        }
        else {
            return res.json({
                error: 'passwords do not match'
            }).status(401);
        }
    }
    catch (err) {
        console.log(err);
    }
}

const googleAuth = async (req, res) => {
    try {
        const {tokens} = await oAuth2Client.getToken(req.body.code);
        console.log(tokens);
        res.json(tokens);
    }
    catch (err) {
        console.log(err);
    }
}

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
        console.log(err);
    }
}

const getProfile = (req, res) => {
    try {
        const {token} = req.cookies;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
                if (err) throw err;
                res.json(user)
            })
        }
        else {
            res.json(null);
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getUser
    , registerUser
    , loginUser
    , googleAuth
    , googleRefresh
    , getProfile
}