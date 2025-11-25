import Link from 'next/link'
import registry from '../../../registry.json'

interface Component {
  name: string
  type: string
  path: string
}

export default function HomePage() {
  const components = registry.items.filter(
    (item: Component) => item.type === 'component' && item.name !== 'utils'
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Internal UI Registry</h1>
          <p className="text-muted-foreground mt-2">
            Internal lightweight UI registry for company tools
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">组件</h2>
          <p className="text-lg text-muted-foreground">
            一套基于 CloudTower UI 设计规范的 React 组件库
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </main>
    </div>
  )
}
