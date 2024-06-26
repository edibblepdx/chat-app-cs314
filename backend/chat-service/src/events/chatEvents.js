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

        // Join a room
        socket.on('join room', (roomId) => {
            if (socket.rooms.has(roomId)) {
                return;
            }
            socket.join(roomId);
            console.log(`User joined room: ${roomId}`);
        });

        // Leave a room
        socket.on('leave room', (roomId) => {
            if (!roomId) {
                return;
            }
            socket.leave(roomId);
            console.log(`User left room: ${roomId}`);
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
                    console.error('Chat not found');
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

        // create a chat
        socket.on('create chat', async ({ chatName, token }) => {
            try {
                const decoded = jwt.verify(token, jwtSecret);
                const id = decoded.id;

                if (!chatName) {
                    throw 'Chat needs a name';
                }
                const chat = new Chat({
                    name: chatName,
                    users: [id],
                    admin: id,
                    messages: []
                })
                await chat.save();
                console.log('chat created: ' + chatName);
                io.to(id).emit('chat added', chat);
            }
            catch (err) {
                console.error(err);
            }
        });

        // add user to chat
        socket.on('add user', async ({ chatId, userId }) => {
            try {
                if (!chatId || !userId) {
                    throw 'ChatId and userId required';
                }

                const chat = await Chat.findById(chatId);
                if (chat.users.includes(userId)) {
                    console.log('User is already in the chat');
                    return;
                }
                chat.users.push(userId);
                await chat.save();

                console.log('adding user to chat: ' + userId);
                io.to(userId).emit('chat added', chat);
                io.to(chatId).emit('user added', { userId: userId });
            }
            catch (err) {
                console.error(err);
            }
        });

        // leave chat
        socket.on("leave chat", async (chatId) => {
            try {
                if (!chatId) {
                    throw 'roomId required';
                }

                const chat = await Chat.findById(chatId);
                if (!chat) {
                    throw 'Chat not found';
                }

                // check if the user is the admin (cannot use ===)
                if (chat.admin == user.id) {
                    io.to(user.id).emit('fail', { msg: "Admin cannot leave chat" });
                    throw 'Admin cannot leave chat';
                }

                const userIndex = chat.users.indexOf(user.id);  
                if (userIndex === -1) {
                    throw 'User not found in chat';
                }
                chat.users.splice(userIndex, 1);
                await chat.save();

                console.log('removing user:' + user.id + 'from chat: ' + chatId);
                socket.leave(chatId);
                io.to(user.id).emit('chat removed', chat);
            }
            catch (err) {
                console.error(err);
            }
        });

        // delete chat
        socket.on('delete chat', async (chatId) => {
            try {
                if (!chatId) {
                    throw 'roomId required';
                }

                const chat = await Chat.findById(chatId);
                if (!chat) {
                    throw 'Chat not found';
                }

                // check if the user is the admin (cannot use ===)
                if (chat.admin != user.id) {
                    io.to(user.id).emit('fail', { msg: "Only the admin can delete the chat" });
                    throw 'Only the admin can delete the chat';
                }

                // remove the chat from all user's sidebar
                socket.leave(chatId);
                chat.users.forEach(userId => {
                    io.to(userId.toString()).emit('chat removed', chat);
                });
                await Chat.deleteOne({ _id: chatId });

                console.log('deleting chat: ' + chatId);
            }
            catch (err) {
                console.error(err);
            }
        });

        // remove user from chat forcibly
        socket.on('remove user', async ({ chatId, userId }) => {
            try {
                if (!chatId || !userId) {
                    console.log(chatId, userId);
                    throw 'ChatId and userId required';
                }

                const chat = await Chat.findById(chatId);
                if (!chat) {
                    throw 'Chat not found';
                }

                // check if the user is the admin (cannot use ===)
                if (chat.admin != user.id) {
                    io.to(user.id).emit('fail', { msg: "Only the admin can remove users" });
                    throw 'Only the admin can remove users';
                }

                // check if the admin is trying to remove themselves
                if (chat.admin == userId) {
                    throw 'The admin cannot remove themselves';
                }

                // remove user
                const userIndex = chat.users.indexOf(userId);  
                if (userIndex === -1) {
                    throw 'User not found in chat';
                }
                chat.users.splice(userIndex, 1);
                await chat.save();

                console.log('removing user:' + userId + 'from chat: ' + chatId);
                io.to(chatId).emit('user removed', { id: userId });
                io.to(userId).emit('chat removed', chat);
            }
            catch (err) {
                console.error(err);
            }
        });

        socket.on('disconnect', () => {
            console.log(`user disconnected: ${user.name}`);
        });
    });
}