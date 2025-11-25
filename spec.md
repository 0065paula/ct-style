# Internal shadcn/ui Registry — Requirements Document

*For Cursor-based development*

## 1. 项目目标（Project Goal）

我们要构建一个 **公司内部的 lightweight shadcn/ui registry**，用于多个内部工具与前端项目之间共享统一的基础 UI 组件与样式。

本项目不是完整的组件库，而是一个适用于 shadcn/ui CLI 的 **Registry Provider**，提供：

* 一致的组件结构
* 已定制的样式（Button / Input / Card 等基础组件）
* 统一的 Tailwind preset / CSS variables
* 公司默认主题（baseColor、风格、Spacing、Radius、Brand Color）
* 一套能被 `shadcn@latest add {component}` 拉取的模板

所有组件均为可读的 TSX 源码，符合 shadcn/ui 风格，可被应用项目自由修改。

---

## 2. 技术栈（Tech Stack）

* Node.js + TypeScript
* 文件结构遵从 shadcn/ui registry 规范
* Tailwind CSS v4（与 shadcn/ui v1+ 兼容）
* ESM 模块
* pnpm workspace（如需）
* Git 作为托管方式（GitHub / 内网 Git）

---

## 3. 项目定位（What This Registry Covers）

本 registry 仅覆盖：

* 基础可复用 UI 组件（plain TSX）
* Tailwind class-based 样式
* 内部主题（色板、字体、Space、Radius）
* 设计 token 注入（通过 CSS variables 或 Tailwind preset）
* Shadcn/ui 所需的 registry.json 实现

本 registry 不包含：

* 高度业务化组件（如表单逻辑、数据表格服务端集成）
* 图标包（使用 lucide 或公司图标库）
* 封装式组件库（我们保持极简，不封装 props）

---

## 4. 目录结构（Project Structure）

Cursor 应生成如下结构：

```
internal-registry/
├── registry.json
├── components/
│   ├── button.json
│   ├── input.json
│   ├── card.json
│   ├── label.json
│   └── ...（后续可补充）
├── templates/
│   ├── component/
│   │   ├── component.tsx
│   │   └── style.css
│   └── utils/
│       └── cn.ts
├── theme/
│   ├── tokens.css
│   ├── preset.js
│   └── globals.css
├── scripts/
│   └── build.ts
└── package.json
```

---

## 5. Registry JSON 规范（registry.json Requirements）

Cursor 需要生成一个符合 shadcn/ui spec 的 `registry.json`：

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "internal-light-ui",
  "description": "Internal lightweight UI registry for company tools",
  "author": "Company Frontend Team",
  "items": [
    { "name": "button", "type": "component", "path": "components/button.json" },
    { "name": "input", "type": "component", "path": "components/input.json" },
    { "name": "card", "type": "component", "path": "components/card.json" },
    { "name": "label", "type": "component", "path": "components/label.json" }
  ]
}
```

---

## 6. 组件模板要求（Component Template Requirements）

### 6.1 基础风格

所有组件应：

* 使用 Tailwind class
* 遵循 shadcn/ui new-york 风格（可调整）
* 使用公司内部 brand color（来自 tokens.css）
* className 使用组合工具 `cn()`
* 支持自定义 className
* 不做过度封装（保持原子性）

### 6.2 示例（button）

Cursor 需要生成一个带 variants 的 Button（基于 shadcn/ui 源码的精简版）：

```tsx
import { cn } from "@/lib/cn"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline"
  size?: "sm" | "md" | "lg"
}

export function Button({ className, variant = "default", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-md font-medium transition-colors",
        // variant styles
        variant === "default" && "bg-brand text-white hover:bg-brand/90",
        variant === "outline" && "border border-border text-foreground hover:bg-accent",
        variant === "destructive" && "bg-red-500 text-white hover:bg-red-600",
        // size styles
        size === "sm" && "h-8 px-3 text-sm",
        size === "md" && "h-9 px-4 text-sm",
        size === "lg" && "h-10 px-6 text-base",
        className
      )}
      {...props}
    />
  )
}
```

---

## 7. Theme + Token 要求

Cursor 需生成内部主题，包括：

* `theme/tokens.css`：包含公司品牌色、radius、spacing、font 等
* `theme/preset.js`：自动注入 Tailwind v4 preset
* `theme/globals.css`：全局 CSS（reset + tokens + typography）

示例 tokens：

```css
:root {
  --brand: 222 70% 50%;
  --radius: 0.5rem;
}
```

---

## 8. Build / Validation 工具

Cursor 需生成：

* 一个 build.ts（检查 registry.json / validate 组件结构）
* 一个 script：用于 future “publish / sync” 工作

未来可以对接：

* GitHub Actions
* Vercel Blob / 自建静态托管
* 公司内部 npm 私服

---

## 9. 使用方式（Usage Flow）

### 在项目里使用：

```
npx shadcn@latest add button --registry https://your-registry-url
```

Cursor 要确保：

* 返回的文件路径符合法规
* 能被 Next.js / Vite 项目直接使用
* 组件兼容 React 19 + Tailwind v4

---

## 10. 扩展需求（Optional）

如果 Cursor 有余力可自动生成：

* 文档站点（mdx）
* 示例用法 demo
* 内部 tokens 的 figma 变量导出（可选）
* dark mode 支持

---

## 11. 完成标准（Definition of Done）

1. registry 项目可正常通过 HTTP 或本地路径使用
2. `shadcn add button` 能从 registry 拉取成功
3. 组件可在 Next.js 项目中正常编译
4. Tailwind preset 正确注入样式
5. 所有组件均具备可读性、可修改性
6. `registry.json` 校验通过官方 schema
7. 能扩展更多组件而不破坏结构

---

这份需求文档旨在让 Cursor 清楚理解项目目标，自动生成高质量的代码结构、组件模板与构建逻辑。
