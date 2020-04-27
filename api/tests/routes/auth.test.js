const request = require('supertest');
const mongoose = require('mongoose')
const app = require('../../src/app');
const config = require('../../src/config');
const extractCookies = require('../utils').extractCookies;
const auth = require('../../src/services/auth');
const User = require('../../src/models/User').User;
const Session = require('../../src/models/Session').Session;

beforeEach(async done => {
  await User.deleteMany({ username: { $ne: config.ADMIN_USERNAME } });
  await auth.ensureAdminUser();
  await Session.deleteMany({});
  done();
});

afterAll(async done => {
  await mongoose.disconnect();
  done();
});

const USER = 'user';
const PASS = 'secret';

describe('auth register', () => {
  const REGISTER_URL = '/api/v1/register';

  test('success', async () => {
    expect(await User.countDocuments()).toBe(1);

    const response = await request(app.callback())
      .post(REGISTER_URL)
      .send({ username: USER, password: PASS })

    expect(response.status).toEqual(200);
    expect(await User.countDocuments()).toBe(2);
    expect(await User.exists({ username: USER, isAdmin: false })).toBe(true);
  });

  test('invalid data', async () => {
    const response = await request(app.callback())
      .post(REGISTER_URL)
      .send({ username: USER })
    expect(response.status).toEqual(400);
    expect(await User.countDocuments()).toBe(1);
  });

  test('user already exists', async () => {
    const response = await request(app.callback())
      .post(REGISTER_URL)
      .send({ username: USER, password: PASS })
    expect(response.status).toEqual(200);
    expect(await User.exists({ username: USER })).toBe(true);

    // const secondResponse = await request(app.callback()).post(REGISTER_URL)
    //   .send({ username: USER, password: PASS })
    // expect(secondResponse.status).toEqual(400);
  });
});

describe('auth login', () => {
  const LOGIN_URL = '/api/v1/login';

  test('success', async () => {
    const response = await request(app.callback())
      .post(LOGIN_URL)
      .send({ username: config.ADMIN_USERNAME, password: config.ADMIN_PASSWORD });

    expect(response.status).toEqual(200);
    expect(extractCookies(response.header)).toHaveProperty('sessionid');
    expect(response.body.isAdmin).toBe(true);
  });

  test('bad data', async () => {
    const response = await request(app.callback())
      .post(LOGIN_URL)
      .send({ password: PASS });
    expect(response.status).toEqual(400);
    expect(response.header).not.toHaveProperty('set-cookie');
  });

  test('wrong credentials', async () => {
    const response = await request(app.callback())
      .post(LOGIN_URL)
      .send({ username: config.ADMIN_USERNAME, password: 'wrong' });
    expect(response.status).toEqual(401);
    expect(response.header).not.toHaveProperty('set-cookie');
  });
});

describe('auth logout', () => {
  const LOGOUT_URL = '/api/v1/logout';
  const LOGIN_URL = '/api/v1/login';

  test('success', async () => {
    const loginResp = await request(app.callback())
      .post(LOGIN_URL)
      .send({
        username: config.ADMIN_USERNAME,
        password: config.ADMIN_PASSWORD
      });
    expect(loginResp.status).toEqual(200);

    const sessionid = (await Session.find())[0].sessionid;
    const response = await request(app.callback())
      .post(LOGOUT_URL)
      .set('Cookie', [`sessionid=${sessionid}`]);
    expect(response.status).toEqual(200);
    expect(await Session.countDocuments()).toBe(0);
  });

  test('not logged in', async () => {
    const response = await request(app.callback())
      .post(LOGOUT_URL)
    expect(response.status).toEqual(401);
  });
});
