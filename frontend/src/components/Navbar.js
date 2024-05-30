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
        <Link to='/user/login'>Login</Link>
        <Link to='/user/register'>Register</Link>
      </nav>
      <div>
        <a href="#" style={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "5px",
          borderWidth: "4px",
          padding: "8px",
          display: "inline-block",
        }}>Login</a>
      </div>
      <LogoutButton />
    </div>
  );
}
