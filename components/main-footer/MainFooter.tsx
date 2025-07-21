import Link from 'next/link'
import Image from 'next/image'
import Facebook from './facebook'
import { Separator } from '@/components/ui/separator'
import PaymentMethods from './payment-methods/payment-methods'

export default function MainFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="pt-8 bg-gray-50 shadow-[0_-4px_12px_0_rgba(181,181,181,0.5)]">
      <div className="container">
        {/* Main footer content */}
        <div className="text-center md:text-left flex flex-wrap justify-around py-4 gap-8">
          {/* Logo */}
          <div className="w-full md:w-auto flex items-center justify-center md:justify-start">
            <Link href="/">
              <Image
                className="mx-auto"
                src="/images/logo.png"
                alt="FlareSeal Logo"
                width={200}
                height={80}
                priority
              />
            </Link>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-auto flex flex-col mt-4 md:mt-0 space-y-2">
            <h3 className="text-primary font-bold mb-3 text-lg">Contact Us</h3>
            <address className="text-primary not-italic leading-relaxed">
              FlareSeal&copy;, LLC<br />
              6065 Parkway North Drive,<br />
              Suite 500<br />
              Cumming, Georgia 30040
            </address>
            <div className="space-y-2">
              <Link 
                href="tel:8004559628" 
                className="block text-primary hover:underline transition-colors duration-200"
              >
                800-455-9628
              </Link>
              <Link 
                href="mailto:support@flareseal.com"
                className="block text-primary hover:underline transition-colors duration-200"
              >
                Support@FlareSeal.com
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-auto flex flex-col mt-4 md:mt-0 space-y-3">
            <h3 className="text-primary font-bold mb-3 text-lg">Links</h3>
            <nav className="space-y-3">
              <Link 
                href="/" 
                className="block text-primary hover:underline transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                href="/shop" 
                className="block text-primary hover:underline transition-colors duration-200"
              >
                Shop Now
              </Link>
              <Link 
                href="/faqs" 
                className="block text-primary hover:underline transition-colors duration-200"
              >
                FAQs
              </Link>
              <Link 
                href="/knowledge-base" 
                className="block text-primary hover:underline transition-colors duration-200"
              >
                Knowledge Base
              </Link>
            </nav>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-auto">
            <h3 className="text-primary font-bold mb-3 text-lg">Follow Us</h3>
            <div className="flex justify-center md:justify-start">
              <Link href="https://www.facebook.com/flareseal" aria-label="Facebook">
                <Facebook />
              </Link>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="py-6">
          <h3 className="sr-only">Payment methods</h3>
          <div className="flex justify-center">
            <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl">
              <PaymentMethods />
            </div>
          </div>
        </div>

        <Separator className="mb-4" />
      </div>

      {/* Copyright and Legal Links */}
      <div className="bg-primary text-white py-3">
        <div className="container text-center text-xs space-y-2">
          <p className="mb-0">
            &copy; {currentYear} FlareSeal &reg; Inc. All rights reserved.
          </p>
          <nav className="space-x-4">
            <Link 
              href="/terms-of-service"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link 
              href="/privacy-policy"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/refund-policy"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Refund Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}