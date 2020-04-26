import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    const resp = await axios.post(`${API_URL}/login`, { username, password });
    if (resp.status === 200) {
      setAuthenticated(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="text" onChange={e => setUsername(e.target.value)} value={username}/>
        <input type="password" onChange={e => setPassword(e.target.value)} value={password}/>
        <input type="submit" value="Login"/>
      </form>
    </div>
  );
};

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async e => {
    e.preventDefault();
    const resp = await axios.post(`${API_URL}/register`, { username, password });
    if (resp.status === 200) {
      onRegisterSuccess();
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input type="text" onChange={e => setUsername(e.target.value)} value={username}/>
        <input type="password" onChange={e => setPassword(e.target.value)} value={password}/>
        <input type="submit" value="Register"/>
      </form>
    </div>
  );
};

export const Auth = ({ setAuthenticated }) => {
  const [activePage, setActivePage] = useState('login');

  return (
    <div>
      {
        activePage === 'login' ?
        <div>
          <Login setAuthenticated={setAuthenticated}/>
          <button onClick={() => setActivePage('register')}>Register</button>
        </div>:
        <Register onRegisterSuccess={() => setActivePage('login')}/>
      }
    </div>
  );
};
