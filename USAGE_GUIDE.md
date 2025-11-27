# 内部项目使用 Registry 指南

本指南说明如何在内部项目中使用 `registry-format` 分支的 registry 进行界面开发。

## 📋 前置条件

1. **Registry 分支已推送到远端**
   - 当前分支：`registry-format`
   - 远端仓库：`git@github.com:0065paula/ct-style.git`
   - 确保分支已推送：`git push origin registry-format`

2. **Registry URL 格式**
   - GitHub Raw URL: `https://raw.githubusercontent.com/0065paula/ct-style/registry-format`
   - 或使用 GitLab（如果已迁移）：`http://gitlab.smartx.com/product-design/internal-tool-ui/-/raw/registry-format`

## 🚀 使用步骤

### 步骤 1：初始化项目

在你的内部项目中，初始化 shadcn/ui：

```bash
# 进入你的项目目录
cd /path/to/your-project

# 初始化 shadcn/ui
npx shadcn@latest init
```

**注意**：如果使用旧版 CLI (3.5.0)，可能需要使用包装脚本（见下方）。

### 步骤 2：配置 Registry URL

#### 方式一：使用新版 shadcn CLI（推荐）

如果使用支持自定义 registry 的 CLI 版本，在 `components.json` 中添加：

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "registry": "https://raw.githubusercontent.com/0065paula/ct-style/registry-format",
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
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

#### 方式二：使用命令行参数

如果 CLI 支持 `--registry` 参数：

```bash
npx shadcn@latest add button --registry https://raw.githubusercontent.com/0065paula/ct-style/registry-format
```

#### 方式三：使用包装脚本（CLI 3.5.0）

如果使用旧版 CLI，需要：

1. **下载包装脚本**：
   ```bash
   mkdir -p scripts
   curl https://raw.githubusercontent.com/0065paula/ct-style/registry-format/scripts/add-component.js -o scripts/add-component.js
   chmod +x scripts/add-component.js
   ```

2. **配置 npm script**：
   ```json
   {
     "scripts": {
       "add:component": "node scripts/add-component.js"
     }
   }
   ```

3. **修改脚本中的 Registry URL**：
   编辑 `scripts/add-component.js`，将 `REGISTRY_URL` 改为：
   ```javascript
   const REGISTRY_URL = 'https://raw.githubusercontent.com/0065paula/ct-style/registry-format';
   ```

### 步骤 3：添加组件

#### 使用新版 CLI

```bash
# 添加单个组件
npx shadcn@latest add button

# 添加多个组件
npx shadcn@latest add button input card label

# 查看所有可用组件
npx shadcn@latest list
```

#### 使用包装脚本（CLI 3.5.0）

```bash
# 添加单个组件
npm run add:component button

# 添加多个组件
npm run add:component button input card
```

### 步骤 4：配置主题（可选）

如果需要使用 CloudTower UI 主题：

1. **下载主题文件**：
   ```bash
   # 创建 theme 目录
   mkdir -p theme
   
   # 下载主题文件
   curl https://raw.githubusercontent.com/0065paula/ct-style/registry-format/theme/tokens.css -o theme/tokens.css
   curl https://raw.githubusercontent.com/0065paula/ct-style/registry-format/theme/preset.js -o theme/preset.js
   curl https://raw.githubusercontent.com/0065paula/ct-style/registry-format/theme/globals.css -o theme/globals.css
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

## 📝 Registry URL 说明

### GitHub Raw URL 格式

```
https://raw.githubusercontent.com/{owner}/{repo}/{branch}
```

**当前配置**：
```
https://raw.githubusercontent.com/0065paula/ct-style/registry-format
```

### 访问组件

- Registry 主文件：`https://raw.githubusercontent.com/0065paula/ct-style/registry-format/registry.json`
- 组件文件：`https://raw.githubusercontent.com/0065paula/ct-style/registry-format/registry/default/button/button.tsx`

## 🔧 使用 shadcn build（如果使用新版 CLI）

如果 registry 支持 `shadcn build`，可以：

1. **在 registry 仓库中运行构建**：
   ```bash
   cd /path/to/ct-style
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

4. **安装组件**：
   ```bash
   npx shadcn@latest add https://your-deployment-url/r/button.json
   ```

## ⚠️ 注意事项

### 1. 分支访问

确保：
- `registry-format` 分支已推送到远端
- 分支是公开的，或你有访问权限
- URL 格式正确

### 2. CLI 版本兼容性

- **新版 CLI**：支持 `components.json` 中的 `registry` 字段
- **旧版 CLI (3.5.0)**：需要使用包装脚本

### 3. 网络访问

确保你的开发环境可以访问：
- GitHub（如果使用 GitHub Raw URL）
- 或内部 GitLab（如果使用 GitLab URL）

### 4. 组件导入路径

迁移后的组件使用 `@/registry` 路径，但安装到项目后会被转换为项目配置的路径（如 `@/components/ui`）。

## 🔄 更新组件

当 registry 中的组件更新后：

```bash
# 使用 --overwrite 参数重新添加
npx shadcn@latest add button --overwrite

# 或使用包装脚本
npm run add:component button --overwrite
```

## 📚 相关资源

- [shadcn/ui 官方文档](https://ui.shadcn.com)
- [Registry 规范](https://ui.shadcn.com/docs/registry/getting-started)
- Registry 仓库：`git@github.com:0065paula/ct-style.git` (registry-format 分支)

## 🆘 故障排查

### 问题 1：无法访问 registry

**解决**：
- 检查网络连接
- 验证 URL 是否正确
- 确认分支已推送
- 检查访问权限

### 问题 2：组件安装失败

**解决**：
- 检查 CLI 版本
- 验证 `components.json` 配置
- 查看错误信息
- 尝试使用包装脚本

### 问题 3：导入路径错误

**解决**：
- 检查 `components.json` 中的 `aliases` 配置
- 确保路径别名正确
- 验证组件文件是否已创建

## 💡 最佳实践

1. **固定分支或标签**：建议使用特定分支或标签，而不是 `main`
2. **版本管理**：为 registry 创建版本标签，便于追踪
3. **文档同步**：保持 registry 文档与组件同步
4. **测试验证**：在安装组件后测试功能是否正常

