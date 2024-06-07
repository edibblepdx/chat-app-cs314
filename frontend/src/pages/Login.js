import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { socket } from '../socket';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: ''
    , password: ''
  })

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post('/user/login', {
        email
        , password
      });
      if (data.error) {
        toast.error(data.error);
      }
      else {
        // connect to the socket
        socket.auth = { id: data._id, email: data.email, name: data.name};
        socket.connect();

        socket.on('connect', () => {
          console.log('Socket connected successfully');
        });

        socket.on('connect_error', (err) => {
          console.error('Socket connection error:', err);
        });

        setData({ email: '', password: '' });
        toast.success('login successful');
        navigate('/chats');
      }
    }
    catch (err) {
      console.log(err);
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
    <div className="login-page">
      <div className="text">
        Already Have an Account? Sign in Here
      </div>
      <form onSubmit={loginUser}>
        <label style={{
          top: "264px",
          left: "100px",
          position: "absolute",
          color: "white",
          fontSize: "20px"
        }}>Email</label>
        <div className="inputLogin">
          <input className="customInputLogin"
          type='email' 
          placeholder='Enter email...' 
          value = {data.email} 
          onChange={(e) => setData({...data, email: e.target.value})} 
        />
        </div>
        <label style={{
            top: "334px",
            left: "100px",
            position: "absolute",
            color: "white",
            fontSize: "20px"
        }}>Password</label>

        <div className="inputLogin" style={{top: "274px"}}>
          <input className="customInputLogin"
            type='text' 
            placeholder='Enter password...' 
            value = {data.password} 
            onChange={(e) => setData({...data, password: e.target.value})} 
          />
        </div>
        <button type='submit' className="submitButton">Submit</button>
      </form>
      {/*<button onClick={() => googleLogin()} className="submitButton" style={{top: "274"}}>
        Sign in with Google 🚀
      </button>*/}
      <button onClick={() => navigate('/user/register')} className="submitButton" style={{top: "274"}}>
        Register
      </button>
    </div>
  )
}
