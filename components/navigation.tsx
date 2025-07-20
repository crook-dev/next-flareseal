'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import CartIcon from './products/cart-icon';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavigationLink {
  href: string;
  label: string;
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const cartItemCount = getItemCount();

  const navigationLinks: NavigationLink[] = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop Now' },
    { href: '/faqs', label: 'FAQs' },
    { href: '/knowledge-base', label: 'Knowledge Base' },
  ];

  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image src="/images/logo.png" alt="Flareseal Logo" width={107} height={48} />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-primary hover:underline px-3 py-2 font-medium transition duration-300 ${isActive(link.href) ? 'underline' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <CartIcon />
            </div>

            {/* Mobile Right Side */}
            <div className="flex md:hidden items-center space-x-3">
              {/* Mobile Cart Icon */}
              <Link 
                href="/cart" 
                className="relative p-2 text-gray-700 hover:text-black transition-colors duration-200 rounded-full hover:bg-gray-100"
              >
                <ShoppingCart size={22} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold border-2 border-white">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-700 hover:text-black transition-colors duration-200 rounded-full hover:bg-gray-100 relative z-50"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-45 scale-0' : 'rotate-0 scale-100'}`}>
                    <Menu size={24} />
                  </span>
                  <span className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 scale-100' : '-rotate-45 scale-0'}`}>
                    <X size={24} />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 bg-black opacity-50 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Slide-out menu */}
          <div className={`fixed top-0 right-0 h-full w-80 w-full bg-white shadow-2xl transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Image src="/images/logo.png" alt="Flareseal" width={80} height={36} />
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex flex-col h-full">
              {/* Navigation Links */}
              <div className="flex-1 py-6">
                <div className="px-6 space-y-1">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center px-4 py-4 text-gray-900 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200 ${
                        isActive(link.href) 
                          ? 'bg-primary text-white' 
                          : 'hover:translate-x-1'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-gray-200" />

                {/* Secondary Actions */}
                <div className="px-6 space-y-1">
                  <Link
                    href="/cart"
                    className="flex items-center justify-between px-4 py-4 text-gray-900 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200 hover:translate-x-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <ShoppingCart size={18} className="mr-3 text-gray-600" />
                      Shopping Cart
                    </span>
                    {cartItemCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold">
                        {cartItemCount > 9 ? '9+' : cartItemCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}