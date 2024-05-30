import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { socket } from '../socket';
import Cookies from 'js-cookie';

export default function ChatInput({ chatId }) {
    const [message, setMessage] = useState('');

    const inputHandler = (e) => {
        setMessage(e.target.value);
    }

    const sendMessage = async () => {
        try {
            //await axios.post(`/chats/${chatId}/messages`, { message });

            // realtime messages
            socket.emit('chat message', { roomId: chatId, msg: message, token: Cookies.get('token') });
            setMessage('');
        }
        catch (err) {
            console.error(err);
        }
    } 

    //Send Button Component to send messages
    const sendButton = () => {
        return (
            <div>
                <button 
                    className="sendButton"
                    onClick={sendMessage}>
                    Send
                </button>
            </div>
        );
    };
    return (
        <div className="inputBox">
            <input
                className='customInput'
                type='text'
                placeholder='Type something...'
                value={message}
                onChange={inputHandler}
            />
            {sendButton()}
        </div>
    )
}