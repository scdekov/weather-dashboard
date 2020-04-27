const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const testUtils = require('../utils');
const config = require('../../src/config');
const auth = require('../../src/services/auth');
const User = require('../../src/models/User').User;

jest.mock('../../src/middlewares');

beforeEach(async done => {
  await User.deleteMany({ username: { $ne: config.ADMIN_USERNAME } });
  await auth.ensureAdminUser();
  done();
});

afterAll(async done => {
  await mongoose.disconnect();
  done();
});

describe('get users', () => {
  const GET_USERS_URL = '/api/v1/get-users';

  test('success', async () => {
    testUtils.authenticateUser('svetlio', true);
    const response = await request(app.callback()).get(GET_USERS_URL);
    expect(response.status).toEqual(200);
    expect(response.body.length).toBe(1);
  });

  test('non admin', async () => {
    testUtils.authenticateUser('svetlio', false);
    const response = await request(app.callback()).get(GET_USERS_URL);
    expect(response.status).toEqual(403);
  });

  test('not authenticated', async () => {
    testUtils.authenticateUser(null);
    const response = await request(app.callback()).get(GET_USERS_URL);
    expect(response.status).toEqual(401);
  });
});

describe('delete user', () => {
  const DELETE_USER_URL = '/api/v1/delete-user';

  test('success', async () => {
    testUtils.authenticateUser('svetlio', true);
    await new User({ username: 'user', password: 'pass' }).save();
    expect(await User.exists({ username: 'user' })).toBe(true);

    const response = await request(app.callback())
      .post(DELETE_USER_URL)
      .send({ username: 'user' });
    expect(response.status).toEqual(200);
    expect(await User.exists({ username: 'user' })).toBe(false);
  });

  test('non admin', async () => {
    testUtils.authenticateUser('svetlio', false);
    const response = await request(app.callback()).post(DELETE_USER_URL);
    expect(response.status).toEqual(403);
  });

  test('not authenticated', async () => {
    testUtils.authenticateUser(null);
    const response = await request(app.callback()).post(DELETE_USER_URL);
    expect(response.status).toEqual(401);
  });

  test('delete admin', async () => {
    testUtils.authenticateUser('svetlio', true);
    const response = await request(app.callback())
      .post(DELETE_USER_URL)
      .send({ username: 'admin' });
    expect(response.status).toEqual(400);
  });
});
