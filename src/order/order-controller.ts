import { Response } from 'express';
import { CartItem, CreateOrderRequest, Topping } from './order-types';
import productCacheModel from '../productCashe/product-cashe-model';
import toppingCasheModel from '../toppingCashe/topping-cashe-model';
import { ProductPricingCache } from '../productCashe/product-cashe-types';
import { ToppingPriceCache } from '../toppingCashe/topping-cashe-types';

export class OrderController {
  create = async (req: CreateOrderRequest, res: Response) => {
    const cartItems = req.body.cart;

    const totalPrice = await this.calculateTotal(cartItems);

    return res.json({ totalPrice: totalPrice });
  };

  private calculateTotal = async (cart: CartItem[]) => {
    const productIds = cart.map((item) => item._id);

    // todo: proper error handling..
    const productPricings = await productCacheModel.find({
      productId: {
        $in: productIds,
      },
    });

    const cartToppingIds = cart.reduce<string[]>((acc, item) => {
      return [...acc, ...item.chosenConfiguration.selectedToppings.map((topping) => topping._id)];
    }, []);

    // todo: What will happen if topping does not exists in the cache
    const toppingPricings = await toppingCasheModel.find({
      toppingId: {
        $in: cartToppingIds,
      },
    });

    const totalPrice = cart.reduce((acc, curr) => {
      const cachedProductPrice = productPricings.find((product) => product.productId === curr._id);

      if (!cachedProductPrice) {
        throw new Error(`Product pricing not found in cache for ${curr._id}`);
      }

      return acc + curr.qty * this.getItemTotal(curr, cachedProductPrice, toppingPricings);
    }, 0);

    return totalPrice;
  };

  private getItemTotal = (
    item: CartItem,
    cachedProductPrice: ProductPricingCache,
    toppingsPricings: ToppingPriceCache[],
  ) => {
    const toppingsTotal = item.chosenConfiguration.selectedToppings.reduce((acc, curr) => {
      return acc + this.getCurrentToppingPrice(curr, toppingsPricings);
    }, 0);

    const productTotal = Object.entries(item.chosenConfiguration.priceConfiguration).reduce((acc, [key, value]) => {
      // Force TypeScript to treat it as a dictionary locally
      type PriceConfigDict = Record<string, { availableOptions: Record<string, number> }>;
      const configDict = cachedProductPrice.priceConfiguration as unknown as PriceConfigDict;

      const price = configDict[key].availableOptions[value];
      return acc + price;
    }, 0);

    return productTotal + toppingsTotal;
  };

  private getCurrentToppingPrice = (topping: Topping, toppingPricings: ToppingPriceCache[]) => {
    const currentTopping = toppingPricings.find((current) => topping._id === current.toppingId);

    if (!currentTopping) {
      // todo: Make sure the item is in the cache else, maybe call catalog service.
      return topping.price;
    }

    return currentTopping.price;
  };
}
