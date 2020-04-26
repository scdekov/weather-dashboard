import React, { useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Auth } from './Auth';
import { Dashboard } from './Dashboard';
import { API_URL } from '../config';
import { Menu } from './Menu';
import '../css/App.css';

axios.defaults.withCredentials = true;

export const App = () => {
  const [authenticated, setAuthenticated] = useState(true);

  return (
    authenticated ?(
      <div>
        <Menu onLogout={() => setAuthenticated(false)}/>
        <Dashboard onUnauthenticated={() => setAuthenticated(false)}/>
      </div>
      ):
      <Auth setAuthenticated={setAuthenticated}/>
  );
};
