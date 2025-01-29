/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "host-grotesk": ["Host Grotesk, sans-serif"],
        "poppins": ["Poppins, sans-serif"],
      },
      colors: {
        primary: '#152128',
        secondary: '#1D7874',
        accent: '#A9C745',
        success: '#6cdd97',
        danger: '#F03A47',
        warn: '#E78C36',
        'sufpay-gray': '#727F87',
        'sufpay-black': '#0A090B'
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
