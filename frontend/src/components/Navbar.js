import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to='/' style={{
        textDecoration: "none"
      }}>Home</Link>

      <Link to='/chats' style={{
        textDecoration: "none"
      }}>Chats</Link>

      <Link to='/user/login' style={{
        textDecoration: "none"
      }}>Login</Link>

      <Link to='/user/register' style={{
        textDecoration: "none"
      }}>Register</Link>

    </nav>
  )
}
