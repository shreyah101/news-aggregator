/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        editorial: ['Newsreader', 'Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          50: '#FDF6F2',
          100: '#FAECE5',
          200: '#F5D6C6',
          300: '#EEB79F',
          400: '#E59578',
          500: '#E07A5F',
          600: '#D06447',
          700: '#B44B30',
          800: '#943C25',
          900: '#7A321E',
        },
        cozy: {
          paper: '#FAF6F0',
          cream: '#F5EFE6',
          card: '#FFFFFF',
          border: '#EBE3D7',
          'border-dark': '#DCD2C2',
          ink: '#2B231D',
          cinnamon: '#6E5D53',
          sand: '#A69689',
          terracotta: '#E07A5F',
          'terracotta-dark': '#C65D42',
          'terracotta-light': '#FDF6F2',
          sage: '#588157',
          'sage-dark': '#3A5A40',
          'sage-light': '#F0F5F1',
          amber: '#E7A93B',
          'amber-light': '#FDF8EB',
        }
      },
      boxShadow: {
        'cozy-sm': '0 2px 6px -1px rgba(60, 42, 33, 0.05), 0 1px 3px rgba(60, 42, 33, 0.04)',
        'cozy-md': '0 8px 24px -4px rgba(60, 42, 33, 0.08), 0 2px 6px -1px rgba(60, 42, 33, 0.04)',
        'cozy-lg': '0 16px 36px -6px rgba(60, 42, 33, 0.12), 0 4px 12px -2px rgba(60, 42, 33, 0.05)',
        'cozy-ribbon': '0 4px 12px rgba(224, 122, 95, 0.35)',
      }
    },
  },
  plugins: [],
}
