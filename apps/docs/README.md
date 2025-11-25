# Internal UI Registry Documentation

基于 Next.js 构建的组件文档网站，参考 shadcn/ui v4 的文档架构。

## 开发

```bash
# 从项目根目录
npm run docs:dev

# 或进入目录
cd apps/docs
npm install
npm run dev
```

访问 http://localhost:3000 查看文档。

## 构建

```bash
npm run build
npm start
```

## 项目结构

```
apps/docs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── components/[name]/  # 动态组件文档页
├── components/ui/          # 组件文件（从 templates 复制）
├── lib/                    # 工具函数
├── styles/                 # 全局样式
└── package.json
```

## 特性

- ✅ 组件列表页面
- ✅ 动态组件文档页面
- ✅ 实时组件预览
- ✅ 代码示例
- ✅ 响应式设计
- ✅ TypeScript 支持
- ✅ Tailwind CSS v3

## 技术栈

- Next.js 14 (App Router)
- React 18
- Tailwind CSS v3
- TypeScript
