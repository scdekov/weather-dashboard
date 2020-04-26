import React, { useState } from 'react';
import axios from 'axios';

export const Auth = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    const resp = await axios.post('http://localhost:3000/api/v1/login', { username, password });
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
