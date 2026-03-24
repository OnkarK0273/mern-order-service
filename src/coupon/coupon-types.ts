import { Request } from 'express';
export interface Coupon {
  id?: string;
  title: string;
  code: string;
  validUpto: Date;
  tenantId: number;
  discount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Filter {
  code: string;
  tenantId: number;
}

export interface CreateCouponRequest extends Request {
  body: Coupon;
}

export interface VerifyCouponRequest extends Request {
  body: Filter;
}
