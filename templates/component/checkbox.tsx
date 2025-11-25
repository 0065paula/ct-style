import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-[3px] border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      // Unchecked state
      "bg-[#FFFFFF] border-[rgba(107,128,167,0.6)]",
      "hover:border-[#0080FF]",
      // Checked state
      "data-[state=checked]:bg-[#0080FF] data-[state=checked]:border-[#0080FF] data-[state=checked]:text-[#FFFFFF]",
      "data-[state=checked]:hover:bg-[#005ED1] data-[state=checked]:hover:border-[#005ED1]",
      // Disabled state
      "disabled:bg-[rgba(211,218,235,0.6)] disabled:border-[rgba(107,128,167,0.6)]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

