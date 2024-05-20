const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String
    , email: {
        type: String,
        unique: true
    }
    , password: String
});

module.exports = mongoose.model('User', userSchema);