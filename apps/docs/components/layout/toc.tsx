'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    const updateHeadings = () => {
      const headingElements = Array.from(
        document.querySelectorAll('h2, h3')
      ) as HTMLElement[]

      const headingData = headingElements.map((el, index) => {
        const id = el.id || `heading-${index}`
        if (!el.id) {
          el.id = id
        }
        return {
          id,
          text: el.textContent || '',
          level: parseInt(el.tagName.charAt(1)),
        }
      })

      setHeadings(headingData)
    }

    updateHeadings()
    const observer = new MutationObserver(updateHeadings)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <aside className="hidden lg:block fixed top-14 right-0 z-30 h-[calc(100vh-3.5rem)] w-64 overflow-y-auto border-l bg-background px-4 py-6">
      <div className="mb-4">
        <h4 className="mb-2 text-sm font-semibold">On This Page</h4>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                'block text-sm text-muted-foreground hover:text-foreground transition-colors',
                heading.level === 3 && 'pl-4'
              )}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}

