import express from 'express';
import router from './src/routes/webhook.js';

const app = express();

const port = 3000;

app.use(express.json());
app.use('/webhook', router);

app.listen(port, () => {
  console.log('Running...');
});
