import ProductGrid from './product-grid';
import Image from 'next/image';
import { FormattedCollection } from '@/types/shopify';

interface CollectionSectionProps {
  collection: FormattedCollection;
}

export default function CollectionSection({ collection }: CollectionSectionProps) {
  return (
    <section className="w-full">
      {/* Collection Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              {collection.title}
            </h2>
            {collection.description && (
              <p className="text-gray-600 text-lg max-w-3xl">
                {collection.description}
              </p>
            )}
          </div>
          
          {/* Collection Image (if available) */}
          {collection.image && (
            <div className="mt-4 lg:mt-0 lg:ml-8 flex-shrink-0">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-lg overflow-hidden">
                <Image
                  src={collection.image.url}
                  alt={collection.image.altText || collection.title}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Product count */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {collection.products.length} product{collection.products.length !== 1 ? 's' : ''}
          </div>
          {/* View all link - optional */}
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all in {collection.title} →
          </button>
        </div>
      </div>
      
      {/* Products Grid */}
      <ProductGrid products={collection.products} />
    </section>
  );
}
