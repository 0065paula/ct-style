# Internal shadcn/ui Registry

公司内部的 lightweight shadcn/ui registry，用于多个内部工具与前端项目之间共享统一的基础 UI 组件与样式。

## 📋 项目概述

本项目是一个适用于 shadcn/ui CLI 的 **Registry Provider**，提供：

- 一致的组件结构
- 已定制的样式（Button、Input、Card、Label、Checkbox、Radio、Switch、Tabs、Select、Dialog 等 40+ 组件）
- 统一的 Tailwind preset / CSS variables
- 公司默认主题（baseColor、风格、Spacing、Radius、Brand Color）
- 一套能被 `shadcn@latest add {component}` 拉取的模板
- 完整的组件文档站点（包含交互式预览和 API 参考）

所有组件均为可读的 TSX 源码，符合 shadcn/ui 风格，可被应用项目自由修改。

## 🏗️ 项目结构

```
internal-registry/
├── registry.json              # Registry 主配置文件
├── components/                # 组件定义文件（40+ 个组件）
│   ├── button.json
│   ├── input.json
│   ├── card.json
│   ├── label.json
│   └── ...（更多组件）
├── templates/                 # 组件模板源码
│   ├── component/            # 组件源码（40+ 个组件）
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── label.tsx
│   │   └── ...（更多组件）
│   └── utils/
│       └── cn.ts
├── theme/                     # 主题配置
│   ├── tokens.css            # 设计 tokens（CSS 变量）
│   ├── preset.js             # Tailwind preset
│   └── globals.css           # 全局样式
├── scripts/
│   ├── build.ts              # 构建和验证脚本
│   ├── validate-json.js     # JSON 验证脚本
│   └── serve-registry.js    # 本地 HTTP 服务器
├── apps/
│   └── docs/                # 组件文档站点（Next.js）
└── package.json
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
# 或
npm install
```

### 验证 Registry

```bash
pnpm run validate
# 或
npm run validate
```

### 构建 Registry

```bash
pnpm run build
# 或
npm run build
```

## 📦 使用方式

### 方式一：Git 仓库托管（推荐）

1. **将 registry 推送到 Git 仓库**（GitHub、GitLab 等）

2. **获取 Registry URL**:
   - **内部 GitLab**（当前使用）: `http://gitlab.smartx.com/product-design/internal-tool-ui/-/raw/main`
   - GitHub: `https://raw.githubusercontent.com/your-org/internal-tool-ui/main`
   - 其他 GitLab: `https://gitlab.com/your-org/internal-tool-ui/-/raw/main`

3. **在项目中使用**:

```bash
# 初始化项目（首次使用）
npx shadcn@latest init --registry http://gitlab.smartx.com/product-design/internal-tool-ui/-/raw/main

# 添加组件
npx shadcn@latest add button
npx shadcn@latest add input card label
```

### 方式二：本地 HTTP 服务器（开发测试）

启动本地服务器：

```bash
npm run serve
# 或指定端口
npm run serve:registry
```

然后在项目中使用：

```bash
npx shadcn@latest add button --registry http://localhost:3002
```

### 方式三：本地文件系统

```bash
npx shadcn@latest add button --registry file:///absolute/path/to/internal-tool-ui
```

### 查看可用组件

```bash
# 使用内部 GitLab registry
npx shadcn@latest list --registry http://gitlab.smartx.com/product-design/internal-tool-ui/-/raw/main
```

> 📖 详细部署指南请查看 [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## 🎨 主题定制

### 修改品牌色

编辑 `theme/tokens.css` 中的 `--brand` 变量：

```css
:root {
  --brand: 222 70% 50%; /* 修改为你公司的品牌色 */
}
```

### 修改圆角

编辑 `theme/tokens.css` 中的 `--radius` 变量：

```css
:root {
  --radius: 0.5rem; /* 修改为你需要的圆角大小 */
}
```

### 在项目中使用主题

1. 复制 `theme/tokens.css` 到你的项目
2. 在 `tailwind.config.js` 中引入 `theme/preset.js`
3. 在全局 CSS 中引入 `theme/globals.css`

## 📝 添加新组件

1. 在 `components/` 目录下创建新的 JSON 文件（如 `dialog.json`）
2. 在 `templates/component/` 目录下创建对应的 TSX 文件
3. 在 `registry.json` 的 `items` 数组中添加新组件引用
4. 运行 `pnpm run validate` 验证

## 📦 组件依赖

本 registry 中的组件需要以下依赖项。当使用 `shadcn add` 命令添加组件时，这些依赖会自动安装。

### 核心依赖（所有组件都需要）
- `clsx` - 用于条件类名组合
- `tailwind-merge` - 用于合并 Tailwind 类名，避免冲突

### 组件特定依赖
- `class-variance-authority` - 用于 variant 和 size 变体管理（Button、Label 等）
- `@radix-ui/react-slot` - 用于 asChild 属性支持（Button 等）
- `@radix-ui/react-label` - 可访问的 label 组件（Label）
- `@radix-ui/react-*` - 其他 Radix UI 组件（根据具体组件而定）
- `lucide-react` - 图标库（部分组件使用）

> **注意**：`shadcn add` 命令会自动安装组件所需的依赖，通常不需要手动安装。

## 🔧 技术栈

- Node.js + TypeScript
- Tailwind CSS v4
- ESM 模块
- shadcn/ui registry 规范
- React 19（兼容 React 18）

## ✅ 完成标准

- ✅ registry 项目可正常通过 HTTP 或本地路径使用
- ✅ `shadcn add button` 能从 registry 拉取成功
- ✅ 组件可在 Next.js 项目中正常编译
- ✅ Tailwind preset 正确注入样式
- ✅ 所有组件均具备可读性、可修改性
- ✅ `registry.json` 校验通过官方 schema
- ✅ 能扩展更多组件而不破坏结构

## 📚 Documentation

Complete component documentation is available in the `apps/docs/` directory. To view the documentation:

```bash
npm run docs:dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

The documentation site includes:
- Interactive component previews
- API reference tables
- Code examples
- Full component documentation

## 📄 License

MIT

