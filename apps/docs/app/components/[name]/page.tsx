import { notFound } from 'next/navigation'
import { Copy, ArrowLeft, Archive, Flag, Clock, MoreHorizontal, Mail, Calendar, List, Tag, Trash2, ChevronRight, ArrowUp, ArrowDown, Settings, User, CreditCard, Users, FileText } from 'lucide-react'
import dynamic from 'next/dynamic'
import registry from '../../../../../registry.json'
import { Sidebar as LayoutSidebar } from '../../../components/layout/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import { Combobox } from '@/components/ui/combobox'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextMenuGroup,
} from '@/components/ui/context-menu'
import { ButtonGroup } from '@/components/ui/button-group'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'
import { FieldDemo } from '../../../components/field-demo'
import { SonnerDemo } from '../../../components/sonner-demo'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Textarea } from '@/components/ui/textarea'
import { ResizableDemo } from '@/components/resizable-demo'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTable } from '@/components/ui/data-table'
import { DataTableDemo } from '@/components/data-table-demo'
import { Slider } from '@/components/ui/slider'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Item } from '@/components/ui/item'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { SidebarDemo } from '@/components/sidebar-demo'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { DatePicker } from '@/components/ui/date-picker'
import { DatePickerDemo } from '@/components/date-picker-demo'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { SheetDemo, SheetSidesDemo } from '@/components/sheet-demo'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from '@/components/ui/command'

const TableOfContents = dynamic(() => import('../../../components/layout/toc').then(mod => ({ default: mod.TableOfContents })), {
  ssr: false,
})

interface Component {
  name: string
  type: string
  title?: string
  description?: string
  files?: Array<{ path: string; type: string }>
}

function getComponent(name: string): Component | undefined {
  return registry.items.find(
    (item: Component) => item.name === name && (item.type === 'registry:component' || item.type === 'component')
  )
}

