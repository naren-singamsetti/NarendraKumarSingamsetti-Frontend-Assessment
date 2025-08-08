/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',    // iPhone 14/15 standard
        'sm': '430px',    // iPhone 14/15 Pro Max
        'md': '768px',    // Tablet
        'lg': '1024px',   // Desktop
        'xl': '1280px',   // Large Desktop
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
