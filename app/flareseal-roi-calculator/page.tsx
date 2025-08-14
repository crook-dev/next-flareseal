import { Metadata } from 'next'
import Link from 'next/link'
import ROICalculator from '@/components/roi-calculator/ROICalculator'

export const metadata: Metadata = {
  title: 'FlareSeal ROI Calculator - Calculate Your HVAC Leak Prevention Savings',
  description: 'Calculate your real savings from preventing refrigerant leaks with FlareSeal. See your ROI, annual cost savings, and how much money you can save by preventing HVAC flare connection leaks.',
  keywords: 'HVAC ROI calculator, refrigerant leak cost calculator, flare connection savings, HVAC maintenance cost calculator, FlareSeal ROI, HVAC leak prevention ROI',
  openGraph: {
    title: 'FlareSeal ROI Calculator - Calculate Your HVAC Leak Prevention Savings',
    description: 'Calculate your real savings from preventing refrigerant leaks with FlareSeal. See your ROI, annual cost savings, and how much money you can save by preventing HVAC flare connection leaks.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.flareseal.com/social.jpg',
        width: 1200,
        height: 630,
        alt: 'FlareSeal ROI Calculator - Calculate HVAC Leak Prevention Savings',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.flareseal.com/flareseal-roi-calculator',
  },
}

export default function ROICalculatorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-5">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            // WebPage Schema
            {
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              '@id': 'https://www.flareseal.com/flareseal-roi-calculator',
              name: 'FlareSeal ROI Calculator',
              description: 'Calculate your real savings from preventing refrigerant leaks with FlareSeal. See your ROI, annual cost savings, and how much money you can save by preventing HVAC flare connection leaks.',
              url: 'https://www.flareseal.com/flareseal-roi-calculator',
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
                    name: 'ROI Calculator',
                    item: 'https://www.flareseal.com/flareseal-roi-calculator'
                  }
                ]
              },
              mainEntity: {
                '@type': 'SoftwareApplication',
                name: 'FlareSeal ROI Calculator',
                description: 'Interactive calculator to determine cost savings and ROI from preventing HVAC refrigerant leaks',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web Browser',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                  description: 'Free ROI calculator tool'
                }
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
              ]
            },
            // FAQ Schema for the calculator
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'How much can I save by preventing refrigerant leaks?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Savings vary by installation volume and leak rate, but typically range from $1,000 to $10,000+ annually depending on your operation size and current leak rates.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'What is the ROI on FlareSeal products?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ROI typically ranges from 200% to 800% depending on your specific operation, with most customers seeing returns within 3-6 months of implementation.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'How does the ROI calculator work?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The calculator analyzes your monthly installations, industry leak rates, service call costs, and refrigerant costs to determine your potential annual savings and return on investment from preventing leaks.'
                  }
                }
              ]
            }
          ]).replace(/</g, '\\u003c'),
        }}
      />

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <header className="bg-gradient-to-r from-slate-700 to-blue-600 text-white p-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">FlareSeal ROI Calculator</h1>
          <p className="text-xl opacity-90">Calculate your real savings from preventing refrigerant leaks</p>
        </header>

        <section aria-label="ROI Calculator Tool">
          <ROICalculator />
        </section>

        <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-10 text-center" aria-label="Call to Action">
          <h2 className="text-3xl font-bold mb-4">Stop Losing Money to Preventable Leaks</h2>
          <p className="text-lg mb-6">Every leak costs you more than just the service call. Protect your reputation and your bottom line.</p>
          <Link
            href="/products"
            className="inline-block bg-white text-orange-500 px-8 py-4 rounded-full font-bold text-lg transition-transform hover:-translate-y-1 hover:shadow-lg"
            aria-label="Shop FlareSeal products to prevent refrigerant leaks"
          >
            Shop FlareSeal Products →
          </Link>
        </section>
      </div>
    </main>
  )
}
