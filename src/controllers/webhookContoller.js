import ky from 'ky';
import { isUrlValid } from '../utils/url.js';
import { webhookEmitter } from '../events/webhookEmitter.js';

export const setWebHook = async (req, res) => {
  const { webHookUrl } = req.body;

  if (!isUrlValid(webHookUrl)) {
    return res.status(400).json({ error: 'Webhook url is not valid.' });
  }

  const webhookUrl = 'https://api.monobank.ua/personal/webhook';
  const result = await ky
    .post(webhookUrl, {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': process.env?.MONOBANK_API_KEY,
      },
      json: {
        webHookUrl: webHookUrl,
      },
    })
    .json();

  if (result?.status === 'ok') {
    res.status(200).json({ status: 'Webhook has been set successfully.' });
  } else {
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};

export const confirmWebhook = (req, res) => {
  return res.status(200).send();
};

export const processWebhook = (req, res) => {
  const data = req.body?.data;

  if (data) {
    webhookEmitter.emit('webhookReceived', {
      data,
    });
  }

  return res.status(200).send();
};
