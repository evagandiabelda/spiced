import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './styles/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        nohemi: ['Nohemi', 'sans-serif'],
        inter: ['InterVariable', 'sans-serif'],
      },
      screens: {
        /* Los valores equivalen al "min-width": */
        mobile: '0px',
        tablet: '640px',
        laptop: '1024px',
      }
    },
  },
  plugins: [],
} satisfies Config;
