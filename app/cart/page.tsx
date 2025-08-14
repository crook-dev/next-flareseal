import CartPageContent from '@/components/products/cart-page-content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart | FlareSeal',
  description: 'Review your cart and proceed to checkout',
  alternates: {
    canonical: 'https://www.flareseal.com/cart',
  },
};

export default function CartPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Shopping Cart',
            description: 'Review your FlareSeal products and proceed to checkout',
            url: 'https://www.flareseal.com/cart',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.flareseal.com'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Cart',
                  item: 'https://www.flareseal.com/cart'
                }
              ]
            }
          }).replace(/</g, '\\u003c'),
        }}
      />
      <CartPageContent />
    </>
  );
}

