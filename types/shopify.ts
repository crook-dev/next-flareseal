// types/shopify.ts
export interface ShopifyImage {
  id: string;
  url: string;
  altText: string;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: ShopifyPrice;
  compareAtPrice?: ShopifyPrice;
  availableForSale: boolean;
  quantityAvailable?: number;
  image?: ShopifyImage;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  publishedAt: string;
  tags: string[];
  vendor: string;
  productType: string;
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyVariant }[] };
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  image?: ShopifyImage;
  products: { edges: { node: ShopifyProduct }[] };
}

// Formatted types for our components
export interface FormattedImage {
  id: string;
  url: string;
  altText: string;
  width: number;
  height: number;
}

export interface FormattedVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice: number | null;
  currencyCode: string;
  availableForSale: boolean;
  quantityAvailable?: number;
  image?: FormattedImage;
}

export interface FormattedProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  publishedAt: string;
  tags: string[];
  vendor: string;
  productType: string;
  images: FormattedImage[];
  variants: FormattedVariant[];
}

export interface FormattedCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  image?: FormattedImage;
  products: FormattedProduct[];
}

// Collection with raw Shopify products (for internal API use)
export interface CollectionWithProducts {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  image?: ShopifyImage;
  products: ShopifyProduct[];
}

export interface CartLineItem {
  variantId: string;
  quantity: number;
}

// GraphQL Variables Types
export interface ProductsQueryVariables {
  first: number;
  after?: string | null;
}

export interface CollectionsQueryVariables {
  first: number;
}

export interface ProductQueryVariables {
  handle: string;
}

// Union type for all possible GraphQL variables
export type GraphQLVariables = 
  | ProductsQueryVariables 
  | CollectionsQueryVariables 
  | ProductQueryVariables 
  | Record<string, never>; // For queries with no variables// types/shopify.ts
export interface ShopifyImage {
  id: string;
  url: string;
  altText: string;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: ShopifyPrice;
  compareAtPrice?: ShopifyPrice;
  availableForSale: boolean;
  quantityAvailable?: number;
  image?: ShopifyImage;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  publishedAt: string;
  tags: string[];
  vendor: string;
  productType: string;
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyVariant }[] };
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  image?: ShopifyImage;
  products: { edges: { node: ShopifyProduct }[] };
}

// Formatted types for our components
export interface FormattedImage {
  id: string;
  url: string;
  altText: string;
  width: number;
  height: number;
}

export interface FormattedVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice: number | null;
  currencyCode: string;
  availableForSale: boolean;
  quantityAvailable?: number;
  image?: FormattedImage;
}

export interface FormattedProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  publishedAt: string;
  tags: string[];
  vendor: string;
  productType: string;
  images: FormattedImage[];
  variants: FormattedVariant[];
}

export interface FormattedCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  image?: FormattedImage;
  products: FormattedProduct[];
}

export interface CartLineItem {
  variantId: string;
  quantity: number;
}