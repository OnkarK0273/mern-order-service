import { CouponService } from './coupon-service';
import { NextFunction, Request, Response } from 'express';
import { CreateCouponRequest, VerifyCouponRequest } from './coupon-types';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import { Logger } from 'winston';

export class CouponController {
  constructor(
    private couponService: CouponService,
    private logger: Logger,
  ) {}

  create = async (req: CreateCouponRequest, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(createHttpError(400, result.array()[0].msg as string));
    }
    const { title, tenantId, code, validUpto, discount } = req.body;

    const newCoupon = await this.couponService.createCoupon({
      title,
      tenantId,
      code,
      validUpto,
      discount,
    });

    this.logger.info(`Create Coupon`, { id: newCoupon?._id });

    res.json(newCoupon);
  };

  update = async (req: CreateCouponRequest, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(createHttpError(400, result.array()[0].msg as string));
    }
    const { title, tenantId, code, validUpto, discount } = req.body;
    const couponId = req.params.id as string;

    const updatedCoupon = await this.couponService.updateCoupon(couponId, {
      title,
      tenantId,
      code,
      validUpto,
      discount,
    });

    this.logger.info(`Update Coupon`, { id: updatedCoupon?._id });
    res.json(updatedCoupon);
  };

  veryfy = async (req: VerifyCouponRequest, res: Response, next: NextFunction) => {
    const { code, tenantId } = req.body;

    const coupon = await this.couponService.findCoupan({ code, tenantId });

    if (!coupon) {
      const error = createHttpError(400, 'Coupon does not exists');
      return next(error);
    }

    // validate expiry
    const currentDate = new Date();
    const couponDate = new Date(coupon.validUpto);

    if (currentDate <= couponDate) {
      return res.json({ valid: true, discount: coupon.discount });
    }

    return res.json({ valid: false, discount: 0 });
  };

  getAll = async (req: Request, res: Response) => {
    const couponList = await this.couponService.getCoupon();

    this.logger.info(`Get all coupons`);
    res.json(couponList);
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    const coupoinId = req.params.id as string;
    const coupon = await this.couponService.getById(coupoinId);

    if (!coupon) {
      return next(createHttpError(404, 'Coupon not found'));
    }

    this.logger.info(`Get one coupon`, { id: coupon?._id });
    res.json(coupon);
  };

  delete = async (req: Request, res: Response) => {
    const coupoinId = req.params.id as string;
    await this.couponService.deleteById(coupoinId);

    this.logger.info(`Delete coupons`, { id: coupoinId });
    res.json({ id: coupoinId });
  };
}
