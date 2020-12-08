const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/DIPLOMADOS', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(bodyParser.urlencoded({extended: false,}));
app.use(bodyParser.json({}));

const authRoute = require('./routes/api/authRoute');
app.use('/auth', authRoute);

const topicsRoute = require('./routes/api/topicsRoute');
app.use('/topics', topicsRoute);

const categoriesRoute = require('./routes/api/categoriesRoute');
app.use('/categories', categoriesRoute);

const postsRoute = require('./routes/api/postsRoute');
app.use('/posts', postsRoute);

const chatRoute = require('./routes/api/chatRoute');
app.use('/chats', chatRoute);

const roomsRoute = require('./routes/api/roomsRoute');
app.use('/rooms', roomsRoute);

const messagesRoute = require('./routes/api/messagesRoute');
app.use('/messages', messagesRoute);

app.use(function (req, res, next) {
  const error = new Error('Server doesn\'t support this request!');
  error.status = 405;

  next(error);
});

app.use(function (error, req, res, next) {
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    error: {
      message: error.message,
      status: statusCode,
      stack: error.stack
    },
  });
});

module.exports = app;
