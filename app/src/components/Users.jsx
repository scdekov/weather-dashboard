import React, { useState } from 'react';
import axios from 'axios';
import { Dimmer, Loader, Table, Container, Icon } from 'semantic-ui-react';
import { API_URL } from '../config';

export const Users = ({ onUnauthenticated }) => {
  const [usersData, setUsersData] = useState();
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`${API_URL}/get-users`);
        setUsersData(resp.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          onUnauthenticated();
        } else {
          console.error(error);
        }
      }
    };
    fetchData();
  }, []);

  const onUserDelete = async username => {
    await axios.post(`${API_URL}/delete-user`, { username })
    setUsersData(usersData.filter(userData => userData.username !== username));
  };

  return (
    <div>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
      {!loading && (
        <Container>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell width={1}>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {usersData.map((user, ix) => (
                <Table.Row key={`${ix}row`}>
                  <Table.Cell key={`${ix}cel1`}>{user.username}</Table.Cell>
                  <Table.Cell key={`${ix}cel2`}
                              textAlign="center">
                    {!user.isAdmin && (
                      <a href="#"
                         onClick={() => onUserDelete(user.username)}>
                        <Icon name="user delete"/>
                      </a>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>
      )}
    </div>
  );
};
