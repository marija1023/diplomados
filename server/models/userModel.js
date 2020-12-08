const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true  
    },
    email: {
        type: String,
        required: true  
    },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
