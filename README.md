# Internal shadcn/ui Registry

公司内部的 lightweight shadcn/ui registry，用于多个内部工具与前端项目之间共享统一的基础 UI 组件与样式。

## 📋 项目概述

本项目是一个适用于 shadcn/ui CLI 的 **Registry Provider**，提供：

- 一致的组件结构
- 已定制的样式（Button / Input / Card / Label 等基础组件）
- 统一的 Tailwind preset / CSS variables
- 公司默认主题（baseColor、风格、Spacing、Radius、Brand Color）
- 一套能被 `shadcn@latest add {component}` 拉取的模板

所有组件均为可读的 TSX 源码，符合 shadcn/ui 风格，可被应用项目自由修改。

## 🏗️ 项目结构

```
internal-registry/
├── registry.json              # Registry 主配置文件
├── components/                # 组件定义文件
│   ├── button.json
│   ├── input.json
│   ├── card.json
│   └── label.json
├── templates/                 # 组件模板源码
│   ├── component/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── label.tsx
│   └── utils/
│       └── cn.ts
├── theme/                     # 主题配置
│   ├── tokens.css            # 设计 tokens（CSS 变量）
│   ├── preset.js             # Tailwind preset
│   └── globals.css           # 全局样式
├── scripts/
│   └── build.ts              # 构建和验证脚本
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

### 在项目中使用

在你的 Next.js 或 Vite 项目中，使用以下命令添加组件：

```bash
npx shadcn@latest add button --registry https://your-registry-url
```

### 本地开发测试

如果 registry 托管在本地或内网，可以使用本地路径：

```bash
npx shadcn@latest add button --registry file:///path/to/this/registry
```

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

## 🔧 技术栈

- Node.js + TypeScript
- Tailwind CSS v4
- ESM 模块
- shadcn/ui registry 规范

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

