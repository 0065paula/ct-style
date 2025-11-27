import * as React from "react"

import { cn } from '@/registry/default/utils/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-[5px] border bg-white px-3 py-[5px] text-[13px] leading-[1.5384615384615385em] text-[#0A0E27] placeholder:text-[rgba(0,21,64,0.3)] transition-colors focus-visible:outline-none disabled:cursor-not-allowed",
          "border-[rgba(172,186,211,0.6)] hover:shadow-[0px_0px_0px_4px_rgba(225,230,241,0.6)] focus-visible:border-[#0080FF] focus-visible:shadow-[0px_0px_0px_4px_rgba(0,136,255,0.16)]",
          "disabled:bg-[rgba(211,218,235,0.6)] disabled:border-[rgba(172,186,211,0.6)] disabled:text-[rgba(44,56,82,0.6)]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

