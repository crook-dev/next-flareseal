'use client';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import MiniCart from './mini-cart';

export default function CartIcon() {
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const { getItemCount } = useCart();
  const cartItemCount = getItemCount();

  return (
    <>
      <button
        onClick={() => setIsMiniCartOpen(!isMiniCartOpen)}
        className="relative p-2 text-gray-700 hover:text-black transition-colors duration-200 group"
      >
        <ShoppingCart size={20} className="group-hover:scale-110 transition-transform duration-200" />
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
            {cartItemCount > 99 ? '99+' : cartItemCount}
          </span>
        )}
      </button>

      <MiniCart 
        isOpen={isMiniCartOpen} 
        onClose={() => setIsMiniCartOpen(false)} 
      />
    </>
  );
}