'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import registry from '../../../../registry.json'
import { cn } from '@/lib/utils'

interface Component {
  name: string
  type: string
  title?: string
  description?: string
  files?: Array<{ path: string; type: string }>
}

const components = registry.items.filter(
  (item: Component) => (item.type === 'registry:component' || item.type === 'component') && item.name !== 'utils'
)

const navigation = [
  {
    title: 'Get Started',
    items: [
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Theming', href: '/docs/theming' },
      { title: 'CLI', href: '/docs/cli' },
    ],
  },
  {
    title: 'Components',
    items: components.map((item: Component) => ({
      title: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      href: `/components/${item.name}`,
    })),
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:block fixed top-14 left-0 z-30 h-[calc(100vh-3.5rem)] w-64 overflow-y-auto border-r bg-background px-4 py-6">
      <nav className="space-y-6">
        {navigation.map((section) => (
          <div key={section.title}>
            <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}

