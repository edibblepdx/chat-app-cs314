import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ChatWindow({ chatId }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

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

    const inputHandler = (e) => {
        setMessage(e.target.value);
    }

    const sendMessage = async () => {
        try {
            await axios.post(`/chats/${chatId}/messages`, { message });
            setMessage('');
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1>Chat Window</h1>
            <ul>
                {messages.map((msg) => (
                    <li key={msg._id}>{msg.message}</li>
                ))}
            </ul>
            <input
                type='text'
                placeholder='enter message'
                value={message}
                onChange={inputHandler}
            />
            <button onClick={() => sendMessage()}>Send</button>
        </div>
    )
}