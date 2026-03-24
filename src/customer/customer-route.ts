import { asyncWrapper } from '../common/utils/wrapper';
import express from 'express';
import { CustomerController } from './customer-controller';
import { CustomerService } from './customer-service';
import authenticate from '../common/middlewares/authenticate';
import logger from '../config/logger';

const router = express.Router();
const customerService = new CustomerService();
const customerController = new CustomerController(customerService, logger);

router.route('/').get(authenticate, asyncWrapper(customerController.getCustomer));
router.route('/addresses/:id').patch(authenticate, asyncWrapper(customerController.addAddress));

export default router;
