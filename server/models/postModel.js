const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content: {
        type: String,
        required: true,
        unique: true  
    },
    topicId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Topic'
    },
    username: {
        type: String,
        ref: 'User'
    },
    date: {
        type: String
    },
    likes: {
        type: Array,
    }
});

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;