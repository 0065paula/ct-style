import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-4 w-7 rounded-[8px]",
        default: "h-6 w-11 rounded-[12px]",
        lg: "h-8 w-14 rounded-[16px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-[#FFFFFF] ring-0 transition-transform",
  {
    variants: {
      size: {
        sm: "h-[14px] w-[14px] shadow-[0px_1px_8px_0px_rgba(0,0,0,0.2)] data-[state=checked]:translate-x-[15px] data-[state=unchecked]:translate-x-[1px]",
        default: "h-5 w-5 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.2)] data-[state=checked]:translate-x-[21px] data-[state=unchecked]:translate-x-[2px]",
        lg: "h-[26px] w-[26px] shadow-[0px_3px_16px_0px_rgba(0,0,0,0.2)] data-[state=checked]:translate-x-[27px] data-[state=unchecked]:translate-x-[3px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      switchVariants({ size }),
      // Unchecked state
      "bg-[rgba(172,186,211,0.6)]",
      "hover:bg-[rgba(107,128,167,0.6)]",
      // Checked state
      "data-[state=checked]:bg-[#00BA5D]",
      "data-[state=checked]:hover:bg-[#008F4C]",
      // Disabled state
      "disabled:bg-[rgba(192,203,224,0.6)]",
      "disabled:data-[state=checked]:bg-[#00BA5D]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(thumbVariants({ size }))}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

