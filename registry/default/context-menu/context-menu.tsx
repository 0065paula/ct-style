import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from '@/registry/default/utils/utils'

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Group>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Group
    ref={ref}
    className={cn("p-1.5 space-y-0.5", className)}
    {...props}
  />
))
ContextMenuGroup.displayName = ContextMenuPrimitive.Group.displayName

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded py-1 px-2 text-sm leading-[1.5714285714285714em] text-[var(--menu-item-text)] outline-none transition-colors",
      "data-[highlighted]:bg-[var(--menu-item-bg-hover)]",
      "focus:bg-[var(--menu-item-bg-focus)] focus:text-[var(--menu-item-text-focus)]",
      "data-[state=open]:bg-[var(--menu-item-bg-focus)] data-[state=open]:text-[var(--menu-item-text-focus)]",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-lg bg-[var(--popup-bg)] p-1.5 shadow-[var(--popup-shadow)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-lg bg-[var(--popup-bg)] p-1.5 shadow-[var(--popup-shadow)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded py-1 px-2 text-sm leading-[1.5714285714285714em] text-[var(--menu-item-text)] outline-none transition-colors my-0.5",
      "data-[highlighted]:bg-[var(--menu-item-bg-hover)]",
      "focus:bg-[var(--menu-item-bg-focus)] focus:text-[var(--menu-item-text-focus)]",
      "data-[checked]:bg-[var(--menu-item-bg-selected)] data-[checked]:text-[var(--menu-item-text-selected)]",
      "data-[checked]:hover:bg-[var(--menu-item-bg-selected-hover)] data-[checked]:hover:text-[var(--menu-item-text-selected)]",
      "data-[checked]:focus:bg-[var(--menu-item-bg-selected-focus)] data-[checked]:focus:text-[var(--menu-item-text-selected-focus)]",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded py-1 pl-8 pr-2 text-sm leading-[1.5714285714285714em] text-[var(--menu-item-text)] outline-none transition-colors",
      "data-[highlighted]:bg-[var(--menu-item-bg-hover)]",
      "focus:bg-[var(--menu-item-bg-focus)] focus:text-[var(--menu-item-text-focus)]",
      "data-[checked]:bg-[var(--menu-item-bg-selected)] data-[checked]:text-[var(--menu-item-text-selected)]",
      "data-[checked]:hover:bg-[var(--menu-item-bg-selected-hover)] data-[checked]:hover:text-[var(--menu-item-text-selected)]",
      "data-[checked]:focus:bg-[var(--menu-item-bg-selected-focus)] data-[checked]:focus:text-[var(--menu-item-text-selected-focus)]",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded py-1 pl-8 pr-2 text-sm leading-[1.5714285714285714em] text-[var(--menu-item-text)] outline-none transition-colors",
      "data-[highlighted]:bg-[var(--menu-item-bg-hover)]",
      "focus:bg-[var(--menu-item-bg-focus)] focus:text-[var(--menu-item-text-focus)]",
      "data-[checked]:bg-[var(--menu-item-bg-selected)] data-[checked]:text-[var(--menu-item-text-selected)]",
      "data-[checked]:hover:bg-[var(--menu-item-bg-selected-hover)] data-[checked]:hover:text-[var(--menu-item-text-selected)]",
      "data-[checked]:focus:bg-[var(--menu-item-bg-selected-focus)] data-[checked]:focus:text-[var(--menu-item-text-selected-focus)]",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1 text-xs leading-[1.5em] text-[var(--menu-label-text)] no-underline",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("h-px bg-[var(--menu-separator-color)] my-1.5", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}

