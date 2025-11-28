import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from '@/registry/default/utils/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/registry/default/command/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/registry/default/popover/popover'

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

// ComboboxTrigger 尺寸变体
const comboboxTriggerVariants = cva(
  "group flex items-center justify-between gap-2 rounded-[5px] border bg-[var(--select-bg-default)] transition-colors disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        small: "h-6 w-[180px] py-0.5 pl-2 pr-2 text-xs",
        medium: "h-8 w-[240px] py-1.5 pl-3 pr-2 text-sm",
        large: "h-10 w-[280px] py-2 pl-4 pr-2 text-base",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
)

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  size?: VariantProps<typeof comboboxTriggerVariants>["size"]
  className?: string
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No option found.",
  disabled = false,
  size = "medium",
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const hasValue = !!value
  const displayText = value
    ? options.find((option) => option.value === value)?.label
    : placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          {...(!hasValue && { "data-placeholder": true })}
          className={cn(
            comboboxTriggerVariants({ size }),
            "border-[var(--select-border-default)]",
            "hover:border-[var(--select-border-hover)] hover:shadow-[var(--select-shadow-hover)]",
            "focus:outline-none focus:border-[var(--select-border-focus)] focus:shadow-[var(--select-shadow-focus)]",
            "data-[state=open]:border-[var(--select-border-focus)] data-[state=open]:shadow-[var(--select-shadow-focus)]",
            "disabled:bg-[var(--select-bg-disabled)] disabled:border-[var(--select-border-disabled)] disabled:hover:border-[var(--select-border-disabled)] disabled:hover:shadow-none disabled:focus:border-[var(--select-border-disabled)] disabled:focus:shadow-none",
            className
          )}
          data-state={open ? "open" : "closed"}
        >
          <span className={cn(
            "line-clamp-1 flex-1 text-left",
            !hasValue && "text-[var(--select-text-placeholder)]",
            hasValue && "text-[var(--select-text)]",
            "disabled:text-[var(--select-text-disabled)]"
          )}>{displayText}</span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-[var(--select-icon)] transition-all duration-200 group-hover:text-[var(--select-icon-hover)] group-data-[state=open]:rotate-180 group-data-[state=open]:text-[var(--select-icon-hover)] group-disabled:text-[var(--select-icon-disabled)] group-disabled:group-hover:text-[var(--select-icon-disabled)]" />
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className={cn(
          "p-0",
          size === "small" && "w-[180px]",
          size === "medium" && "w-[240px]",
          size === "large" && "w-[280px]"
        )}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  keywords={[option.value, option.label]}
                  disabled={option.disabled}
                  aria-selected={value === option.value}
                  onSelect={() => {
                    if (!option.disabled) {
                      onValueChange?.(option.value === value ? "" : option.value)
                      setOpen(false)
                    }
                  }}
                >
                  {option.label}
                  <span className="absolute right-2 flex h-4 w-4 items-center justify-center">
                    <Check
                      className={cn(
                        "h-4 w-4 text-[var(--menu-item-icon)]",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

