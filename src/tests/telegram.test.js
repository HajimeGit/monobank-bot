import request from 'supertest';
import express from 'express';
import router from '../routes/webhook.js';
import nock from 'nock';
import '../services/webhookSubscriber.js';

const app = express();
app.use(express.json());
app.use('/webhook', router);

describe('Tests of parsing received webhook updates', () => {
  test('should send a message to the Telegram API when a webhook is received', async () => {
    const data = {
      type: 'StatementItem',
      data: {
        account: process.env.CARD_ACCOUNT_ID,
        statementItem: {
          id: 'pTqQ6LW1fGZj7m_NXw',
          time: 1723303221,
          description: 'Переказ на картку',
          amount: -100,
          operationAmount: -100,
          currencyCode: 980,
          balance: 321906,
          hold: true,
        },
      },
    };

    const expectedMessage = '-1,00 ₴\nПереказ на картку\nБаланс 3 219,06 ₴';

    nock('https://api.telegram.org')
      .post(`/bot${process.env.TELEGRAM_BOT_KEY}/sendMessage`, (body) => {
        return (
          body.chat_id === process.env.TELEGRAM_CHAT_ID &&
          body.text === expectedMessage
        );
      })
      .reply(200, { ok: true });

    await request(app).post('/webhook/process').send(data);
    expect(nock.isDone()).toBe(true);
  });
});
