import daisyui from 'daisyui'
import tailwindScrollbar from 'tailwind-scrollbar-hide'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "synthwave", "emerald", "corporate", "forest"]
  },
  theme: {
    extend: {},
  },
  plugins: [daisyui, tailwindScrollbar],
}