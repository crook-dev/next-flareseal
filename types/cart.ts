export interface CartItem {
    variantId: string;
    productId: string;
    productTitle: string;
    productHandle: string;
    variantTitle: string;
    price: number;
    compareAtPrice?: number;
    currencyCode: string;
    quantity: number;
    image?: {
      url: string;
      altText: string;
    };
    availableForSale: boolean;
  }
  
  export interface Cart {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    currencyCode: string;
  }