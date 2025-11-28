"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Value
    ref={ref}
    className={cn(
      "line-clamp-1",
      className
    )}
    {...props}
  />
))
SelectValue.displayName = SelectPrimitive.Value.displayName

// SelectTrigger 尺寸变体
const selectTriggerVariants = cva(
  "group flex w-full items-center justify-between gap-2 rounded-[5px] border bg-select-bg-default transition-colors disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        small: "h-6 py-0.5 pl-2 pr-2 text-xs",
        medium: "h-8 py-1.5 pl-3 pr-2 text-sm",
        large: "h-10 py-2 pl-4 pr-2 text-base",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
)

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> &
    VariantProps<typeof selectTriggerVariants>
>(({ className, size, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      selectTriggerVariants({ size }),
      "border-[var(--select-border-default)]",
      "hover:border-[var(--select-border-hover)] hover:shadow-[var(--select-shadow-hover)]",
      "focus:outline-none focus:border-[var(--select-border-focus)] focus:shadow-[var(--select-shadow-focus)]",
      "data-[state=open]:border-[var(--select-border-focus)] data-[state=open]:shadow-[var(--select-shadow-focus)]",
      "data-[placeholder]:[&>span]:!text-[var(--select-text-placeholder)]",
      "[&>span]:text-[var(--select-text)]",
      "disabled:bg-[var(--select-bg-disabled)] disabled:border-[var(--select-border-disabled)] disabled:hover:border-[var(--select-border-disabled)] disabled:hover:shadow-none disabled:focus:border-[var(--select-border-disabled)] disabled:focus:shadow-none",
      "disabled:[&>span]:!text-[var(--select-text-disabled)]",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 shrink-0 text-[var(--select-icon)] transition-all duration-200 group-hover:text-[var(--select-icon-hover)] group-data-[state=open]:rotate-180 group-data-[state=open]:text-[var(--select-icon-hover)] group-disabled:text-[var(--select-icon-disabled)] group-disabled:group-hover:text-[var(--select-icon-disabled)]" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg bg-[var(--select-bg-default)] text-[var(--select-text)] shadow-[var(--select-content-shadow)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1.5",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1 px-2 text-xs leading-[1.5em] text-[var(--select-label-text)]", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center gap-2 rounded py-1 px-2 text-sm leading-[1.5714285714285714em] text-[var(--select-item-text)] outline-none",
      "hover:bg-[var(--select-item-bg-hover)]",
      "focus:bg-[var(--select-item-bg-focus)] focus:text-[var(--select-item-text-focus)]",
      "data-[checked]:bg-[var(--select-item-bg-selected)] data-[checked]:text-[var(--select-item-text-selected)] data-[checked]:gap-[5px]",
      "data-[checked]:hover:bg-[var(--select-item-bg-selected-hover)] data-[checked]:hover:text-[var(--select-item-text-selected)]",
      "data-[checked]:focus:bg-[var(--select-item-bg-selected-focus)] data-[checked]:focus:text-[var(--select-item-text-selected-focus)]",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className="absolute right-2 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-[var(--select-item-icon)]" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
