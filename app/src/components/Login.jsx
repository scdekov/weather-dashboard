import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { API_URL } from '../config';
import { AuthHeader } from './AuthHeader';

export const Login = ({ setAuthenticated, showRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await axios.post(`${API_URL}/login`, { username, password });
      setAuthenticated(true);
    } catch (error) {
      const status = error.response.status;
      if (status === 401) {
        setErrorMessage('Invalid username or password!');
      } else {
        setErrorMessage('Server error');
      }
    }

    setLoading(false);
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <AuthHeader/>
      <Header as='h2' color='teal' textAlign='center'>
        Log-in to your account
      </Header>
      <Form
        size='large'
        onSubmit={handleLogin}
        loading={loading}
        error={!!errorMessage}>
        <Segment stacked>
          {
            errorMessage &&
            <Message
              error
              header={errorMessage}/>
          }
          <Form.Input fluid
                      icon='user'
                      iconPosition='left'
                      placeholder='Username'
                      required
                      onChange={e => setUsername(e.target.value)}
                      value={username} />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            required
            onChange={e => setPassword(e.target.value)}
            value={password}
          />

          <Button color='teal'
                  fluid
                  size='large'
                  type="submit">
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='#' onClick={showRegister}>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
  );
};
