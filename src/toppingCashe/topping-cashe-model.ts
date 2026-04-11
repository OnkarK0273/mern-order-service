import { ToppingPriceCache } from './topping-cashe-types';
import mongoose from 'mongoose';

const toppingCacheSchema = new mongoose.Schema<ToppingPriceCache>({
  toppingId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tenantId: {
    type: String,
    required: true,
  },
});

export default mongoose.model<ToppingPriceCache>('ToppingPriceCache', toppingCacheSchema, 'toppingCache');
