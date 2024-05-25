import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext({});

export function SocketContextProvider({children}) {
    const [socket, setSocket] = useState(null);
    useEffect(() => {

    },[])

    return (
        <SocketContext.Provider value={{socket, setSocket}}>
            {children}
        </SocketContext.Provider>
    )
}