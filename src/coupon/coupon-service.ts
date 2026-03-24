import couponModel from './coupon-model';
import { Coupon, Filter } from './coupon-types';

export class CouponService {
  async createCoupon(coupon: Coupon) {
    return await couponModel.create(coupon);
  }

  async updateCoupon(couponId: string, coupon: Partial<Coupon>) {
    return await couponModel.findByIdAndUpdate({ _id: couponId }, { $set: coupon }, { returnDocument: 'after' });
  }

  async getCoupon() {
    return await couponModel.find();
  }

  async findCoupan(filterData: Filter) {
    return await couponModel.findOne(filterData);
  }

  async getById(couponId: string) {
    return await couponModel.findById(couponId);
  }

  async deleteById(couponId: string) {
    return await couponModel.findByIdAndDelete(couponId);
  }
}
