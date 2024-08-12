import request from 'supertest';
import express from 'express';
import nock from 'nock';
import router from '../routes/webhook.js';

const app = express();
app.use(express.json());
app.use('/webhook', router);

describe('Tests the Webhook setting', () => {
  test('should respond with 200 when trying to set a webhook', async () => {
    const mockApiResponse = { status: 'ok' };

    nock('https://api.monobank.ua')
      .post('/personal/webhook')
      .reply(200, mockApiResponse);

    const mockData = {
      webHookUrl: 'http://localhost:3000/webhook/process',
    };

    const response = await request(app)
      .post('/webhook/set')
      .send(mockData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'status',
      'Webhook has been set successfully.'
    );
    expect(nock.isDone()).toBe(true); // Ensure the mock was called
  });

  test('should respond with 200 when webhook is confirmed', async () => {
    const response = await request(app).get('/webhook/process');
    expect(response.status).toBe(200);
  });
});
