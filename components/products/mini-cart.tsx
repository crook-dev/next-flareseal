'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

export default function MiniCart({ isOpen, onClose, id }: MiniCartProps & { id?: string }) {
  const { cart, removeItem, updateQuantity, getCartTotal } = useCart();
  const miniCartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (miniCartRef.current && !miniCartRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Tab') {
        const focusableEls = miniCartRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableEls || focusableEls.length === 0) return;
        const first = focusableEls[0] as HTMLElement;
        const last = focusableEls[focusableEls.length - 1] as HTMLElement;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    setTimeout(() => {
      const focusableEls = miniCartRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableEls && focusableEls.length > 0) {
        (focusableEls[0] as HTMLElement).focus();
      }
    }, 0);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const formatPrice = (price: number, currencyCode: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(price);
  };

  const handleCheckout = async () => {
    if (cart.items.length === 0) return;
  
    try {
      const lineItems = cart.items.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));  
      const { generateCheckoutUrl } = await import('@/lib/shopify');
      const checkoutUrl = await generateCheckoutUrl(lineItems);
      window.location.href = checkoutUrl;
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Unable to proceed to checkout. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-75 z-40" onClick={onClose} />      
      <div
        ref={miniCartRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mini-cart-title"
        tabIndex={-1}
        className="fixed top-16 right-4 w-96 max-w-sm bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[80vh] flex flex-col animate-slide-in-right"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 id="mini-cart-title" className="text-lg font-semibold text-gray-900">
            Shopping Cart ({cart.totalItems})
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {cart.items.length === 0 ? (
            <div className="p-6 text-center">
              <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button
                onClick={onClose}
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cart.items.map((item) => (
                <div key={item.variantId} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image.url}
                        alt={item.image.altText}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <ShoppingBag size={24} className="text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.productTitle}
                    </h4>
                    {item.variantTitle !== 'Default Title' && (
                      <p className="text-xs text-gray-500 truncate">
                        {item.variantTitle}
                      </p>
                    )}
                    
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-medium text-gray-900">
                        {formatPrice(item.price, item.currencyCode)}
                      </span>
                      {item.compareAtPrice && item.compareAtPrice > item.price && (
                        <span className="text-xs text-gray-500 line-through">
                          {formatPrice(item.compareAtPrice, item.currencyCode)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} className={item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600'} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Plus size={14} className="text-gray-600" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-xs text-red-600 hover:text-red-800 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-900">Subtotal</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatPrice(getCartTotal(), cart.currencyCode)}
              </span>
            </div>

            <div className="space-y-2">
              <a
                href="/cart"
                onClick={onClose}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ShoppingBag size={16} className="mr-2" />
                View Cart
              </a>
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
              >
                <CreditCard size={16} className="mr-2" />
                Checkout
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Shipping calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}