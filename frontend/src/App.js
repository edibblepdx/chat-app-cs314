// import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chats from './pages/Chats';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { socket } from './socket';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_GATEWAY_URL || 'http://localhost:8000';
axios.defaults.withCredentials = true;

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // check if user is already logged in
    const storedToken = Cookies.get('token');
    if (storedToken) {
      // Reconnect socket with stored auth data
      const data = jwtDecode(storedToken);
      setUser({data});
      socket.auth = { id: data.id, email: data.email, name: data.name};
      socket.connect();
    }

    function onConnect() {
      setIsConnected(true);
    }
    
    function onDisconnect() {
      setIsConnected(false);
    }
    
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      //socket.off();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Toaster position='top-right' toastOptions={{duration: 2000}} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chats' element={<Chats />} />
        <Route path='/user/login' element={<Login />} />
        <Route path='/user/register' element={<Register />} />
      </Routes>
    </div>
  );
}
