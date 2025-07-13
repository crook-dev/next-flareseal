// app/products/[handle]/page.tsx
import { getProductByHandle, formatProductData, getAllProducts } from '@/lib/shopify';
import ProductDetail from '@/components/products/product-component';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

interface ProductPageProps {
  params: {
    handle: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const rawProduct = await getProductByHandle(params.handle);
  
  if (!rawProduct) {
    return {
      title: 'Product Not Found | FlareSeal',
    };
  }
  
  const product = formatProductData(rawProduct);
  const firstVariant = product.variants[0];
  const mainImage = product.images[0];

  return {
    title: `${product.title} | FlareSeal`,
    description: product.description || `${product.title} - Premium mini-split systems and HVAC products from FlareSeal.`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: mainImage ? [
        {
          url: mainImage.url,
          width: mainImage.width,
          height: mainImage.height,
          alt: mainImage.altText,
        }
      ] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: mainImage ? [mainImage.url] : [],
    },
    other: {
      'product:price:amount': firstVariant?.price.toString() || '0',
      'product:price:currency': firstVariant?.currencyCode || 'USD',
      'product:availability': firstVariant?.availableForSale ? 'in stock' : 'out of stock',
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const rawProduct = await getProductByHandle(params.handle);
  
  if (!rawProduct) {
    notFound();
  }
  
  const product = formatProductData(rawProduct);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 py-4">
            <div className="flex items-center space-x-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
              <svg className="h-4 w-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <a href="/products" className="text-gray-500 hover:text-gray-700">
                Products
              </a>
              <svg className="h-4 w-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium truncate max-w-xs">
                {product.title}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Product Detail */}
      <ProductDetail product={product} />

      {/* Related Products Section - Placeholder */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="text-center py-12 text-gray-500">
            Related products coming soon...
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static params for all products at build time
export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    
    return products.map((product) => ({
      handle: product.handle,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Force static generation
export const dynamic = 'force-static';