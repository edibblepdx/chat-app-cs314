require('dotenv').config();
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const jwt = require('jsonwebtoken');

jwtSecret = process.env.JWT_SECRET;

// socket.io events
module.exports = (io) => {
    io.on('connection', (socket) => {
        const user = socket.user;
        console.log(`a user connected: ${user.name}, ${user.email}, ${user.id}`);
        socket.join(user.id);
        console.log(`user joined room: ${user.id}`);

        // have the user join a room with their email

        /*
        socket.on('join_room')

        socket.on('leave_room')

        socket.on('send_message')

        socket.on('receive_message')

        socket.on('typing')
        */

        // Join a room
        socket.on('join room', (roomId) => {
            socket.join(roomId);
            console.log(`User joined room: ${roomId}`);
        });

        // Handle chat message
        socket.on('chat message', async ({ roomId, msg, token }) => {
            try {
                // Extract userId from token
                const decoded = jwt.verify(token, jwtSecret);
                const id = decoded.id;
                const name = decoded.name;
                // find chat
                const chat = await Chat.findById(roomId);
                if (!chat) {
                    console.log('Chat not found');
                    return;
                }
                // create message
                const newMessage = new Message({
                    message: msg,
                    userId: id,
                    userName: name
                });
                // save message and chat
                await newMessage.save();
                chat.messages.push(newMessage);
                await chat.save();
                
                // emit the message
                console.log('message: ' + msg);	
                io.to(roomId).emit('chat message', newMessage);
            } catch (err) {
                console.error(err)	
            }
        });

        /*
        socket.on('chat message', ({msg, chatId}) => {
            console.log('message: ' + msg);	
            io.emit('chat message', msg);
            try {
                const message = Message({message: msg});
                message.save();
            } catch (err) {
                console.log(err.message)	
            }
        });
        */

        socket.on('disconnect', () => {
            console.log(`user disconnected: ${user.name}`);
        });
    });
}