const axios = require('axios');
const request = require('supertest');
const server = require('../../src/server');
const mockedData = require('../mockData');
const testUtils = require('../utils');

jest.mock('axios');
jest.mock('../../src/middlewares');

afterAll(done => {
  server.close(done);
});

describe('weekly forecast', () => {
  const WEEKLY_API_FORECAST_URL = '/api/v1/weekly-forecast';

  test('success get', async () => {
    testUtils.authenticateUser();
    axios.get.mockResolvedValue(mockedData.OWM_WEEKLY_FORECAST_RESPONSE);

    const response = await request(server).get(WEEKLY_API_FORECAST_URL);

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(8);
    const expectedKeys = ['temp', 'humidity', 'pressure', 'wind_speed', 'weather'];
    response.body.forEach(forecast => {
      expectedKeys.forEach(expectedKey => {
        expect(forecast).toHaveProperty(expectedKey);
      });
    });
  });

  test('owm api error', async () => {
    testUtils.authenticateUser();
    axios.get.mockImplementationOnce(() => Promise.reject(new Error('service not available')));

    const response = await request(server).get(WEEKLY_API_FORECAST_URL);

    expect(response.status).toEqual(500);
  });

  test('unauthenticated get', async () => {
    // TODO: find out how to mock only for a single test
    testUtils.authenticateUser(null);
    const response = await request(server).get(WEEKLY_API_FORECAST_URL);
    expect(response.status).toEqual(401);
  });
});
