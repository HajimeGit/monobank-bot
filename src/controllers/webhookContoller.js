import ky from 'ky';
import { isUrlValid } from '../utils/url.js';
import bot from '../services/bot.js';

export const setWebHook = async (req, res) => {
  const { webHookUrl } = req.body;

  if (!isUrlValid(webHookUrl)) {
    return res.status(400).json({ error: 'Webhook url is not valid.' });
  }

  const result = await ky
    .post('https://api.monobank.ua/personal/webhook', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': 'token',
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

  if (data?.account && data.account === 'card_account') {
    const statementItem = data?.statementItem;
    const currencyCode = statementItem?.currencyCode;
    const balance = parseNumber(statementItem?.balance, currencyCode);
    const description = statementItem?.description;
    const amount = parseNumber(statementItem?.amount, currencyCode);

    bot.sendMessage(
      'chat_id',
      amount + '\n' + description + '\n' + 'Баланс ' + balance
    );
  }
  res.send('200');
};
