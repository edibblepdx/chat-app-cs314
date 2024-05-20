import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chats from './pages/Chats';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/userContext';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='top-right' toastOptions={{duration: 2000}} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chats' element={<Chats />} />
        <Route path='/user/login' element={<Login />} />
        <Route path='/user/register' element={<Register />} />
        <Route path='/user/dashboard' element={<Dashboard />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;