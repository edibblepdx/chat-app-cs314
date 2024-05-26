import React from 'react'
import { useState } from 'react';

export default function ChatInput() {
    const [message, setMessage] = useState('');
    const inputHandler = (e) => {
        setMessage(e.target.value);
    }
    const sendMessage = () => {
        console.log(message);
    }
    return (
        <div>
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