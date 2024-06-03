import React from 'react';

export default function UserMenu ({position, onClose}) {
    const test = [{id: 1, name: "user 11111111111111111111"},{id: 2, name: "user 2"},{id: 3, name: "user 3"}];

    return (
        <div className="contextMenu" style={{top: position.y, left: position.x }}>
            <input
                type="text"
                placeholder="Search..."
                className="contextSearch"
            />
            <div className="contextList">
                {test.map((item) => (
                    <div key={item.id} className="contextItem">
                        {item.name}
                    </div>
            ))}
            </div>
            <button onClick={onClose} className="contextClose">Close</button>
        </div>
    )
}

