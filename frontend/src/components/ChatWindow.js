import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ChatInput from './ChatInput';
import ChatBubble from './ChatBubble';
//import io from 'socket.io-client';
import { socket } from '../socket';

export default function ChatWindow({ chatId }) {
    const [messages, setMessages] = useState([]);
    const chatRef = useRef(null);
    //const socket = io('http://localhost:8001');

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
        socket.connect()
        socket.emit('join room', chatId);

        // listen for messages
        socket.on('chat message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        }
    }, []); 
    

    return (
        <div className='chatBox'>
            <ChatBubble messages={messages} chatRef={chatRef} />
            <ChatInput chatId={chatId} />
        </div>
    )
}