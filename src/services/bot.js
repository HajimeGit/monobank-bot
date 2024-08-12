import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_KEY, { polling: false });

export const startBotPolling = () => {
  bot.startPolling();
};

export default bot;
