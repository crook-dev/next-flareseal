'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  X, 
  ArrowLeft, 
  CreditCard,
  AlertTriangle
} from 'lucide-react';

export default function CartPageContent() {
  const { cart, removeItem, updateQuantity, clearCart, getCartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const formatPrice = (price: number, currencyCode: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(price);
  };

  const handleCheckout = async () => {
    if (cart.items.length === 0) return;
    
    setIsCheckingOut(true);
    setCheckoutError(null); // Clear any previous errors
    
    try {
      const shopifyModule = await import('@/lib/shopify');
      const { createCheckout } = shopifyModule;
      
      // Convert cart items to Shopify checkout format
      const lineItems = cart.items.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));

      const checkoutUrl = await createCheckout(lineItems);
      
      // Small delay to show loading state, then redirect
      setTimeout(() => {
        window.location.href = checkoutUrl;
      }, 500);
      
    } catch (error) {
      console.error('Checkout error:', error);
      
      // Determine user-friendly error message
      let errorMessage = 'Unable to proceed to checkout';
      let errorDetails = '';
      
      const errorMsg = error instanceof Error ? error.message : String(error);
      
      if (errorMsg.includes('configuration missing')) {
        errorMessage = 'Store temporarily unavailable';
        errorDetails = 'We\'re experiencing technical difficulties. Please try again in a few minutes.';
      } else if (errorMsg.includes('empty cart')) {
        errorMessage = 'Cart is empty';
        errorDetails = 'Please add items to your cart before checking out.';
      } else if (errorMsg.includes('network') || errorMsg.includes('fetch')) {
        errorMessage = 'Connection issue';
        errorDetails = 'Please check your internet connection and try again.';
      } else if (errorMsg.includes('Checkout creation failed')) {
        errorMessage = 'Checkout unavailable';
        errorDetails = errorMsg.replace('Checkout creation failed: ', '') || 'Please try again.';
      } else {
        errorMessage = 'Something went wrong';
        errorDetails = 'Please try again. If the problem persists, try refreshing the page.';
      }
      
      setCheckoutError(`${errorMessage}. ${errorDetails}`);
      setIsCheckingOut(false);
    }
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
    }
  };

  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax estimate
  const total = subtotal + shipping + tax;

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <button
              onClick={handleClearCart}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Clear Cart
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="space-y-6">
                  {cart.items.map((item) => (
                    <div key={item.variantId} className="flex items-start space-x-4 py-6 border-b border-gray-200 last:border-b-0">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                        {item.image ? (
                          <Image
                            src={item.image.url}
                            alt={item.image.altText}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <ShoppingBag size={32} className="text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                              <Link 
                                href={`/products/${item.productHandle}`}
                                className="hover:text-indigo-600 transition-colors"
                              >
                                {item.productTitle}
                              </Link>
                            </h3>
                            {item.variantTitle !== 'Default Title' && (
                              <p className="text-sm text-gray-600 mb-2">
                                {item.variantTitle}
                              </p>
                            )}
                            
                            {/* Price */}
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-semibold text-gray-900">
                                {formatPrice(item.price, item.currencyCode)}
                              </span>
                              {item.compareAtPrice && item.compareAtPrice > item.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(item.compareAtPrice, item.currencyCode)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Remove item"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-700">Quantity:</span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                className="p-1 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} className={item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600'} />
                              </button>
                              <span className="w-12 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                className="p-1 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                              >
                                <Plus size={16} className="text-gray-600" />
                              </button>
                            </div>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">
                              {formatPrice(item.price * item.quantity, item.currencyCode)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-gray-500">
                                {formatPrice(item.price, item.currencyCode)} each
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Stock Status */}
                        <div className="mt-2">
                          {item.availableForSale ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              In Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-500 font-medium"
              >
                <ArrowLeft size={16} className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              {/* Error Alert - only show if there's an error */}
              {checkoutError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3 mb-6">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-red-800">{checkoutError}</p>
                    <button
                      onClick={() => setCheckoutError(null)}
                      className="mt-2 text-xs text-red-600 hover:text-red-500 underline"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}
              
              {/* Summary Items */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cart.totalItems} items)</span>
                  <span className="font-medium">{formatPrice(subtotal, cart.currencyCode)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : formatPrice(shipping, cart.currencyCode)}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (estimated)</span>
                  <span className="font-medium">{formatPrice(tax, cart.currencyCode)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {formatPrice(total, cart.currencyCode)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={cart.items.length === 0 || isCheckingOut}
                className={`
                  w-full flex items-center justify-center px-6 py-3 font-medium rounded-md transition-all duration-200 mb-4
                  ${cart.items.length === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : isCheckingOut
                      ? 'bg-indigo-400 text-white cursor-wait'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg'
                  }
                `}
              >
                {isCheckingOut ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Preparing checkout...</span>
                  </div>
                ) : (
                  <>
                    <CreditCard size={20} className="mr-2" />
                    Proceed to Checkout ({cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'})
                  </>
                )}
              </button>

              {/* Optional: Retry button when there's an error */}
              {checkoutError && !isCheckingOut && (
                <button
                  onClick={handleCheckout}
                  className="w-full py-2 px-4 text-indigo-600 hover:text-indigo-700 font-medium text-sm border border-indigo-200 hover:border-indigo-300 rounded-lg transition-colors mb-4"
                >
                  Try Again
                </button>
              )}

              {/* Trust Signals */}
              {/* <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield size={16} className="mr-2 text-green-500" />
                  Secure checkout
                </div>
                <div className="flex items-center">
                  <Truck size={16} className="mr-2 text-blue-500" />
                  {shipping === 0 ? 'Free shipping on this order' : 'Free shipping on orders over $50'}
                </div>
                <div className="flex items-center">
                  <Info size={16} className="mr-2 text-gray-400" />
                  30-day return policy
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}