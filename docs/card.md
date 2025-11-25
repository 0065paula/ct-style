# Card

Displays a card with header, content, and footer.

## Installation

```bash
npx shadcn@latest add card --registry https://your-registry-url
```

## Usage

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
```

## Examples

### Default

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardDefault() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
    </Card>
  )
}
```

### With Button

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CardWithButton() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
```

### Simple Card

```tsx
import { Card, CardContent } from "@/components/ui/card"

export function CardSimple() {
  return (
    <Card>
      <CardContent className="pt-6">
        <p>Simple card with just content.</p>
      </CardContent>
    </Card>
  )
}
```

### Card with Image

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

export function CardWithImage() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card with Image</CardTitle>
        <CardDescription>Card description here</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src="/placeholder.jpg"
          alt="Card image"
          width={300}
          height={200}
          className="rounded-md"
        />
      </CardContent>
    </Card>
  )
}
```

## API

### Card

The main card container component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `...props` | `React.HTMLAttributes<HTMLDivElement>` | - | All standard div HTML attributes |

### CardHeader

Container for the card header section.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `...props` | `React.HTMLAttributes<HTMLDivElement>` | - | All standard div HTML attributes |

### CardTitle

The card title component. Renders as an `h3` element.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `...props` | `React.HTMLAttributes<HTMLHeadingElement>` | - | All standard heading HTML attributes |

### CardDescription

The card description component. Renders as a `p` element.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `...props` | `React.HTMLAttributes<HTMLParagraphElement>` | - | All standard paragraph HTML attributes |

### CardContent

Container for the main card content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `...props` | `React.HTMLAttributes<HTMLDivElement>` | - | All standard div HTML attributes |

### CardFooter

Container for the card footer section.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `...props` | `React.HTMLAttributes<HTMLDivElement>` | - | All standard div HTML attributes |

## Notes

- All sub-components are optional - use only what you need
- Card components use theme tokens for consistent styling
- Fully composable - mix and match components as needed
- CardHeader includes spacing for CardTitle and CardDescription
- CardContent has top padding removed when used with CardHeader

