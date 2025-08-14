// app/knowledge-base/page.tsx (Server Component)
import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { STATIC_KNOWLEDGE_BASE_ARTICLES } from '@/lib/staticKnowledgeBaseData'
import { KnowledgeBaseClient } from '@/components/knowledge-base/KnowledgeBaseClient'

const metaTitle = "Knowledge Base on Flare Fittings and Leak Prevention | FlareSeal"
const metaDesc = "Explore our comprehensive knowledge base for articles on flare fittings and how to prevent them from leaking. Learn more about FlareSeal's solutions."

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
        url: 'https://www.flareseal.com/social.jpg', // Updated with actual image
        width: 1200,
        height: 630,
        alt: 'FlareSeal Knowledge Base',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.flareseal.com/knowledge-base',
  },
}

export default function KnowledgeBasePage() {
  const articles = STATIC_KNOWLEDGE_BASE_ARTICLES;

  return (
    <main className="">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': 'https://www.flareseal.com/knowledge-base',
            name: 'FlareSeal Knowledge Base',
            description: 'Comprehensive knowledge base for articles on flare fittings and leak prevention',
            url: 'https://www.flareseal.com/knowledge-base',
            mainEntity: {
              '@type': 'ItemList',
              name: 'FlareSeal Knowledge Base Articles',
              description: 'Educational content about flare fittings and leak prevention',
              numberOfItems: articles.length,
              itemListElement: articles.map((article, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Article',
                  '@id': `https://www.flareseal.com/knowledge-base/${article.slug}`,
                  headline: article.title,
                  description: article.description,
                  datePublished: article.date,
                  author: {
                    '@type': 'Organization',
                    name: 'FlareSeal'
                  },
                  publisher: {
                    '@type': 'Organization',
                    name: 'FlareSeal'
                  }
                }
              }))
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
                  name: 'Knowledge Base',
                  item: 'https://www.flareseal.com/knowledge-base'
                }
              ]
            },
            publisher: {
              '@type': 'Organization',
              name: 'FlareSeal',
              url: 'https://www.flareseal.com',
              logo: 'https://www.flareseal.com/images/logo.png'
            }
          }).replace(/</g, '\\u003c'),
        }}
      />

      <div className="container">
      <PageHeader 
        title="FlareSeal&reg; Knowledge Base"
        subtitle="Welcome to our knowledge base. Here, you will find comprehensive information about flare fittings and how to prevent them from leaking. Explore our articles to learn more."
      />
      </div>      
      <KnowledgeBaseClient articles={articles} />
    </main>
  )
}