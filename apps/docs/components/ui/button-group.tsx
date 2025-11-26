import * as React from "react"

import { cn } from "@/lib/utils"

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex",
          orientation === "horizontal"
            ? "flex-row"
            : "flex-col",
          orientation === "horizontal" && "[&>*:not(:first-child):not(:last-child)]:rounded-none",
          orientation === "horizontal" && "[&>*:first-child]:rounded-r-none",
          orientation === "horizontal" && "[&>*:last-child]:rounded-l-none",
          orientation === "horizontal" && "[&>*:not(:first-child)]:-ml-px",
          orientation === "vertical" && "[&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:ml-0",
          orientation === "vertical" && "[&>*]:rounded-full",
          className
        )}
        role="group"
        {...props}
      />
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }

