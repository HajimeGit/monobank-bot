import TelegramBot from 'node-telegram-bot-api';

const token = 'token';
const bot = new TelegramBot(token, { polling: true });

export default bot;
