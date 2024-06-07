import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { socket } from '../socket';

export default function UserMenu ({chatId, position, onClose}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            if (searchTerm.trim() === "") {
                setFilteredUsers([]);
                return; 
            }

            try {
                const response = await axios.get('/user/find', { params: { q: searchTerm } });
                setFilteredUsers(response.data);
                console.log(response.data);
                console.log("hello");
            }
            catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, [searchTerm]);

    // handle user search
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    // handle user selection from list
    const handleClick = (user) => {
        setSearchTerm(user.email);
        setSelectedUser(user);
    }

    // handle adding user to chat
    const addUser = () => {
        socket.emit('add user', { chatId, userId: selectedUser._id }); 
        onClose();
    }

    return (
        <div className="contextMenu" style={{top: position.y, left: position.x }}>
            <input
                type="text"
                placeholder="Search..."
                className="contextSearch"
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="contextList">
                {filteredUsers.map((user) => (
                    <div key={user._id} className="contextItem" onClick={() => handleClick(user)}>
                        {user.email}
                    </div>
            ))}
            {filteredUsers.length === 0 && searchTerm !== '' && (
                <div className="contextItem">No users found</div>)}
            </div>
            <button onClick={onClose} className="contextClose">Close</button>
            <button onClick={addUser} className="contextClose" style={{ marginLeft: '54px', backgroundColor: selectedUser !== null ? '#7bb5a3' : '#a14242' }}>Add</button>
        </div>
    );
}

