# Registry 部署和使用指南

本指南说明如何将 registry 部署给内部团队使用。

## 📋 部署方式

### 方式一：Git 仓库托管（推荐）

这是最简单的方式，适合大多数团队。

#### 1. 推送到 Git 仓库

```bash
# 如果还没有 Git 仓库，创建一个
git init
git add .
git commit -m "Initial registry setup"

# 推送到内部 Git 服务器（如 GitLab、GitHub Enterprise 等）
git remote add origin <your-git-server-url>
git push -u origin main
```

#### 2. 获取 Registry URL

- **GitHub/GitLab Raw URL**:
  ```
  https://raw.githubusercontent.com/your-org/ct-style/main
  # 或
  https://gitlab.com/your-org/ct-style/-/raw/main
  ```

- **使用 Git 协议**（如果支持）:
  ```
  https://your-git-server.com/your-org/ct-style.git
  ```

#### 3. 团队使用

在项目中使用：

```bash
# 添加组件
npx shadcn@latest add button --registry https://raw.githubusercontent.com/your-org/ct-style/main

# 或添加到项目的 components.json
npx shadcn@latest init --registry https://raw.githubusercontent.com/your-org/ct-style/main
```

---

### 方式二：静态文件服务器

如果团队有内部静态文件服务器（如 Nginx、Apache）。

#### 1. 部署文件

将以下文件部署到服务器：
- `registry.json`
- `components/` 目录
- `templates/` 目录

确保文件结构保持不变。

#### 2. 配置服务器

确保服务器支持：
- 正确的 MIME 类型（`application/json` for `.json`）
- CORS 头（如果需要跨域）

#### 3. 使用 Registry URL

```bash
npx shadcn@latest add button --registry https://your-server.com/registry
```

---

### 方式三：本地文件系统（开发测试）

适合本地开发和测试。

```bash
# 使用绝对路径
npx shadcn@latest add button --registry file:///absolute/path/to/ct-style

# 或相对路径（从项目根目录）
npx shadcn@latest add button --registry file://./path/to/ct-style
```

---

## 🚀 快速开始（团队使用）

### 1. 初始化项目

在你的新项目中：

```bash
# 初始化 shadcn/ui
npx shadcn@latest init

# 当提示选择 registry 时，输入：
https://raw.githubusercontent.com/your-org/ct-style/main
# 或你的 registry URL
```

### 2. 添加组件

```bash
# 添加单个组件
npx shadcn@latest add button

# 添加多个组件
npx shadcn@latest add button input card

# 查看所有可用组件
npx shadcn@latest list --registry https://raw.githubusercontent.com/your-org/ct-style/main
```

### 3. 配置项目

#### 安装主题文件

复制 `theme/` 目录到你的项目：

```bash
# 复制主题文件
cp -r /path/to/ct-style/theme ./theme

# 或手动下载
# 1. 复制 theme/tokens.css 到你的项目
# 2. 在 tailwind.config.js 中引入 theme/preset.js
# 3. 在全局 CSS 中引入 theme/globals.css
```

#### 配置 Tailwind

在 `tailwind.config.js` 中：

```js
import preset from './theme/preset.js'

export default {
  presets: [preset],
  // ... 其他配置
}
```

#### 配置全局样式

在 `globals.css` 中：

```css
@import './theme/tokens.css';
@import './theme/globals.css';
```

---

## 📝 配置 components.json

初始化后，你的项目会有 `components.json` 文件：

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "registry": "https://raw.githubusercontent.com/your-org/ct-style/main"
}
```

之后添加组件时，会自动使用配置的 registry。

---

## 🔧 常见问题

### Q: 如何更新组件？

A: 在 registry 仓库中更新组件，然后团队重新添加：

```bash
npx shadcn@latest add button --overwrite
```

### Q: 如何添加自定义组件？

A: 在 registry 仓库中添加新组件，然后推送到 Git。团队可以立即使用。

### Q: 如何查看可用组件？

A: 

```bash
npx shadcn@latest list --registry <your-registry-url>
```

### Q: Registry URL 无法访问？

A: 检查：
1. URL 是否正确
2. 网络是否可以访问（内网/外网）
3. Git 服务器是否支持 raw 文件访问
4. 文件路径是否正确

---

## 📚 更多资源

- [shadcn/ui 文档](https://ui.shadcn.com)
- [Registry 规范](https://ui.shadcn.com/docs/registry)
- 内部文档站点：运行 `npm run docs:dev` 查看

