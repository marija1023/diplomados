const express = require('express');
const router = express.Router();
const path = require('path');

const controller = require(path.relative("__dirname", "../controllers/postsController.js"));

// http://localhost:3000/posts/:topicId
router.get('/:topicId', controller.getPostsByTopicId);

// http://localhost:3000/posts/id
router.get('/:id', controller.getPostById);

// http://localhost:3000/posts
router.get('/', controller.getPosts);

// http://localhost:3000/posts/
router.post('/', controller.createPost);

// http://localhost:3000/posts/:id
router.delete('/:id', controller.deletePostById);

// http:localhost:3000/posts/:id
router.patch('/:id', controller.updatePostById);

module.exports = router;