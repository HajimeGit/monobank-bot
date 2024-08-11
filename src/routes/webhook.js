import express from 'express';
import {
  setWebHook,
  processWebhook,
  confirmWebhook,
} from '../controllers/webhookContoller.js';

const router = express.Router();

router.post('/set', setWebHook);
router.get('/process', confirmWebhook);
router.post('process', processWebhook);

export default router;
