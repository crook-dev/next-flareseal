import { 
  ShopifyProduct, 
  ShopifyCollection, 
  FormattedProduct, 
  CartLineItem,
  GraphQLVariables,
  ProductsQueryVariables,
  CollectionsQueryVariables,
  ProductQueryVariables,
  CollectionWithProducts
} from '@/types/shopify';

const shopifyDomain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const shopifyUrl = `https://${shopifyDomain}/api/2024-10/graphql.json`;

// API response types (SINGLE DEFINITION)
interface ProductsResponse {
  products: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    edges: { node: ShopifyProduct }[];
  };
}

interface CollectionsResponse {
  collections: {
    edges: { node: ShopifyCollection }[];
  };
}

interface ProductResponse {
  product: ShopifyProduct;
}

// Basic GraphQL client for Shopify
async function shopifyFetch<T>(query: string, variables: GraphQLVariables = {}): Promise<T> {
  const response = await fetch(shopifyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken as string,
    } as HeadersInit,
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const result = await response.json();
  
  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }

  return result.data;
}

// GraphQL queries
const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          publishedAt
          tags
          vendor
          productType
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
                quantityAvailable
                image {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;

const GET_COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          image {
            id
            url
            altText
            width
            height
          }
          products(first: 50) {
            edges {
              node {
                id
                title
                handle
                description
                descriptionHtml
                publishedAt
                tags
                vendor
                productType
                images(first: 10) {
                  edges {
                    node {
                      id
                      url
                      altText
                      width
                      height
                    }
                  }
                }
                variants(first: 10) {
                  edges {
                    node {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                      availableForSale
                      quantityAvailable
                      image {
                        id
                        url
                        altText
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const GET_PRODUCT_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      publishedAt
      tags
      vendor
      productType
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale
            quantityAvailable
            image {
              id
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
`;

// Utility functions to fetch data
export async function getAllProducts(): Promise<ShopifyProduct[]> {
  let allProducts: ShopifyProduct[] = [];
  let hasNextPage = true;
  let cursor: string | null = null;

  while (hasNextPage) {
    const variables: ProductsQueryVariables = {
      first: 20,
      after: cursor,
    };

    const data = await shopifyFetch<ProductsResponse>(GET_PRODUCTS_QUERY, variables);

    const products = data.products.edges.map(edge => edge.node);
    allProducts = [...allProducts, ...products];

    hasNextPage = data.products.pageInfo.hasNextPage;
    cursor = data.products.pageInfo.endCursor;
  }

  return allProducts;
}

export async function getAllCollections(): Promise<CollectionWithProducts[]> {
  const variables: CollectionsQueryVariables = {
    first: 20,
  };

  const data = await shopifyFetch<CollectionsResponse>(GET_COLLECTIONS_QUERY, variables);

  return data.collections.edges.map(edge => ({
    id: edge.node.id,
    title: edge.node.title,
    handle: edge.node.handle,
    description: edge.node.description,
    descriptionHtml: edge.node.descriptionHtml,
    image: edge.node.image,
    products: edge.node.products.edges.map(productEdge => productEdge.node)
  }));
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const variables: ProductQueryVariables = { handle };
  const data = await shopifyFetch<ProductResponse>(GET_PRODUCT_QUERY, variables);
  return data.product;
}

// Helper function to format product data
export function formatProductData(product: ShopifyProduct): FormattedProduct {
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    publishedAt: product.publishedAt,
    tags: product.tags,
    vendor: product.vendor,
    productType: product.productType,
    images: product.images.edges.map(edge => ({
      id: edge.node.id,
      url: edge.node.url,
      altText: edge.node.altText || product.title,
      width: edge.node.width,
      height: edge.node.height,
    })),
    variants: product.variants.edges.map(edge => ({
      id: edge.node.id,
      title: edge.node.title,
      price: parseFloat(edge.node.price.amount),
      compareAtPrice: edge.node.compareAtPrice ? parseFloat(edge.node.compareAtPrice.amount) : null,
      currencyCode: edge.node.price.currencyCode,
      availableForSale: edge.node.availableForSale,
      quantityAvailable: edge.node.quantityAvailable,
      image: edge.node.image ? {
        id: edge.node.image.id,
        url: edge.node.image.url,
        altText: edge.node.image.altText || product.title,
        width: edge.node.image.width,
        height: edge.node.image.height,
      } : undefined,
    })),
  };
}

// Generate checkout URL - Updated to handle Shopify variant ID format
export function generateCheckoutUrl(lineItems: CartLineItem[]): string {
  const shopifyDomain = 'flareseal.myshopify.com'; // Hardcode your domain
  const baseUrl = `https://${shopifyDomain}/cart/`;
  
  // Extract numeric ID from Shopify variant ID
  const cartParams = lineItems.map(item => {
    const variantId = item.variantId.split('/').pop() || item.variantId;
    return `${variantId}:${item.quantity}`;
  }).join(',');
  
  return `${baseUrl}${cartParams}`;
}

// Alternative checkout URL format (more reliable)
export function generateCheckoutUrlAlt(lineItems: CartLineItem[]): string {
  if (!shopifyDomain) {
    throw new Error('Shopify domain not configured');
  }
  
  const baseUrl = `https://${shopifyDomain}/cart/add?`;
  const params = new URLSearchParams();
  
  lineItems.forEach((item) => {
    // Extract numeric ID from Shopify variant ID
    const variantId = item.variantId.split('/').pop() || item.variantId;
    params.append('id', variantId);
    params.append('quantity', item.quantity.toString());
  });
  
  return `${baseUrl}${params.toString()}`;
}