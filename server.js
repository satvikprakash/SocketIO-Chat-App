const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const connectionURL = process.env.connectionURL;


// External utils
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, getAllUsers, userLeave } = require('./utils/users');


// Setting up the web and socketIO Server
const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer);


// DB Connection
mongoose.connect(connectionURL)
.then(() => {
    console.log('MongoDB Connection Successful!');
    httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
})
.catch(err => console.log(`Error Connecting to DataBase: ${err}`));


// To serve static files
app.use(express.static(path.join(__dirname, 'public')));


// Run when a user connects
io.on('connection', socket => {
    // Listen for user trying to join a room
    socket.on('joinRoom', async ({ username, room }) => {
        const newUser = await userJoin(socket.id, username, room);
        socket.join(newUser.room);


        // Welcome current user
        socket.emit('message', formatMessage('ChatCord Bot', `Welcome to ChatCord ${newUser.userName}!`));


        // Broadcast when a user connects
        socket.broadcast.to(newUser.room).emit('message', formatMessage('ChatCord Bot', `${newUser.userName} has Joined the Chat!`));

        
        // Sending Room Name and Users List
        const users = await getAllUsers(newUser.room);
        io.to(newUser.room).emit('roomUsers', {
            users: users,
            room: newUser.room
        });
    });

    
    // Listen for chatMessage
    socket.on('chat-message', async (message) => {
        const currentUser = await getCurrentUser(socket.id);
        io.to(currentUser.room).emit('message', formatMessage(currentUser.userName, message));
    });
    
    
    // Runs when the client disconnects
    socket.on('disconnect', async () => {
        const user = await getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage('ChatCord Bot', `${user.userName} has Left the Chat!`));
        
        const deletedUser = await userLeave(socket.id);

        // Sending Room Name and Users List
        const users = await getAllUsers(user.room);
        io.to(user.room).emit('roomUsers', {
            users: users,
            room: user.room
        });
    });
});