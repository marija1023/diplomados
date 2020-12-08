const mongoose = require('mongoose');
const Room = require('../models/roomModel');

module.exports.createRoom = async (req, res, next) => {
    if (!req.body.name) {
        res.status(400);
        res.send();
      } else {
        try {
          const newRoom = new Room({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            participants: []
          });
    
          await newRoom.save();
    
          res.status(201).json(newRoom);
        } catch (err) {
          next(err);
        }
    }
};

module.exports.getRooms = async (req, res, next) => {
    try {
        rooms = await Room.find({}).exec();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};

module.exports.getRoomByName = async (req, res, next) => {
    try {
        room = await Room.find({name: req.body.name}).exec();
        if(room) {
            res.status(200).json(room);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};

module.exports.deleteRoomById = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id).exec();
    
        if (room) {
          await Room.findByIdAndDelete(req.params.id).exec();
          res.status(200).send();
        } else {
          res.status(404).send();
        }
      } catch (err) {
        next(err);
    }
};

module.exports.roomUpdate = async (req, res, next) => {
  const roomId = req.params.id;
  const action = req.body.action;
  const user = req.body.user;

  try {
    if (action === 'join') {
      await Room.updateOne({ _id: roomId }, { $push: {participants : user} }).exec();
    } else if (action === 'leave') {
      await Room.updateOne({ _id: roomId }, { $pull: {participants : user} }).exec();
    }
    res.status(200).send();
  } catch (err) {
    next(err);
  }
}