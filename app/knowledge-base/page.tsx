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
        url: 'https://nuxt.com/social.jpg', // Update with your actual image
      }
    ],
  },
  alternates: {
    canonical: '/knowledge-base',
  },
}

export default function KnowledgeBasePage() {
  const articles = STATIC_KNOWLEDGE_BASE_ARTICLES;

  return (
    <main className="">
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