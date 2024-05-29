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
      const {data} = await axios.post('/user/login', {
        email
        , password
      });
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
      <text className="text">
        Already Have an Account? Sign in Here
      </text>
      <form onSubmit={loginUser}>
        <label style={{
          top: "264px",
          left: "100px",
          position: "absolute",
          color: "white",
          fontSize: "20px"
        }}>Email</label>
        <div className="inputBox">
          <input className="customInput"
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

        <div className="inputBox" style={{top: "274px"}}>
          <input className="customInput"
            type='text' 
            placeholder='Enter password...' 
            value = {data.password} 
            onChange={(e) => setData({...data, password: e.target.value})} 
          />
        </div>
        <button type='submit' className="submitButton">Submit</button>
      </form>
      <button onClick={() => googleLogin()} className="submitButton" style={{top: "274"}}>
        Sign in with Google 🚀
      </button>
    </div>
  )
}
