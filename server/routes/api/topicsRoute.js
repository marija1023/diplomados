const express = require('express');
const router = express.Router();
const path = require('path');

const controller = require(path.relative("__dirname", "../controllers/topicsController.js"));

// http://localhost:3000/topics/id
router.get('/:id', controller.getTopicById);

// http://localhost:3000/topics
router.get('/', controller.getTopics);

// http://localhost:3000/topics/
router.post('/', controller.createTopic);

module.exports = router;

