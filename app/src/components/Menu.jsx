import React from 'react';
import axios from 'axios';
import { Menu as SemanticMenu } from 'semantic-ui-react'
import { API_URL } from '../config';

export const Menu = ({ onLogout }) => {

  const logoutHandler = async () => {
    await axios.post(`${API_URL}/logout`);
    onLogout();
  };

  return (
    <SemanticMenu inverted>
        <SemanticMenu.Item
          name='Logout'
          position="right"
          onClick={logoutHandler}
        />
      </SemanticMenu>
  );
};
