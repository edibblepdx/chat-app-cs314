import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';

export default function ChatSidebar() {
    const [chats, setChats] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        axios.get('/chats/')
        .then(({data}) => {
            setChats(data);
        })
    }, []);

    return (
        <div>
            <h1>Chats Sidebar</h1>
            <ul>
                {chats.map((chat) => (
                    <li key={chat._id}>{chat.name}</li>
                ))}
            </ul>
        </div>
    )
}