const mongoose = require('mongoose');
const Category = require('../models/categoryModel');


module.exports.getCategories = async (req, res, next) => {
    try {
      const categories = await Category.aggregate([
        {
          $lookup: {
            from: 'topics',
            localField: '_id',
            foreignField: 'categoryId',
            as: 'categoryTopics'
          }
        }, 
        
        {
          $unwind: {
            path: "$categoryTopics",
            preserveNullAndEmptyArrays: true
          }
        }, 
        
        {
          $lookup: {
            from: "posts",
            localField: "categoryTopics._id",
            foreignField: "topicId",
            as: "categoryTopics.topicPosts",
          }
        }, 
        {
          $group: {
            _id : "$_id",
            name: { $first: "$name" },
            categoryTopics: { $push: "$categoryTopics" }
          }
        }
      ]).exec();

      categories.forEach( category => {
        category.categoryTopics.forEach( topic => {
          topic.topicPosts = Object.keys(topic.topicPosts).length;
        });
      });

      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  };
  
  
  module.exports.getCategoryById = async (req, res, next) => {
    try {
      const category = await Category.findById(req.params.id).exec();
      if (category) {
        res.status(200);
        res.json(category);
      } else {
        res.status(404);
        res.send();
      }
    } catch (err) {
      next(err);
    }
  };


  module.exports.createCategory = async (req, res, next) => {
    if (!req.body.name) {
      res.status(400);
      res.send();
    } else {
      try {
        const newCategory = new Category({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
        });
  
        await newCategory.save();
  
        res.status(201).json(newCategory);
      } catch (err) {
        next(err);
      }
    }
  };