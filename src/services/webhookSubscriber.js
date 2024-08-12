import { webhookEmitter } from '../events/webhookEmitter.js';
import bot from './bot.js';
import { parseNumber } from '../utils/numbers.js';

webhookEmitter.on('webhookReceived', ({ data }) => {
  try {
    if (data?.account && data.account === process.env.CARD_ACCOUNT_ID) {
      sendMessage(data);
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
  }
});

const sendMessage = (data) => {
  const statementItem = data?.statementItem;
  const currencyCode = statementItem?.currencyCode;
  const balance = parseNumber(statementItem?.balance, currencyCode);
  const description = statementItem?.description;
  const amount = parseNumber(statementItem?.amount, currencyCode);

  bot.sendMessage(
    process.env?.TELEGRAM_CHAT_ID,
    amount + '\n' + description + '\n' + 'Баланс ' + balance
  );
};
