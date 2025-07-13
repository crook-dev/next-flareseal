import CartPageContent from '@/components/products/cart-page-content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart | FlareSeal',
  description: 'Review your cart and proceed to checkout',
};

export default function CartPage() {
  return <CartPageContent />;
}

