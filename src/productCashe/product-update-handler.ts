import { ProductMessage } from './product-cashe-types';
import productCacheModel from './product-cashe-model';
import logger from '../config/logger';

export const handleProductUpdate = async (value: string) => {
  try {
    const product = JSON.parse(value) as ProductMessage;

    return await productCacheModel.updateOne(
      {
        productId: product.id,
      },
      {
        $set: {
          priceConfiguration: product.priceConfiguration,
        },
      },
      { upsert: true },
    );
  } catch (error: unknown) {
    logger.error(error);
  }
};