export async function generateStaticParams() {
  return registry.items
    .filter((item: Component) => (item.type === 'registry:component' || item.type === 'component') && item.name !== 'utils')
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
      case 'select':
        return [
          { prop: 'Select', type: 'React.Component', default: '-', description: '选择器根组件' },
          { prop: 'Select.value', type: 'string', default: 'undefined', description: '当前选中的值（受控）' },
          { prop: 'Select.defaultValue', type: 'string', default: 'undefined', description: '默认选中的值（非受控）' },
          { prop: 'Select.onValueChange', type: '(value: string) => void', default: 'undefined', description: '值变化时的回调函数' },
          { prop: 'SelectTrigger', type: 'React.Component', default: '-', description: '选择器触发器' },
          { prop: 'SelectTrigger.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: 'SelectValue', type: 'React.Component', default: '-', description: '显示选中值的组件' },
          { prop: 'SelectValue.placeholder', type: 'string', default: 'undefined', description: '占位符文本' },
          { prop: 'SelectContent', type: 'React.Component', default: '-', description: '下拉菜单内容容器' },
          { prop: 'SelectContent.position', type: '"popper" | "item-aligned"', default: '"popper"', description: '定位方式' },
          { prop: 'SelectItem', type: 'React.Component', default: '-', description: '选择项' },
          { prop: 'SelectItem.value', type: 'string', default: '-', description: '选项的值（必需）' },
          { prop: 'SelectItem.disabled', type: 'boolean', default: 'false', description: '是否禁用' },
          { prop: '...props', type: 'SelectPrimitive props', default: '-', description: '继承所有 Radix UI Select 的属性' },
        ]
      case 'dropdown-menu':
        return [
          { prop: 'DropdownMenu', type: 'React.Component', default: '-', description: '下拉菜单根组件' },
          { prop: 'DropdownMenuTrigger', type: 'React.Component', default: '-', description: '下拉菜单触发器' },
          { prop: 'DropdownMenuTrigger.asChild', type: 'boolean', default: 'false', description: '是否作为子元素渲染' },
          { prop: 'DropdownMenuContent', type: 'React.Component', default: '-', description: '下拉菜单内容容器' },
          { prop: 'DropdownMenuContent.sideOffset', type: 'number', default: '4', description: '与触发器的偏移距离' },
          { prop: 'DropdownMenuItem', type: 'React.Component', default: '-', description: '菜单项' },
          { prop: 'DropdownMenuItem.inset', type: 'boolean', default: 'false', description: '是否增加左侧内边距' },
          { prop: 'DropdownMenuItem.disabled', type: 'boolean', default: 'false', description: '是否禁用' },
          { prop: 'DropdownMenuLabel', type: 'React.Component', default: '-', description: '菜单标签' },
          { prop: 'DropdownMenuSeparator', type: 'React.Component', default: '-', description: '菜单分隔符' },
          { prop: '...props', type: 'DropdownMenuPrimitive props', default: '-', description: '继承所有 Radix UI DropdownMenu 的属性' },
        ]
      case 'combobox':
        return [
          { prop: 'options', type: 'ComboboxOption[]', default: '-', description: '选项数组（必需）' },
          { prop: 'value', type: 'string', default: 'undefined', description: '当前选中的值（受控）' },
          { prop: 'onValueChange', type: '(value: string) => void', default: 'undefined', description: '值变化时的回调函数' },
          { prop: 'placeholder', type: 'string', default: '"Select option..."', description: '占位符文本' },
          { prop: 'searchPlaceholder', type: 'string', default: '"Search..."', description: '搜索框占位符' },
          { prop: 'emptyText', type: 'string', default: '"No option found."', description: '无结果时的提示文本' },
          { prop: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
        ]
      case 'context-menu':
        return [
          { prop: 'ContextMenu', type: 'React.Component', default: '-', description: '上下文菜单根组件' },
          { prop: 'ContextMenuTrigger', type: 'React.Component', default: '-', description: '上下文菜单触发器' },
          { prop: 'ContextMenuTrigger.asChild', type: 'boolean', default: 'false', description: '是否作为子元素渲染' },
          { prop: 'ContextMenuContent', type: 'React.Component', default: '-', description: '上下文菜单内容容器' },
          { prop: 'ContextMenuItem', type: 'React.Component', default: '-', description: '菜单项' },
          { prop: 'ContextMenuItem.inset', type: 'boolean', default: 'false', description: '是否增加左侧内边距' },
          { prop: 'ContextMenuItem.disabled', type: 'boolean', default: 'false', description: '是否禁用' },
          { prop: 'ContextMenuLabel', type: 'React.Component', default: '-', description: '菜单标签' },
          { prop: 'ContextMenuSeparator', type: 'React.Component', default: '-', description: '菜单分隔符' },
          { prop: '...props', type: 'ContextMenuPrimitive props', default: '-', description: '继承所有 Radix UI ContextMenu 的属性' },
        ]
      case 'button-group':
        return [
          { prop: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: '按钮组方向' },
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'HTMLDivElement props', default: '-', description: '继承所有 div 元素的属性' },
        ]
      case 'skeleton':
        return [
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'HTMLDivElement props', default: '-', description: '继承所有 div 元素的属性' },
        ]
      case 'spinner':
        return [
          { prop: 'size', type: '"sm" | "default" | "lg"', default: '"default"', description: '旋转器大小' },
          { prop: 'variant', type: '"default" | "primary" | "secondary"', default: '"default"', description: '旋转器变体' },
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'HTMLDivElement props', default: '-', description: '继承所有 div 元素的属性' },
        ]
      case 'sonner':
        return [
          { prop: 'position', type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', default: '"bottom-right"', description: 'Toast 位置' },
          { prop: 'expand', type: 'boolean', default: 'false', description: '是否展开所有 Toast' },
          { prop: 'richColors', type: 'boolean', default: 'false', description: '是否使用丰富的颜色' },
          { prop: 'closeButton', type: 'boolean', default: 'false', description: '是否显示关闭按钮' },
          { prop: '...props', type: 'ToasterProps', default: '-', description: '继承所有 Sonner Toaster 的属性' },
        ]
      case 'field':
        return [
          { prop: 'Field', type: 'React.Component', default: '-', description: '字段容器组件' },
          { prop: 'Field.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: 'FieldLabel', type: 'React.Component', default: '-', description: '字段标签组件' },
          { prop: 'FieldLabel.htmlFor', type: 'string', default: 'undefined', description: '关联的表单元素 ID' },
          { prop: 'FieldDescription', type: 'React.Component', default: '-', description: '字段描述组件' },
          { prop: 'FieldErrorMessage', type: 'React.Component', default: '-', description: '字段错误消息组件' },
          { prop: '...props', type: 'HTMLDivElement props', default: '-', description: '继承所有 div 元素的属性' },
        ]
      case 'popover':
        return [
          { prop: 'Popover', type: 'React.Component', default: '-', description: '弹出框根组件' },
          { prop: 'Popover.open', type: 'boolean', default: 'undefined', description: '是否打开（受控）' },
          { prop: 'Popover.defaultOpen', type: 'boolean', default: 'undefined', description: '默认是否打开（非受控）' },
          { prop: 'Popover.onOpenChange', type: '(open: boolean) => void', default: 'undefined', description: '打开状态变化时的回调函数' },
          { prop: 'PopoverTrigger', type: 'React.Component', default: '-', description: '弹出框触发器' },
          { prop: 'PopoverTrigger.asChild', type: 'boolean', default: 'false', description: '是否作为子元素渲染' },
          { prop: 'PopoverContent', type: 'React.Component', default: '-', description: '弹出框内容容器' },
          { prop: 'PopoverContent.align', type: '"start" | "center" | "end"', default: '"center"', description: '对齐方式' },
          { prop: 'PopoverContent.sideOffset', type: 'number', default: '4', description: '与触发器的偏移距离' },
          { prop: 'PopoverContent.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'PopoverPrimitive props', default: '-', description: '继承所有 Radix UI Popover 的属性' },
        ]
      case 'breadcrumb':
        return [
          { prop: 'Breadcrumb', type: 'React.Component', default: '-', description: '面包屑导航根组件' },
          { prop: 'Breadcrumb.separator', type: 'React.ReactNode', default: 'undefined', description: '自定义分隔符' },
          { prop: 'BreadcrumbList', type: 'React.Component', default: '-', description: '面包屑列表容器' },
          { prop: 'BreadcrumbItem', type: 'React.Component', default: '-', description: '面包屑项' },
          { prop: 'BreadcrumbLink', type: 'React.Component', default: '-', description: '面包屑链接' },
          { prop: 'BreadcrumbLink.asChild', type: 'boolean', default: 'false', description: '是否作为子元素渲染' },
          { prop: 'BreadcrumbPage', type: 'React.Component', default: '-', description: '当前页面项' },
          { prop: 'BreadcrumbSeparator', type: 'React.Component', default: '-', description: '分隔符组件' },
          { prop: 'BreadcrumbEllipsis', type: 'React.Component', default: '-', description: '省略号组件' },
          { prop: '...props', type: 'HTMLNavElement props', default: '-', description: '继承所有 nav 元素的属性' },
        ]
      case 'separator':
        return [
          { prop: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: '分隔符方向' },
          { prop: 'decorative', type: 'boolean', default: 'true', description: '是否仅用于装饰（不传达语义信息）' },
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'SeparatorPrimitive props', default: '-', description: '继承所有 Radix UI Separator 的属性' },
        ]
      case 'scroll-area':
        return [
          { prop: 'ScrollArea', type: 'React.Component', default: '-', description: '滚动区域根组件' },
          { prop: 'ScrollArea.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: 'ScrollBar', type: 'React.Component', default: '-', description: '滚动条组件' },
          { prop: 'ScrollBar.orientation', type: '"horizontal" | "vertical"', default: '"vertical"', description: '滚动条方向' },
          { prop: 'ScrollBar.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'ScrollAreaPrimitive props', default: '-', description: '继承所有 Radix UI ScrollArea 的属性' },
        ]
      case 'progress':
        return [
          { prop: 'value', type: 'number', default: 'undefined', description: '进度值（0-100）' },
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'ProgressPrimitive props', default: '-', description: '继承所有 Radix UI Progress 的属性' },
        ]
      case 'tooltip':
        return [
          { prop: 'TooltipProvider', type: 'React.Component', default: '-', description: '工具提示提供者组件（必需）' },
          { prop: 'TooltipProvider.delayDuration', type: 'number', default: '700', description: '显示延迟时间（毫秒）' },
          { prop: 'Tooltip', type: 'React.Component', default: '-', description: '工具提示根组件' },
          { prop: 'TooltipTrigger', type: 'React.Component', default: '-', description: '工具提示触发器' },
          { prop: 'TooltipTrigger.asChild', type: 'boolean', default: 'false', description: '是否作为子元素渲染' },
          { prop: 'TooltipContent', type: 'React.Component', default: '-', description: '工具提示内容' },
          { prop: 'TooltipContent.sideOffset', type: 'number', default: '4', description: '与触发器的偏移距离' },
          { prop: 'TooltipContent.className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'TooltipPrimitive props', default: '-', description: '继承所有 Radix UI Tooltip 的属性' },
        ]
      case 'textarea':
        return [
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: 'placeholder', type: 'string', default: 'undefined', description: '占位符文本' },
          { prop: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
          { prop: 'rows', type: 'number', default: 'undefined', description: '行数' },
          { prop: '...props', type: 'HTMLTextAreaElement props', default: '-', description: '继承所有 textarea 元素的属性' },
        ]
      case 'resizable':
        return [
          { prop: 'ResizablePanelGroup', type: 'React.Component', default: '-', description: '可调整大小面板组容器' },
          { prop: 'ResizablePanelGroup.direction', type: '"horizontal" | "vertical"', default: '"horizontal"', description: '面板方向' },
          { prop: 'ResizablePanel', type: 'React.Component', default: '-', description: '可调整大小的面板' },
          { prop: 'ResizablePanel.defaultSize', type: 'number', default: 'undefined', description: '默认大小（百分比）' },
          { prop: 'ResizablePanel.minSize', type: 'number', default: 'undefined', description: '最小大小（百分比）' },
          { prop: 'ResizablePanel.maxSize', type: 'number', default: 'undefined', description: '最大大小（百分比）' },
          { prop: 'ResizableHandle', type: 'React.Component', default: '-', description: '调整大小手柄' },
          { prop: 'ResizableHandle.withHandle', type: 'boolean', default: 'false', description: '是否显示手柄图标' },
          { prop: '...props', type: 'ResizablePrimitive props', default: '-', description: '继承所有 react-resizable-panels 的属性' },
        ]
      case 'table':
        return [
          { prop: 'Table', type: 'React.Component', default: '-', description: '表格根组件' },
          { prop: 'TableHeader', type: 'React.Component', default: '-', description: '表头容器' },
          { prop: 'TableBody', type: 'React.Component', default: '-', description: '表体容器' },
          { prop: 'TableFooter', type: 'React.Component', default: '-', description: '表尾容器' },
          { prop: 'TableRow', type: 'React.Component', default: '-', description: '表格行' },
          { prop: 'TableHead', type: 'React.Component', default: '-', description: '表头单元格' },
          { prop: 'TableCell', type: 'React.Component', default: '-', description: '表格单元格' },
          { prop: 'TableCaption', type: 'React.Component', default: '-', description: '表格标题' },
          { prop: '...props', type: 'HTMLTableElement props', default: '-', description: '继承所有 table 元素的属性' },
        ]
      case 'data-table':
        return [
          { prop: 'columns', type: 'ColumnDef<TData, TValue>[]', default: '-', description: '列定义数组（必需）' },
          { prop: 'data', type: 'TData[]', default: '-', description: '数据数组（必需）' },
          { prop: '...props', type: 'DataTableProps', default: '-', description: '继承所有 DataTable 的属性' },
        ]
      case 'slider':
        return [
          { prop: 'value', type: 'number[]', default: 'undefined', description: '滑块的值（数组，支持多值）' },
          { prop: 'defaultValue', type: 'number[]', default: 'undefined', description: '默认值' },
          { prop: 'onValueChange', type: '(value: number[]) => void', default: 'undefined', description: '值变化时的回调函数' },
          { prop: 'min', type: 'number', default: '0', description: '最小值' },
          { prop: 'max', type: 'number', default: '100', description: '最大值' },
          { prop: 'step', type: 'number', default: '1', description: '步长' },
          { prop: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'SliderPrimitive props', default: '-', description: '继承所有 Radix UI Slider 的属性' },
        ]
      case 'pagination':
        return [
          { prop: 'Pagination', type: 'React.Component', default: '-', description: '分页根组件' },
          { prop: 'PaginationContent', type: 'React.Component', default: '-', description: '分页内容容器' },
          { prop: 'PaginationItem', type: 'React.Component', default: '-', description: '分页项容器' },
          { prop: 'PaginationLink', type: 'React.Component', default: '-', description: '分页链接' },
          { prop: 'PaginationLink.isActive', type: 'boolean', default: 'false', description: '是否为当前页' },
          { prop: 'PaginationPrevious', type: 'React.Component', default: '-', description: '上一页按钮' },
          { prop: 'PaginationNext', type: 'React.Component', default: '-', description: '下一页按钮' },
          { prop: 'PaginationEllipsis', type: 'React.Component', default: '-', description: '省略号组件' },
          { prop: '...props', type: 'HTMLNavElement props', default: '-', description: '继承所有 nav 元素的属性' },
        ]
      case 'item':
        return [
          { prop: 'variant', type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"', default: '"default"', description: '变体样式' },
          { prop: 'size', type: '"default" | "sm" | "lg" | "icon"', default: '"default"', description: '尺寸' },
          { prop: 'asChild', type: 'boolean', default: 'false', description: '是否作为子元素渲染' },
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'HTMLButtonElement props', default: '-', description: '继承所有 button 元素的属性' },
        ]
      case 'dialog':
        return [
          { prop: 'Dialog', type: 'React.Component', default: '-', description: '对话框根组件' },
          { prop: 'DialogTrigger', type: 'React.Component', default: '-', description: '触发器组件' },
          { prop: 'DialogTrigger.asChild', type: 'boolean', default: 'false', description: '是否作为子元素渲染' },
          { prop: 'DialogContent', type: 'React.Component', default: '-', description: '对话框内容' },
          { prop: 'DialogHeader', type: 'React.Component', default: '-', description: '对话框头部容器' },
          { prop: 'DialogTitle', type: 'React.Component', default: '-', description: '对话框标题' },
          { prop: 'DialogDescription', type: 'React.Component', default: '-', description: '对话框描述' },
          { prop: 'DialogFooter', type: 'React.Component', default: '-', description: '对话框底部容器' },
          { prop: 'DialogClose', type: 'React.Component', default: '-', description: '关闭按钮' },
          { prop: '...props', type: 'DialogPrimitive props', default: '-', description: '继承所有 Radix UI Dialog 的属性' },
        ]
      case 'sidebar':
        return [
          { prop: 'SidebarProvider', type: 'React.Component', default: '-', description: '侧边栏提供者组件（必需）' },
          { prop: 'SidebarProvider.defaultOpen', type: 'boolean', default: 'true', description: '默认是否展开' },
          { prop: 'Sidebar', type: 'React.Component', default: '-', description: '侧边栏根组件' },
          { prop: 'Sidebar.side', type: '"left" | "right"', default: '"left"', description: '侧边栏位置' },
          { prop: 'Sidebar.variant', type: '"sidebar" | "floating" | "inset"', default: '"sidebar"', description: '侧边栏变体' },
          { prop: 'Sidebar.collapsible', type: '"offcanvas" | "icon" | "none"', default: '"offcanvas"', description: '折叠方式' },
          { prop: 'SidebarTrigger', type: 'React.Component', default: '-', description: '侧边栏触发器按钮' },
          { prop: 'SidebarHeader', type: 'React.Component', default: '-', description: '侧边栏头部' },
          { prop: 'SidebarContent', type: 'React.Component', default: '-', description: '侧边栏内容' },
          { prop: 'SidebarFooter', type: 'React.Component', default: '-', description: '侧边栏底部' },
          { prop: 'SidebarInset', type: 'React.Component', default: '-', description: '侧边栏内容区域' },
          { prop: 'SidebarGroup', type: 'React.Component', default: '-', description: '侧边栏分组' },
          { prop: 'SidebarGroupLabel', type: 'React.Component', default: '-', description: '分组标签' },
          { prop: 'SidebarGroupContent', type: 'React.Component', default: '-', description: '分组内容' },
          { prop: 'SidebarMenu', type: 'React.Component', default: '-', description: '侧边栏菜单' },
          { prop: 'SidebarMenuItem', type: 'React.Component', default: '-', description: '菜单项' },
          { prop: 'SidebarMenuButton', type: 'React.Component', default: '-', description: '菜单按钮' },
          { prop: 'SidebarMenuButton.isActive', type: 'boolean', default: 'false', description: '是否为活动状态' },
          { prop: 'SidebarMenuButton.tooltip', type: 'string | TooltipContent props', default: 'undefined', description: '工具提示' },
          { prop: 'useSidebar', type: 'Hook', default: '-', description: '获取侧边栏状态的 Hook' },
        ]
      case 'accordion':
        return [
          { prop: 'Accordion', type: 'React.Component', default: '-', description: '手风琴根组件' },
          { prop: 'Accordion.type', type: '"single" | "multiple"', default: '"single"', description: '手风琴类型（单选或多选）' },
          { prop: 'AccordionItem', type: 'React.Component', default: '-', description: '手风琴项' },
          { prop: 'AccordionTrigger', type: 'React.Component', default: '-', description: '手风琴触发器' },
          { prop: 'AccordionContent', type: 'React.Component', default: '-', description: '手风琴内容' },
          { prop: '...props', type: 'AccordionPrimitive props', default: '-', description: '继承所有 Radix UI Accordion 的属性' },
        ]
      case 'alert-dialog':
        return [
          { prop: 'AlertDialog', type: 'React.Component', default: '-', description: '警告对话框根组件' },
          { prop: 'AlertDialogTrigger', type: 'React.Component', default: '-', description: '触发器组件' },
          { prop: 'AlertDialogTrigger.asChild', type: 'boolean', default: 'false', description: '是否作为子元素渲染' },
          { prop: 'AlertDialogContent', type: 'React.Component', default: '-', description: '对话框内容' },
          { prop: 'AlertDialogHeader', type: 'React.Component', default: '-', description: '对话框头部容器' },
          { prop: 'AlertDialogTitle', type: 'React.Component', default: '-', description: '对话框标题' },
          { prop: 'AlertDialogDescription', type: 'React.Component', default: '-', description: '对话框描述' },
          { prop: 'AlertDialogFooter', type: 'React.Component', default: '-', description: '对话框底部容器' },
          { prop: 'AlertDialogAction', type: 'React.Component', default: '-', description: '确认按钮' },
          { prop: 'AlertDialogCancel', type: 'React.Component', default: '-', description: '取消按钮' },
          { prop: '...props', type: 'AlertDialogPrimitive props', default: '-', description: '继承所有 Radix UI Alert Dialog 的属性' },
        ]
      case 'badge':
        return [
          { prop: 'variant', type: '"default" | "secondary" | "destructive" | "outline"', default: '"default"', description: '徽章变体样式' },
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'HTMLDivElement props', default: '-', description: '继承所有 div 元素的属性' },
        ]
      case 'calendar':
        return [
          { prop: 'mode', type: '"single" | "multiple" | "range"', default: '"single"', description: '选择模式' },
          { prop: 'selected', type: 'Date | Date[] | { from: Date; to: Date }', default: 'undefined', description: '选中的日期' },
          { prop: 'onSelect', type: '(date: Date | Date[] | { from: Date; to: Date } | undefined) => void', default: 'undefined', description: '选择日期时的回调函数' },
          { prop: 'showOutsideDays', type: 'boolean', default: 'true', description: '是否显示外部日期' },
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
          { prop: '...props', type: 'DayPicker props', default: '-', description: '继承所有 react-day-picker 的属性' },
        ]
      case 'date-picker':
        return [
          { prop: 'date', type: 'Date | undefined', default: 'undefined', description: '选中的日期' },
          { prop: 'onDateChange', type: '(date: Date | undefined) => void', default: 'undefined', description: '日期变化时的回调函数' },
          { prop: 'placeholder', type: 'string', default: '"Pick a date"', description: '占位符文本' },
          { prop: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
          { prop: 'className', type: 'string', default: 'undefined', description: '额外的 CSS 类名' },
        ]
      case 'sheet':
        return [
          { prop: 'Sheet', type: 'React.Component', default: '-', description: 'Sheet 根组件' },
          { prop: 'SheetTrigger', type: 'React.Component', default: '-', description: '触发器组件' },
          { prop: 'SheetTrigger.asChild', type: 'boolean', default: 'false', description: '是否作为子元素渲染' },
          { prop: 'SheetContent', type: 'React.Component', default: '-', description: 'Sheet 内容' },
          { prop: 'SheetContent.side', type: '"top" | "right" | "bottom" | "left"', default: '"right"', description: 'Sheet 出现的位置' },
          { prop: 'SheetHeader', type: 'React.Component', default: '-', description: 'Sheet 头部容器' },
          { prop: 'SheetTitle', type: 'React.Component', default: '-', description: 'Sheet 标题' },
          { prop: 'SheetDescription', type: 'React.Component', default: '-', description: 'Sheet 描述' },
          { prop: 'SheetFooter', type: 'React.Component', default: '-', description: 'Sheet 底部容器' },
          { prop: 'SheetClose', type: 'React.Component', default: '-', description: '关闭按钮' },
          { prop: 'SheetClose.asChild', type: 'boolean', default: 'false', description: '是否作为子元素渲染' },
          { prop: '...props', type: 'DialogPrimitive props', default: '-', description: '继承所有 Radix UI Dialog 的属性' },
        ]
      default:
        return []
    }
  }

  const apiProps = getApiProps(component.name)

  return (
    <div className="flex min-h-screen">
      <LayoutSidebar />
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
                {componentName === 'Select' && 'Displays a list of options for the user to pick from—triggered by a button.'}
                {componentName === 'Dropdown Menu' && 'Displays a menu to the user—such as a set of actions or functions—triggered by a button.'}
                {componentName === 'Combobox' && 'Autocomplete input and command palette with a list of suggestions.'}
                {componentName === 'Context Menu' && 'Displays a menu to the user—such as a set of actions or functions—triggered by a right click or long press.'}
                {componentName === 'Button Group' && 'A container component that groups multiple buttons together with seamless borders.'}
                {componentName === 'Skeleton' && 'Use to show a placeholder while content is loading.'}
                {componentName === 'Spinner' && 'A loading spinner component to indicate that content is being loaded.'}
                {componentName === 'Sonner' && 'An opinionated toast component for React.'}
                {componentName === 'Field' && 'A form field component that provides label, description, and error message support.'}
                {componentName === 'Popover' && 'Displays rich content in a portal, triggered by a button.'}
                {componentName === 'Breadcrumb' && 'Displays the path to the current resource using a hierarchy of links.'}
                {componentName === 'Separator' && 'Visually or semantically separates content.'}
                {componentName === 'Scroll Area' && 'Augments native scroll functionality for custom, cross-browser styling.'}
                {componentName === 'Progress' && 'Displays an indicator showing the completion progress of a task.'}
                {componentName === 'Tooltip' && 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'}
                {componentName === 'Textarea' && 'Displays a form textarea or a component that looks like a textarea.'}
                {componentName === 'Resizable' && 'Accessible resizable panel groups and layouts with keyboard support.'}
                {componentName === 'Table' && 'A responsive table component.'}
                {componentName === 'Data Table' && 'An advanced table component built on top of TanStack Table with sorting, filtering, and pagination.'}
                {componentName === 'Slider' && 'An input where the user selects a value from within a given range.'}
                {componentName === 'Pagination' && 'Pagination with page navigation, previous/next buttons, and page numbers.'}
                {componentName === 'Item' && 'A versatile item component that can be used as a button or as a child element.'}
                {componentName === 'Dialog' && 'A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.'}
                {componentName === 'Sidebar' && 'A versatile sidebar component that can be collapsed, expanded, and customized with various menu items and groups.'}
                {componentName === 'Accordion' && 'A vertically stacked set of interactive headings that each reveal a section of content.'}
                {componentName === 'Alert Dialog' && 'A modal dialog that interrupts the user with important content and expects a response.'}
                {componentName === 'Badge' && 'Displays a badge or a component that looks like a badge.'}
                {componentName === 'Calendar' && 'A date field component that allows users to enter and edit date.'}
                {componentName === 'Date Picker' && 'A date picker component built on top of Calendar and Popover.'}
                {componentName === 'Sheet' && 'Extends the Dialog component to display content that complements the main content of the screen.'}
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
              {component.name === 'select' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">With Default Value</h3>
                    <Select defaultValue="banana">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Disabled</h3>
                    <Select disabled>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              {component.name === 'dropdown-menu' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="basic">Open Menu</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                          <DropdownMenuItem>Billing</DropdownMenuItem>
                          <DropdownMenuItem>Team</DropdownMenuItem>
                          <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">With Icons</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="basic">Open Menu</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Team</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Subscription</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">With Separators</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="basic">Open Menu</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                          <DropdownMenuItem>Billing</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Settings</DropdownMenuLabel>
                          <DropdownMenuItem>Team</DropdownMenuItem>
                          <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">With Nested Menu</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="basic">Open Menu</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Mark as Read</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" />
                          <span>Archive</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Clock className="mr-2 h-4 w-4" />
                          <span>Snooze</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Add to Calendar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <List className="mr-2 h-4 w-4" />
                          <span>Add to List</span>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <Tag className="mr-2 h-4 w-4" />
                            <span>Label As...</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>Important</DropdownMenuItem>
                            <DropdownMenuItem>Work</DropdownMenuItem>
                            <DropdownMenuItem>Personal</DropdownMenuItem>
                            <DropdownMenuItem>Travel</DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Trash</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )}
              {component.name === 'combobox' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <Combobox
                      options={[
                        { value: 'react', label: 'React' },
                        { value: 'vue', label: 'Vue' },
                        { value: 'angular', label: 'Angular', disabled: true },
                        { value: 'svelte', label: 'Svelte' },
                      ]}
                      placeholder="Select framework..."
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">With Value</h3>
                    <Combobox
                      options={[
                        { value: 'react', label: 'React' },
                        { value: 'vue', label: 'Vue' },
                        { value: 'angular', label: 'Angular' },
                        { value: 'svelte', label: 'Svelte' },
                      ]}
                      value="react"
                      placeholder="Select framework..."
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Disabled</h3>
                    <Combobox
                      options={[
                        { value: 'react', label: 'React' },
                        { value: 'vue', label: 'Vue' },
                      ]}
                      disabled
                      placeholder="Select framework..."
                    />
                  </div>
                </div>
              )}
              {component.name === 'context-menu' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <ContextMenu>
                      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                        Right click here
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuGroup>
                          <ContextMenuLabel>My Account</ContextMenuLabel>
                          <ContextMenuItem>Profile</ContextMenuItem>
                          <ContextMenuItem>Billing</ContextMenuItem>
                          <ContextMenuItem>Team</ContextMenuItem>
                        </ContextMenuGroup>
                        <ContextMenuSeparator />
                        <ContextMenuGroup>
                          <ContextMenuItem>Subscription</ContextMenuItem>
                        </ContextMenuGroup>
                      </ContextMenuContent>
                    </ContextMenu>
                  </div>
                </div>
              )}
              {component.name === 'button-group' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Horizontal</h3>
                    <ButtonGroup>
                      <Button variant="basic">One</Button>
                      <Button variant="basic">Two</Button>
                      <Button variant="basic">Three</Button>
                    </ButtonGroup>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Vertical</h3>
                    <ButtonGroup orientation="vertical">
                      <Button variant="quiet" size="icon">
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button variant="quiet" size="icon">
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button variant="quiet" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </ButtonGroup>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">With Actions</h3>
                    <ButtonGroup>
                      <Button variant="basic" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="basic">Archive</Button>
                      <Button variant="basic">Report</Button>
                      <Button variant="basic">Snooze</Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="basic" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Mark as Read</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            <span>Archive</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Clock className="mr-2 h-4 w-4" />
                            <span>Snooze</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Add to Calendar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <List className="mr-2 h-4 w-4" />
                            <span>Add to List</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Tag className="mr-2 h-4 w-4" />
                            <span>Label As...</span>
                            <ChevronRight className="ml-auto h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Trash</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </ButtonGroup>
                  </div>
                </div>
              )}
              {component.name === 'skeleton' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Card Skeleton</h3>
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Form Skeleton</h3>
                    <div className="space-y-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                  </div>
                </div>
              )}
              {component.name === 'spinner' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Sizes</h3>
                    <div className="flex items-center gap-4">
                      <Spinner size="sm" />
                      <Spinner size="default" />
                      <Spinner size="lg" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Variants</h3>
                    <div className="flex items-center gap-4">
                      <Spinner variant="default" />
                      <Spinner variant="primary" />
                      <Spinner variant="secondary" />
                    </div>
                  </div>
                </div>
              )}
              {component.name === 'sonner' && <SonnerDemo />}
              {component.name === 'field' && <FieldDemo />}
              {component.name === 'popover' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="basic">Open Popover</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Dimensions</h4>
                          <p className="text-sm text-muted-foreground">
                            Set the dimensions for the layer.
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">With Form</h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="basic">Open Form</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">Dimensions</h4>
                            <p className="text-sm text-muted-foreground">
                              Set the dimensions for the layer.
                            </p>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="width">Width</Label>
                              <Input
                                id="width"
                                defaultValue="100%"
                                className="col-span-2 h-8"
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="maxWidth">Max. width</Label>
                              <Input
                                id="maxWidth"
                                defaultValue="300px"
                                className="col-span-2 h-8"
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="height">Height</Label>
                              <Input
                                id="height"
                                defaultValue="25px"
                                className="col-span-2 h-8"
                              />
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}
              {component.name === 'command' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <Command className="rounded-lg border shadow-md max-w-[450px]">
                      <CommandInput placeholder="Type a command or search..." />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                          <CommandItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Calendar</span>
                          </CommandItem>
                          <CommandItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                          </CommandItem>
                          <CommandItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                          </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                          <CommandItem>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Team</span>
                          </CommandItem>
                          <CommandItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">With Shortcuts</h3>
                    <Command className="rounded-lg border shadow-md max-w-[450px]">
                      <CommandInput placeholder="Type a command or search..." />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                          <CommandItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Calendar</span>
                            <CommandShortcut>⌘C</CommandShortcut>
                          </CommandItem>
                          <CommandItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                          </CommandItem>
                          <CommandItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </div>
                </div>
              )}
              {component.name === 'breadcrumb' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">With Custom Separator</h3>
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                          <span>/</span>
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                          <span>/</span>
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </div>
              )}
              {component.name === 'separator' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Horizontal</h3>
                    <div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
                        <p className="text-sm text-muted-foreground">
                          An open-source UI component library.
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex h-5 items-center space-x-4 text-sm">
                        <div>Blog</div>
                        <Separator orientation="vertical" />
                        <div>Docs</div>
                        <Separator orientation="vertical" />
                        <div>Source</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {component.name === 'scroll-area' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <ScrollArea className="h-72 w-full rounded-md border p-4">
                      <div className="space-y-2">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div key={i} className="text-sm">
                            Item {i + 1}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              )}
              {component.name === 'progress' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <Progress value={33} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Different Values</h3>
                    <div className="space-y-2">
                      <Progress value={0} />
                      <Progress value={25} />
                      <Progress value={50} />
                      <Progress value={75} />
                      <Progress value={100} />
                    </div>
                  </div>
                </div>
              )}
              {component.name === 'tooltip' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="basic">Hover me</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add to library</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              )}
              {component.name === 'textarea' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <Textarea placeholder="Type your message here." />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Disabled</h3>
                    <Textarea placeholder="Type your message here." disabled />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">With Label</h3>
                    <div className="space-y-2">
                      <Label htmlFor="message">Your message</Label>
                      <Textarea placeholder="Type your message here." id="message" />
                    </div>
                  </div>
                </div>
              )}
              {component.name === 'resizable' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Horizontal</h3>
                    <ResizableDemo />
                  </div>
                </div>
              )}
              {component.name === 'table' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <Table>
                      <TableCaption>A list of your recent invoices.</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Invoice</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">INV001</TableCell>
                          <TableCell>Paid</TableCell>
                          <TableCell>Credit Card</TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV002</TableCell>
                          <TableCell>Pending</TableCell>
                          <TableCell>PayPal</TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV003</TableCell>
                          <TableCell>Unpaid</TableCell>
                          <TableCell>Bank Transfer</TableCell>
                          <TableCell className="text-right">$350.00</TableCell>
                        </TableRow>
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={3}>Total</TableCell>
                          <TableCell className="text-right">$750.00</TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </div>
                </div>
              )}
              {component.name === 'data-table' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <DataTableDemo />
                  </div>
                </div>
              )}
              {component.name === 'slider' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Range</h3>
                    <Slider defaultValue={[20, 80]} max={100} step={1} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Disabled</h3>
                    <Slider defaultValue={[50]} max={100} step={1} disabled />
                  </div>
                </div>
              )}
              {component.name === 'pagination' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink>2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink>3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              )}
              {component.name === 'item' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Variants</h3>
                    <div className="flex flex-wrap gap-2">
                      <Item variant="default">Default</Item>
                      <Item variant="destructive">Destructive</Item>
                      <Item variant="outline">Outline</Item>
                      <Item variant="secondary">Secondary</Item>
                      <Item variant="ghost">Ghost</Item>
                      <Item variant="link">Link</Item>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Sizes</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <Item size="sm">Small</Item>
                      <Item size="default">Default</Item>
                      <Item size="lg">Large</Item>
                      <Item size="icon">🚀</Item>
                    </div>
                  </div>
                </div>
              )}
              {component.name === 'dialog' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="basic">Open Dialog</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="basic">Cancel</Button>
                          <Button>Continue</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              )}
              {component.name === 'sidebar' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <div className="border rounded-lg overflow-hidden" style={{ height: '600px' }}>
                      <SidebarDemo />
                    </div>
                  </div>
                </div>
              )}
              {component.name === 'accordion' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                          Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Is it styled?</AccordionTrigger>
                        <AccordionContent>
                          Yes. It comes with default styles that matches the other
                          components&apos; aesthetic.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Is it animated?</AccordionTrigger>
                        <AccordionContent>
                          Yes. It&apos;s animated by default, but you can disable it if you prefer.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              )}
              {component.name === 'alert-dialog' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="basic">Open Alert Dialog</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              )}
              {component.name === 'badge' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Variants</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="default">Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                  </div>
                </div>
              )}
              {component.name === 'calendar' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <CalendarComponent />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">With Selected Date</h3>
                    <CalendarComponent mode="single" selected={new Date()} />
                  </div>
                </div>
              )}
              {component.name === 'date-picker' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <DatePickerDemo />
                  </div>
                </div>
              )}
              {component.name === 'sheet' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Basic</h3>
                    <SheetDemo />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Different Sides</h3>
                    <SheetSidesDemo />
                  </div>
                </div>
              )}
              {component.name !== 'button' && component.name !== 'input' && component.name !== 'label' && component.name !== 'card' && component.name !== 'checkbox' && component.name !== 'radio-group' && component.name !== 'switch' && component.name !== 'tabs' && component.name !== 'select' && component.name !== 'dropdown-menu' && component.name !== 'combobox' && component.name !== 'context-menu' && component.name !== 'button-group' && component.name !== 'skeleton' && component.name !== 'spinner' && component.name !== 'sonner' && component.name !== 'field' && component.name !== 'popover' && component.name !== 'breadcrumb' && component.name !== 'separator' && component.name !== 'scroll-area' && component.name !== 'progress' && component.name !== 'tooltip' && component.name !== 'textarea' && component.name !== 'resizable' && component.name !== 'table' && component.name !== 'data-table' && component.name !== 'slider' && component.name !== 'pagination' && component.name !== 'item' && component.name !== 'dialog' && component.name !== 'sidebar' && component.name !== 'accordion' && component.name !== 'alert-dialog' && component.name !== 'badge' && component.name !== 'calendar' && component.name !== 'date-picker' && component.name !== 'sheet' && (
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
                  } else if (component.name === 'select') {
                    return `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>`
                  } else if (component.name === 'dropdown-menu') {
                    return `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { Mail, Archive, Clock, Calendar, List, Tag, Trash2 } from "lucide-react"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="basic">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      <Mail className="mr-2 h-4 w-4" />
      <span>Mark as Read</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Archive className="mr-2 h-4 w-4" />
      <span>Archive</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Clock className="mr-2 h-4 w-4" />
      <span>Snooze</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Calendar className="mr-2 h-4 w-4" />
      <span>Add to Calendar</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <List className="mr-2 h-4 w-4" />
      <span>Add to List</span>
    </DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Tag className="mr-2 h-4 w-4" />
        <span>Label As...</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Important</DropdownMenuItem>
        <DropdownMenuItem>Work</DropdownMenuItem>
        <DropdownMenuItem>Personal</DropdownMenuItem>
        <DropdownMenuItem>Travel</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">
      <Trash2 className="mr-2 h-4 w-4" />
      <span>Trash</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`
                  } else if (component.name === 'combobox') {
                    return `import { Combobox } from "@/components/ui/combobox"

<Combobox
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
  placeholder="Select option..."
/>`
                  } else if (component.name === 'context-menu') {
                    return `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

<ContextMenu>
  <ContextMenuTrigger>Right click</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Item 1</ContextMenuItem>
    <ContextMenuItem>Item 2</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`
                  } else if (component.name === 'button-group') {
                    return `import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, MoreHorizontal, Mail, Archive, Clock, Calendar, List, Tag, ChevronRight, Trash2 } from "lucide-react"

<ButtonGroup>
  <Button variant="basic" size="icon">
    <ArrowLeft className="h-4 w-4" />
  </Button>
  <Button variant="basic">Archive</Button>
  <Button variant="basic">Report</Button>
  <Button variant="basic">Snooze</Button>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="basic" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>
        <Mail className="mr-2 h-4 w-4" />
        <span>Mark as Read</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Archive className="mr-2 h-4 w-4" />
        <span>Archive</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-destructive">
        <Trash2 className="mr-2 h-4 w-4" />
        <span>Trash</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</ButtonGroup>`
                  } else if (component.name === 'skeleton') {
                    return `import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="h-4 w-[250px]" />`
                  } else if (component.name === 'spinner') {
                    return `import { Spinner } from "@/components/ui/spinner"

<Spinner size="default" variant="primary" />`
                  } else if (component.name === 'sonner') {
                    return `import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

// Add to your app layout
<Toaster />

// Use in your components
toast("Event has been created")`
                  } else if (component.name === 'field') {
                    return `import { Field, FieldLabel, FieldDescription, FieldErrorMessage } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

<Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <FieldDescription>Enter your email address</FieldDescription>
  <Input id="email" type="email" />
  <FieldErrorMessage>Email is required</FieldErrorMessage>
</Field>`
                  } else if (component.name === 'popover') {
                    return `import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="basic">Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="space-y-2">
      <h4 className="font-medium">Title</h4>
      <p className="text-sm text-muted-foreground">Content goes here.</p>
    </div>
  </PopoverContent>
</Popover>`
                  } else if (component.name === 'command') {
                    return `import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command"
import { Calendar, User, CreditCard, Settings, Users } from "lucide-react"

<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <Calendar className="mr-2 h-4 w-4" />
        <span>Calendar</span>
      </CommandItem>
      <CommandItem>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
      </CommandItem>
      <CommandItem>
        <CreditCard className="mr-2 h-4 w-4" />
        <span>Billing</span>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>
        <Users className="mr-2 h-4 w-4" />
        <span>Team</span>
      </CommandItem>
      <CommandItem>
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`
                  } else if (component.name === 'breadcrumb') {
                    return `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`
                  } else if (component.name === 'separator') {
                    return `import { Separator } from "@/components/ui/separator"

<div>
  <div>Content above</div>
  <Separator />
  <div>Content below</div>
</div>`
                  } else if (component.name === 'scroll-area') {
                    return `import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-72 w-full rounded-md border">
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium">Content</h4>
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="text-sm">Item {i + 1}</div>
    ))}
  </div>
</ScrollArea>`
                  } else if (component.name === 'progress') {
                    return `import { Progress } from "@/components/ui/progress"

<Progress value={33} />`
                  } else if (component.name === 'tooltip') {
                    return `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="basic">Hover</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`
                  } else if (component.name === 'textarea') {
                    return `import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Type your message here." />`
                  } else if (component.name === 'resizable') {
                    return `import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"

<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>One</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>Two</ResizablePanel>
</ResizablePanelGroup>`
                  } else if (component.name === 'table') {
                    return `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>`
                  } else if (component.name === 'data-table') {
                    return `import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/ui/data-table"

// Define columns with checkbox and actions
const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

<DataTable columns={columns} data={data} />`
                  } else if (component.name === 'slider') {
                    return `import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[50]} max={100} step={1} />`
                  } else if (component.name === 'pagination') {
                    return `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`
                  } else if (component.name === 'item') {
                    return `import { Item } from "@/components/ui/item"

<Item variant="default">Item</Item>`
                  } else if (component.name === 'dialog') {
                    return `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>Cancel</Button>
      <Button>Continue</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`
                  } else if (component.name === 'sidebar') {
                    return `import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <div>Header</div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <span>Settings</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    <div>Main content</div>
  </SidebarInset>
</SidebarProvider>`
                  } else if (component.name === 'accordion') {
                    return `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`
                  } else if (component.name === 'alert-dialog') {
                    return `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`
                  } else if (component.name === 'badge') {
                    return `import { Badge } from "@/components/ui/badge"

<Badge variant="default">Badge</Badge>`
                  } else if (component.name === 'calendar') {
                    return `import { Calendar } from "@/components/ui/calendar"

<Calendar mode="single" selected={new Date()} />`
                  } else if (component.name === 'date-picker') {
                    return `import { DatePicker } from "@/components/ui/date-picker"

<DatePicker date={date} onDateChange={setDate} />`
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
