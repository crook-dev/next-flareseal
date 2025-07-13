import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const metaTitle = "FAQs | FlareSeal leak free flare connections"
const metaDesc = "Find the answers to the the most frequently asked questions about leak free flare connections | FlareSeal"

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDesc,
  openGraph: {
    title: metaTitle,
    description: metaDesc,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://nuxt.com/social.jpg', // Update this to your actual image
      }
    ],
  },
  alternates: {
    canonical: '/faq', // Update with your actual URL structure
  },
}

const faqs = [
  {
    id: 1,
    question: "How is FlareSeal® better than liquid thread lock products?",
    answer:
      "The sealing surface is the most important part of the flare connection. FlareSeal® has multiple rings on the copper crush sealing surface providing extra points of connections. The FlareSeal® helps compensate for any mis-alignment between the male fitting and the flare. Any imperfections in the flare connection are filled in by the proprietary Loctite® coating on the copper seal.",
  },
  {
    id: 2,
    question: "What are the steps to install FlareSeal®?",
    answer:
      "1. Make sure the flare surface is clean and free of debris. 2. Snap the FlareSeal® squarely onto the nose of the male flare fitting. It will stay in place due to our special snap-on design. 3. Tighten the flare fitting to the manufacturers specific recommendations. Do not over tighten the FlareSeal®. 4. Enjoy a confident leak-free flare connection every time.",
  },
  {
    id: 3,
    question:
      "I am a wholesaler / distributor of Refrigeration and HVAC products in the USA. Will you offer a stocking wholesaler pricing?",
    answer:
      "Yes, stocking wholesale pricing is available. Contact FlareSeal for more information 800-455-9628.",
  },
  {
    id: 4,
    question:
      "I am interested in becoming a Master Distributor for a country or region outside the USA. How can I become a Master Distributor for FlareSeal®?",
    answer:
      "We are looking for exclusive Master Distributor partners all over the world, please reach out to FlareSeal® directly for more information.",
  },
  {
    id: 5,
    question:
      "I am an OEM of Refrigeration / HVAC equipment and buy in large volume. Do you offer a better price for large volume purchases?",
    answer:
      "Of course we do. We also can provide free samples for your testing. If you are an HVAC or Refrigeration OEM we can help save you money and eliminate flare leaks. Please reach out to FlareSeal® customer service at 800-455-9628 to discuss your OEM business needs.",
  },
]

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org/",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/* Hero Section */}
        <section className="pt-4 pb-8">
          <div className="container pt-8">
            <div className="flex w-full border-b-2 border-gray-200 pb-8">
              <div className="w-full text-center">
                <h1 className="text-4xl font-bold text-primary pb-8">
                  FlareSeal&reg; FAQs
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container py-8">
          <div className="space-y-6">
            {faqs.map((faq) => (
              <Card key={faq.id} className="mx-auto max-w-4xl shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-primary leading-tight">
                      {faq.question}
                    </h2>
                    <Separator className="bg-gray-100" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}