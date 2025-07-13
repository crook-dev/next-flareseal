import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface MarkdownContentProps {
  content: string
  className?: string
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={cn("prose prose-lg max-w-none", className)}>
      <ReactMarkdown
        components={{
          // Links
          a: ({ href, children, ...props }) => {
            if (href?.startsWith('/')) {
              return (
                <Link 
                  href={href} 
                  className="text-blue-600 underline hover:text-blue-800 transition-colors"
                >
                  {children}
                </Link>
              )
            }
            return (
              <a 
                href={href} 
                {...props} 
                className="text-blue-600 underline hover:text-blue-800 transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {children}
              </a>
            )
          },
          
          // Headings
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-6 mt-8 text-foreground first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl text-primary font-bold mb-4 mt-8 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl text-primary font-bold mb-3 mt-6">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg text-primary font-bold mb-2 mt-5">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-base font-bold mb-2 mt-4 text-foreground">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-bold mb-2 mt-4 text-muted-foreground">
              {children}
            </h6>
          ),
          
          // Lists
          ul: ({ children }) => (
            <ul className="list-disc ml-6 mb-6 space-y-2 text-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-6 mb-6 space-y-2 text-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          
          // Paragraphs and text
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed text-foreground">
              {children}
            </p>
          ),
          
          // Code
          code: ({ children, className }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
                  {children}
                </code>
              )
            }
            return (
              <code className={className}>
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-6 text-sm">
              {children}
            </pre>
          ),
          
          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic mb-6 text-muted-foreground">
              {children}
            </blockquote>
          ),
          
          // Tables
          table: ({ children }) => (
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-border">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="border border-border px-4 py-2 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-4 py-2">
              {children}
            </td>
          ),
          
          // Horizontal rule
          hr: () => (
            <hr className="my-8 border-border" />
          ),
          
          // Images
          img: ({ src, alt, ...props }) => (
            <Image 
              src={src as string} 
              alt={alt || ''} 
              {...props} 
              className="max-w-full h-auto rounded-lg mb-6"
              width={1000}
              height={1000}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}