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

const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

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

// Cart response types (updated for current API)
interface CartCreateResponse {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
      estimatedCost: {
        subtotalAmount: {
          amount: string;
          currencyCode: string;
        };
        totalTaxAmount: {
          amount: string;
          currencyCode: string;
        };
        totalAmount: {
          amount: string;
          currencyCode: string;
        };
      };
      lines: {
        edges: Array<{
          node: {
            id: string;
            quantity: number;
            merchandise: {
              id: string;
              title: string;
            };
          };
        }>;
      };
    };
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
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

// Cart creation mutation (updated for current API)
const CREATE_CART_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        estimatedCost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 250) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
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

// MAIN CHECKOUT FUNCTION - Creates a proper Shopify checkout session
export async function createCheckout(lineItems: CartLineItem[]): Promise<string> {
  console.log('🛒 Creating Shopify checkout with items:', lineItems);
  console.log('🔧 DEBUG - shopifyDomain:', shopifyDomain);
  console.log('🔧 DEBUG - storefrontAccessToken:', storefrontAccessToken ? 'EXISTS' : 'MISSING');
  console.log('🔧 DEBUG - Raw env vars:', {
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'EXISTS' : 'MISSING'
  });
  
  if (!shopifyDomain || !storefrontAccessToken) {
    throw new Error('Shopify configuration missing. Check environment variables.');
  }

  if (lineItems.length === 0) {
    throw new Error('Cannot create checkout with empty cart');
  }

  // Format line items for Shopify Cart API
  const cartLines = lineItems.map(item => ({
    merchandiseId: item.variantId, // Use merchandiseId for Cart API
    quantity: item.quantity,
  }));

  console.log('🔧 Formatted line items for cart:', cartLines);

  const variables = {
    input: {
      lines: cartLines,
    },
  };

  try {
    const data = await shopifyFetch<CartCreateResponse>(CREATE_CART_MUTATION, variables);
    
    console.log('✅ Cart creation response:', data);

    if (data.cartCreate.userErrors.length > 0) {
      const errors = data.cartCreate.userErrors.map(error => error.message).join(', ');
      throw new Error(`Cart creation failed: ${errors}`);
    }

    const checkoutUrl = data.cartCreate.cart.checkoutUrl;
    console.log('🌐 Generated checkout URL:', checkoutUrl);
    
    return checkoutUrl;
  } catch (error) {
    console.error('❌ Cart creation error:', error);
    throw new Error(`Failed to create checkout: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// UPDATED: Generate checkout URL using the new createCheckout function
export async function generateCheckoutUrl(lineItems: CartLineItem[]): Promise<string> {
  return await createCheckout(lineItems);
}

// Legacy cart URL functions (keep for backup, but use createCheckout instead)
export function generateCartUrl(lineItems: CartLineItem[]): string {
  const baseUrl = `https://${shopifyDomain}/cart/`;
  
  const cartParams = lineItems.map(item => {
    const variantId = item.variantId.split('/').pop() || item.variantId;
    return `${variantId}:${item.quantity}`;
  }).join(',');
  
  return `${baseUrl}${cartParams}`;
}

export function generateCartAddUrl(lineItems: CartLineItem[]): string {
  if (!shopifyDomain) {
    throw new Error('Shopify domain not configured');
  }
  
  const baseUrl = `https://${shopifyDomain}/cart/add?`;
  const params = new URLSearchParams();
  
  lineItems.forEach((item) => {
    const variantId = item.variantId.split('/').pop() || item.variantId;
    params.append('id', variantId);
    params.append('quantity', item.quantity.toString());
  });
  
  return `${baseUrl}${params.toString()}`;
}