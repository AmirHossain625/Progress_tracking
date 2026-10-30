/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        slate: {
          850: '#151f32',
          950: '#070d19',
        },
        glass: {
          card: 'rgba(255, 255, 255, 0.45)',
          'card-hover': 'rgba(255, 255, 255, 0.58)',
          'card-dark': 'rgba(15, 23, 42, 0.55)',
          border: 'rgba(255, 255, 255, 0.5)',
          'border-strong': 'rgba(255, 255, 255, 0.75)',
          glow: 'rgba(99, 102, 241, 0.25)',
        }
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
      },
      boxShadow: {
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'glass-md': '0 8px 32px 0 rgba(31, 38, 135, 0.08), 0 2px 6px 0 rgba(0, 0, 0, 0.04)',
        'glass-lg': '0 16px 48px 0 rgba(31, 38, 135, 0.12), 0 4px 12px 0 rgba(0, 0, 0, 0.06)',
        'glass-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.8), 0 4px 20px 0 rgba(31, 38, 135, 0.07)',
        'glow-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.4)',
        'glow-green': '0 0 25px -5px rgba(34, 197, 94, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
