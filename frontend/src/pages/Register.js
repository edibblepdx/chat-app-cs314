import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: ''
    , email: ''
    , password: ''
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const {name, email, password} = data;
    try {
      const {data} = await axios.post('/user/register', {
        name
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
    <div className="login-page">
      <text className="text" style={{left: "50px"}}>
        Register New Account
      </text>
      <form onSubmit={registerUser}>
        <label style={{
          position: "absolute",
          top: "264px",
          left: "100px",
          color: "white",
          fontSize: "20px"
        }}>Name</label>
        <div className="inputBox">
          <input type='text' placeholder='Enter name...' value = {data.name} onChange={(e) => setData({...data, name: e.target.value})} className="customInput"/>
        </div>

        <label style={{
          position: "absolute",
          top: "334px",
          left: "100px",
          color: "white",
          fontSize: "20px"
        }}>Email</label>
        <div className="inputBox" style={{top: "274px"}}>
          <input type='email' placeholder='enter email...' value = {data.email} onChange={(e) => setData({...data, email: e.target.value})} className="customInput"/>
        </div>

        <label style={{
          position: "absolute",
          top: "404px",
          left: "100px",
          color: "white",
          fontSize: "20px"
        }}>Password</label>
        <div className="inputBox" style={{top: "344px"}}>
          <input type='text' placeholder='enter password...' value = {data.password} onChange={(e) => setData({...data, password: e.target.value})} className="customInput"/>
        </div>
        <button type='submit' className="submitButton" style={{top: "434px"}}>Submit</button>
      </form>
    </div>
  )
}
