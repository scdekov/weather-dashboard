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
  fs.writeFileSync(config.USERS_FILE_PATH, `{"user": {"password": "pass"}}`);
});

describe('get users', () => {
  const GET_USERS_URL = '/api/v1/get-users';

  test('success', async () => {
    testUtils.authenticateUser('svetlio', true);
    const response = await request(server).get(GET_USERS_URL);
    expect(response.status).toEqual(200);
    expect(response.body.length).toBe(1);
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
