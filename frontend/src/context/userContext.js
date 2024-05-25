import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext({});

export const useUserContext = () => {
    return useContext(UserContext)
}

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!user) {
            axios.get('/user/profile')
            .then(({data}) => {
                setUser(data);
            })
        }
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}