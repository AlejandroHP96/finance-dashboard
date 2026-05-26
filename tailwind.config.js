/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      colors: {
        bg:      "#0f0f13",
        surface: "#16161d",
        card:    "#1c1c26",
        border:  "#2a2a38",
        muted:   "#6b6b80",
        text:    "#e8e8f0",
        income:  "#4ade80",
        expense: "#f87171",
        savings: "#60a5fa",
        accent:  "#a78bfa",
      },
    },
  },
  plugins: [],
}
