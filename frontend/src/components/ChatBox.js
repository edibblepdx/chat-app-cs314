import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ChatInput from './ChatInput';
import ChatBubble from './ChatBubble';
import UserList from './UserList';
import LeaveChatButton from './LeaveChatButton';
import DeleteChatButton from './DeleteChatButton';
import { socket } from '../socket';

export default function ChatBox({ chatId }) {
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
        socket.emit('join room', chatId);

        // listen for messages
        const handleNewMessage = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };
        socket.on('chat message', handleNewMessage);

        return () => {
            socket.off('chat message', handleNewMessage);
        };
    }, [chatId]);
    

    return (
        <div className='chatBox'>
            <ChatBubble messages={messages} chatRef={chatRef} />
            <ChatInput chatId={chatId} />
            <UserList/>
            <LeaveChatButton chatId={chatId} />
            <DeleteChatButton chatId={chatId} />
        </div>
    )
}