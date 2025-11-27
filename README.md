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
├── registry.json              # Registry 主配置文件（官方格式）
├── registry/                 # 组件源码目录（官方结构）
│   └── default/             # 默认风格
│       ├── button/
│       │   └── button.tsx
│       ├── input/
│       │   └── input.tsx
│       ├── utils/
│       │   └── utils.ts
│       └── ...（40+ 组件）
├── public/                   # 构建输出目录
│   └── r/                   # shadcn build 输出（JSON 文件）
├── components/               # 组件定义文件（保留，用于参考）
│   ├── button.json
│   ├── input.json
│   └── ...（更多组件）
├── templates/                # 旧版组件模板（保留，用于参考）
│   ├── component/
│   └── utils/
├── theme/                    # 主题配置
│   ├── tokens.css           # 设计 tokens（CSS 变量）
│   ├── preset.js            # Tailwind preset
│   └── globals.css          # 全局样式
├── scripts/
│   ├── build.ts             # 构建和验证脚本
│   ├── validate-json.js    # JSON 验证脚本
│   ├── serve-registry.js    # 本地 HTTP 服务器
│   ├── migrate-registry-format.ts      # 格式迁移脚本
│   ├── migrate-to-official-structure.ts # 目录结构迁移脚本
│   └── add-component.js     # CLI 3.5.0 包装脚本
├── apps/
│   └── docs/                # 组件文档站点（Next.js）
└── package.json
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 验证 Registry

```bash
npm run validate
```

### 构建 Registry

使用官方 `shadcn build` 命令：

```bash
npm run registry:build
```

这将生成 `public/r/[NAME].json` 文件，可以通过 HTTP 服务器访问。

### 本地开发服务器

```bash
# 启动本地 HTTP 服务器（端口 3002）
npm run serve:registry

# 或使用自定义端口
npm run serve
```

### 文档站点

```bash
# 启动文档站点开发服务器
npm run docs:dev

# 构建文档站点
npm run docs:build
```

访问 `http://localhost:3000` 查看组件文档。

## 📦 使用方式（内部项目）

### Registry URL

```
https://raw.githubusercontent.com/0065paula/ct-style/main
```

### 在项目中使用

#### 方式一：使用新版 shadcn CLI（推荐）

1. **初始化项目**：
   ```bash
   npx shadcn@latest init
   ```

2. **配置 components.json**：
   ```json
   {
     "$schema": "https://ui.shadcn.com/schema.json",
     "style": "default",
     "rsc": true,
     "tsx": true,
     "registry": "https://raw.githubusercontent.com/0065paula/ct-style/main",
     "tailwind": {
       "config": "tailwind.config.ts",
       "css": "src/app/globals.css",
       "baseColor": "slate",
       "cssVariables": true,
       "prefix": ""
     },
     "aliases": {
       "components": "@/components",
       "utils": "@/lib/utils",
       "ui": "@/components/ui",
       "lib": "@/lib"
     }
   }
   ```

3. **添加组件**：
   ```bash
   npx shadcn@latest add button
   npx shadcn@latest add input card label checkbox
   ```

#### 方式二：使用包装脚本（CLI 3.5.0）

如果使用旧版 shadcn CLI (3.5.0)：

1. **下载包装脚本**：
   ```bash
   mkdir -p scripts
   curl https://raw.githubusercontent.com/0065paula/ct-style/main/scripts/add-component.js -o scripts/add-component.js
   chmod +x scripts/add-component.js
   ```

2. **修改脚本中的 Registry URL**：
   编辑 `scripts/add-component.js`，设置：
   ```javascript
   const REGISTRY_URL = 'https://raw.githubusercontent.com/0065paula/ct-style/main';
   ```

3. **添加 npm script**：
   ```json
   {
     "scripts": {
       "add:component": "node scripts/add-component.js"
     }
   }
   ```

4. **添加组件**：
   ```bash
   npm run add:component button
   ```

### 配置主题（可选）

如果需要使用 CloudTower UI 主题：

1. **下载主题文件**：
   ```bash
   mkdir -p theme
   curl https://raw.githubusercontent.com/0065paula/ct-style/main/theme/tokens.css -o theme/tokens.css
   curl https://raw.githubusercontent.com/0065paula/ct-style/main/theme/preset.js -o theme/preset.js
   curl https://raw.githubusercontent.com/0065paula/ct-style/main/theme/globals.css -o theme/globals.css
   ```

