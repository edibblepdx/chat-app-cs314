const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: true
    }]
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);