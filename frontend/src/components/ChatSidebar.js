import React from 'react';
import { useState, useEffect, useContext , useRef} from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import ChatBox from './ChatBox';
import addUser from './icons8-add-user-30.png';
import UserMenu from './UserMenu.js';
import UserList from './UserList';
import { socket } from '../socket';
import { toast } from 'react-hot-toast';

export default function ChatSidebar() {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const { user } = useContext(UserContext);

    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [contextMenuChatId, setContextMenuChatId] = useState(null);
    const addButtonRefs = useRef([]);

    // fetch chats
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
    }, [user]);

    // socket stuff
    useEffect(() => {
        // listen for private chat added events and update the chats state
        socket.on('chat added', (chat) => {
            toast.success('new chat');
            setChats((prevChats) => [...prevChats, chat]);
        });

        // listen for private chat removed events and update the chats state
        socket.on('chat removed', (chat) => {
            toast.error('chat removed');
            socket.emit('leave room', chat._id);
            setChats((prevChats) => prevChats.filter((c) => c._id !== chat._id));
            setSelectedChat(null);
        });

        return () => {
            socket.off('chat added');
            socket.off('chat removed');
        };
    }, [user]);

    const handleChatSelection = (chatId) => {
        // leave chat room
        socket.emit('leave room', selectedChat);
        // set selected chat
        setSelectedChat(chatId);
        // join chat room
        socket.emit('join room', chatId);

    };

    const handleAddUserClick = (event, index) => {
        event.stopPropagation();
        const buttonRef = addButtonRefs.current[index].getBoundingClientRect();
        setContextMenuPosition({ x: buttonRef.left + window.scrollX - 130, y: buttonRef.top + window.scrollY});
        setContextMenuVisible(true);
        setContextMenuChatId(chats[index]._id);
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
                            chatId={contextMenuChatId}
                            position={contextMenuPosition}
                            onClose={() => setContextMenuVisible(false)}
                        />
                    )}
                </div>
            </div>
            <div style={{ float: 'right', width: '70%' }}>
                {selectedChat ? (<ChatBox chatId={selectedChat} />
                ) : (
                    <div className="chatBox" style={{flexDirection: "column"}}>
                        <h1>&lArr; Create a Chat!</h1>
                        <h1 style={{paddingTop: "65px"}}> &lArr; Select a chat to view the messages!</h1>
                    </div>
                )}
                <UserList chatId={selectedChat} />
            </div>
        </div>
    )
}