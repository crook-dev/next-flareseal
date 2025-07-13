import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { STATIC_KNOWLEDGE_BASE_ARTICLES } from '@/lib/staticKnowledgeBaseData'
import { MarkdownContent } from '@/components/knowledge-base/MarkdownContent'

interface Props {
  params: Promise<{ slug: string }>
}

function getArticleBySlug(slug: string) {
  return STATIC_KNOWLEDGE_BASE_ARTICLES.find((article) => article.slug === slug)
}

export async function generateStaticParams() {
  return STATIC_KNOWLEDGE_BASE_ARTICLES.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) {
    return {}
  }

  return {
    title: `${article.title} | FlareSeal Knowledge Base`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      locale: 'en_US',
    },
    alternates: {
      canonical: `/knowledge-base/${article.slug}`,
    },
  }
}

export default async function KnowledgeBaseArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "FlareSeal",
    },
    publisher: {
      "@type": "Organization", 
      name: "FlareSeal",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.URL || 'https://flareseal.com'}/knowledge-base/${slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
        <article className="py-16 container mt-2">
          <header className="text-center p-5 mb-8">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric'
                })}
              </time>
              <span>•</span>
              <span>{article.readingTime}</span>
              {article.category && (
                <>
                  <span>•</span>
                  <Badge variant="secondary">{article.category}</Badge>
                </>
              )}
            </div>
            <h1 className="text-4xl font-bold lg:w-2/3 mx-auto text-primary mb-4">
              {article.title}
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {article.description}
            </p>
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>
          
          <div className="max-w-4xl mx-auto">
            <MarkdownContent content={article.content} />
          </div>
        </article>
    </>
  )
}