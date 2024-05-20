const User = require('../models/userModel');

const getUser = (req, res) => {
    res.json({msg: 'GET a user'});
}

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        // check if name was entered
        if (!name) {
            return res.json({
                error: 'name is required'
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

        const user = await User.create({
            name
            , email
            , password
        })

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