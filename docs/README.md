# Component Documentation

Welcome to the Internal shadcn/ui Registry component documentation.

## Available Components

- [Button](./button.md) - Displays a button or a component that looks like a button
- [Input](./input.md) - Displays a form input field
- [Card](./card.md) - Displays a card with header, content, and footer
- [Label](./label.md) - Renders an accessible label associated with controls
- [Utils](./utils.md) - Utility functions for class name merging

## Quick Start

### Installation

Add components to your project using the shadcn/ui CLI:

```bash
npx shadcn@latest add button --registry https://your-registry-url
```

### Basic Usage

```tsx
import { Button } from "@/components/ui/button"

export function App() {
  return <Button>Click me</Button>
}
```

## Component Structure

All components in this registry:

- ✅ Follow shadcn/ui patterns and conventions
- ✅ Use TypeScript for type safety
- ✅ Support Tailwind CSS v4
- ✅ Are fully accessible
- ✅ Use theme tokens for consistent styling
- ✅ Can be customized and modified

## Theme

All components use a unified theme system. Customize your theme by editing `theme/tokens.css`:

```css
:root {
  --brand: 222 70% 50%;
  --radius: 0.5rem;
  /* ... more tokens */
}
```

## Dependencies

Most components require minimal dependencies:

- `clsx` - Class name utility
- `tailwind-merge` - Tailwind class merging
- `class-variance-authority` - Variant management (Button, Label)
- `@radix-ui/react-*` - Accessible primitives (Button, Label)

These are automatically installed when you add components using the CLI.

## Contributing

To add new components to this registry:

1. Create component template in `templates/component/`
2. Add component definition in `components/`
3. Update `registry.json`
4. Add documentation in `docs/`
5. Run `npm run build` to validate

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)

