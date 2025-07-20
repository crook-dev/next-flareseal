// lib/gtm.ts - GTM tracking utilities with proper TypeScript types

// Import your existing types from Shopify
import { FormattedProduct, FormattedVariant } from '@/types/shopify';

// GTM Event Types
interface GTMEvent {
  event: string;
  [key: string]: unknown;
}

interface GTMEcommerceItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_variant?: string;
  price: number;
  quantity: number;
}

interface GTMEcommerce {
  currency: string;
  value: number;
  items: GTMEcommerceItem[];
  transaction_id?: string;
}

interface GTMPageView extends GTMEvent {
  event: 'page_view';
  page_title: string;
  page_location: string;
}

interface GTMViewItem extends GTMEvent {
  event: 'view_item';
  ecommerce: GTMEcommerce;
}

interface GTMAddToCart extends GTMEvent {
  event: 'add_to_cart';
  ecommerce: GTMEcommerce;
}

interface GTMPurchase extends GTMEvent {
  event: 'purchase';
  ecommerce: GTMEcommerce;
}

// Purchase Item Type
interface PurchaseItem {
  product_id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

// Type for window with dataLayer (avoiding global declaration conflicts)
interface WindowWithDataLayer extends Window {
  dataLayer?: DataLayerArray;
}

// Type for window.dataLayer (avoiding global declaration conflicts)
type DataLayerArray = GTMEvent[];

// Initialize dataLayer if it doesn't exist
export const initializeGTM = (): void => {
  if (typeof window !== 'undefined') {
    const windowWithDataLayer = window as WindowWithDataLayer;
    windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
  }
}

// Helper function to get dataLayer safely
const getDataLayer = (): DataLayerArray | undefined => {
  if (typeof window !== 'undefined') {
    const windowWithDataLayer = window as WindowWithDataLayer;
    return windowWithDataLayer.dataLayer;
  }
  return undefined;
}

// Track page views
export const trackPageView = (url: string, title: string): void => {
  const dataLayer = getDataLayer();
  if (dataLayer) {
    const event: GTMPageView = {
      event: 'page_view',
      page_title: title,
      page_location: url,
    };
    dataLayer.push(event);
  }
}

// Track product views
export const trackProductView = (product: FormattedProduct): void => {
  const dataLayer = getDataLayer();
  if (dataLayer) {
    const event: GTMViewItem = {
      event: 'view_item',
      ecommerce: {
        currency: 'USD',
        value: product.variants[0]?.price || 0,
        items: [{
          item_id: product.id,
          item_name: product.title,
          item_category: product.productType || 'HVAC Products',
          price: product.variants[0]?.price || 0,
          quantity: 1
        }]
      }
    };
    dataLayer.push(event);
  }
}

// Track add to cart
export const trackAddToCart = (
  product: FormattedProduct, 
  variant: FormattedVariant, 
  quantity: number = 1
): void => {
  const dataLayer = getDataLayer();
  if (dataLayer) {
    const event: GTMAddToCart = {
      event: 'add_to_cart',
      ecommerce: {
        currency: 'USD',
        value: variant.price * quantity,
        items: [{
          item_id: product.id,
          item_name: product.title,
          item_variant: variant.title,
          item_category: product.productType || 'HVAC Products',
          price: variant.price,
          quantity: quantity
        }]
      }
    };
    dataLayer.push(event);
  }
}

// Track purchases (for checkout success page)
export const trackPurchase = (
  transactionId: string, 
  items: PurchaseItem[], 
  total: number
): void => {
  const dataLayer = getDataLayer();
  if (dataLayer) {
    const event: GTMPurchase = {
      event: 'purchase',
      ecommerce: {
        transaction_id: transactionId,
        value: total,
        currency: 'USD',
        items: items.map(item => ({
          item_id: item.product_id,
          item_name: item.name,
          item_category: item.category,
          price: item.price,
          quantity: item.quantity
        }))
      }
    };
    dataLayer.push(event);
  }
}

// Track custom events
export const trackEvent = (
  eventName: string, 
  parameters: Record<string, unknown> = {}
): void => {
  const dataLayer = getDataLayer();
  if (dataLayer) {
    const event: GTMEvent = {
      event: eventName,
      ...parameters
    };
    dataLayer.push(event);
  }
}