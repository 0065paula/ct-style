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
      },
    },
  },
}

