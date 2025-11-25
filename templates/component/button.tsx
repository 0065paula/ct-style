import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-[6px] font-bold",
  {
    variants: {
      variant: {
        default: "bg-brand text-white hover:bg-brand/90 text-sm shadow-[0px_1px_2px_0px_rgba(44,56,82,0.18)]",
        secondary: "bg-[rgba(0,136,255,0.1)] text-brand hover:bg-[rgba(0,136,255,0.15)] text-sm",
        tertiary: "bg-white text-brand hover:bg-accent text-sm",
        basic: "bg-white text-[#1D326C] border border-[rgba(172,186,211,0.6)] hover:bg-accent text-sm font-normal shadow-[0px_1px_2px_-1px_rgba(44,56,82,0.18)]",
        ontint: "bg-white text-brand hover:bg-accent text-sm font-normal",
        accent: "bg-white text-brand border border-brand hover:bg-accent text-sm font-normal shadow-[0px_1px_2px_-1px_rgba(44,56,82,0.18)]",
        quietBold: "bg-transparent text-[rgba(44,56,82,0.75)] hover:bg-accent text-sm",
        quiet: "bg-transparent text-[rgba(44,56,82,0.75)] hover:bg-accent text-sm font-normal",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-brand underline-offset-4 hover:underline",
      },
      size: {
        sm: "py-[2px] px-2 gap-1 text-[13px] leading-[1.5384615384615385em]",
        default: "py-[5px] px-3 gap-2 text-sm leading-[1.5714285714285714em]",
        lg: "py-2 px-4 gap-2 text-base leading-[1.5em]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
