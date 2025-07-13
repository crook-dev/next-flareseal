import Image from 'next/image';
import Link from 'next/link';
import { FormattedProduct } from '@/types/shopify';

interface ProductGridProps {
  products: FormattedProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Check back soon for new products.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

interface ProductCardProps {
  product: FormattedProduct;
}

function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images[0];
  const firstVariant = product.variants[0];
  
  return (
    <Link href={`/products/${product.handle}`} className="group">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200">
        {/* Product Image */}
        <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-50">
          {mainImage ? (
            <Image
              src={mainImage.url}
              alt={mainImage.altText}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
            {firstVariant?.compareAtPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${firstVariant.compareAtPrice.toFixed(2)}
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