import React from 'react';
import { Header } from 'semantic-ui-react';

export const AuthHeader = () => {
  return (
      <Header as='h1'
              color='teal'
              textAlign='center'
              style={{paddingBottom: "20px"}}
              content='Weather Dashboard'/>
  );
};
