import React, { useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Auth } from './Auth';
import { Dashboard } from './Dashboard';
import '../css/App.css';

axios.defaults.withCredentials = true;

export const App = () => {
  const [authenticated, setAuthenticated] = useState(true);
  return (
    authenticated ?
      <Dashboard onUnauthenticated={() => setAuthenticated(false)}/> :
      <Auth setAuthenticated={setAuthenticated}/>
  );
};
