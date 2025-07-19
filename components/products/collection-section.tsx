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
            <h2 className="text-primary">
              {collection.title}
            </h2>
            {collection.descriptionHtml && (
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }} />
              </div>
            )}
          </div>
        </div>
        
        {/* Product count */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {collection.products.length} product{collection.products.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
      
      {/* Products Grid */}
      <ProductGrid products={collection.products} />
    </section>
  );
}
