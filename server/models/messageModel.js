const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: {
        type: String,
        ref: 'User'
    },
    room: {
        type: String,
        ref: 'Room'
    },
    message: {
        type: String
    },
    date: {
        type: String
    }
});

const messageModel = mongoose.model('message', messageSchema); 

module.exports = messageModel;