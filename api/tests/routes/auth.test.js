const request = require('supertest');
const fs = require('fs');
const bcrypt = require('bcrypt');
const server = require('../../src/server');
const config = require('../../src/config');
const extractCookies = require('../utils').extractCookies;

beforeEach(() => {
  fs.writeFileSync(config.USERS_FILE_PATH, "{}");
  fs.writeFileSync(config.SESSIONS_FILE_PATH, "{}");
});

afterAll(done => {
  server.close(done);
});

const USER = 'user';
const PASS = 'secret';

describe('auth register', () => {
  const REGISTER_URL = '/api/v1/register';

  const userExsits = (username, password) => {
    let users = JSON.parse(fs.readFileSync(config.USERS_FILE_PATH));
    return !!(users[username] && bcrypt.compare(password, users[username].password));
  };

  test('success', async () => {
    const response = await request(server).post(REGISTER_URL)
                                          .send({ username: USER, password: PASS })
    expect(response.status).toEqual(200);
    expect(userExsits(USER, PASS)).toBe(true);
  });

  test('invalid data', async () => {
    const response = await request(server).post(REGISTER_URL)
                                          .send({ username: USER })
    expect(response.status).toEqual(400);
    expect(userExsits(USER, PASS)).toBe(false);
  });

  test('user already exists', async () => {
    const response = await request(server).post(REGISTER_URL)
                                          .send({ username: USER, password: PASS })
    expect(response.status).toEqual(200);
    expect(userExsits(USER, PASS)).toBe(true);
    const secondResponse = await request(server).post(REGISTER_URL)
                                          .send({ username: USER, password: PASS })
    expect(secondResponse.status).toEqual(400);
    expect(userExsits(USER, PASS)).toBe(true);
  });
});

describe('auth login', () => {
  const LOGIN_URL = '/api/v1/login';

  beforeEach(async () => {
    const hashedPass = await bcrypt.hash(PASS, config.PASSWORD_SALT_ROUNDS);
    fs.writeFileSync(config.USERS_FILE_PATH, `{"${USER}": {"password": "${hashedPass}"}}`);
  });

  const sessionExists = sessionId => {
    let sessions = JSON.parse(fs.readFileSync(config.SESSIONS_FILE_PATH));
    return !!sessions[sessionId];
  };

  test('success', async () => {
    const response = await request(server).post(LOGIN_URL)
                                          .send({ username: USER, password: PASS });
    expect(response.status).toEqual(200);
    expect(extractCookies(response.header)).toHaveProperty('sessionid');
  });

  test('bad data', async () => {
    const response = await request(server).post(LOGIN_URL)
                                          .send({ password: PASS });
    expect(response.status).toEqual(400);
    expect(response.header).not.toHaveProperty('set-cookie');
  });

  test('wrong credentials', async () => {
    const response = await request(server).post(LOGIN_URL)
                                          .send({ username: USER, password: 'wrong' });
    expect(response.status).toEqual(401);
    expect(response.header).not.toHaveProperty('set-cookie');
  });
});
