const User = require('../models/userModel');
const { hashPassword, comparePassword } = require('../helpers/auth');

const getUser = (req, res) => {
    res.json({msg: 'GET a user'});
}

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        // check if username was entered
        if (!username) {
            return res.json({
                error: 'username is required'
            })
        };
        // check if password is good
        if (!password || password.length < 6) {
            return res.json({
                error: 'password must be at least 6 characters long'
            })
        };
        // check email
        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                error: 'email is already in use'
            })
        };

        const hashedPassword = await hashPassword(password);
        // create user in database
        const user = await User.create({
            username
            , email
            , password: hashedPassword
        });

        return res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getUser
    , registerUser
}