import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { API_URL } from '../config';
import { AuthHeader } from './AuthHeader';

export const Register = ({ onRegisterSuccess, showLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleRegister = async e => {
    e.preventDefault();
    if (!(password === passwordAgain)) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      await axios.post(`${API_URL}/register`, { username, password });
      onRegisterSuccess();
    } catch (error) {
      if (error.response.status) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage('Server error');
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <AuthHeader/>
        <Header as='h2' color='teal' textAlign='center'>
          Create new account
        </Header>
        <Form
          size='large'
          onSubmit={handleRegister}
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
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password again'
              type='password'
              required
              onChange={e => setPasswordAgain(e.target.value)}
              value={passwordAgain}
            />

            <Button color='teal'
                    fluid
                    size='large'
                    type="submit">
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <a href='#' onClick={showLogin}>Sign in</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
  );
};
