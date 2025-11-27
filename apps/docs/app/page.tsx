import Link from 'next/link'
import { Sidebar } from '../components/layout/sidebar'
import registry from '../../../registry.json'

interface Component {
  name: string
  type: string
  title?: string
  description?: string
  files?: Array<{ path: string; type: string }>
}

export default function HomePage() {
  const components = registry.items.filter(
    (item: Component) => (item.type === 'registry:component' || item.type === 'component') && item.name !== 'utils'
  )

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-64">
        <div className="container mx-auto px-4 py-12 max-w-4xl lg:mr-64">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Components</h1>
            <p className="text-lg text-muted-foreground">
              一套基于 CloudTower UI 设计规范的 React 组件库
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {components.map((component: Component) => (
              <Link
                key={component.name}
                href={`/components/${component.name}`}
                className="group block p-6 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2 capitalize group-hover:text-accent-foreground">
                  {component.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  查看 {component.name} 组件的文档和示例
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
