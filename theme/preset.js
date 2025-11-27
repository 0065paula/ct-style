/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--brand)",
          foreground: "var(--brand-foreground)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        'input-border': {
          default: 'var(--input-border-default)',
          focus: 'var(--input-border-focus)',
          error: 'var(--input-border-error)',
          disabled: 'var(--input-border-disabled)',
        },
        'input-bg': {
          default: 'var(--input-bg-default)',
          disabled: 'var(--input-bg-disabled)',
        },
        'input-text': {
          DEFAULT: 'var(--input-text)',
          disabled: 'var(--input-text-disabled)',
          placeholder: 'var(--input-placeholder)',
        },
        'select-border': {
          default: 'var(--select-border-default)',
          hover: 'var(--select-border-hover)',
          focus: 'var(--select-border-focus)',
          disabled: 'var(--select-border-disabled)',
        },
        'select-bg': {
          default: 'var(--select-bg-default)',
          disabled: 'var(--select-bg-disabled)',
        },
        'select-text': {
          DEFAULT: 'var(--select-text)',
          placeholder: 'var(--select-text-placeholder)',
          disabled: 'var(--select-text-disabled)',
        },
        'select-icon': {
          DEFAULT: 'var(--select-icon)',
          hover: 'var(--select-icon-hover)',
          disabled: 'var(--select-icon-disabled)',
        },
        'select-label': 'var(--select-label-text)',
        'select-item-text': {
          DEFAULT: 'var(--select-item-text)',
          focus: 'var(--select-item-text-focus)',
          selected: 'var(--select-item-text-selected)',
          'selected-focus': 'var(--select-item-text-selected-focus)',
        },
        'select-item-bg': {
          hover: 'var(--select-item-bg-hover)',
          focus: 'var(--select-item-bg-focus)',
          selected: 'var(--select-item-bg-selected)',
          'selected-hover': 'var(--select-item-bg-selected-hover)',
          'selected-focus': 'var(--select-item-bg-selected-focus)',
        },
        'select-item-icon': 'var(--select-item-icon)',
        'dropdown-menu': {
          bg: 'var(--dropdown-menu-bg)',
          item: {
            text: {
              DEFAULT: 'var(--dropdown-menu-item-text)',
              focus: 'var(--dropdown-menu-item-text-focus)',
              selected: 'var(--dropdown-menu-item-text-selected)',
              'selected-focus': 'var(--dropdown-menu-item-text-selected-focus)',
            },
            bg: {
              hover: 'var(--dropdown-menu-item-bg-hover)',
              focus: 'var(--dropdown-menu-item-bg-focus)',
              selected: 'var(--dropdown-menu-item-bg-selected)',
              'selected-hover': 'var(--dropdown-menu-item-bg-selected-hover)',
              'selected-focus': 'var(--dropdown-menu-item-bg-selected-focus)',
            },
          },
          label: 'var(--dropdown-menu-label-text)',
          separator: 'var(--dropdown-menu-separator-color)',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        'button': 'var(--button-shadow)',
        'input-focus': 'var(--input-focus-shadow)',
        'input-focus-error': 'var(--input-focus-shadow-error)',
        'input-hover': 'var(--input-hover-shadow)',
        'select-hover': 'var(--select-shadow-hover)',
        'select-focus': 'var(--select-shadow-focus)',
        'select-content': 'var(--select-content-shadow)',
        'dropdown-menu': 'var(--dropdown-menu-shadow)',
      },
    },
  },
}

