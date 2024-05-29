import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: ''
    , password: ''
  })

  const loginUser = async (e) => {
    e.preventDefault();
    const {email, password} = data;
    try {
      const {data} = await axios.post('/user/login', {email, password});
      if (data.error) {
        toast.error(data.error);
      }
      else {
        setData({});
        toast.success('login successful');
        navigate('/chats');
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  const googleLogin = useGoogleLogin({
      flow: 'auth-code',
      onSuccess: async (codeResponse) => {
          console.log(codeResponse);
          const tokens = await axios.post('/user/google', {
                  code: codeResponse.code,
              });

          console.log(tokens);
      },
      onError: errorResponse => console.log(errorResponse),
  });

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input 
          type='email' 
          placeholder='enter email...' 
          value = {data.email} 
          onChange={(e) => setData({...data, email: e.target.value})} 
        />
        <label>Password</label>
        <input 
          type='text' 
          placeholder='enter password...' 
          value = {data.password} 
          onChange={(e) => setData({...data, password: e.target.value})} 
        />
        <button type='submit'>Submit</button>
      </form>
      <button onClick={() => googleLogin()}>Sign in with Google 🚀</button>
    </div>
  )
}
