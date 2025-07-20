'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Share2, 
  X, 
  Facebook, 
  Linkedin, 
  Copy,
  Check,
  Mail,
  MessageCircle
} from 'lucide-react'

interface ShareButtonProps {
  title: string
  description: string
  url: string
}

export function ShareButton({ title, description, url }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleShare = async (platform: string) => {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)
    const encodedDescription = encodeURIComponent(description)

    switch (platform) {
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({ 
              title, 
              text: description, 
              url 
            })
          } catch (error) {
            console.error('Share error', error)
          }
        }
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`)
        break
      case 'email':
        window.open(`mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`)
        break
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`)
        break
      case 'copy':
        try {
          await navigator.clipboard.writeText(url)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (error) {
          console.error('Failed to copy to clipboard', error)
        }
        break
    }
    setIsOpen(false)
  }

  const shareOptions = [
    {
      id: 'native',
      label: 'Share',
      icon: Share2,
      description: 'Use your device\'s share menu',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'X',
      label: 'X',
      icon: X,
      description: 'Share on X',
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      id: 'facebook',
      label: 'Facebook',
      icon: Facebook,
      description: 'Share on Facebook',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      description: 'Share on LinkedIn',
      color: 'bg-blue-700 hover:bg-blue-800'
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      description: 'Share via email',
      color: 'bg-gray-500 hover:bg-gray-600'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      description: 'Share on WhatsApp',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'copy',
      label: copied ? 'Copied!' : 'Copy Link',
      icon: copied ? Check : Copy,
      description: 'Copy link to clipboard',
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ]

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Share2 className="h-4 w-4" />
        Share Article
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2">
            <div className="text-sm font-medium text-gray-900 mb-3 px-2">
              Share this article
            </div>
            
            <div className="space-y-1">
              {shareOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.id}
                    onClick={() => handleShare(option.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full ${option.color} flex items-center justify-center text-white`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {option.label}
                      </div>
                      <div className="text-xs text-gray-500">
                        {option.description}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}