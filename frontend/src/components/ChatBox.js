import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ChatInput from './ChatInput';
import ChatBubble from './ChatBubble';
import UserList from './UserList';
import { socket } from '../socket';

export default function ChatWindow({ chatId }) {
    const [messages, setMessages] = useState([]);
    const chatRef = useRef(null);


    // fetch messages from database
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axios.get(`/chats/${chatId}/messages`);
                setMessages(data);
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchMessages();
    }, [chatId]);

    // Scroll to the bottom of the chat when a new chat comes in
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);
 
    // realtime messages
    useEffect(() => {
        // join chat room
        socket.connect();
        socket.emit('join room', chatId);

        // listen for messages
        const handleNewMessage = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };
        socket.on('chat message', handleNewMessage);

        return () => {
            socket.off('chat message', handleNewMessage);
            socket.disconnect();
        };
    }, [chatId]);
    

    return (
        <div className='chatBox'>
            <ChatBubble messages={messages} chatRef={chatRef} />
            <ChatInput chatId={chatId} />
            <UserList/>
            <button className="redButton" style={{top: "650px", left: "1030px"}}>
                Leave Chat
            </button>
            <button className="redButton" style={{top: "700px", left: "1030px"}}>
                Delete Chat
            </button>
        </div>
    )
}