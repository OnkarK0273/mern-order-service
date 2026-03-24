import mongoose from 'mongoose';
import { Coupon } from './coupon-types';

const couponSchema = new mongoose.Schema<Coupon>(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    validUpto: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    tenantId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Coupon', couponSchema);
