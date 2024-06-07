import React, { useEffect, useState } from "react"
import axios from "axios";

export default function UserList({ chatId }){
    const [users, setUsers] = useState([]);

    //const test = [{id: 1, name: "user 11111111111111111111"},{id: 2, name: "user 2"},{id: 3, name: "user 3"}];
    useEffect(() => {
        const fetchUsers = async () => {
            setUsers([]);
            try {
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

    return (
        <div className="userList">
            <h1 style={{height: "40px", width: "90px"}}>Users</h1>
            <div className="userLine">
                {users.map((item) => (
                    <>
                    <div key={item.id} className="userItem" style={{display: "flex", width: "80px",justifyContent: "space-between"}}>
                        {item.name}
                    </div>
                    <button className="removeUser">X</button>
                    </>
                ))}
            </div>
        </div>
    );
};