'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/gtm'

export default function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view on route change
    if (typeof window !== 'undefined') {
      trackPageView(window.location.href, document.title)
    }
  }, [pathname])

  return null // This component doesn't render anything visible
}