import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
//import io from 'socket.io-client';
import ChatWindow from './ChatWindow';

export default function ChatSidebar() {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const { user } = useContext(UserContext);
    //const socket = io('http://localhost:8001');

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const {data} = await axios.get('/chats/');
                setChats(data);
            }
            catch (err) {
                console.error(err);
            }
        }
        /*
        axios.get('/chats/')
        .then(({data}) => {
            setChats(data);
        })
        */
        fetchChats();

        // listen for chat created events and update the chats state
        /*
        socket.on('chat created', (chat) => {
            setChats((prevChats) => [...prevChats, chat]);
        });

        return () => {
            socket.disconnect();
        };
        */
    }, [user/*, socket*/]);

    const handleChatSelection = (chatId) => {
        setSelectedChat(chatId);
    };

    return (
        <div>
            <div className='roomBar'>
                <h1>Chat Sidebar</h1>
                <ul>
                    {chats.map((chat) => (
                        <li key={chat._id} onClick={() => handleChatSelection(chat._id)}>
                            {chat.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ float: 'right', width: '70%' }}>
                {selectedChat ? (<ChatWindow chatId={selectedChat} />) 
                    : (<p>Select a chat to view the messages</p>)}
            </div>
        </div>
    )
}