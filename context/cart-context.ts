'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Cart } from '@/types/cart';

interface CartContextType {
  cart: Cart;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getCartTotal: () => number;
  isInCart: (variantId: string) => boolean;
  getCartItem: (variantId: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
    currencyCode: 'USD',
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('flareseal-cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart) as Cart;
          setCart(parsedCart);
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('flareseal-cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('flareseal-cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart]);

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const newItem: CartItem = {
      ...item,
      quantity: item.quantity || 1,
    };

    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        cartItem => cartItem.variantId === newItem.variantId
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        newItems = prevCart.items.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + newItem.quantity }
            : cartItem
        );
      } else {
        // New item, add to cart
        newItems = [...prevCart.items, newItem];
      }

      const totalItems = newItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
      const totalPrice = newItems.reduce((sum, cartItem) => sum + (cartItem.price * cartItem.quantity), 0);

      return {
        ...prevCart,
        items: newItems,
        totalItems,
        totalPrice,
        currencyCode: newItem.currencyCode,
      };
    });
  };

  const removeItem = (variantId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.variantId !== variantId);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...prevCart,
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(variantId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.variantId === variantId
          ? { ...item, quantity }
          : item
      );

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...prevCart,
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      currencyCode: 'USD',
    });
  };

  const getItemCount = () => cart.totalItems;

  const getCartTotal = () => cart.totalPrice;

  const isInCart = (variantId: string) => {
    return cart.items.some(item => item.variantId === variantId);
  };

  const getCartItem = (variantId: string) => {
    return cart.items.find(item => item.variantId === variantId);
  };

  // Create provider value object
  const contextValue = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getCartTotal,
    isInCart,
    getCartItem,
  };

  // Use React.createElement to avoid JSX parsing issues
  return React.createElement(
    CartContext.Provider,
    { value: contextValue },
    children
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}