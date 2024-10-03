# Monobank Bot

## Overview

This project is a Monobank bot built with Node.js. It integrates with Monobank's API to provide automated responses and services via a Telegram bot. The project is designed to handle webhooks and process events efficiently. It includes features like webhook handling, event-driven architecture, and integration with Telegram.
## Features

- **Monobank Integration**: Integrates with Monobank's API to retrieve data and handle account-related activities.
- **Telegram Bot**: A bot that interacts with users on Telegram, providing account details and updates via Monobank API.
- **Webhook Handling**: Listens to and processes incoming webhooks from Monobank and triggers appropriate responses.
- **Event-Driven Architecture**: Uses an event emitter to handle various events triggered by webhooks and the bot.
- **Testing**: Contains tests for webhook and Telegram interactions.



## Installation

Clone the repository:

```bash
  git clone git@github.com:HajimeGit/monobank-bot.git
  cd pbt
  npm install
```

Set up .env file:

```bash
  cp .example.env .env
```
## Usage/Testing

Run the code:
```bash
npm start
```
This will start the bot, and it will begin listening for webhooks and interacting with users via Telegram.

To run tests, use the following command:

```bash
npm test
```
This will run unit tests for the webhook and Telegram bot functionality.
## Environment Variables
The following environment variables must be configured in the .env file:

- **MONOBANK_API_KEY**: Your Monobank API key.
- **TELEGRAM_BOT_TOKEN**: Your Telegram bot token.
- **WEBHOOK_URL**: The URL for webhook handling.