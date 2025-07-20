import Image from 'next/image';
import Link from 'next/link';
import { FormattedProduct } from '@/types/shopify';

interface RelatedProductsProps {
  currentProductId: string;
  collectionProducts: FormattedProduct[];
  collectionTitle?: string;
  maxProducts?: number;
}

export default function RelatedProducts({ 
  currentProductId, 
  collectionProducts, 
  collectionTitle,
  maxProducts = 4 
}: RelatedProductsProps) {
  // Filter out the current product and limit results
  const relatedProducts = collectionProducts
    .filter(product => product.id !== currentProductId)
    .slice(0, maxProducts);

  // Don't render if no related products
  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-gray-200 py-16 mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {collectionTitle ? `More from ${collectionTitle}` : 'Related Products'}
          </h2>
          <p className="text-gray-600">
            View more {collectionTitle?.toLowerCase() || 'setup'} with these compatible products
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {relatedProducts.map((product) => (
            <RelatedProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Link if there are more products */}
        {collectionProducts.length - 1 > maxProducts && (
          <div className="text-center mt-8">
            <Link 
              href="/products" 
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              View All Products
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

interface RelatedProductCardProps {
  product: FormattedProduct;
}

function RelatedProductCard({ product }: RelatedProductCardProps) {
  const mainImage = product.images[0];
  const firstVariant = product.variants[0];
  const hasDiscount = firstVariant?.compareAtPrice && firstVariant.compareAtPrice > firstVariant.price;

  return (
    <Link href={`/products/${product.handle}`} className="group">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200">
        {/* Product Image - Using same structure as ProductGrid */}
        <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-50">
          {mainImage ? (
            <Image
              src={mainImage.url}
              alt={mainImage.altText || product.title}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              priority={false}
              quality={90}
              sizes="(max-width: 640px) 100vw, 400px"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-400">No image</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
            {product.title}
          </h3>
          
          {/* Price */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg font-semibold text-gray-900">
              ${firstVariant?.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${firstVariant.compareAtPrice!.toFixed(2)}
              </span>
            )}
            <span className="text-xs text-gray-400">
              {firstVariant?.currencyCode}
            </span>
          </div>
          
          {/* Availability */}
          <div className="flex items-center justify-between">
            <div>
              {firstVariant?.availableForSale ? (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  In stock
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Out of stock
                </span>
              )}
            </div>
            
            {/* Vendor */}
            {product.vendor && (
              <span className="text-xs text-gray-500">{product.vendor}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}