const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Post = require('../models/postModel');

module.exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).exec();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

module.exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).exec();
    if (post) {
      res.status(200);
      res.json(post);
    } else {
      res.status(404);
      res.send();
    }
  } catch (err) {
    next(err);
  }
};


module.exports.createPost = async (req, res, next) => {
  if (!req.body.content || !req.body.topicId || !req.body.username) {
    res.status(400);
    res.send();
  } else {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const token = bearer[1];

      try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      } catch(error) {
        res.sendStatus(403);
      }

      try {
        curr_date = new Date();
        const newPost = new Post({
          _id: new mongoose.Types.ObjectId(),
          content: req.body.content,
          topicId: req.body.topicId,
          username: req.body.username,
          date: curr_date.toUTCString(),
          likes: [],
        });

        await newPost.save();

        res.status(201).json(newPost);
      } catch (error) {
        next(err);
      }
    } else {
      res.sendStatus(403);
    }
  }
};

module.exports.getPostsByTopicId = async (req, res, next) => {
  try {
    const posts = await Post.find({topicId: req.params.topicId}).exec();
    if (posts) {
      res.status(200);
      res.json(posts);
    } else {
      res.status(404);
      res.send();
    }
  } catch (err) {
    next(err);
  }
};

module.exports.deletePostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).exec();

    if (post) {
      await Post.findByIdAndDelete(req.params.id).exec();
      res.status(200).send();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};

module.exports.updatePostById = async (req, res, next) => {
  const postId = req.params.id;
  const action = req.body.action;
  const username = req.body.username;

  try {
    if (action === 'like') {
      await Post.updateOne({ _id: postId }, { $push: {likes : username} }).exec();
    } else {
      await Post.updateOne({ _id: postId }, { $pull: {likes : username} }).exec();
    }
    res.status(200).send();
  } catch (err) {
    next(err);
  }
};



