// app/products/[handle]/page.tsx
import { getProductByHandle, formatProductData, getAllProducts, getAllCollections } from '@/lib/shopify';
import ProductDetail from '@/components/products/product-component';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const rawProduct = await getProductByHandle(handle);

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
 const { handle } = await params;
  const rawProduct = await getProductByHandle(handle);

  if (!rawProduct) {
    notFound();
  }
  
  const product = formatProductData(rawProduct);

  // Fetch all collections to find which collection this product belongs to
  const rawCollections = await getAllCollections();
  
  // Format collections data
  const collections = rawCollections.map(collection => ({
    id: collection.id,
    title: collection.title,
    handle: collection.handle,
    description: collection.description,
    descriptionHtml: collection.descriptionHtml,
    image: collection.image ? {
      id: collection.image.id,
      url: collection.image.url,
      altText: collection.image.altText || collection.title,
      width: collection.image.width,
      height: collection.image.height,
    } : undefined,
    products: collection.products.map(formatProductData)
  }));

  // Find the collection that contains this product
  const productCollection = collections.find(collection => 
    collection.products.some(p => p.id === product.id)
  );

  // Get collection products (excluding current product)
  const collectionProducts = productCollection?.products || [];
  const collectionTitle = productCollection?.title;

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
              <Link href="/products" className="text-gray-500 hover:text-gray-700">
                Products
              </Link>
              <svg className="h-4 w-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {collectionTitle && (
                <>
                  <Link href="/products" className="text-gray-500 hover:text-gray-700">
                    {collectionTitle}
                  </Link>
                  <svg className="h-4 w-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </>
              )}
              <span className="text-gray-900 font-medium truncate max-w-xs">
                {product.title}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Product Detail with Related Products */}
      <ProductDetail 
        product={product}
        collectionProducts={collectionProducts}
        collectionTitle={collectionTitle}
      />
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