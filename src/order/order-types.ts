import { Request } from 'express';

export interface ProductPriceConfiguration {
  [key: string]: {
    priceType: 'base' | 'aditional';
    availableOptions: {
      [key: string]: number;
    };
  };
}

export type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  priceConfiguration: ProductPriceConfiguration;
};

export type Topping = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

// In product-cashe-types.ts
export interface ProductPricingCache {
  // ... your other properties (like productId, etc.)

  // Change this property to be a Record/Dictionary:
  priceConfiguration: Record<
    string,
    {
      priceType: 'base' | 'aditional';
      availableOptions: { [key: string]: number };
    }
  >;
}
export interface CartItem extends Pick<Product, '_id' | 'name' | 'image' | 'priceConfiguration'> {
  chosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: Topping[];
  };
  qty: number;
}

interface Body {
  cart: CartItem[];
  address: string;
  tenantId: string;
  customerId: string;
  paymentMode: string;
  comment: string;
  couponCode: string;
}

export interface CreateOrderRequest extends Request {
  body: Body;
}
