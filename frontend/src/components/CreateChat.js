import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

export default function CreateChat() {
    const [chat, setChat] = useState('');
    //const socket = io('http://localhost:8001');
    /* 
    useEffect(() => {
        return () => {
            socket.disconnect();
        };
    }, [socket]);
    */

    const inputHandler = (e) => {
        setChat(e.target.value);
    }

    const createChat = async () => {
        try {
            await axios.post('/chats/', { name: chat });
            
            // emit event to server
            //socket.emit('create chat', chat);
            setChat('');
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
