import { asyncWrapper } from '../common/utils/wrapper';
import express from 'express';
import { CustomerController } from './customer-controller';
import { CustomerService } from './customer-service';
import authenticate from '../common/middlewares/authenticate';

const router = express.Router();
const customerService = new CustomerService();
const customerController = new CustomerController(customerService);

router.route('/').get(authenticate, asyncWrapper(customerController.getCustomer));

export default router;
