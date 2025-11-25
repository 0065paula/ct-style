import { notFound } from 'next/navigation'
import { Copy } from 'lucide-react'
import dynamic from 'next/dynamic'
import registry from '../../../../../registry.json'
import { Sidebar } from '../../../components/layout/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const TableOfContents = dynamic(() => import('../../../components/layout/toc').then(mod => ({ default: mod.TableOfContents })), {
  ssr: false,
})

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

  const componentName = component.name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  // API 参数表格数据
  const getApiProps = (name: string) => {
    switch (name) {
      case 'button':
        return [
          { prop: 'variant', type: '"default" | "secondary" | "tertiary" | "basic" | "ontint" | "accent" | "quietBold" | "quiet" | "destructive" | "outline" | "ghost" | "link"', default: '"default"', description: '按钮的视觉样式变体' },
          { prop: 'size', type: '"sm" | "default" | "lg" | "icon"', default: '"default"', description: '按钮的尺寸' },
          { prop: 'asChild', type: 'boolean', default: 'false', description: '是否作为子元素渲染（用于 Radix UI Slot）' },
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'ButtonHTMLAttributes<HTMLButtonElement>', default: '-', description: '继承所有原生 button 元素的属性' },
        ]
      case 'input':
        return [
          { prop: 'size', type: '"sm" | "default" | "lg"', default: '"default"', description: '输入框的尺寸' },
          { prop: 'variant', type: '"default" | "error"', default: '"default"', description: '输入框的视觉样式变体' },
          { prop: 'type', type: 'string', default: '"text"', description: '输入框类型（text, email, password 等）' },
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'InputHTMLAttributes<HTMLInputElement>', default: '-', description: '继承所有原生 input 元素的属性' },
        ]
      case 'label':
        return [
          { prop: 'htmlFor', type: 'string', default: 'undefined', description: '关联的表单元素 ID' },
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'LabelPrimitive.Root props', default: '-', description: '继承所有 Radix UI Label 的属性' },
        ]
      case 'card':
        return [
          { prop: 'Card', type: 'React.Component', default: '-', description: '主卡片容器组件' },
          { prop: 'Card.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: 'CardHeader', type: 'React.Component', default: '-', description: '卡片头部容器' },
          { prop: 'CardHeader.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: 'CardTitle', type: 'React.Component', default: '-', description: '卡片标题' },
          { prop: 'CardTitle.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: 'CardDescription', type: 'React.Component', default: '-', description: '卡片描述' },
          { prop: 'CardDescription.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: 'CardContent', type: 'React.Component', default: '-', description: '卡片内容区域' },
          { prop: 'CardContent.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: 'CardFooter', type: 'React.Component', default: '-', description: '卡片底部区域' },
          { prop: 'CardFooter.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'HTMLAttributes<HTMLDivElement>', default: '-', description: '所有子组件继承对应的 HTML 元素属性' },
        ]
      case 'checkbox':
        return [
          { prop: 'checked', type: 'boolean', default: 'undefined', description: '是否选中（受控）' },
          { prop: 'defaultChecked', type: 'boolean', default: 'false', description: '默认是否选中（非受控）' },
          { prop: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
          { prop: 'required', type: 'boolean', default: 'false', description: '是否必填' },
          { prop: 'name', type: 'string', default: 'undefined', description: '表单字段名称' },
          { prop: 'value', type: 'string', default: 'undefined', description: '表单字段值' },
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'CheckboxPrimitive.Root props', default: '-', description: '继承所有 Radix UI Checkbox 的属性' },
        ]
      case 'radio-group':
        return [
          { prop: 'RadioGroup', type: 'React.Component', default: '-', description: '单选按钮组容器' },
          { prop: 'RadioGroup.value', type: 'string', default: 'undefined', description: '当前选中的值（受控）' },
          { prop: 'RadioGroup.defaultValue', type: 'string', default: 'undefined', description: '默认选中的值（非受控）' },
          { prop: 'RadioGroup.disabled', type: 'boolean', default: 'false', description: '是否禁用整个组' },
          { prop: 'RadioGroup.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: 'RadioGroupItem', type: 'React.Component', default: '-', description: '单选按钮项' },
          { prop: 'RadioGroupItem.value', type: 'string', default: '-', description: '该项的值（必需）' },
          { prop: 'RadioGroupItem.disabled', type: 'boolean', default: 'false', description: '是否禁用该项' },
          { prop: 'RadioGroupItem.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'RadioGroupPrimitive props', default: '-', description: '继承所有 Radix UI RadioGroup 的属性' },
        ]
      case 'switch':
        return [
          { prop: 'checked', type: 'boolean', default: 'undefined', description: '是否开启（受控）' },
          { prop: 'defaultChecked', type: 'boolean', default: 'false', description: '默认是否开启（非受控）' },
          { prop: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
          { prop: 'required', type: 'boolean', default: 'false', description: '是否必填' },
          { prop: 'name', type: 'string', default: 'undefined', description: '表单字段名称' },
          { prop: 'value', type: 'string', default: 'undefined', description: '表单字段值' },
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'SwitchPrimitives.Root props', default: '-', description: '继承所有 Radix UI Switch 的属性' },
        ]
      case 'tabs':
        return [
          { prop: 'Tabs', type: 'React.Component', default: '-', description: '标签页容器' },
          { prop: 'Tabs.value', type: 'string', default: 'undefined', description: '当前激活的标签页（受控）' },
          { prop: 'Tabs.defaultValue', type: 'string', default: 'undefined', description: '默认激活的标签页（非受控）' },
          { prop: 'Tabs.orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: '标签页方向' },
          { prop: 'Tabs.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: 'TabsList', type: 'React.Component', default: '-', description: '标签页列表容器' },
          { prop: 'TabsList.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: 'TabsTrigger', type: 'React.Component', default: '-', description: '标签页触发器' },
          { prop: 'TabsTrigger.value', type: 'string', default: '-', description: '标签页的值（必需）' },
          { prop: 'TabsTrigger.disabled', type: 'boolean', default: 'false', description: '是否禁用' },
          { prop: 'TabsTrigger.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: 'TabsContent', type: 'React.Component', default: '-', description: '标签页内容' },
          { prop: 'TabsContent.value', type: 'string', default: '-', description: '内容对应的标签页值（必需）' },
          { prop: 'TabsContent.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'TabsPrimitive props', default: '-', description: '继承所有 Radix UI Tabs 的属性' },
        ]
      default:
        return []
    }
  }

  const apiProps = getApiProps(component.name)

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-64 lg:mr-64">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{componentName}</h1>
              <p className="text-muted-foreground">
                {componentName === 'Button' && 'Displays a button or a component that looks like a button.'}
                {componentName === 'Input' && 'A form input component with various sizes and variants.'}
                {componentName === 'Card' && 'Displays a card with header, content, and footer.'}
                {componentName === 'Label' && 'A label component for form inputs.'}
                {componentName === 'Checkbox' && 'A control that allows the user to toggle between checked and unchecked states.'}
                {componentName === 'Radio Group' && 'A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.'}
                {componentName === 'Switch' && 'A control that allows the user to toggle between on and off states.'}
                {componentName === 'Tabs' && 'A set of layered sections of content—known as tab panels—that are displayed one at a time.'}
              </p>
          </div>

          <section id="installation" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Installation</h2>
            <div className="relative rounded-lg border bg-muted p-4">
              <button className="absolute right-4 top-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8">
                <Copy className="h-4 w-4" />
              </button>
              <pre className="text-sm overflow-x-auto">
                <code>{`npx shadcn@latest add ${component.name}`}</code>
              </pre>
            </div>
          </section>

          <section id="usage" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Usage</h2>
            <div className="rounded-lg border bg-card p-8 mb-4">
              {component.name === 'button' && (
                <div className="space-y-8">
                  {/* All Variants with Default Size */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">All Variants (Default Size)</h3>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="default" size="default">Default</Button>
                      <Button variant="secondary" size="default">Secondary</Button>
                      <Button variant="tertiary" size="default">Tertiary</Button>
                      <Button variant="basic" size="default">Basic</Button>
                      <Button variant="ontint" size="default">OnTint</Button>
                      <Button variant="accent" size="default">Accent</Button>
                      <Button variant="quietBold" size="default">Quiet Bold</Button>
                      <Button variant="quiet" size="default">Quiet</Button>
                      <Button variant="destructive" size="default">Destructive</Button>
                      <Button variant="outline" size="default">Outline</Button>
                      <Button variant="ghost" size="default">Ghost</Button>
                      <Button variant="link" size="default">Link</Button>
                    </div>
                  </div>

                  {/* All Variants with Small Size */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">All Variants (Small Size)</h3>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="default" size="sm">Default</Button>
                      <Button variant="secondary" size="sm">Secondary</Button>
                      <Button variant="tertiary" size="sm">Tertiary</Button>
                      <Button variant="basic" size="sm">Basic</Button>
                      <Button variant="ontint" size="sm">OnTint</Button>
                      <Button variant="accent" size="sm">Accent</Button>
                      <Button variant="quietBold" size="sm">Quiet Bold</Button>
                      <Button variant="quiet" size="sm">Quiet</Button>
                      <Button variant="destructive" size="sm">Destructive</Button>
                      <Button variant="outline" size="sm">Outline</Button>
                      <Button variant="ghost" size="sm">Ghost</Button>
                      <Button variant="link" size="sm">Link</Button>
                    </div>
                  </div>

                  {/* All Variants with Large Size */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">All Variants (Large Size)</h3>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="default" size="lg">Default</Button>
                      <Button variant="secondary" size="lg">Secondary</Button>
                      <Button variant="tertiary" size="lg">Tertiary</Button>
                      <Button variant="basic" size="lg">Basic</Button>
                      <Button variant="ontint" size="lg">OnTint</Button>
                      <Button variant="accent" size="lg">Accent</Button>
                      <Button variant="quietBold" size="lg">Quiet Bold</Button>
                      <Button variant="quiet" size="lg">Quiet</Button>
                      <Button variant="destructive" size="lg">Destructive</Button>
                      <Button variant="outline" size="lg">Outline</Button>
                      <Button variant="ghost" size="lg">Ghost</Button>
                      <Button variant="link" size="lg">Link</Button>
                    </div>
                  </div>

                  {/* Icon Size */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Icon Size</h3>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="default" size="icon">⚙</Button>
                      <Button variant="secondary" size="icon">⚙</Button>
                      <Button variant="tertiary" size="icon">⚙</Button>
                      <Button variant="basic" size="icon">⚙</Button>
                      <Button variant="ontint" size="icon">⚙</Button>
                      <Button variant="accent" size="icon">⚙</Button>
                      <Button variant="quietBold" size="icon">⚙</Button>
                      <Button variant="quiet" size="icon">⚙</Button>
                      <Button variant="destructive" size="icon">⚙</Button>
                      <Button variant="outline" size="icon">⚙</Button>
                      <Button variant="ghost" size="icon">⚙</Button>
                    </div>
                  </div>

                  {/* Disabled States */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Disabled States</h3>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="default" disabled>Disabled</Button>
                      <Button variant="secondary" disabled>Disabled</Button>
                      <Button variant="tertiary" disabled>Disabled</Button>
                      <Button variant="basic" disabled>Disabled</Button>
                      <Button variant="destructive" disabled>Disabled</Button>
                      <Button variant="outline" disabled>Disabled</Button>
                      <Button variant="ghost" disabled>Disabled</Button>
                    </div>
                  </div>
                </div>
              )}
              {component.name === 'input' && (
                <div className="space-y-8">
                  {/* All Size × Variant Combinations */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">All Size × Variant Combinations</h3>
                    
                    {/* Small Size */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-muted-foreground">Small Size</h4>
                      <div className="flex flex-col gap-3">
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Default Variant</label>
                          <Input size="sm" variant="default" placeholder="Small default input" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Error Variant</label>
                          <Input size="sm" variant="error" placeholder="Small error input" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">With Value</label>
                          <Input size="sm" variant="default" defaultValue="value@example.com" placeholder="Small input" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Disabled</label>
                          <Input size="sm" variant="default" disabled placeholder="Small disabled input" />
                        </div>
                      </div>
                    </div>

                    {/* Default Size */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-muted-foreground">Default Size</h4>
                      <div className="flex flex-col gap-3">
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Default Variant</label>
                          <Input size="default" variant="default" placeholder="Default input" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Error Variant</label>
                          <Input size="default" variant="error" placeholder="Error input" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">With Value</label>
                          <Input size="default" variant="default" defaultValue="value@example.com" placeholder="Default input" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Disabled</label>
                          <Input size="default" variant="default" disabled placeholder="Disabled input" />
                        </div>
                      </div>
                    </div>

                    {/* Large Size */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-muted-foreground">Large Size</h4>
                      <div className="flex flex-col gap-3">
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Default Variant</label>
                          <Input size="lg" variant="default" placeholder="Large default input" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Error Variant</label>
                          <Input size="lg" variant="error" placeholder="Large error input" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">With Value</label>
                          <Input size="lg" variant="default" defaultValue="value@example.com" placeholder="Large input" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Disabled</label>
                          <Input size="lg" variant="default" disabled placeholder="Large disabled input" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Different Input Types */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Different Input Types</h3>
                    <div className="flex flex-col gap-3">
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Text</label>
                        <Input type="text" placeholder="Text input" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Email</label>
                        <Input type="email" placeholder="email@example.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Password</label>
                        <Input type="password" placeholder="Password" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Number</label>
                        <Input type="number" placeholder="123" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Search</label>
                        <Input type="search" placeholder="Search..." />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {component.name === 'label' && (
                <div className="space-y-8">
                  {/* All Size × Variant Combinations with Label */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Label with All Input Combinations</h3>
                    
                    {/* Small Size */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-muted-foreground">Small Size</h4>
                      <div className="flex flex-col gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="label-sm-default">Default Variant</Label>
                          <Input id="label-sm-default" size="sm" variant="default" placeholder="Small default input" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="label-sm-error">Error Variant</Label>
                          <Input id="label-sm-error" size="sm" variant="error" placeholder="Small error input" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="label-sm-value">With Value</Label>
                          <Input id="label-sm-value" size="sm" variant="default" defaultValue="value@example.com" placeholder="Small input" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="label-sm-disabled" className="opacity-70">Disabled</Label>
                          <Input id="label-sm-disabled" size="sm" variant="default" disabled placeholder="Small disabled input" />
                        </div>
                      </div>
                    </div>

                    {/* Default Size */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-muted-foreground">Default Size</h4>
                      <div className="flex flex-col gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="label-default-default">Default Variant</Label>
                          <Input id="label-default-default" size="default" variant="default" placeholder="Default input" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="label-default-error">Error Variant</Label>
                          <Input id="label-default-error" size="default" variant="error" placeholder="Error input" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="label-default-value">With Value</Label>
                          <Input id="label-default-value" size="default" variant="default" defaultValue="value@example.com" placeholder="Default input" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="label-default-disabled" className="opacity-70">Disabled</Label>
                          <Input id="label-default-disabled" size="default" variant="default" disabled placeholder="Disabled input" />
                        </div>
                      </div>
                    </div>

                    {/* Large Size */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-muted-foreground">Large Size</h4>
                      <div className="flex flex-col gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="label-lg-default">Default Variant</Label>
                          <Input id="label-lg-default" size="lg" variant="default" placeholder="Large default input" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="label-lg-error">Error Variant</Label>
                          <Input id="label-lg-error" size="lg" variant="error" placeholder="Large error input" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="label-lg-value">With Value</Label>
                          <Input id="label-lg-value" size="lg" variant="default" defaultValue="value@example.com" placeholder="Large input" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="label-lg-disabled" className="opacity-70">Disabled</Label>
                          <Input id="label-lg-disabled" size="lg" variant="default" disabled placeholder="Large disabled input" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Different Input Types with Label */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Different Input Types with Label</h3>
                    <div className="flex flex-col gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="label-text">Text</Label>
                        <Input id="label-text" type="text" placeholder="Text input" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="label-email">Email</Label>
                        <Input id="label-email" type="email" placeholder="email@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="label-password">Password</Label>
                        <Input id="label-password" type="password" placeholder="Password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="label-number">Number</Label>
                        <Input id="label-number" type="number" placeholder="123" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {component.name === 'card' && (
                <div className="space-y-8">
                  {/* Basic Card Structures */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Card Structure Combinations</h3>
                    
                    {/* Header Only */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-muted-foreground">Header Only</h4>
                      <Card className="w-full max-w-sm">
                        <CardHeader>
                          <CardTitle>Card Title</CardTitle>
                          <CardDescription>Card description goes here.</CardDescription>
                        </CardHeader>
                      </Card>
                    </div>

                    {/* Header + Content */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-muted-foreground">Header + Content</h4>
                      <Card className="w-full max-w-sm">
                        <CardHeader>
                          <CardTitle>Card Title</CardTitle>
                          <CardDescription>Card description goes here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">Card content area.</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Header + Content + Footer */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-muted-foreground">Header + Content + Footer</h4>
                      <Card className="w-full max-w-sm">
                        <CardHeader>
                          <CardTitle>Card Title</CardTitle>
                          <CardDescription>Card description goes here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">Card content area.</p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="default" size="sm">Action</Button>
                        </CardFooter>
                      </Card>
                    </div>

                    {/* Content Only */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-muted-foreground">Content Only</h4>
                      <Card className="w-full max-w-sm">
                        <CardContent className="pt-6">
                          <p className="text-sm">Card content without header.</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Footer Only */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-muted-foreground">Footer Only</h4>
                      <Card className="w-full max-w-sm">
                        <CardContent className="pt-6">
                          <p className="text-sm mb-4">Card content.</p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="default" size="sm">Action</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>

                  {/* Card with Form (All Input Combinations) */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Card with Form (Different Input Sizes)</h3>
                    
                    {/* Small Inputs */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-muted-foreground">Small Inputs</h4>
                      <Card className="w-full max-w-sm">
                        <CardHeader>
                          <CardTitle>Small Form</CardTitle>
                          <CardDescription>Form with small inputs.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-sm-email">Email</Label>
                            <Input id="card-sm-email" type="email" size="sm" placeholder="name@example.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card-sm-password">Password</Label>
                            <Input id="card-sm-password" type="password" size="sm" />
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">Cancel</Button>
                          <Button variant="default" size="sm">Submit</Button>
                        </CardFooter>
                      </Card>
                    </div>

                    {/* Default Inputs */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-muted-foreground">Default Inputs</h4>
                      <Card className="w-full max-w-sm">
                        <CardHeader>
                          <CardTitle>Default Form</CardTitle>
                          <CardDescription>Form with default inputs.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-default-email">Email</Label>
                            <Input id="card-default-email" type="email" size="default" placeholder="name@example.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card-default-password">Password</Label>
                            <Input id="card-default-password" type="password" size="default" />
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">Cancel</Button>
                          <Button variant="default" size="sm">Submit</Button>
                        </CardFooter>
                      </Card>
                    </div>

                    {/* Large Inputs */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-muted-foreground">Large Inputs</h4>
                      <Card className="w-full max-w-sm">
                        <CardHeader>
                          <CardTitle>Large Form</CardTitle>
                          <CardDescription>Form with large inputs.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-lg-email">Email</Label>
                            <Input id="card-lg-email" type="email" size="lg" placeholder="name@example.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card-lg-password">Password</Label>
                            <Input id="card-lg-password" type="password" size="lg" />
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">Cancel</Button>
                          <Button variant="default" size="sm">Submit</Button>
                        </CardFooter>
                      </Card>
                    </div>

                    {/* Error States */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-muted-foreground">Error States</h4>
                      <Card className="w-full max-w-sm">
                        <CardHeader>
                          <CardTitle>Form with Errors</CardTitle>
                          <CardDescription>Form showing error states.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-error-email">Email</Label>
                            <Input id="card-error-email" type="email" variant="error" placeholder="Invalid email" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card-error-password">Password</Label>
                            <Input id="card-error-password" type="password" variant="error" />
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">Cancel</Button>
                          <Button variant="default" size="sm">Submit</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
              {component.name === 'checkbox' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Accept terms and conditions
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Checked</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="checked" defaultChecked />
                      <Label htmlFor="checked" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Already checked
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Disabled</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="disabled" disabled />
                      <Label htmlFor="disabled" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Disabled checkbox
                      </Label>
                    </div>
                  </div>
                </div>
              )}
              {component.name === 'radio-group' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <RadioGroup defaultValue="option-one">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Option One</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Option Two</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-three" id="option-three" />
                        <Label htmlFor="option-three">Option Three</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Horizontal</h3>
                    <RadioGroup defaultValue="comfortable" className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="r1" />
                        <Label htmlFor="r1">Default</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="r2" />
                        <Label htmlFor="r2">Comfortable</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="r3" />
                        <Label htmlFor="r3">Compact</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Disabled</h3>
                    <RadioGroup defaultValue="option-one" disabled>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="disabled-one" />
                        <Label htmlFor="disabled-one">Option One</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="disabled-two" />
                        <Label htmlFor="disabled-two">Option Two</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}
              {component.name === 'switch' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <div className="flex items-center space-x-2">
                      <Switch id="airplane-mode" />
                      <Label htmlFor="airplane-mode">Airplane Mode</Label>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Checked</h3>
                    <div className="flex items-center space-x-2">
                      <Switch id="checked-switch" defaultChecked />
                      <Label htmlFor="checked-switch">Enabled</Label>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Disabled</h3>
                    <div className="flex items-center space-x-2">
                      <Switch id="disabled-switch" disabled />
                      <Label htmlFor="disabled-switch">Disabled</Label>
                    </div>
                  </div>
                </div>
              )}
              {component.name === 'tabs' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <Tabs defaultValue="account" className="w-full max-w-md">
                      <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                      </TabsList>
                      <TabsContent value="account">
                        <Card>
                          <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                              Make changes to your account here. Click save when you're done.
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="space-y-2">
                              <Label htmlFor="name">Name</Label>
                              <Input id="name" defaultValue="Pedro Duarte" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="username">Username</Label>
                              <Input id="username" defaultValue="@peduarte" />
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button>Save changes</Button>
                          </CardFooter>
                        </Card>
                      </TabsContent>
                      <TabsContent value="password">
                        <Card>
                          <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                              Change your password here. After saving, you'll be logged out.
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="space-y-2">
                              <Label htmlFor="current">Current password</Label>
                              <Input id="current" type="password" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new">New password</Label>
                              <Input id="new" type="password" />
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button>Save password</Button>
                          </CardFooter>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              )}
              {component.name !== 'button' && component.name !== 'input' && component.name !== 'label' && component.name !== 'card' && component.name !== 'checkbox' && component.name !== 'radio-group' && component.name !== 'switch' && component.name !== 'tabs' && (
                <p className="text-muted-foreground">组件预览即将添加</p>
              )}
            </div>
            <div className="relative rounded-lg border bg-muted p-4">
              <button className="absolute right-4 top-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8">
                <Copy className="h-4 w-4" />
              </button>
              <pre className="text-sm overflow-x-auto">
                <code>{(() => {
                  if (component.name === 'radio-group') {
                    return `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
</RadioGroup>`
                  } else if (component.name === 'tabs') {
                    return `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Content</TabsContent>
</Tabs>`
                  } else {
                    return `import { ${componentName} } from "@/components/ui/${component.name}"

<${componentName} />`
                  }
                })()}</code>
              </pre>
            </div>
          </section>

          {apiProps.length > 0 && (
            <section id="api" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
              <div className="rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium text-sm">Prop</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-sm">Type</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-sm">Default</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-sm">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiProps.map((prop, index) => (
                        <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">
                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                              {prop.prop}
                            </code>
                          </td>
                          <td className="p-4 align-middle">
                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                              {prop.type}
                            </code>
                          </td>
                          <td className="p-4 align-middle">
                            {prop.default !== '-' ? (
                              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                {prop.default}
                              </code>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="p-4 align-middle text-sm text-muted-foreground">
                            {prop.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
      <TableOfContents />
    </div>
  )
}
