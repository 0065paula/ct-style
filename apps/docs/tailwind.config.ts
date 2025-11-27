import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../templates/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0080FF',
          foreground: '#FFFFFF',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: '#F0483E',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'var(--sidebar-background)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
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
      },
      boxShadow: {
        'select-hover': 'var(--select-shadow-hover)',
        'select-focus': 'var(--select-shadow-focus)',
        'select-content': 'var(--select-content-shadow)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

export default config
