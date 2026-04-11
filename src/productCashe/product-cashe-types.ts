export interface PriceConfiguration {
  priceType: 'base' | 'aditional';
  availableOptions: {
    [key: string]: number;
  };
}
export interface ProductPricingCache {
  productId: string;
  priceConfiguration: PriceConfiguration;
}

export interface ProductMessage {
  id: string;
  priceConfiguration: PriceConfiguration;
}
