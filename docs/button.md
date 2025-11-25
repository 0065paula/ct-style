# Button

Displays a button or a component that looks like a button.

## Installation

```bash
npx shadcn@latest add button --registry https://your-registry-url
```

## Usage

```tsx
import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Click me</Button>
}
```

## Examples

### Variants

#### Button - CTA (Call to Action)

```tsx
import { Button } from "@/components/ui/button"

export function ButtonCTA() {
  return (
    <div className="flex gap-2">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </div>
  )
}
```

#### Button - Ordinary

```tsx
import { Button } from "@/components/ui/button"

export function ButtonOrdinary() {
  return (
    <div className="flex gap-2">
      <Button variant="basic">Basic</Button>
      <Button variant="ontint">OnTint</Button>
      <Button variant="accent">Accent</Button>
    </div>
  )
}
```

#### Button - Quiet

```tsx
import { Button } from "@/components/ui/button"

export function ButtonQuiet() {
  return (
    <div className="flex gap-2">
      <Button variant="quietBold">Quiet Bold</Button>
      <Button variant="quiet">Quiet Regular</Button>
    </div>
  )
}
```

#### Legacy Variants

```tsx
import { Button } from "@/components/ui/button"

export function ButtonLegacy() {
  return (
    <div className="flex gap-2">
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
```

### Sizes

```tsx
import { Button } from "@/components/ui/button"

export function ButtonSizes() {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Icon />
      </Button>
    </div>
  )
}
```

### With Icon

```tsx
import { Button } from "@/components/ui/button"
import { Icon } from "lucide-react"

export function ButtonWithIcon() {
  return (
    <Button>
      <Icon className="mr-2 h-4 w-4" />
      Button with Icon
    </Button>
  )
}
```

### As Child

```tsx
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}
```

### Disabled

```tsx
import { Button } from "@/components/ui/button"

export function ButtonDisabled() {
  return (
    <div className="flex gap-2">
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>Disabled Outline</Button>
    </div>
  )
}
```

### Loading State

```tsx
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function ButtonLoading() {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  )
}
```

## API

### Button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "tertiary" \| "basic" \| "ontint" \| "accent" \| "quietBold" \| "quiet" \| "destructive" \| "outline" \| "ghost" \| "link"` | `"default"` | The visual style variant. CTA variants: `default` (Primary), `secondary`, `tertiary`. Ordinary variants: `basic`, `ontint`, `accent`. Quiet variants: `quietBold`, `quiet`. |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | The size of the button. Small: 13px, Default: 14px, Large: 16px |
| `asChild` | `boolean` | `false` | Change the component to the HTML tag or custom component you want. This merges the original component props with the props of the supplied component/HTML tag and merges their `className` and `style` props. |
| `className` | `string` | - | Additional CSS classes |
| `...props` | `React.ButtonHTMLAttributes<HTMLButtonElement>` | - | All standard button HTML attributes |

## Notes

- The button uses `class-variance-authority` for variant management
- Supports all standard HTML button attributes
- Uses Radix UI Slot for `asChild` prop support
- Fully accessible with keyboard navigation support
- Uses the brand color from your theme tokens for the default variant

