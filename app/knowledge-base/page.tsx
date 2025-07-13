import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { STATIC_KNOWLEDGE_BASE_ARTICLES } from '@/lib/staticKnowledgeBaseData'

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
      <main className="container">
        <PageHeader 
          title="Flare Fittings Knowledge Base"
          subtitle="Welcome to our knowledge base. Here, you will find comprehensive information about flare fittings and how to prevent them from leaking. Explore our articles to learn more."
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 py-8 pb-16">
          {articles.map((article) => (
            <Card key={article.slug} className="flex flex-col h-80 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl text-primary line-clamp-2 mb-2">
                  {article.title}
                </CardTitle>
                {article.category && (
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {article.category}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="flex flex-col flex-grow p-6 pt-2">
                <p className="text-gray-700 text-base flex-grow line-clamp-4 mb-3">
                  {article.description}
                </p>
                <div className="text-xs text-gray-500 mb-3">
                  {article.readingTime} • {new Date(article.date).toLocaleDateString()}
                </div>
                <div className="mt-auto">
                  <Button asChild className="w-full">
                    <Link href={`/knowledge-base/${article.slug}`}>
                      Read more
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
  )
}