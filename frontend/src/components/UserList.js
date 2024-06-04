import React from "react"

export default function UserList(){

    const test = [{id: 1, name: "user 11111111111111111111"},{id: 2, name: "user 2"},{id: 3, name: "user 3"}];

    return (
        <div className="userList">
            <h1 style={{height: "40px", width: "90px"}}>Users</h1>
            <div className="userLine">
                {test.map((item) => (
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