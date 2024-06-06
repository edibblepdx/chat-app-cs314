import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { socket } from '../socket';
import Cookies from 'js-cookie';

export default function CreateChat({ userId }) {
    const [chat, setChat] = useState('');

    const inputHandler = (e) => {
        setChat(e.target.value);
    }

    const createChat = async () => {
        try {
            //await axios.post('/chats/', { name: chat });
            
            // emit event to server
            socket.emit('create chat', { chatName: chat, token: Cookies.get('token') });
            setChat('');
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div style={{
            backgroundColor: "rgb(57, 60, 53)",
            width: "320px",
            maxHeight: "90px"
            }}>
            <input
                className="inputRoom"
                type='text'
                placeholder='Enter chat name'
                value={chat}
                onChange={inputHandler}
            />
            <button onClick={() => createChat()} className="createButton">Create</button>
        </div>
    )
}
