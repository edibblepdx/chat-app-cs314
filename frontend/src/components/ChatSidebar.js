import React from 'react';
import { useState, useEffect, useContext , useRef} from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import ChatBox from './ChatBox';
import addUser from './icons8-add-user-30.png';
import UserMenu from './UserMenu.js';
import { socket } from '../socket';

export default function ChatSidebar() {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const { user } = useContext(UserContext);

    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const addButtonRefs = useRef([]);

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

        fetchChats();

        // listen for chat created events and update the chats state
        socket.on('chat created', (chat) => {
            setChats((prevChats) => [...prevChats, chat]);
        });

        return () => {
            socket.off('chat created');
        };
    }, [user/*, socket*/]);

    const handleChatSelection = (chatId) => {
        setSelectedChat(chatId);
    };

    const handleAddUserClick = (event, index) => {
        event.stopPropagation();
        const buttonRef = addButtonRefs.current[index].getBoundingClientRect();
        setContextMenuPosition({ x: buttonRef.left + window.scrollX - 130, y: buttonRef.top + window.scrollY});
        setContextMenuVisible(true);
    };

    return (
        <div>
            <div className='roomBar'>
                <h1>Chats</h1>
                <div>
                    {chats.map((chat, index) => (
                        <div key={chat._id} onClick={() => handleChatSelection(chat._id)} className="roomBubble">
                            {chat.name}
                            
                            <div className="addUserButton" onClick={(e) => handleAddUserClick(e, index)} ref= {el => addButtonRefs.current[index] = el}>
                                <img src={addUser} alt="Add user" className="addUserIcon"/>
                            </div>

                        </div>
                    ))}
                    {contextMenuVisible && (
                        <UserMenu
                            position={contextMenuPosition}
                            onClose={() => setContextMenuVisible(false)}
                        />
                    )}
                </div>
            </div>
            <div style={{ float: 'right', width: '70%' }}>
                {selectedChat ? (<ChatBox chatId={selectedChat} />
                ) : (
                <p>Select a chat to view the messages</p>)}
            </div>
        </div>
    )
}