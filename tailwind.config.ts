import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Nunito Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif',' Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol']
    },
  },
  extend: {
    colors: {
      body: '#0f111a',
      navbar: '#31374a'
    }
  },
  plugins: [],
  darkMode: 'class'
} satisfies Config

