# Input

Displays a form input field or a component that looks like an input field.

## Installation

```bash
npx shadcn@latest add input --registry https://your-registry-url
```

## Usage

```tsx
import { Input } from "@/components/ui/input"

export function InputDemo() {
  return <Input type="email" placeholder="Email" />
}
```

## Examples

### Default

```tsx
import { Input } from "@/components/ui/input"

export function InputDefault() {
  return <Input type="text" placeholder="Enter text..." />
}
```

### With Label

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputWithLabel() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}
```

### Disabled

```tsx
import { Input } from "@/components/ui/input"

export function InputDisabled() {
  return <Input disabled type="email" placeholder="Email" />
}
```

### File Input

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  )
}
```

### Password Input

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputPassword() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" />
    </div>
  )
}
```

### With Error State

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputError() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input 
        id="email" 
        type="email" 
        className="border-destructive"
        placeholder="Email" 
      />
      <p className="text-sm text-destructive">Please enter a valid email</p>
    </div>
  )
}
```

## API

### Input

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `"text"` | The type of input. All standard HTML input types are supported |
| `className` | `string` | - | Additional CSS classes |
| `...props` | `React.InputHTMLAttributes<HTMLInputElement>` | - | All standard input HTML attributes |

## Notes

- Supports all standard HTML input types (text, email, password, file, etc.)
- Fully accessible with proper focus states
- Includes file upload styling support
- Uses theme tokens for consistent styling
- Disabled state is fully supported

