import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['var(--font-heading)', 'sans-serif'],
        inter: ['var(--font-body)', 'sans-serif'],
        display: ['var(--font-heading)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        sans: ['var(--font-body)', 'sans-serif'],
        serif: ['var(--font-heading)', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['80px', { lineHeight: '1', fontWeight: '700', letterSpacing: '-0.03em' }],
        'display-lg': ['72px', { lineHeight: '1.05', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-md': ['64px', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'heading-xl': ['56px', { lineHeight: '1.15', fontWeight: '600', letterSpacing: '-0.01em' }],
        'heading-lg': ['48px', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.01em' }],
        'heading-md': ['40px', { lineHeight: '1.25', fontWeight: '600' }],
        'heading-sm': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-xl': ['20px', { lineHeight: '1.8', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '1.75', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.7', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
      },
      colors: {
        /* ═══════════════════════════════════════════════
           STYLESYSTEM — 5 rôles en OKLCH (Juin 2026)
           Alignement Deloitte : blanc dominant, vert CTA,
           or accent, noir texte.
           ═══════════════════════════════════════════════ */

        // ── BACKGROUND — Blanc dominant, pages & sections ──
        background: {
          50:  'oklch(var(--background-50) / <alpha-value>)',
          100: 'oklch(var(--background-100) / <alpha-value>)',
          200: 'oklch(var(--background-200) / <alpha-value>)',
          300: 'oklch(var(--background-300) / <alpha-value>)',
          400: 'oklch(var(--background-400) / <alpha-value>)',
          500: 'oklch(var(--background-500) / <alpha-value>)',
          600: 'oklch(var(--background-600) / <alpha-value>)',
          700: 'oklch(var(--background-700) / <alpha-value>)',
          800: 'oklch(var(--background-800) / <alpha-value>)',
          900: 'oklch(var(--background-900) / <alpha-value>)',
          950: 'oklch(var(--background-950) / <alpha-value>)',
        },

        // ── PRIMARY — Vert Deloitte, CTA & brand ──
        primary: {
          50:  'oklch(var(--primary-50) / <alpha-value>)',
          100: 'oklch(var(--primary-100) / <alpha-value>)',
          200: 'oklch(var(--primary-200) / <alpha-value>)',
          300: 'oklch(var(--primary-300) / <alpha-value>)',
          400: 'oklch(var(--primary-400) / <alpha-value>)',
          500: 'oklch(var(--primary-500) / <alpha-value>)',
          600: 'oklch(var(--primary-600) / <alpha-value>)',
          700: 'oklch(var(--primary-700) / <alpha-value>)',
          800: 'oklch(var(--primary-800) / <alpha-value>)',
          900: 'oklch(var(--primary-900) / <alpha-value>)',
          950: 'oklch(var(--primary-950) / <alpha-value>)',
        },

        // ── ACCENT — Or institutionnel KHEPRA ──
        accent: {
          50:  'oklch(var(--accent-50) / <alpha-value>)',
          100: 'oklch(var(--accent-100) / <alpha-value>)',
          200: 'oklch(var(--accent-200) / <alpha-value>)',
          300: 'oklch(var(--accent-300) / <alpha-value>)',
          400: 'oklch(var(--accent-400) / <alpha-value>)',
          500: 'oklch(var(--accent-500) / <alpha-value>)',
          600: 'oklch(var(--accent-600) / <alpha-value>)',
          700: 'oklch(var(--accent-700) / <alpha-value>)',
          800: 'oklch(var(--accent-800) / <alpha-value>)',
          900: 'oklch(var(--accent-900) / <alpha-value>)',
          950: 'oklch(var(--accent-950) / <alpha-value>)',
        },

        // ── SECONDARY — Neutre UI support ──
        secondary: {
          50:  'oklch(var(--secondary-50) / <alpha-value>)',
          100: 'oklch(var(--secondary-100) / <alpha-value>)',
          200: 'oklch(var(--secondary-200) / <alpha-value>)',
          300: 'oklch(var(--secondary-300) / <alpha-value>)',
          400: 'oklch(var(--secondary-400) / <alpha-value>)',
          500: 'oklch(var(--secondary-500) / <alpha-value>)',
          600: 'oklch(var(--secondary-600) / <alpha-value>)',
          700: 'oklch(var(--secondary-700) / <alpha-value>)',
          800: 'oklch(var(--secondary-800) / <alpha-value>)',
          900: 'oklch(var(--secondary-900) / <alpha-value>)',
          950: 'oklch(var(--secondary-950) / <alpha-value>)',
        },

        // ── FOREGROUND — Noir texte ──
        foreground: {
          50:  'oklch(var(--foreground-50) / <alpha-value>)',
          100: 'oklch(var(--foreground-100) / <alpha-value>)',
          200: 'oklch(var(--foreground-200) / <alpha-value>)',
          300: 'oklch(var(--foreground-300) / <alpha-value>)',
          400: 'oklch(var(--foreground-400) / <alpha-value>)',
          500: 'oklch(var(--foreground-500) / <alpha-value>)',
          600: 'oklch(var(--foreground-600) / <alpha-value>)',
          700: 'oklch(var(--foreground-700) / <alpha-value>)',
          800: 'oklch(var(--foreground-800) / <alpha-value>)',
          900: 'oklch(var(--foreground-900) / <alpha-value>)',
          950: 'oklch(var(--foreground-950) / <alpha-value>)',
        },

        /* ═══════════════════════════════════════════════
           ALIAS — Compatibilité descendante
           ═══════════════════════════════════════════════ */

        // ── neutral → background (pages, sections) ──
        neutral: {
          50:  'oklch(var(--background-50) / <alpha-value>)',
          100: 'oklch(var(--background-100) / <alpha-value>)',
          200: 'oklch(var(--background-200) / <alpha-value>)',
          300: 'oklch(var(--background-300) / <alpha-value>)',
          400: 'oklch(var(--background-400) / <alpha-value>)',
          500: 'oklch(var(--background-500) / <alpha-value>)',
          600: 'oklch(var(--background-600) / <alpha-value>)',
          700: 'oklch(var(--background-700) / <alpha-value>)',
          800: 'oklch(var(--background-800) / <alpha-value>)',
          900: 'oklch(var(--background-900) / <alpha-value>)',
          950: 'oklch(var(--background-950) / <alpha-value>)',
        },

        // ── navy → foreground (noir texte) ──
        navy: {
          50:  'oklch(var(--foreground-50) / <alpha-value>)',
          100: 'oklch(var(--foreground-100) / <alpha-value>)',
          200: 'oklch(var(--foreground-200) / <alpha-value>)',
          300: 'oklch(var(--foreground-300) / <alpha-value>)',
          400: 'oklch(var(--foreground-400) / <alpha-value>)',
          500: 'oklch(var(--foreground-500) / <alpha-value>)',
          600: 'oklch(var(--foreground-600) / <alpha-value>)',
          700: 'oklch(var(--foreground-700) / <alpha-value>)',
          800: 'oklch(var(--foreground-800) / <alpha-value>)',
          900: 'oklch(var(--foreground-900) / <alpha-value>)',
          950: 'oklch(var(--foreground-950) / <alpha-value>)',
        },

        // ── brand → foreground (noir institutionnel) ──
        brand: {
          50:  'oklch(var(--foreground-50) / <alpha-value>)',
          100: 'oklch(var(--foreground-100) / <alpha-value>)',
          200: 'oklch(var(--foreground-200) / <alpha-value>)',
          300: 'oklch(var(--foreground-300) / <alpha-value>)',
          400: 'oklch(var(--foreground-400) / <alpha-value>)',
          500: 'oklch(var(--foreground-500) / <alpha-value>)',
          600: 'oklch(var(--foreground-600) / <alpha-value>)',
          700: 'oklch(var(--foreground-700) / <alpha-value>)',
          800: 'oklch(var(--foreground-800) / <alpha-value>)',
          900: 'oklch(var(--foreground-900) / <alpha-value>)',
          950: 'oklch(var(--foreground-950) / <alpha-value>)',
        },

        // ── deloitte → primary (vert institutionnel) ──
        deloitte: {
          50:  'oklch(var(--primary-50) / <alpha-value>)',
          100: 'oklch(var(--primary-100) / <alpha-value>)',
          200: 'oklch(var(--primary-200) / <alpha-value>)',
          300: 'oklch(var(--primary-300) / <alpha-value>)',
          400: 'oklch(var(--primary-400) / <alpha-value>)',
          500: 'oklch(var(--primary-500) / <alpha-value>)',
          600: 'oklch(var(--primary-600) / <alpha-value>)',
          700: 'oklch(var(--primary-700) / <alpha-value>)',
          800: 'oklch(var(--primary-800) / <alpha-value>)',
          900: 'oklch(var(--primary-900) / <alpha-value>)',
          950: 'oklch(var(--primary-950) / <alpha-value>)',
        },

        // ── gold → accent (OR RESTAURÉ — n'était plus que du vert !) ──
        gold: {
          50:  'oklch(var(--accent-50) / <alpha-value>)',
          100: 'oklch(var(--accent-100) / <alpha-value>)',
          200: 'oklch(var(--accent-200) / <alpha-value>)',
          300: 'oklch(var(--accent-300) / <alpha-value>)',
          400: 'oklch(var(--accent-400) / <alpha-value>)',
          500: 'oklch(var(--accent-500) / <alpha-value>)',
          600: 'oklch(var(--accent-600) / <alpha-value>)',
          700: 'oklch(var(--accent-700) / <alpha-value>)',
          800: 'oklch(var(--accent-800) / <alpha-value>)',
          900: 'oklch(var(--accent-900) / <alpha-value>)',
          950: 'oklch(var(--accent-950) / <alpha-value>)',
        },

        // ── strategic → primary (vert stratégique) ──
        strategic: {
          50:  'oklch(var(--primary-50) / <alpha-value>)',
          100: 'oklch(var(--primary-100) / <alpha-value>)',
          200: 'oklch(var(--primary-200) / <alpha-value>)',
          300: 'oklch(var(--primary-300) / <alpha-value>)',
          400: 'oklch(var(--primary-400) / <alpha-value>)',
          500: 'oklch(var(--primary-500) / <alpha-value>)',
          600: 'oklch(var(--primary-600) / <alpha-value>)',
          700: 'oklch(var(--primary-700) / <alpha-value>)',
          800: 'oklch(var(--primary-800) / <alpha-value>)',
          900: 'oklch(var(--primary-900) / <alpha-value>)',
          950: 'oklch(var(--primary-950) / <alpha-value>)',
        },

        // ── brown — earth tones africains (inchangé) ──
        brown: {
          50:  '#fdf8f3',
          100: '#f9ede0',
          200: '#f2d9bc',
          300: '#e8be8e',
          400: '#dc9e5e',
          500: '#c97c35',
          600: '#b06228',
          700: '#8f4d20',
          800: '#713c1b',
          900: '#572e15',
          950: '#361c0c',
        },
      },
      spacing: {
        'phi': '1.618rem',
        'phi-sm': '0.618rem',
        'phi-lg': '2.618rem',
        'phi-xl': '4.236rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      boxShadow: {
        'premium': '0 1px 4px rgba(10, 10, 10, 0.04), 0 1px 2px rgba(10, 10, 10, 0.02)',
        'premium-hover': '0 8px 24px rgba(10, 10, 10, 0.08), 0 2px 8px rgba(10, 10, 10, 0.04)',
        'elevated': '0 16px 40px rgba(10, 10, 10, 0.08), 0 4px 12px rgba(10, 10, 10, 0.04)',
        'subtle': '0 1px 2px rgba(10, 10, 10, 0.03)',
        'institutional': '0 4px 20px rgba(10, 10, 10, 0.04), 0 2px 6px rgba(10, 10, 10, 0.02)',
        'glow-deloitte': '0 0 24px rgba(107, 155, 31, 0.15)',
        'glow-gold': '0 0 24px rgba(196, 162, 53, 0.20)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'elegant': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-premium': 'linear-gradient(135deg, #0a0a0a 0%, #161616 50%, #262626 100%)',
        'gradient-deloitte': 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)',
        'gradient-gold': 'linear-gradient(135deg, #c4a235 0%, #e8c547 50%, #d4a82a 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;