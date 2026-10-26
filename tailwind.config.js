/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          bg: '#FFFFFF',
          surface: '#F7F8FA',
          card: '#FFFFFF',
          dark: '#17191C',
          charcoal: '#22252A',
          muted: '#6B7280',
          subtle: '#9CA3AF',
          border: '#E7E9ED',
          borderHover: '#D3D6DC',
          gold: '#B89558',
          goldHover: '#967541',
          goldLight: '#F5EEDB',
          goldSubtle: '#F9F5EC',
          goldMuted: '#DFC69A',
        },
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
          50: '#FAF6EE',
          100: '#F5EEDB',
          200: '#E9DCBC',
          300: '#DBC38C',
          400: '#B89558',
          500: '#967541',
          600: '#7E6133',
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
        display: ['"Cinzel"', '"Playfair Display"', 'serif']
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -1px rgba(23, 25, 28, 0.04), 0 1px 3px 0 rgba(23, 25, 28, 0.02)',
        'soft': '0 8px 24px -4px rgba(23, 25, 28, 0.06), 0 2px 6px -1px rgba(23, 25, 28, 0.03)',
        'soft-xl': '0 20px 40px -8px rgba(23, 25, 28, 0.08), 0 4px 12px -2px rgba(23, 25, 28, 0.03)',
        'gold-glow': '0 10px 30px -5px rgba(184, 149, 88, 0.25)',
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
