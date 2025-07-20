declare global {
    interface Window {
      dataLayer: any[];
    }
  }
  
  // Initialize dataLayer if it doesn't exist
  export const initializeGTM = () => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
    }
  }
  
  // Track page views
  export const trackPageView = (url: string, title: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: title,
        page_location: url,
      });
    }
  }
  
  // Track product views
  export const trackProductView = (product: any) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'view_item',
        ecommerce: {
          currency: 'USD',
          value: product.variants[0]?.price || 0,
          items: [{
            item_id: product.id,
            item_name: product.title,
            item_category: product.category || 'HVAC Products',
            price: product.variants[0]?.price || 0,
            quantity: 1
          }]
        }
      });
    }
  }
  
  // Track add to cart
  export const trackAddToCart = (product: any, variant: any, quantity: number = 1) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'add_to_cart',
        ecommerce: {
          currency: 'USD',
          value: variant.price * quantity,
          items: [{
            item_id: product.id,
            item_name: product.title,
            item_variant: variant.title,
            item_category: product.category || 'HVAC Products',
            price: variant.price,
            quantity: quantity
          }]
        }
      });
    }
  }
  
  // Track purchases (for checkout success page)
  export const trackPurchase = (transactionId: string, items: any[], total: number) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
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
      });
    }
  }
  
  // Track custom events
  export const trackEvent = (eventName: string, parameters: any = {}) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...parameters
      });
    }
  }