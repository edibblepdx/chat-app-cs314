const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    }, 
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);