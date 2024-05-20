import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: ''
    , email: ''
    , password: ''
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const {username, email, password} = data;
    try {
      const {data} = await axios.post('/user/register', {
        username
        , email
        , password
      })
      if (data.error) {
        toast.error(data.error);
      }
      else {
        setData({});
        toast.success('registration successful');
        navigate('/user/login');
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Username</label>
        <input type='text' placeholder='enter username...' value = {data.username} onChange={(e) => setData({...data, username: e.target.value})} />
        <label>Email</label>
        <input type='email' placeholder='enter email...' value = {data.email} onChange={(e) => setData({...data, email: e.target.value})} />
        <label>Password</label>
        <input type='text' placeholder='enter password...' value = {data.password} onChange={(e) => setData({...data, password: e.target.value})} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
