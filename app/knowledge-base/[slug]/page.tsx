import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { STATIC_KNOWLEDGE_BASE_ARTICLES } from '@/lib/staticKnowledgeBaseData'
import { MarkdownContent } from '@/components/knowledge-base/MarkdownContent'
import { ArrowLeft, Clock, Calendar, BookOpen, ArrowRight, Share2 } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

type Article = {
  slug: string
  title: string
  description: string
  category?: string
  tags?: string[]
  date: string
  readingTime?: string
  content: string
}

function getArticleBySlug(slug: string) {
  return STATIC_KNOWLEDGE_BASE_ARTICLES.find((article) => article.slug === slug)
}

function getRelatedArticles(currentArticle: Article, limit = 3) {
  return STATIC_KNOWLEDGE_BASE_ARTICLES
    .filter(article => 
      article.slug !== currentArticle.slug && 
      (article.category === currentArticle.category || 
       article.tags?.some(tag => currentArticle.tags?.includes(tag)))
    )
    .slice(0, limit)
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

  const relatedArticles = getRelatedArticles(article)

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
      
      {/* Breadcrumb Navigation */}
      <div className="container py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/knowledge-base" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            Knowledge Base
          </Link>
          <span>•</span>
          <span className="text-foreground">{article.title}</span>
        </div>
      </div>

      <article className="pb-16 container">
        <header className="text-center p-5 mb-12">
          {/* Article Meta */}
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
            <time dateTime={article.date} className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long', 
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readingTime || '5 min read'}
            </span>
            {article.category && (
              <>
                <span>•</span>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {article.category}
                </Badge>
              </>
            )}
          </div>

          {/* Title and Description */}
          <h1 className="text-4xl md:text-5xl font-bold lg:w-2/3 mx-auto text-primary mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6">
            {article.description}
          </p>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Share Button */}
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Article
          </Button>
        </header>
        
        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <MarkdownContent content={article.content} />
        </div>

        <Separator className="my-12 max-w-4xl mx-auto" />

        {/* Article Footer */}
        <footer className="max-w-4xl mx-auto">
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 mb-8 text-center border border-primary/20">
            <h3 className="text-xl font-bold mb-2 text-primary">Ready to solve your flare connection problems?</h3>
            <p className="text-muted-foreground mb-4">
              FlareSeal® products provide the reliable, leak-free connections your HVAC systems need.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link className="btn btn__primary" href="/shop">Shop FlareSeal® Products</Link>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <div key={relatedArticle.slug} className="group border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      {relatedArticle.category && (
                        <Badge variant="secondary" className="text-xs">
                          {relatedArticle.category}
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/knowledge-base/${relatedArticle.slug}`}>
                        {relatedArticle.title}
                      </Link>
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {relatedArticle.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{relatedArticle.readingTime || '5 min read'}</span>
                      <Link 
                        href={`/knowledge-base/${relatedArticle.slug}`}
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        Read more
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back to Knowledge Base */}
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/knowledge-base" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Knowledge Base
              </Link>
            </Button>
          </div>
        </footer>
      </article>
    </>
  )
}