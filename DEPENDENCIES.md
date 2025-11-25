# 依赖说明 (Dependencies)

本 registry 中的组件需要以下依赖项。当使用 `shadcn add` 命令添加组件时，这些依赖会自动安装。

## 核心依赖

### 所有组件都需要
- `clsx` - 用于条件类名组合
- `tailwind-merge` - 用于合并 Tailwind 类名，避免冲突

### Button 组件
- `@radix-ui/react-slot` - 用于 asChild 属性支持
- `class-variance-authority` - 用于 variant 和 size 变体管理

### Label 组件
- `@radix-ui/react-label` - 可访问的 label 组件
- `class-variance-authority` - 用于 variant 变体管理

### Input / Card 组件
- 仅需要核心依赖（clsx, tailwind-merge）

## 安装方式

在使用 registry 的项目中，运行：

```bash
# 安装所有依赖
npm install clsx tailwind-merge class-variance-authority @radix-ui/react-slot @radix-ui/react-label

# 或使用 pnpm
pnpm add clsx tailwind-merge class-variance-authority @radix-ui/react-slot @radix-ui/react-label

# 或使用 yarn
yarn add clsx tailwind-merge class-variance-authority @radix-ui/react-slot @radix-ui/react-label
```

注意：`shadcn add` 命令会自动安装组件所需的依赖，通常不需要手动安装。

