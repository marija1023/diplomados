const express = require('express');
const router = express.Router();
const path = require('path');

const controller = require(path.relative("__dirname", "../controllers/messagesController.js"));

// http://localhost:3000/messages/
// room is in body
router.get('/', controller.getMessagesByRoom);

// http://localhost:3000/messages/
// sender is in body
// router.get('/:senderId', controller.getMessagesFromUserId);

// http://localhost:3000/messages/:id
router.get('/:id', controller.getMessageById);

// http://localhost:3000/messages/
// room and sender are in body
router.get('/', controller.getMessagesFromUserAndRoom);

// http://localhost:3000/messages
// router.get('/', controller.getMessages);

// http://localhost:3000/messages
router.post('/', controller.createMessage);

//http://localhost:3000/messages/:id
router.delete('/:id', controller.deleteMessageById);


module.exports = router;