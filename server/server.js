const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');

const express = require('express');
// const app = express();
// const server = http.Server(app);
dotenv.config()
const server = http.createServer(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const port = process.env.PORT || 5000;
server.listen(port);

io.on('connection', (socket) => {
  socket.on('join', function(data){
    //joining
    socket.join(data.room);

    socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
  });


  socket.on('leave', function(data){
    socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});

    socket.leave(data.room);
  });

  socket.on('message',function(data){

    io.in(data.room).emit('new message', {user:data.user, message:data.message});
  });
});

server.once('listening', function () {
  console.log(`The server is running at http://localhost:${port}`);
});