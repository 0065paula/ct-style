import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full rounded-[5px] border transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "h-6 px-2 py-[2px] text-xs leading-[1.5em]",
        default: "h-8 px-3 py-[5px] text-[13px] leading-[1.5384615384615385em]",
        lg: "h-10 px-4 py-2 text-sm leading-[1.5714285714285714em]",
      },
      variant: {
        default: "bg-white border-[rgba(172,186,211,0.6)] text-[#0A0E27] placeholder:text-[rgba(0,21,64,0.3)] hover:shadow-[0px_0px_0px_4px_rgba(225,230,241,0.6)] focus-visible:border-[#0080FF] focus-visible:shadow-[0px_0px_0px_4px_rgba(0,136,255,0.16)] disabled:bg-[rgba(211,218,235,0.6)] disabled:border-[rgba(172,186,211,0.6)] disabled:text-[rgba(44,56,82,0.6)]",
        error: "bg-white border-[#F0483E] text-[#0A0E27] placeholder:text-[rgba(0,21,64,0.3)] hover:shadow-[0px_0px_0px_4px_rgba(225,230,241,0.6)] focus-visible:border-[#F0483E] focus-visible:shadow-[0px_0px_0px_4px_rgba(255,74,74,0.16)]",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size, variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }

