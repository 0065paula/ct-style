# 样式维护指南

## 问题说明

在当前的实现中，组件的样式定义存在重复：

1. **组件 TSX 文件**：使用 Tailwind 类名，直接写颜色值（如 `border-[rgba(172,186,211,0.6)]`）
2. **文档 HTML 文件**：静态 HTML，需要独立的 CSS 来展示组件效果
3. **tokens.css**：定义了 CSS 变量，但组件和文档都没有完全使用它们

这导致了：
- 维护成本高：修改颜色需要在多个地方更新
- 容易不一致：可能忘记更新某个地方
- 不符合 DRY 原则

## 解决方案

### 1. 统一使用 CSS 变量

所有颜色值都应该在 `theme/tokens.css` 中定义，通过 CSS 变量管理：

```css
:root {
  --input-border-default: rgba(172, 186, 211, 0.6);
  --input-text: #0A0E27;
  /* ... */
}
```

### 2. 组件使用 Tailwind 配置

在 `theme/preset.js` 中配置 Tailwind，让组件可以使用语义化的类名：

```js
colors: {
  'input-border': {
    default: 'var(--input-border-default)',
    focus: 'var(--input-border-focus)',
    // ...
  },
}
```

然后组件可以这样使用：
```tsx
className="border-input-border-default focus:border-input-border-focus"
```

### 3. 文档使用 CSS 变量

文档 HTML 是静态文件，直接使用 CSS 变量：

```css
.input {
  border-color: var(--input-border-default);
  color: var(--input-text);
}
```

## 当前状态

- ✅ `tokens.css` 中已定义所有颜色变量
- ✅ `preset.js` 中已配置 Tailwind 颜色映射
- ⚠️ 组件 TSX 仍使用硬编码颜色值（需要逐步迁移）
- ⚠️ 文档 HTML 使用硬编码颜色值（需要逐步迁移）

## 迁移计划

1. **短期**：保持现状，但确保 `tokens.css` 是唯一真实来源
2. **中期**：逐步将组件迁移到使用 Tailwind 配置的颜色
3. **长期**：文档也迁移到使用 CSS 变量

## 维护原则

- **单一真实来源**：`theme/tokens.css` 是唯一定义颜色的地方
- **文档同步**：修改 `tokens.css` 后，需要同步更新组件和文档
- **验证**：每次修改后运行构建脚本验证一致性

