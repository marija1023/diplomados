const mongoose = require('mongoose');
const Message = require('../models/messageModel');

module.exports.createMessage = async (req, res, next) => {
    if(!req.body.message || !req.body.room || !req.body.sender) {
        res.status(400);
        res.send();
    } else {
        try{
            curr_date = new Date();
            const newMessage = new Message({
                _id: new mongoose.Types.ObjectId(),
                sender: req.body.sender,
                room: req.body.room,
                message: req.body.message,
                date: curr_date.toUTCString()
            });

            await newMessage.save();

            res.status(201).json(newMessage);
        } catch (err) {
            next(err);
        }
    }
};

module.exports.getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find({}).exec();
        res.status(200).json(messages);
    } catch (err) {
        next(err);
    }
};

module.exports.getMessagesByRoom = async (req, res, next) => {
    try {
        const messages = await Message.find({room: req.body.room}).exec();
        if(messages) {
            res.status(200).json(messages);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
}

module.exports.getMessagesFromUser = async (req, res, next) => {
    try {
        const messages = await Message.find({sender: req.body.sender}).exec();
        if(messages) {
            res.status(200).json(messages);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};

module.exports.getMessagesFromUserAndRoom = async (req, res, next) => {
    try {
        const messages = await Message.find({sender: req.body.sender, room: req.body.room}).exec();
        if(messages) {
            res.status(200).json(messages);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};

module.exports.getMessageById = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.id).exec();
        if(message) {
            res.status(200).json(message);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};

module.exports.deleteMessageById = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.id).exec();
    
        if (message) {
          await Message.findByIdAndDelete(req.params.id).exec();
          res.status(200).send();
        } else {
          res.status(404).send();
        }
      } catch (err) {
        next(err);
    }
};