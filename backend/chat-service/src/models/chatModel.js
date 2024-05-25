const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);