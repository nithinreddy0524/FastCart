/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'bottom-md': '0 4px 6px -2px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        bauhaus: ['ITCBauhaus', 'sans-serif'],
        sarina: ['Sarina', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },      
      colors: {
        blinkYellow: '#F7C40F',
        blinkGreen: '#00A862',
      },
      zIndex: {
        '100': '100',
        '9999': '9999',
        '10000':'10000',
        '10001':'10001',
        '10002':'10002'
      },
      colors : {
        "primary-200" : "#ffbf00",
        "primary-100" : "#ffc929",
        "secondary-200" : "#00b050",
        "secondary-100" : "#0b1a78"
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        // Add more as needed
      },
      animation: {
        'fade-in': 'fade-in 1s ease-in-out forwards',
        'slide-in-left': 'slide-in-left 0.5s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

