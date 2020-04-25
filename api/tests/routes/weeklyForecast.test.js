const axios = require('axios');
const request = require('supertest');
const server = require('../../src/server');
const mockedData = require('../mockData');

jest.mock('axios');

beforeAll(async () => {
  console.log('Jest starting!');
});

afterAll(() => {
  server.close();
  console.log('server closed!');
});

describe('weekly forecast', () => {
  const WEEKLY_API_FORECAST_URL = '/api/v1/weekly-forecast';

  test('success get', async () => {
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
    axios.get.mockImplementationOnce(() => Promise.reject(new Error('service not available')));

    const response = await request(server).get(WEEKLY_API_FORECAST_URL);

    expect(response.status).toEqual(500);
  });
});
