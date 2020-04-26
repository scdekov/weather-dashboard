const fs = require('fs');
const request = require('supertest');
const server = require('../../src/server');
const testUtils = require('../utils');
const config = require('../../src/config');

jest.mock('../../src/middlewares');

afterAll(done => {
  server.close(done);
});

beforeEach(() => {
  fs.writeFileSync(config.USERS_FILE_PATH, `{
"user": {"password": "pass"},\
"admin": {"password": "pass", "isAdmin": true}\
}`);
});

describe('get users', () => {
  const GET_USERS_URL = '/api/v1/get-users';

  test('success', async () => {
    testUtils.authenticateUser('svetlio', true);
    const response = await request(server).get(GET_USERS_URL);
    expect(response.status).toEqual(200);
    expect(response.body.length).toBe(2);
  });

  test('non admin', async () => {
    testUtils.authenticateUser('svetlio', false);
    const response = await request(server).get(GET_USERS_URL);
    expect(response.status).toEqual(403);
  });

  test('not authenticated', async () => {
    testUtils.authenticateUser(null);
    const response = await request(server).get(GET_USERS_URL);
    expect(response.status).toEqual(401);
  });
});

describe('delete user', () => {
  const DELETE_USER_URL = '/api/v1/delete-user';

  test('success', async () => {
    testUtils.authenticateUser('svetlio', true);
    const response = await request(server).post(DELETE_USER_URL)
                                          .send({ username: 'user' }) ;
    expect(response.status).toEqual(200);
    const users = JSON.parse(fs.readFileSync(config.USERS_FILE_PATH));
    expect(Object.keys(users).length).toBe(1);
    expect(users['user']).toBeUndefined();
  });

  test('non admin', async () => {
    testUtils.authenticateUser('svetlio', false);
    const response = await request(server).post(DELETE_USER_URL);
    expect(response.status).toEqual(403);
  });

  test('not authenticated', async () => {
    testUtils.authenticateUser(null);
    const response = await request(server).post(DELETE_USER_URL);
    expect(response.status).toEqual(401);
  });

  test('delete admin', async () => {
    testUtils.authenticateUser('svetlio', true);
    const response = await request(server).post(DELETE_USER_URL)
                                          .send({ username: 'admin' }) ;
    expect(response.status).toEqual(400);
  });
});
