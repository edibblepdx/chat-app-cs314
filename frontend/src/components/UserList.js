import React, { useEffect, useState } from "react"
import axios from "axios";
import { socket } from "../socket";

export default function UserList({ chatId }){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!chatId) return;
        const fetchUsers = async () => {
            try {
                setUsers([]);
                const { data } = await axios.get('/chats/' + chatId + '/users');
                data.forEach(async (userId) => {
                    const { data } = await axios.get('/user/' + userId);
                    setUsers((prevUsers) => [...prevUsers, data]);
                });
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchUsers();
    }, [chatId]);

    // socket stuff
    useEffect(() => {
        const handleUserRemoved = ({id}) => {
            setUsers((prevUsers) => prevUsers.filter((u) => u._id != id));
        }

        socket.on('user removed', handleUserRemoved);

        const handleUserAdded = async ({userId}) => {
            const { data } = await axios.get('/user/' + userId);
            setUsers((prevUsers) => [...prevUsers, data]);
        }

        socket.on('user added', handleUserAdded);

        return () => {
            socket.off('user removed');
            socket.off('user added');
        }
    }, [chatId]);

    const removeUserFromChat = (item) => {
        socket.emit('remove user', { chatId: chatId, userId: item._id });
    }

    return (
        <div className="userList" style={{left: "1323px", top: "70px"}}>
            <h1 style={{height: "40px", width: "90px"}}>Users</h1>
            <div className="userLine">
                {users.map((item) => (
                    <div key={item._id} className="userItem" style={{display: "flex", width: "80px",justifyContent: "space-between"}}>
                        {item.name}
                        <button className="removeUser" onClick={() => removeUserFromChat(item)}>X</button>
                    </div>
                ))}
            </div>
        </div>
    );
};