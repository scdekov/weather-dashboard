import React, { useState } from 'react';
import { Auth } from './Auth';

export const App = () => {
  // TODO: set authenticated to true by default and than to false if api returns 401
  const [authenticated, setAuthenticated] = useState(false);
  return (
    authenticated ? "Authenticated" : <Auth setAuthenticated={setAuthenticated}/>
  );
};
