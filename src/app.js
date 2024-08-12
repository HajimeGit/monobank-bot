import express from 'express';
import router from './routes/webhook.js';
import './services/webhookSubscriber.js';

const app = express();

app.use(express.json());
app.use('/webhook', router);

app.listen(process.env.PORT, () => {
  console.log('Server is running...');
});
