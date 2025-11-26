# Registry 使用指南

## 📦 Registry URL

**内部 GitLab Registry URL**:
```
http://gitlab.smartx.com/product-design/internal-tool-ui/-/raw/main
```

## 🚀 快速开始

### 1. 初始化项目

在你的新项目中运行：

```bash
npx shadcn@latest init --registry http://gitlab.smartx.com/product-design/internal-tool-ui/-/raw/main
```

这会创建 `components.json` 文件，配置好 registry 地址。

### 2. 添加组件

```bash
# 添加单个组件
npx shadcn@latest add button

# 添加多个组件
npx shadcn@latest add input card label checkbox

# 查看所有可用组件
npx shadcn@latest list
```

### 3. 配置主题

复制 `theme/` 目录到你的项目：

```bash
# 从 registry 仓库克隆或下载 theme 目录
# 然后复制到你的项目
cp -r /path/to/internal-tool-ui/theme ./theme
```

在 `tailwind.config.js` 中引入 preset：

```js
import preset from './theme/preset.js'

export default {
  presets: [preset],
  // ... 其他配置
}
```

在全局 CSS 中引入：

```css
@import './theme/tokens.css';
@import './theme/globals.css';
```

## 📝 components.json 示例

初始化后，你的 `components.json` 应该类似：

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
  "registry": "http://gitlab.smartx.com/product-design/internal-tool-ui/-/raw/main"
}
```

## ⚠️ 注意事项

1. **网络访问**: 确保你的开发环境可以访问 `http://gitlab.smartx.com`
2. **认证**: 如果 GitLab 需要认证，可能需要配置 Git 凭据或使用 token
3. **分支**: 默认使用 `main` 分支，如需使用其他分支，修改 URL 中的 `main` 为对应分支名

## 🔧 常见问题

### Q: 无法访问 registry？

A: 检查：
- 网络是否可以访问 `http://gitlab.smartx.com`
- 是否在公司内网或 VPN 环境中
- GitLab 项目是否设置为内部可见

### Q: 如何更新组件？

A: 在 registry 仓库中更新组件后，重新添加：

```bash
npx shadcn@latest add button --overwrite
```

### Q: 如何查看可用组件？

A: 

```bash
npx shadcn@latest list
```

或指定 registry：

```bash
npx shadcn@latest list --registry http://gitlab.smartx.com/product-design/internal-tool-ui/-/raw/main
```
