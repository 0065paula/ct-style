import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 rounded-[6px] font-bold",
  {
    variants: {
      variant: {
        default: "bg-[var(--brand)] text-white hover:bg-[rgba(0,128,255,0.9)] text-sm shadow-[0px_1px_2px_0px_rgba(44,56,82,0.18)] focus-visible:shadow-[0px_0px_0px_4px_rgba(0,136,255,0.16)]",
        secondary: "bg-[rgba(0,136,255,0.1)] text-[var(--brand)] hover:bg-[rgba(0,136,255,0.15)] text-sm focus-visible:shadow-[0px_0px_0px_4px_rgba(0,136,255,0.16)]",
        tertiary: "bg-white text-[var(--brand)] hover:bg-[var(--accent)] text-sm focus-visible:shadow-[0px_0px_0px_4px_rgba(0,136,255,0.16)]",
        basic: "bg-white text-[#1D326C] border border-[rgba(172,186,211,0.6)] hover:bg-[var(--accent)] text-sm font-normal shadow-[0px_1px_2px_-1px_rgba(44,56,82,0.18)] focus-visible:border-[#0080FF] focus-visible:shadow-[0px_0px_0px_4px_rgba(0,136,255,0.16)]",
        ontint: "bg-white text-[var(--brand)] hover:bg-[var(--accent)] text-sm font-normal focus-visible:shadow-[0px_0px_0px_4px_rgba(0,136,255,0.16)]",
        accent: "bg-white text-[var(--brand)] border border-[var(--brand)] hover:bg-[var(--accent)] text-sm font-normal shadow-[0px_1px_2px_-1px_rgba(44,56,82,0.18)] focus-visible:border-[#0080FF] focus-visible:shadow-[0px_0px_0px_4px_rgba(0,136,255,0.16)]",
        quietBold: "bg-transparent text-[rgba(44,56,82,0.75)] hover:bg-[var(--accent)] text-sm focus-visible:shadow-[0px_0px_0px_4px_rgba(0,136,255,0.16)]",
        quiet: "bg-transparent text-[rgba(44,56,82,0.75)] hover:bg-[var(--accent)] text-sm font-normal focus-visible:shadow-[0px_0px_0px_4px_rgba(0,136,255,0.16)]",
        destructive: "bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:bg-[rgba(240,72,62,0.9)] focus-visible:shadow-[0px_0px_0px_4px_rgba(0,136,255,0.16)]",
        outline: "border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] focus-visible:border-[#0080FF] focus-visible:shadow-[0px_0px_0px_4px_rgba(0,136,255,0.16)]",
        ghost: "hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] focus-visible:shadow-[0px_0px_0px_4px_rgba(0,136,255,0.16)]",
        link: "text-[var(--brand)] underline-offset-4 hover:underline focus-visible:shadow-[0px_0px_0px_4px_rgba(0,136,255,0.16)]",
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
