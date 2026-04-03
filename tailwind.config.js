/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        violet: { DEFAULT: '#7c3aed', light: '#8b5cf6', dark: '#6d28d9' },
        cyan: { DEFAULT: '#06b6d4', light: '#22d3ee', dark: '#0891b2' },
        bg: { primary: '#0a0a0f', secondary: '#0f0f1a' },
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
};