2. **配置 Tailwind**：
   在 `tailwind.config.ts` 中：
   ```typescript
   import preset from './theme/preset.js'
   
   export default {
     presets: [preset],
     // ... 其他配置
   }
   ```

3. **引入全局样式**：
   在 `globals.css` 中：
   ```css
   @import './theme/tokens.css';
   @import './theme/globals.css';
   ```

## 🔧 开发指南

### 添加新组件

1. **创建组件文件**：
   ```bash
   # 在 registry/default/[component-name]/ 目录下创建
   mkdir -p registry/default/my-component
   # 创建组件文件
   touch registry/default/my-component/my-component.tsx
   ```

2. **更新 registry.json**：
   在 `registry.json` 的 `items` 数组中添加：
   ```json
   {
     "name": "my-component",
     "type": "registry:component",
     "title": "My Component",
     "description": "A custom component.",
     "files": [
       {
         "path": "registry/default/my-component/my-component.tsx",
         "type": "registry:component",
         "target": "components/ui/my-component.tsx"
       }
     ],
     "dependencies": ["@radix-ui/react-..."],
     "registryDependencies": ["utils"]
   }
   ```

3. **验证**：
   ```bash
   npm run validate
   ```

### 更新组件

1. 修改 `registry/default/[name]/[name].tsx` 文件
2. 运行验证：`npm run validate`
3. 提交并推送到 Git
4. 团队项目使用 `--overwrite` 重新添加组件

### 构建和部署

1. **构建 registry**：
   ```bash
   npm run registry:build
   ```

2. **部署 public/r/ 目录**：
   将 `public/r/` 目录部署到可访问的 URL

3. **使用构建后的 URL**：
   ```json
   {
     "registry": "https://your-deployment-url/r"
   }
   ```

## 📚 可用组件

当前 registry 包含 40+ 个组件：

**表单组件**：Button, Input, Textarea, Select, Checkbox, Radio Group, Switch, Label, Field

**布局组件**：Card, Separator, Scroll Area, Resizable, Sidebar

**导航组件**：Tabs, Breadcrumb, Pagination, Sidebar

**反馈组件**：Dialog, Alert Dialog, Sheet, Popover, Tooltip, Sonner, Progress, Skeleton, Spinner

**数据展示**：Table, Data Table, Calendar, Date Picker, Badge

**其他组件**：Accordion, Command, Combobox, Context Menu, Dropdown Menu, Item

**工具**：Utils (cn function)

完整列表请查看 `registry.json` 或访问文档站点。

## 🔗 相关资源

- [shadcn/ui 官方文档](https://ui.shadcn.com)
- [Registry 规范](https://ui.shadcn.com/docs/registry/getting-started)
- [Registry JSON Schema](https://ui.shadcn.com/docs/registry/registry-json)
- [Registry Item Schema](https://ui.shadcn.com/docs/registry/registry-item.json)
- [使用指南](./USAGE_GUIDE.md) - 详细的使用步骤和故障排查

## 📝 项目信息

- **仓库地址**：`git@github.com:0065paula/ct-style.git`
- **主分支**：`main`（官方格式，符合最新规范）
- **Registry URL**：`https://raw.githubusercontent.com/0065paula/ct-style/main`

## ⚠️ 注意事项

2. **CLI 版本**：
   - 新版 CLI：支持 `components.json` 中的 `registry` 字段
   - 旧版 CLI (3.5.0)：需要使用包装脚本

3. **网络访问**：
   - 确保可以访问 GitHub（如果使用 GitHub Raw URL）
   - 或使用内部 GitLab（如果已配置）

## 🆘 故障排查

### 组件列表不显示

检查文档站点的过滤条件是否支持 `registry:component` 类型。

### 组件安装失败

- 检查 Registry URL 是否正确
- 验证网络连接
- 查看 CLI 版本
- 尝试使用包装脚本

### 导入路径错误

- 检查 `components.json` 中的 `aliases` 配置
- 确保路径别名正确

更多故障排查请参考 [USAGE_GUIDE.md](./USAGE_GUIDE.md)。
