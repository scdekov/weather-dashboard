import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';

export const Auth = ({ setAuthenticated }) => {
  const [activePage, setActivePage] = useState('login');

  return (
    <div>
      {
        activePage === 'login' ?
        <div>
          <Login
            setAuthenticated={setAuthenticated}
            showRegister={() => setActivePage('register')}
          />
          <button onClick={() => setActivePage('register')}>Register</button>
        </div>:
        <Register
          onRegisterSuccess={() => setActivePage('login')}
          showLogin={() => setActivePage('login')}
        />
      }
    </div>
  );
};
