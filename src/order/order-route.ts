import express from 'express';
import { OrderController } from './order-controller';
import authenticate from '../common/middlewares/authenticate';
import { asyncWrapper } from '../common/utils/wrapper';

const router = express.Router();

const orderController = new OrderController();

router.post('/', authenticate, asyncWrapper(orderController.create));

export default router;
