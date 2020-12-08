const mongoose = require('mongoose');
const Topic = require('../models/topicModel');
const Post = require('../models/postModel');


module.exports.getTopics = async (req, res, next) => {
  try {
    const topics = await Topic.aggregate([
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'topicId',
          as: 'topicPosts'
        }
      }
    ]).exec();
    res.status(200).json(topics);
  } catch (err) {
    next(err);
  }
};
  
  
module.exports.getTopicById = async (req, res, next) => {
  try {
    const topic = await Topic.findById(req.params.id).exec();
    if (topic) {
      res.status(200);
      res.json(topic);
    } else {
      res.status(404);
      res.send();
    }
  } catch (err) {
    next(err);
  }
};

module.exports.createTopic = async (req, res, next) => {
  if (!req.body.name || !req.body.categoryId) {
    res.status(400);
    res.send();
  } else {
    try {
      const newTopic = new Topic({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        categoryId: req.body.categoryId
      });

      await newTopic.save();

      res.status(201).json(newTopic);
    } catch (err) {
      next(err);
    }
  }
};