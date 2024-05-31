import React from 'react'
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

export default function Navbar() {
  return (
    <div className='navbar'>
      Chat App
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/chats'>Chats</Link>
        <Link to='/user/login'className="login-out" 
          style={{
            left: "1200px",
            top: "17px"
          }}>Login</Link>
        <Link to='/user/register' className="login-out"
          style={{
            left: "1270px",
            top: "17px"
          }}>Register</Link>
      </nav>
      <LogoutButton />
    </div>
  );
}
