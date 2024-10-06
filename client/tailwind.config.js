/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      maxWidth: {
        maxWidth: '730px',
      },
      colors: {
        '01': '#7C5DFA',
        '02': '#9277FF',
        '03': '#1E2139',
        '04': '#252945',
        '05': '#DFE3FA',
        '06': '#888EB0',

        '08': '#0C0E16',

        appBackground: 'rgb(var(--app-background))',
        formBackground: 'rgb(var(--form-background))',
        formLabel: 'rgb(var(--form-label))',
        deleteBtnBG: 'rgb(var(--deleteBtnBG))',
        purpleBtnBG: 'rgb(var(--purpleBtnBG))',
        navbarBg: 'rgb(var(--navbarBg))',
        h2Text: 'rgb(var(--h2Text))',
        pText: 'rgb(var(--pText))',
        inputBg: 'rgb(var(--inputBg))',
        itemsBg: 'rgb(var(--itemsBg))',
        grandTotal: 'rgb(var(--grandTotal))',
        draftBg: 'rgb(var(--draftBg))',
        draftText: 'rgb(var(--draftText))',
        h1Text: 'rgb(var(--h1Text))',
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
          DEFAULT: 'hsl(var(--destructive))',
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
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
