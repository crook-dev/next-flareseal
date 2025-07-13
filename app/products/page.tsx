import { getAllCollections, formatProductData } from '@/lib/shopify';
import CollectionSection from '@/components/products/collection-section';
import { FormattedCollection } from '@/types/shopify';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | FlareSeal',
  description: 'Browse our complete collection of mini-split systems and HVAC products.',
};

export default async function ProductsPage() {
  try {
    // Fetch all collections with their products at build time
    const rawCollections = await getAllCollections();
    
    // Format the data
    const collections: FormattedCollection[] = rawCollections.map(collection => ({
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

    // Filter out empty collections
    const nonEmptyCollections = collections.filter(collection => collection.products.length > 0);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our complete collection of mini-split systems and HVAC products, 
              organized by category for easy browsing.
            </p>
          </div>
          
          {/* Collections Sections */}
          {nonEmptyCollections.length > 0 ? (
            <div className="space-y-16">
              {nonEmptyCollections.map((collection) => (
                <CollectionSection 
                  key={collection.id} 
                  collection={collection} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No collections found</h3>
              <p className="text-gray-600">Check back soon for new products.</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching collections:', error);
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-4">We couldn&apos;t load the products right now.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
}

// Force static generation
export const dynamic = 'force-static';