import express from 'express';
import { CouponService } from './coupon-service';
import { CouponController } from './coupon-controller';
import { asyncWrapper } from '../common/utils/wrapper';
import logger from '../config/logger';
import authenticate from '../common/middlewares/authenticate';
import couponCreateValidator from './coupon-create-validator';
import couponUpdateValidator from './coupon-update-validator';

const router = express.Router();

const couponService = new CouponService();
const couponController = new CouponController(couponService, logger);

router.route('/').post(authenticate, couponCreateValidator, asyncWrapper(couponController.create));
router.route('/verify').post(authenticate, asyncWrapper(couponController.veryfy));

router.route('/:id').patch(authenticate, couponUpdateValidator, asyncWrapper(couponController.update));

router.route('/').get(authenticate, asyncWrapper(couponController.getAll));
router.route('/:id').get(authenticate, asyncWrapper(couponController.getOne));

router.route('/:id').delete(authenticate, asyncWrapper(couponController.delete));

export default router;
