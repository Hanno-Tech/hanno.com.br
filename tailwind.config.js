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
        'hanno-purple': '#6C00E0',
        'hanno-text': '#350066',
        'hanno-green': '#C5F700',
      },
      backgroundImage: {
        'hanno-gradient': 'linear-gradient(135deg, #6C00E0 0%, #350066 100%)',
      },
      fontFamily: {
        'noto-sans': ['Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 