import { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/shopify'
import fs from 'fs'
import path from 'path'

const baseUrl = 'https://www.flareseal.com'

async function getProductPages() {
  try {
    const products = await getAllProducts()
    const buildTime = new Date()
    
    return products.map(product => ({
      url: `${baseUrl}/products/${product.handle}`,
      lastModified: buildTime,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
    return []
  }
}

function getKnowledgeBasePages() {
  try {
    const kbDirectory = path.join(process.cwd(), 'knowledgebase')    
    if (!fs.existsSync(kbDirectory)) {
      console.warn(`Knowledge base directory not found: ${kbDirectory}`)
      return []
    }
    const filenames = fs.readdirSync(kbDirectory)
    const buildTime = new Date()
    return filenames
      .filter(name => name.endsWith('.md'))
      .map(name => {
        const slug = name.replace('.md', '')
        
        return {
          url: `${baseUrl}/knowledge-base/${slug}`,
          lastModified: buildTime,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }
      })
  } catch (error) {
    console.error('Error reading knowledge base files:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const buildTime = new Date()
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: buildTime,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: buildTime,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/flareseal-roi-calculator`,
      lastModified: buildTime,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/knowledge-base`,
      lastModified: buildTime,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: buildTime,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: buildTime,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: buildTime,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: buildTime,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]
  const [productPages, kbPages] = await Promise.all([
    getProductPages(),
    Promise.resolve(getKnowledgeBasePages())
  ])
  return [...staticPages, ...kbPages, ...productPages]
}