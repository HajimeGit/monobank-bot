import express from 'express';
import router from './src/routes/webhook.js';
import './src/services/webhookSubscriber.js';

const app = express();

app.use(express.json());
app.use('/webhook', router);

app.listen(process.env.PORT, () => {
  console.log('Server is running...');
});
