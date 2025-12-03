import { Router } from 'express';
import currencyController from '../controllers/currencyController';

const router = Router();

router.get('/popular', currencyController.getPopularCurrencies);

export default router;