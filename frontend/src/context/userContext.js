import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    /*
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const {data} = await axios.get('/user/profile')
                setUser(data.user);
            }
            catch (err) {
                console.error(err);
            }
        }

        if (!user) {
            fetchUser();
        }
    }, [user])
    */

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}