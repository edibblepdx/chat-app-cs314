import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export default function CreateChat() {
    const [chat, setChat] = useState('');
    const inputHandler = (e) => {
        setChat(e.target.value);
    }
    const createChat = () => {
        try {
            axios.post('/chats/', { name: chat });
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div>
            <input
                type='text'
                placeholder='enter chat name'
                value={chat}
                onChange={inputHandler}
            />
            <button onClick={() => createChat()}>Create</button>
        </div>
    )
}
