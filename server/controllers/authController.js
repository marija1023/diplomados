const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/userModel');

module.exports.userRegister = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      email: email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      "success": true,
      "username": username,
      "accessToken": generateAccessToken({username}),
    });
  } catch(error) {
    console.log(error);
    res.status(401).send({
      "success": false,
      "error": `User with username ${username} already exists`,
    })
  }
}

module.exports.userLogin = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  
  const foundUser = await User.findOne({username: username}).exec();

  if (foundUser) {
    if (await bcrypt.compare(password, foundUser.password)) {
      res.status(201).json({
        "success": true,
        "username": username,
        "accessToken": generateAccessToken({username}),
      });
    } else {
      res.status(401).send({
        "success": false,
        "error": `Incorrect password!`,
      })
    }    
  } else {
    res.status(401).send({
      "success": false,
      "error": `User ${username} doesn't exists`,
    })
  }
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

module.exports.getIdByUsername = async (req, res, next) => {
  try {
    const user = await User.findOne({"username": req.body.username}).exec();
    if (user) {
      res.status(200);
      res.json({"id": user.id});
    } else {
      res.status(404);
      res.send();
    }
  } catch (err) {
    next(err);
  }
};