const express = require('express');
const router = express.Router();
const path = require('path');

const controller = require(path.relative("__dirname", "../controllers/roomsController.js"));

// http://localhost:5000/rooms
router.post('/', controller.createRoom);

// http://localhost:5000/rooms
router.get('/', controller.getRooms);

// http://localhost:5000/rooms
router.get('/', controller.getRoomByName);

// http://localhost:5000/rooms/id
router.delete('/:id', controller.deleteRoomById);

// http://localhost:5000/rooms/id
router.patch('/:id', controller.roomUpdate);

module.exports = router;