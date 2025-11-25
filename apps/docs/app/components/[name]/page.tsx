import Link from 'next/link'
import { notFound } from 'next/navigation'
import registry from '../../../../../registry.json'
import { Button } from '@/components/ui/button'

interface Component {
  name: string
  type: string
  path: string
}

function getComponent(name: string): Component | undefined {
  return registry.items.find(
    (item: Component) => item.name === name && item.type === 'component'
  )
}

export async function generateStaticParams() {
  return registry.items
    .filter((item: Component) => item.type === 'component' && item.name !== 'utils')
    .map((item: Component) => ({
      name: item.name,
    }))
}

export default function ComponentPage({ params }: { params: { name: string } }) {
  const component = getComponent(params.name)

  if (!component) {
    notFound()
  }

  const componentName = component.name.charAt(0).toUpperCase() + component.name.slice(1)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground inline-block mb-4">
            ← 返回首页
          </Link>
          <h1 className="text-4xl font-bold">{componentName}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">安装</h2>
            <div className="bg-muted p-4 rounded-lg border">
              <code className="text-sm">
                npx shadcn@latest add {component.name} --registry https://your-registry-url
              </code>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">示例</h2>
            <div className="border rounded-lg p-8 mb-4 bg-card">
              {component.name === 'button' && (
                <div className="flex gap-4 flex-wrap">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="tertiary">Tertiary</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              )}
              {component.name !== 'button' && (
                <p className="text-muted-foreground">组件预览即将添加</p>
              )}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">用法</h2>
            <div className="bg-muted p-4 rounded-lg border">
              <pre className="text-sm overflow-x-auto">
                <code>{`import { ${componentName} } from "@/components/ui/${component.name}"

<${componentName} />`}</code>
              </pre>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
