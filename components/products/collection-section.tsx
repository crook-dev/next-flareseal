import ProductGrid from './product-grid';
import { FormattedCollection } from '@/types/shopify';
import { CheckCircle } from 'lucide-react';

interface SEOContent {
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  callout: string;
}

interface CollectionSectionProps {
  collection: FormattedCollection;
  seoContent?: SEOContent;
}

export default function CollectionSection({ collection, seoContent }: CollectionSectionProps) {
  return (
    <section className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Collection Header with SEO Content */}
      <div className="p-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-3">
            {seoContent?.title || collection.title}
          </h2>
          {seoContent?.subtitle && (
            <h3 className="text-xl text-gray-700 mb-4 font-medium">
              {seoContent.subtitle}
            </h3>
          )}
          
          {/* Product count */}
          <div className="text-sm text-gray-500 mb-6">
            {collection.products.length} product{collection.products.length !== 1 ? 's' : ''} available
          </div>
        </div>

        {/* SEO Content in Two-Column Layout */}
        {seoContent && (
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column: Description */}
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed text-base">
                {seoContent.description}
              </p>
              
              {seoContent.callout && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r">
                  <p className="text-blue-800 font-medium italic">
                    {seoContent.callout}
                  </p>
                </div>
              )}
            </div>
            
            {/* Right Column: Benefits */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">Key Features & Benefits:</h4>
              <ul className="space-y-3">
                {seoContent.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Fallback to Shopify description if no SEO content */}
        {!seoContent && collection.descriptionHtml && (
          <div className="prose prose-lg max-w-4xl mx-auto text-center">
            <div dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }} />
          </div>
        )}
      </div>
      
      {/* Products Grid */}
      <div className="p-8">
        <ProductGrid products={collection.products} />
      </div>
    </section>
  );
}