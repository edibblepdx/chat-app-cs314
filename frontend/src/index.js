import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserContextProvider } from './context/userContext';

const ClientId = process.env.REACT_APP_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={ClientId}>
      <UserContextProvider>
        <Router>
          <App />
        </Router>
      </UserContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);