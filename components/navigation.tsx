'use client';
import React, { useState } from 'react';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import CartIcon from './products/cart-icon';
import Link from 'next/link';

interface NavigationLink {
  href: string;
  label: string;
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const cartItemCount = getItemCount();

  const navigationLinks: NavigationLink[] = [
    { href: '/products', label: 'Products' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="bg-black text-white px-3 py-2 rounded-md font-bold text-lg">
                FLARESEAL
              </div>
              </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side - Search and Cart */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Desktop */}
            <button className="hidden md:block p-2 text-gray-700 hover:text-black transition-colors duration-200">
              <Search size={20} />
            </button>

            {/* Cart Icon with Mini Cart - Desktop */}
            <div className="hidden md:block">
              <CartIcon />
            </div>

            {/* Mobile Cart Link (No Mini Cart) */}
            <Link 
              href="/cart" 
              className="md:hidden relative p-2 text-gray-700 hover:text-black transition-colors duration-200"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700 hover:text-black transition-colors duration-200"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
                <Search size={16} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent outline-none text-sm flex-1"
                />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md text-sm font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Cart Link */}
            <Link
              href="/cart"
              className="flex items-center justify-between px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md text-sm font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center">
                <ShoppingCart size={16} className="mr-2" />
                Cart
              </span>
              {cartItemCount > 0 && (
                <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}