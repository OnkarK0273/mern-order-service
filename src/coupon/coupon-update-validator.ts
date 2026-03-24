import { body } from 'express-validator';

export default [
  body('title')
    .exists()
    .withMessage('Coupon title is required')
    .isString()
    .withMessage('Coupon title should be a string'),
  body('code').exists().withMessage('code is required'),
  body('validUpto').exists().withMessage('validUpto is required'),
  body('discount').exists().withMessage('Discount field is required'),
  body('tenantId').exists().withMessage('Tenant id field is required'),
];
