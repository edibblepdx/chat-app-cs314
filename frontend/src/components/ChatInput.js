import React from 'react'
import { useState } from 'react';
import { socket } from '../socket';
import Cookies from 'js-cookie';

export default function ChatInput({ chatId }) {
    const [message, setMessage] = useState('');

    // handle input change
    const inputHandler = (e) => {
        setMessage(e.target.value);
    }

    // send when user presses enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    // send message
    const sendMessage = async () => {
        try {
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
                onKeyDown={handleKeyDown}
            />
            {sendButton()}
        </div>
    )
}