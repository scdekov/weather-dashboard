import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';

export const Auth = ({ setAuthenticated, setIsUserAdmin }) => {
  const [activePage, setActivePage] = useState('login');

  return (
    <div>
      {
        activePage === 'login' ?
        <div>
          <Login
            setAuthenticated={setAuthenticated}
            setIsUserAdmin={setIsUserAdmin}
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
