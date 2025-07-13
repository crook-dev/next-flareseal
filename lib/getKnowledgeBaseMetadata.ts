import fs from 'fs';
import matter from 'gray-matter';

export default function getKnowledgeBaseMetadata(basePath: string = 'knowledgebase') {
  const folder = basePath + '/';
  const files = fs.readdirSync(folder);
  const markdownArticles = files.filter((file) => file.endsWith('.md'));

  const articles = markdownArticles.map((fileName) => {
    const fileContents = fs.readFileSync(`${basePath}/${fileName}`, 'utf8');
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      description: matterResult.data.description,
      slug: matterResult.data.slug || fileName.replace('.md', ''),
      category: matterResult.data.category || 'General',
      tags: matterResult.data.tags || [],
      readingTime: matterResult.data.readingTime || '5 min read',
      draft: matterResult.data.draft || false,
    };
  });

  // Filter out drafts and sort by date
  return articles
    .filter(article => !article.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}