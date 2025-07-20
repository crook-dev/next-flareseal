import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, ChevronDown } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    id: 1,
    question: "How is FlareSeal® better than liquid thread lock products?",
    answer:
      "The sealing surface is the most important part of the flare connection. FlareSeal® has multiple rings on the copper crush sealing surface providing extra points of connections. The FlareSeal® helps compensate for any mis-alignment between the male fitting and the flare. Any imperfections in the flare connection are filled in by the proprietary Loctite® coating on the copper seal."
  },
  {
    id: 2,
    question: "What are the steps to install FlareSeal®?",
    answer:
      "1. Make sure the flare surface is clean and free of debris. 2. Snap the FlareSeal® squarely onto the nose of the male flare fitting. It will stay in place due to our special snap-on design. 3. Tighten the flare fitting to the manufacturers specific recommendations. Do not over tighten the FlareSeal®. 4. Enjoy a confident leak-free flare connection every time."
  },
  {
    id: 3,
    question: "Do you offer wholesale pricing for distributors?",
    answer:
      "Yes, stocking wholesale pricing is available for wholesalers and distributors of Refrigeration and HVAC products in the USA. Contact FlareSeal for more information at 800-455-9628."
  },
  {
    id: 4,
    question: "How can I become a Master Distributor for FlareSeal®?",
    answer:
      "We are looking for exclusive Master Distributor partners all over the world. Please reach out to FlareSeal® directly for more information about international distribution opportunities."
  },
  {
    id: 5,
    question: "Do you offer volume pricing for OEM manufacturers?",
    answer:
      "Yes, we offer volume pricing for HVAC and Refrigeration OEMs. We also provide free samples for testing. Please contact FlareSeal® customer service at 800-455-9628 to discuss your OEM business needs."
  },
  {
    id: 6,
    question: "What sizes does FlareSeal® come in?",
    answer:
      "FlareSeal® is available in standard SAE flare sizes: 1/4\", 3/8\", 1/2\", 5/8\", and 3/4\" to fit all common HVAC and refrigeration applications including mini-split systems."
  },
  {
    id: 7,
    question: "Can FlareSeal® fix existing refrigerant leaks?",
    answer:
      "Yes! FlareSeal® can be used to repair small existing leaks in flare connections while maintaining serviceability of the connection, making it perfect for both new installations and repairs."
  },
  {
    id: 8,
    question: "Is FlareSeal® compatible with all refrigerants?",
    answer:
      "FlareSeal® is designed to work with all common refrigerants used in HVAC and refrigeration systems, including R-410A, R-22, R-134a, and other standard refrigerants."
  },
  {
    id: 9,
    question: "How long does FlareSeal® last?",
    answer:
      "FlareSeal® provides a permanent, long-term leak-free connection. The copper construction and Loctite coating are designed for the lifetime of the system."
  }
]

export const metadata: Metadata = {
  title: "Frequently Asked Questions | FlareSeal® HVAC Flare Connections",
  description: "Get answers to frequently asked questions about FlareSeal® leak-free flare connections for HVAC and refrigeration systems. Installation, compatibility, sizing, and more.",
  openGraph: {
    title: "Frequently Asked Questions | FlareSeal® HVAC Flare Connections",
    description: "Get answers to frequently asked questions about FlareSeal® leak-free flare connections for HVAC and refrigeration systems. Installation, compatibility, sizing, and more.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.FlareSeal.com/social.jpg",
        width: 1200,
        height: 630,
        alt: "FlareSeal® FAQ",
      },
    ],
  },
  alternates: {
    canonical: 'https://www.flareseal.com/faqs',
  },
  other: {
    'application/ld+json': JSON.stringify([
      // FAQ Schema
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': 'https://www.flareseal.com/faqs',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        })),
        about: {
          '@type': 'Product',
          name: 'FlareSeal',
          description: 'Leak free flare connections for HVAC and refrigeration'
        },
        publisher: {
          '@type': 'Organization',
          name: 'FlareSeal'
        }
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
            item: 'https://www.flareseal.com/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'FAQ',
            item: 'https://www.flareseal.com/faqs'
          }
        ]
      }
    ])
  },
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b-2 border-gray-100">
        <div className="container py-16">
          <div className="text-center max-w-4xl mx-auto">
            <nav className="text-sm mb-6 text-gray-600">
              <span>Home</span> <span className="mx-2">›</span> <span>FAQ</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-primary leading-relaxed">
              Everything you need to know about FlareSeal® leak-free flare connections
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-16">
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq) => (
            <Card 
              key={faq.id} 
              className="shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
            >
              <CardContent className="p-0">
                <details className="group/details">
                  <summary className="cursor-pointer p-6 list-none hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <h2 className="font-semibold text-primary leading-tight pr-4 text-lg">
                        {faq.question}
                      </h2>
                      <ChevronDown className="w-5 h-5 text-gray-400 group-open/details:rotate-180 transition-transform duration-200 flex-shrink-0 mt-1" />
                    </div>
                  </summary>
                  <div className="border-t border-gray-100">
                    <div className="p-6 pt-5">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </details>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Our expert team is ready to help you find the perfect leak-free solution for your HVAC and refrigeration needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="tel:800-455-9628" 
              className="flex items-center gap-3 btn btn__white"
            >
              <Phone className="w-5 h-5" />
              Call 800-455-9628
            </Link>
            <Link 
              href="mailto:support@flareseal.com" 
              className="flex items-center gap-3 btn btn__white"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}