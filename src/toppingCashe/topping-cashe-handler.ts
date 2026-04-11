import { ToppingPriceCache } from './topping-cashe-types';
import toppingCasheModel from './topping-cashe-model';
import logger from '../config/logger';

export const handleToppingUpdate = async (value: string) => {
  try {
    const topping = JSON.parse(value) as ToppingPriceCache;

    return await toppingCasheModel.updateOne(
      {
        toppingId: topping.id,
      },
      {
        $set: {
          price: topping.price,
          tenantId: topping.tenantId,
        },
      },
      {
        upsert: true,
      },
    );
  } catch (error) {
    logger.error(error);
  }
};
