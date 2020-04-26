import React, { useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Auth } from './Auth';
import { Dashboard } from './Dashboard';
import { API_URL } from '../config';
import { Menu } from './Menu';
import { Users } from './Users';
import '../css/App.css';

axios.defaults.withCredentials = true;

export const App = () => {
  const [acitvePage, setActivePage] = useState('dashboard');
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('authenticated') || false);
  const [isUserAdmin, setIsUserAdmin] = useState(!!localStorage.getItem('isUserAdmin') || false);

  React.useEffect(() => {
    localStorage.setItem('authenticated', authenticated ? 1 : "");
    localStorage.setItem('isUserAdmin', isUserAdmin ? 1 : "");
  }, [authenticated, isUserAdmin]);

  return (
    authenticated ?(
      <div>
        <Menu
          onLogout={() => setAuthenticated(false)}
          showDashboard={() => setActivePage('dashboard')}
          showUsers={() => setActivePage('users')}
          isUserAdmin={isUserAdmin}/>
        {acitvePage === 'users' && <Users onUnauthenticated={() => setAuthenticated(false)}/>}
        {acitvePage === 'dashboard' && <Dashboard onUnauthenticated={() => setAuthenticated(false)}/>}
      </div>
      ):
      <Auth setAuthenticated={setAuthenticated} setIsUserAdmin={setIsUserAdmin}/>
  );
};
