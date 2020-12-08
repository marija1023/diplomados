const mongoose = require('mongoose');
const Category = require('./categoryModel');

const topicSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true  
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category'
    }
    
});

const topicModel = mongoose.model('topic', topicSchema);

module.exports = topicModel;
