# Utils

Utility functions for class name merging.

## Installation

```bash
npx shadcn@latest add utils --registry https://your-registry-url
```

## Usage

```tsx
import { cn } from "@/lib/utils"

export function Example() {
  return (
    <div className={cn("base-class", condition && "conditional-class")}>
      Content
    </div>
  )
}
```

## Examples

### Basic Usage

```tsx
import { cn } from "@/lib/utils"

export function BasicExample() {
  return (
    <div className={cn("px-4 py-2", "bg-blue-500", "text-white")}>
      Merged classes
    </div>
  )
}
```

### Conditional Classes

```tsx
import { cn } from "@/lib/utils"
import { useState } from "react"

export function ConditionalExample() {
  const [isActive, setIsActive] = useState(false)
  
  return (
    <button
      className={cn(
        "px-4 py-2 rounded",
        isActive && "bg-blue-500 text-white",
        !isActive && "bg-gray-200 text-gray-800"
      )}
      onClick={() => setIsActive(!isActive)}
    >
      Toggle
    </button>
  )
}
```

### With Component Variants

```tsx
import { cn } from "@/lib/utils"

export function VariantExample({ variant }: { variant: "primary" | "secondary" }) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded",
        variant === "primary" && "bg-blue-500 text-white",
        variant === "secondary" && "bg-gray-500 text-white"
      )}
    >
      Button
    </button>
  )
}
```

### Merging with Existing Classes

```tsx
import { cn } from "@/lib/utils"

export function MergeExample({ className }: { className?: string }) {
  return (
    <div className={cn("base-class", className)}>
      Merged with prop
    </div>
  )
}
```

### Array of Classes

```tsx
import { cn } from "@/lib/utils"

export function ArrayExample() {
  const classes = [
    "px-4",
    "py-2",
    "rounded",
    "bg-blue-500"
  ]
  
  return <div className={cn(...classes)}>Content</div>
}
```

## API

### cn

A utility function that merges class names using `clsx` and `tailwind-merge`.

```tsx
function cn(...inputs: ClassValue[]): string
```

#### Parameters

- `...inputs`: Variable number of class name inputs. Can be:
  - Strings
  - Objects (for conditional classes)
  - Arrays
  - `undefined` or `null` (will be ignored)

#### Returns

- `string`: Merged class names with Tailwind conflicts resolved

## How It Works

The `cn` function combines two powerful utilities:

1. **clsx**: Conditionally joins classNames together
2. **tailwind-merge**: Intelligently merges Tailwind CSS classes, resolving conflicts

### Example

```tsx
cn("px-2 px-4") // Returns "px-4" (px-2 is overridden)
cn("bg-red-500 bg-blue-500") // Returns "bg-blue-500" (red is overridden)
```

## Notes

- Automatically resolves Tailwind class conflicts (last one wins)
- Handles conditional classes elegantly
- Ignores `undefined` and `null` values
- Type-safe with TypeScript
- Used throughout all components in this registry

