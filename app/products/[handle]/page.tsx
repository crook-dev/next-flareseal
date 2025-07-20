// app/products/[handle]/page.tsx
import { getProductByHandle, formatProductData, getAllProducts, getAllCollections } from '@/lib/shopify';
import ProductDetail from '@/components/products/product-component';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import { trackProductView } from '@/lib/gtm';

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const { handle } = await params;
    const rawProduct = await getProductByHandle(handle);

    if (!rawProduct) {
      return {
        title: 'Product Not Found | FlareSeal',
        description: 'The requested product could not be found. Browse our complete collection of leak-free flare connection products.',
        alternates: {
          canonical: 'https://www.flareseal.com/products',
        },
      };
    }
    
    const product = formatProductData(rawProduct);
    const firstVariant = product.variants[0];
    const mainImage = product.images[0];
    
    // Fetch collections to determine product category
    const rawCollections = await getAllCollections();
    const productCollection = rawCollections.find(collection => 
      collection.products.some(p => p.id === product.id)
    );
    
    // Enhanced title with SEO keywords
    const seoTitle = `${product.title} | ${firstVariant?.price ? `$${firstVariant.price}` : ''} FlareSeal® HVAC Flare Connection`.trim();
    
    // Enhanced description with keywords and benefits
    const seoDescription = product.description 
      ? `${product.description.slice(0, 140)}... Shop leak-free HVAC flare connections from FlareSeal®. Prevent refrigerant leaks permanently.`
      : `${product.title} - Professional leak-free flare connection solution for HVAC and refrigeration systems. Available now from FlareSeal®.`;

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: `${product.title}, FlareSeal, HVAC flare connections, mini-split, refrigeration, leak-free, SAE fittings, ${product.tags?.join(', ') || ''}`,
      openGraph: {
        title: `${product.title} | FlareSeal®`,
        description: seoDescription,
        type: 'website', // Changed from 'product' to 'website'
        locale: 'en_US',
        images: mainImage ? [
          {
            url: mainImage.url,
            width: mainImage.width || 1200,
            height: mainImage.height || 630,
            alt: mainImage.altText || product.title,
          }
        ] : [
          {
            url: 'https://www.flareseal.com/social.jpg',
            width: 1200,
            height: 630,
            alt: 'FlareSeal HVAC Products',
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.title} | FlareSeal®`,
        description: seoDescription,
        images: mainImage ? [mainImage.url] : ['https://www.flareseal.com/social.jpg'],
      },
      alternates: {
        canonical: `https://www.flareseal.com/products/${handle}`,
      },
      other: {
        'product:price:amount': firstVariant?.price?.toString() || '0',
        'product:price:currency': firstVariant?.currencyCode || 'USD',
        'product:availability': firstVariant?.availableForSale ? 'in stock' : 'out of stock',
        'application/ld+json': JSON.stringify([
          // Product Schema
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            '@id': `https://www.flareseal.com/products/${handle}`,
            name: product.title,
            description: product.description || `${product.title} - Professional HVAC flare connection solution`,
            brand: {
              '@type': 'Brand',
              name: 'FlareSeal'
            },
            manufacturer: {
              '@type': 'Organization',
              name: 'FlareSeal',
              url: 'https://www.flareseal.com'
            },
            image: product.images.map(img => img.url),
            offers: product.variants.map(variant => ({
              '@type': 'Offer',
              '@id': `https://www.flareseal.com/products/${handle}#variant-${variant.id}`,
              price: variant.price,
              priceCurrency: variant.currencyCode,
              availability: variant.availableForSale 
                ? 'https://schema.org/InStock' 
                : 'https://schema.org/OutOfStock',
              seller: {
                '@type': 'Organization',
                name: 'FlareSeal'
              },
              priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
              itemCondition: 'https://schema.org/NewCondition',
              shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                  '@type': 'MonetaryAmount',
                  value: '0',
                  currency: 'USD'
                },
                deliveryTime: {
                  '@type': 'ShippingDeliveryTime',
                  handlingTime: {
                    '@type': 'QuantitativeValue',
                    minValue: 1,
                    maxValue: 2,
                    unitCode: 'DAY'
                  },
                  transitTime: {
                    '@type': 'QuantitativeValue', 
                    minValue: 3,
                    maxValue: 7,
                    unitCode: 'DAY'
                  }
                }
              }
            })),
            category: productCollection?.title || 'HVAC Products',
            productID: product.id,
            sku: firstVariant?.id || product.id,
            gtin: product.tags?.find(tag => tag.startsWith('UPC:'))?.replace('UPC:', '') || undefined,
            // aggregateRating: {
            //   '@type': 'AggregateRating',
            //   ratingValue: '4.8',
            //   reviewCount: '127', // You can update these with real review data
            //   bestRating: '5',
            //   worstRating: '1'
            // },
            // review: [
            //   {
            //     '@type': 'Review',
            //     reviewRating: {
            //       '@type': 'Rating',
            //       ratingValue: '5',
            //       bestRating: '5'
            //     },
            //     author: {
            //       '@type': 'Person',
            //       name: 'HVAC Professional'
            //     },
            //     reviewBody: 'Excellent product for preventing flare leaks. Easy to install and very effective.'
            //   }
            // ]
          },
          // Breadcrumb Schema
          {
            '@context': 'https://schema.org',
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
              },
              ...(productCollection ? [{
                '@type': 'ListItem',
                position: 3,
                name: productCollection.title,
                item: 'https://www.flareseal.com/products'
              }] : []),
              {
                '@type': 'ListItem',
                position: productCollection ? 4 : 3,
                name: product.title,
                item: `https://www.flareseal.com/products/${handle}`
              }
            ]
          }
        ])
      },
    };
  } catch (error) {
    console.error('Error generating product metadata:', error);
    
    // Fallback metadata
    return {
      title: 'FlareSeal® HVAC Products | Leak-Free Flare Connections',
      description: 'Professional HVAC flare connection solutions. Prevent refrigerant leaks with FlareSeal® products.',
      alternates: {
        canonical: 'https://www.flareseal.com/products',
      },
    };
  }
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
      <ProductViewTracker product={product} />
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

function ProductViewTracker({ product }: { product: any }) {
  useEffect(() => {
    trackProductView(product);
  }, [product]);

  return null; 
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