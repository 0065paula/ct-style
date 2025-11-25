# Label

Renders an accessible label associated with controls.

## Installation

```bash
npx shadcn@latest add label --registry https://your-registry-url
```

## Usage

```tsx
import { Label } from "@/components/ui/label"

export function LabelDemo() {
  return (
    <div>
      <Label htmlFor="email">Email</Label>
      <input id="email" type="email" />
    </div>
  )
}
```

## Examples

### Default

```tsx
import { Label } from "@/components/ui/label"

export function LabelDefault() {
  return <Label>Email</Label>
}
```

### With Input

```tsx
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function LabelWithInput() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}
```

### With Checkbox

```tsx
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function LabelWithCheckbox() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </Label>
    </div>
  )
}
```

### Required Field

```tsx
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function LabelRequired() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="name">
        Name <span className="text-destructive">*</span>
      </Label>
      <Input type="text" id="name" required />
    </div>
  )
}
```

### Disabled State

```tsx
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function LabelDisabled() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled-input" className="opacity-70">
        Disabled Input
      </Label>
      <Input id="disabled-input" disabled />
    </div>
  )
}
```

## API

### Label

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `htmlFor` | `string` | - | Associates the label with a form control |
| `className` | `string` | - | Additional CSS classes |
| `...props` | `React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>` | - | All Radix UI Label props |

## Notes

- Built on top of [Radix UI Label](https://www.radix-ui.com/primitives/docs/components/label)
- Fully accessible with proper ARIA attributes
- Automatically handles disabled state styling when associated with disabled inputs
- Uses theme tokens for consistent styling
- Supports all standard label HTML attributes

