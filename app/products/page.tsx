import { getAllCollections, formatProductData } from '@/lib/shopify';
import CollectionSection from '@/components/products/collection-section';
import { FormattedCollection } from '@/types/shopify';
import { Metadata } from 'next';


export async function generateMetadata(): Promise<Metadata> { 
  try {    
    // Fetch collections to get actual product count
    const rawCollections = await getAllCollections();  
    const totalProducts = rawCollections.reduce((total, collection) => {
      return total + collection.products.length;
    }, 0);
    
    const metadata = {
      title: 'HVAC Flare Connection Products | FlareSeal® Mini-Split & Refrigeration Systems',
      description: `Shop ${totalProducts}+ FlareSeal® leak-free flare connection products for HVAC mini-splits and refrigeration systems. Available in all standard SAE sizes: 1/4", 3/8", 1/2", 5/8", 3/4". Prevent refrigerant leaks permanently.`,
      openGraph: {
        title: 'HVAC Flare Connection Products | FlareSeal® Mini-Split & Refrigeration Systems',
        description: `Shop ${totalProducts}+ FlareSeal® leak-free flare connection products for HVAC mini-splits and refrigeration systems. Available in all standard SAE sizes. Prevent refrigerant leaks permanently.`,
        type: 'website' as const,
        locale: 'en_US',
        images: [
          {
            url: 'https://www.flareseal.com/social.jpg',
            width: 1200,
            height: 630,
            alt: 'FlareSeal HVAC Products',
          },
        ],
      },
      alternates: {
        canonical: 'https://www.flareseal.com/products',
      },
    };
    return metadata;
    
  } catch (error) {
    console.error('Error generating metadata:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Fallback metadata if API fails
    return {
      title: 'HVAC Flare Connection Products | FlareSeal® Mini-Split & Refrigeration Systems',
      description: 'Shop FlareSeal® leak-free flare connection products for HVAC mini-splits and refrigeration systems. Available in all standard SAE sizes. Prevent refrigerant leaks permanently.',
      openGraph: {
        title: 'HVAC Flare Connection Products | FlareSeal®',
        description: 'Shop FlareSeal® leak-free flare connection products for HVAC mini-splits and refrigeration systems.',
        type: 'website' as const,
        locale: 'en_US',
        images: [
          {
            url: 'https://www.flareseal.com/social.jpg',
            width: 1200,
            height: 630,
            alt: 'FlareSeal HVAC Products',
          },
        ],
      },
      alternates: {
        canonical: 'https://www.flareseal.com/products',
      },
    };
  }
}

// SEO Content by Collection Handle
const collectionSEOContent = {
  'mini-split-pack': {
    title: 'Mini-Split Packs',
    subtitle: 'Eliminate flare leaks and ensure a secure HVAC installation',
    description: 'Each pack is designed for the most common mini-split system line set sizes, making it easy to match your setup. FlareSeal® gaskets provide a long-term, leak-free seal by addressing the #1 cause of flare connection failures—micro-imperfections on the sealing surface.',
    benefits: [
      'Compatible with all standard SAE flare fittings',
      'Ideal for HVAC contractors and DIY mini-split installs',
      'Prevents costly refrigerant leaks and improves system efficiency',
      'Save time—no need to reflare or overtighten fittings'
    ],
    callout: 'Whether you\'re installing a new system or repairing an existing one, these packs offer reliable performance, reduced call-backs, and peace of mind.'
  },
  'mini-split-kit': {
    title: 'Single Size Packs',
    subtitle: 'Stop refrigerant leaks and simplify HVAC service',
    description: 'Perfect for targeted repairs or volume installations, these value packs are engineered to provide a tight, leak-free seal on any SAE flare connection. Use them on mini-splits, heat pumps, refrigeration systems, and more.',
    benefits: [
      'Leak-free performance for new installs or weeping joints',
      'Sized for common line sets: 1/4", 3/8", 1/2", 5/8", and 3/4"',
      'Durable gasket resists pressure cycling, vibration, and corrosion',
      'A must-have for HVAC pros, service trucks, and inventory stock'
    ],
    callout: 'Buy only what you need—or stock up and save. These 10-packs are your best defense against persistent flare leaks.'
  }
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

    const reorderedCollections = nonEmptyCollections.length >= 2 
      ? [
          nonEmptyCollections[1], // Second collection becomes firFlareSealst
          nonEmptyCollections[0], // First collection becomes second
          ...nonEmptyCollections.slice(2) // Keep any remaining collections in their original order
        ]
      : nonEmptyCollections; // If less than 2 collections, keep original order

    // Calculate total products for JSON-LD
    const totalProducts = rawCollections.reduce((total, collection) => {
      return total + collection.products.length;
    }, 0);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              // Product Collection Schema
              {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                '@id': 'https://www.flareseal.com/products',
                name: 'FlareSeal HVAC Products',
                description: 'Complete collection of leak-free flare connection products for HVAC mini-splits and refrigeration systems',
                url: 'https://www.flareseal.com/products',
                mainEntity: {
                  '@type': 'ItemList',
                  name: 'FlareSeal® Product Collection',
                  description: 'Leak-free flare connection solutions for HVAC and refrigeration',
                  numberOfItems: totalProducts,
                },
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
                      name: 'Products',
                      item: 'https://www.flareseal.com/products'
                    }
                  ]
                },
                publisher: {
                  '@type': 'Organization',
                  name: 'FlareSeal',
                  url: 'https://www.flareseal.com',
                  logo: 'https://www.flareseal.com/images/logo.png'
                }
              },
              // Organization Schema
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                '@id': 'https://www.flareseal.com/#organization',
                name: 'FlareSeal',
                url: 'https://www.flareseal.com',
                logo: 'https://www.flareseal.com/images/logo.png',
                description: 'Leak-free flare connection solutions for HVAC and refrigeration systems',
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'customer service',
                  email: 'support@flareseal.com',
                  telephone: '+1-800-455-9628'
                },
                sameAs: [
                  'https://www.facebook.com/flareseal'
                ],
                hasOfferCatalog: {
                  '@type': 'OfferCatalog',
                  name: 'FlareSeal Products',
                  itemListElement: rawCollections.map(collection => ({
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Product',
                      name: collection.title,
                      description: collection.description || `${collection.title} flare seal products`
                    }
                  }))
                }
              }
            ]).replace(/</g, '\\u003c'),
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Compact Header */}
          <div className="py-12 text-center border-b border-gray-200 bg-white mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Leak-Free Connections by FlareSeal®
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The seal protects against the primary area of flare leaks on the sealing surface. 
              FlareSeal® fits all common SAE flare connections and provides long-term leak-free 
              connections for both new installations and existing system repairs.
            </p>
          </div>
          
          {/* Collections Sections */}
          {reorderedCollections.length > 0 ? (
            <div className="space-y-16 pb-16">
              {reorderedCollections.map((collection) => (
                <CollectionSection 
                  key={collection.id} 
                  collection={collection}
                  seoContent={collectionSEOContent[collection.handle as keyof typeof collectionSEOContent]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p>Check back soon for new products.</p>
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
          <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
          <p>We couldn&apos;t load the products right now.</p>
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