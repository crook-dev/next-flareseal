// components/knowledge-base/KnowledgeBaseClient.tsx (Client Component)
'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Clock, Calendar, ArrowRight, BookOpen, Wrench, AlertCircle } from 'lucide-react'
import { useState, useMemo } from 'react'

interface Article {
  title: string;
  description: string;
  slug: string;
  date: string;
  readingTime?: string;
  category?: string;
  tags?: string[];
}

interface KnowledgeBaseClientProps {
  articles: Article[];
}

// Helper function to get category icons
const getCategoryIcon = (category: string) => {
  const icons = {
    "Guides": BookOpen,
    "Prevention": AlertCircle,
    "Basics": BookOpen,
    "Installation": Wrench,
    "Troubleshooting": AlertCircle
  };
  return icons[category as keyof typeof icons] || BookOpen;
};

export function KnowledgeBaseClient({ articles }: KnowledgeBaseClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Generate categories dynamically from articles
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(articles.map(article => article.category || 'General'))];
    return ["All", ...uniqueCategories.sort()];
  }, [articles]);

  // Filter articles based on search and category
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (article.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All" || (article.category || 'General') === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  return (
    <>
    <div className="container">
      {/* Search and Filter Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles, topics, or solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="h-12"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 py-8 pb-16">
  {filteredArticles.map((article) => {
    const CategoryIcon = getCategoryIcon(article.category || 'General');
    return (
      <Card key={article.slug} className="group flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="text-center pb-2 flex-shrink-0">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CategoryIcon className="h-4 w-4 text-primary" />
            {article.category && (
              <Badge variant="secondary" className="w-fit">
                {article.category}
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl text-primary line-clamp-2 mb-2 group-hover:text-primary/80 transition-colors">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 p-6 pt-2">
          <p className="text-gray-700 text-base flex-grow line-clamp-4 mb-3">
            {article.description}
          </p>
          <div className="text-xs text-gray-500 mb-3 flex items-center justify-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readingTime || '5 min read'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(article.date).toLocaleDateString()}
            </span>
          </div>
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1 mb-3">
              {article.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="mt-auto pt-3">
            <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
              <Link href={`/knowledge-base/${article.slug}`}>
                Read more
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  })}
</div>

      {/* No Results State */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search terms or browse all categories
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
</div>
      {/* CTA Section */}
      <div className="bg-primary text-white p-8 mt-12 text-center">
        <h3 className="text-2xl font-bold mb-2">Ready to eliminate flare connection leaks?</h3>
        <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
          FlareSeal® multi-ring seals provide superior leak protection for all your flare connections. 
          Stop costly refrigerant leaks and reduce service calls today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link className="btn btn__white" href="/products">Shop FlareSeal® Products</Link>
          {/* <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
            <Link href="/contact">Request Technical Support</Link>
          </Button> */}
        </div>
      </div>
    </>
  )
}