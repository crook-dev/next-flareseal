'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Menu, ShoppingCart, X } from 'lucide-react'

// You'll need to replace this with your actual cart store/state management
interface CartStore {
  lineItems: string[]
  openCart: () => void
}

// Mock cart store - replace with your actual implementation
const useCartStore = (): CartStore => {
  // Replace this with your actual cart state management
  return {
    lineItems: [], // Replace with actual cart items
    openCart: () => console.log('Opening cart'), // Replace with actual function
  }
}

const navigation = {
  pages: [
    { name: "Home", href: "/" },
    { name: "Shop Now", href: "/shop" },
    { name: "FAQs", href: "/faqs" },
    { name: "Knowledge Base", href: "/knowledge-base" },
  ],
}

export default function MainNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { lineItems, openCart } = useCartStore()

  return (
    <div className="shadow-xl py-1">
      <header className="relative">
        <nav aria-label="Top">
          {/* Main navigation */}
          <div className="bg-dark py-2">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <div className="flex items-center justify-between">
                
                {/* Logo (Desktop) */}
                <div className="hidden md:flex md:items-center">
                  <Link href="/" className="flex items-center">
                    <span className="sr-only">FlareSeal</span>
                    <Image
                      className="h-12 w-auto"
                      src="/images/logo.png"
                      alt="FlareSeal Logo"
                      width={120}
                      height={48}
                      priority
                    />
                  </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden h-full md:flex">
                  <div className="ml-8 flex h-full justify-center space-x-8">
                    {navigation.pages.map((page) => (
                      <Link
                        key={page.name}
                        href={page.href}
                        className="flex items-center font-medium text-primary hover:text-secondary transition-colors duration-200"
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile menu trigger */}
                <div className="flex flex-1 items-center md:hidden">
                  <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary hover:text-secondary"
                        aria-label="Open menu"
                      >
                        <Menu className="h-8 w-8" />
                      </Button>
                    </SheetTrigger>
                    
                    <SheetContent side="left" className="w-full bg-white p-0">
                      <div className="flex h-full flex-col">
                        {/* Mobile menu header */}
                        <div className="flex items-center justify-between px-4 py-5">
                          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                            <span className="sr-only">FlareSeal</span>
                            <Image
                              src="/images/logo.png"
                              alt="FlareSeal Logo"
                              width={120}
                              height={48}
                              className="h-12 w-auto"
                            />
                          </Link>
                        </div>

                        {/* Mobile navigation links */}
                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                          {navigation.pages.map((page) => (
                            <div key={page.name} className="flow-root">
                              <Link
                                href={page.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-2 font-medium text-primary hover:text-secondary transition-colors duration-200"
                              >
                                {page.name}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Mobile Logo */}
                <Link href="/" className="md:hidden">
                  <span className="sr-only">FlareSeal</span>
                  <Image
                    src="/images/logo.png"
                    alt="FlareSeal Logo"
                    width={120}
                    height={48}
                    className="h-12 w-auto"
                  />
                </Link>

                {/* Cart section */}
                <div className="flex flex-1 items-center justify-end">
                  <div className="flex items-center md:ml-8">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={openCart}
                      className="group relative text-primary hover:text-secondary"
                      aria-label={`Shopping cart with ${lineItems.length} items`}
                    >
                      <ShoppingCart className="h-8 w-8" />
                      {lineItems.length > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
                        >
                          {lineItems.length}
                        </Badge>
                      )}
                    </Button>
                    {/* Your ShoppingCart component goes here */}
                    {/* <ShoppingCart /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}