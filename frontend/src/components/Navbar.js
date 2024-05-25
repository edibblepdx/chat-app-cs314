import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/chats'>Chats</Link>
      <Link to='/user/login'>Login</Link>
      <Link to='/user/register'>Register</Link>
    </nav>
  )
}
