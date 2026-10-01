/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        brand: {
          DEFAULT: 'var(--brand-color, #4f46e5)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Courier New', 'Courier', 'monospace'],
        sinhala: ['"Noto Sans Sinhala"', 'system-ui', 'sans-serif'],
        gemunu: ['"Gemunu Libre"', 'system-ui', 'sans-serif'],
        abhaya: ['"Abhaya Libre"', 'serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
