import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "Manrope", "sans-serif"],
        display: ["var(--font-bodoni)", "Bodoni Moda", "serif"],
      },
      colors: {
        ink: "#f7f6f3",
        jet: "#121214",
        surface: "#ffffff",
        "surface-raised": "#f1f0ec",
        text: "#1a1a1c",
        muted: "#6b6560",
        accent: "#3d4a5c",
        champagne: "#a8997e",
      },
    },
  },
};

export default config;
