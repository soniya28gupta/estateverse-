/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#0a0f14',
          900: '#101820',
          800: '#182430',
          700: '#233242',
        },
        ivory: {
          50: '#FFFFFF',
          100: '#FDFCF9',
          200: '#F7F5EF',
          300: '#EFECE2',
        },
        stone: {
          100: '#EFECE6',
          200: '#D9D5CC',
          300: '#C2BCB0',
          400: '#A49D8E',
        },
        gold: {
          100: '#F5EEDB',
          200: '#E9DCBC',
          300: '#DBC38C',
          400: '#C6A76B',
          500: '#AD8D4F',
          600: '#8C6F34',
        },
        sage: {
          100: '#E4EAE1',
          200: '#CCD7C7',
          300: '#A7B7A1',
          400: '#82917B',
          500: '#677561',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Cinzel"', 'serif']
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
