import Link from 'next/link'
import Image from 'next/image'
import { Facebook } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// Payment method icons - you can move these to a separate file if you prefer
const PaymentIcons = () => (
  <>
    {/* American Express */}
    <svg
      className="h-12 w-12"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      viewBox="0 0 38 24"
      width="38"
      height="24"
      aria-labelledby="pi-american_express"
    >
      <title id="pi-american_express">American Express</title>
      <g fill="none">
        <path
          fill="#000"
          d="M35,0 L3,0 C1.3,0 0,1.3 0,3 L0,21 C0,22.7 1.4,24 3,24 L35,24 C36.7,24 38,22.7 38,21 L38,3 C38,1.3 36.6,0 35,0 Z"
          opacity=".07"
        />
        <path
          fill="#006FCF"
          d="M35,1 C36.1,1 37,1.9 37,3 L37,21 C37,22.1 36.1,23 35,23 L3,23 C1.9,23 1,22.1 1,21 L1,3 C1,1.9 1.9,1 3,1 L35,1"
        />
        <path
          fill="#FFF"
          d="M8.971,10.268 L9.745,12.144 L8.203,12.144 L8.971,10.268 Z M25.046,10.346 L22.069,10.346 L22.069,11.173 L24.998,11.173 L24.998,12.412 L22.075,12.412 L22.075,13.334 L25.052,13.334 L25.052,14.073 L27.129,11.828 L25.052,9.488 L25.046,10.346 L25.046,10.346 Z M10.983,8.006 L14.978,8.006 L15.865,9.941 L16.687,8 L27.057,8 L28.135,9.19 L29.25,8 L34.013,8 L30.494,11.852 L33.977,15.68 L29.143,15.68 L28.065,14.49 L26.94,15.68 L10.03,15.68 L9.536,14.49 L8.406,14.49 L7.911,15.68 L4,15.68 L7.286,8 L10.716,8 L10.983,8.006 Z M19.646,9.084 L17.407,9.084 L15.907,12.62 L14.282,9.084 L12.06,9.084 L12.06,13.894 L10,9.084 L8.007,9.084 L5.625,14.596 L7.18,14.596 L7.674,13.406 L10.27,13.406 L10.764,14.596 L13.484,14.596 L13.484,10.661 L15.235,14.602 L16.425,14.602 L18.165,10.673 L18.165,14.603 L19.623,14.603 L19.647,9.083 L19.646,9.084 Z M28.986,11.852 L31.517,9.084 L29.695,9.084 L28.094,10.81 L26.546,9.084 L20.652,9.084 L20.652,14.602 L26.462,14.602 L28.076,12.864 L29.624,14.602 L31.499,14.602 L28.987,11.852 L28.986,11.852 Z"
        />
      </g>
    </svg>

    {/* Visa */}
    <svg
      className="h-12 w-12"
      viewBox="0 0 38 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      width="38"
      height="24"
      aria-labelledby="pi-visa"
    >
      <title id="pi-visa">Visa</title>
      <path
        opacity=".07"
        d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
      />
      <path
        fill="#fff"
        d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
      />
      <path
        d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
        fill="#142688"
      />
    </svg>

    {/* Mastercard */}
    <svg
      className="h-12 w-12"
      viewBox="0 0 38 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      width="38"
      height="24"
      aria-labelledby="pi-master"
    >
      <title id="pi-master">Mastercard</title>
      <path
        opacity=".07"
        d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
      />
      <path
        fill="#fff"
        d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
      />
      <circle fill="#EB001B" cx="15" cy="12" r="7" />
      <circle fill="#F79E1B" cx="23" cy="12" r="7" />
      <path
        fill="#FF5F00"
        d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
      />
    </svg>

    {/* Apple Pay */}
    <svg
      className="h-12 w-12"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      x="0"
      y="0"
      width="38"
      height="24"
      viewBox="0 0 165.521 105.965"
      xmlSpace="preserve"
      aria-labelledby="pi-apple_pay"
    >
      <title id="pi-apple_pay">Apple Pay</title>
      <path
        fill="#000"
        d="M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.932 9.932 0 0 0-4.35 4.35 10.463 10.463 0 0 0-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 0 0-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.275 3.11a10.46 10.46 0 0 0 .974 2.96 9.897 9.897 0 0 0 1.83 2.52 9.874 9.874 0 0 0 2.52 1.83c.947.483 1.917.79 2.96.977 1.025.183 2.073.245 3.112.273.477.011.953.017 1.43.02.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.952-.009 1.431-.02 1.037-.028 2.085-.09 3.113-.273a10.478 10.478 0 0 0 2.958-.977 9.955 9.955 0 0 0 4.35-4.35c.483-.947.789-1.917.974-2.96.186-1.026.246-2.074.274-3.11.013-.477.02-.954.022-1.43.004-.567.004-1.132.004-1.699V14.824c0-.567 0-1.133-.004-1.699a63.067 63.067 0 0 0-.022-1.429c-.028-1.038-.088-2.085-.274-3.112a10.4 10.4 0 0 0-.974-2.96 9.94 9.94 0 0 0-4.35-4.35A10.52 10.52 0 0 0 156.939.3c-1.028-.185-2.076-.246-3.113-.274a71.417 71.417 0 0 0-1.431-.022C151.83 0 151.263 0 150.698 0z"
      />
      <path
        fill="#FFF"
        d="M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.065 2.583.22.75.135 1.38.34 1.984.648a6.392 6.392 0 0 1 2.804 2.807c.306.6.51 1.226.645 1.983.154.854.197 1.783.218 2.58.013.45.019.9.02 1.36.005.557.005 1.113.005 1.671v76.318c0 .558 0 1.114-.004 1.682-.002.45-.008.9-.02 1.35-.022.796-.065 1.725-.221 2.589a6.855 6.855 0 0 1-.645 1.975 6.397 6.397 0 0 1-2.808 2.807c-.6.306-1.228.511-1.971.645-.881.157-1.847.2-2.574.22-.457.01-.912.017-1.379.019-.555.004-1.113.004-1.669.004H14.801c-.55 0-1.1 0-1.66-.004a74.993 74.993 0 0 1-1.35-.018c-.744-.02-1.71-.064-2.584-.22a6.938 6.938 0 0 1-1.986-.65 6.337 6.337 0 0 1-1.622-1.18 6.355 6.355 0 0 1-1.178-1.623 6.935 6.935 0 0 1-.646-1.985c-.156-.863-.2-1.788-.22-2.578a66.088 66.088 0 0 1-.02-1.355l-.003-1.327V14.474l.002-1.325a66.7 66.7 0 0 1 .02-1.357c.022-.792.065-1.717.222-2.587a6.924 6.924 0 0 1 .646-1.981c.304-.598.7-1.144 1.18-1.623a6.386 6.386 0 0 1 1.624-1.18 6.96 6.96 0 0 1 1.98-.646c.865-.155 1.792-.198 2.586-.22.452-.012.905-.017 1.354-.02l1.677-.003h135.875"
      />
    </svg>
  </>
)

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
            <h4 className="text-primary font-bold mb-3 text-lg">Contact Us</h4>
            <address className="text-primary not-italic leading-relaxed">
              FlareSeal&copy;, LLC<br />
              6065 Parkway North Drive,<br />
              Suite 500<br />
              Cumming, Georgia 30040
            </address>
            <div className="space-y-2">
              <Link 
                href="tel:8004559628" 
                className="block text-primary hover:text-secondary transition-colors duration-200"
              >
                800-455-9628
              </Link>
              <Link 
                href="mailto:support@flareseal.com"
                className="block text-primary hover:text-secondary transition-colors duration-200"
              >
                Support@FlareSeal.com
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-auto flex flex-col mt-4 md:mt-0 space-y-3">
            <h4 className="text-primary font-bold mb-3 text-lg">Links</h4>
            <nav className="space-y-3">
              <Link 
                href="/" 
                className="block text-primary hover:text-secondary transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                href="/shop" 
                className="block text-primary hover:text-secondary transition-colors duration-200"
              >
                Shop Now
              </Link>
              <Link 
                href="/faqs" 
                className="block text-primary hover:text-secondary transition-colors duration-200"
              >
                FAQs
              </Link>
              <Link 
                href="/knowledge-base" 
                className="block text-primary hover:text-secondary transition-colors duration-200"
              >
                Knowledge Base
              </Link>
            </nav>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-auto">
            <h4 className="text-primary font-bold mb-3 text-lg">Follow Us</h4>
            <div className="flex justify-center md:justify-start">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-primary hover:text-secondary"
              >
                <Link
                  href="https://www.facebook.com/FlareSeal"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-8 w-8" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="py-6">
          <h3 className="sr-only">Payment methods</h3>
          <div className="flex justify-center">
            <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl">
              <PaymentIcons />
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