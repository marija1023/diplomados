const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true
    },
    participants: {
        type: Array,
    }
});

const roomModel = mongoose.model('room', roomSchema);

module.exports = roomModel;