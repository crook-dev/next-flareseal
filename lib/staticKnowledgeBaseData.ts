import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface KnowledgeBaseArticle {
  title: string
  description: string
  slug: string
  date: string
  content: string
  draft?: boolean
  category?: string
  tags?: string[]
  readingTime?: string
}

// This function runs at BUILD TIME only
export function buildStaticKnowledgeBaseData(): KnowledgeBaseArticle[] {
  const knowledgeBaseDirectory = path.join(process.cwd(), 'knowledgebase');
  
  try {
    const filenames = fs.readdirSync(knowledgeBaseDirectory);
    const markdownFiles = filenames.filter(file => file.endsWith('.md'));

    const articles = markdownFiles.map((filename) => {
      const filePath = path.join(knowledgeBaseDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        title: data.title || '',
        description: data.description || '',
        slug: data.slug || filename.replace('.md', ''),
        date: data.date || '',
        content: content,
        draft: data.draft || false,
        category: data.category || 'General',
        tags: data.tags || [],
        readingTime: data.readingTime || '5 min read',
      } satisfies KnowledgeBaseArticle;
    });

    // Filter out drafts and sort by date (newest first)
    return articles
      .filter(article => !article.draft)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error building static knowledge base data:', error);
    return [];
  }
}

// Export the static data - this gets evaluated at build time
export const STATIC_KNOWLEDGE_BASE_ARTICLES = buildStaticKnowledgeBaseData();