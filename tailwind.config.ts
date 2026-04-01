import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3fbf8",
          100: "#d9f3ea",
          500: "#1d8f72",
          700: "#166a55",
          900: "#0f3f34"
        }
      }
    }
  },
  plugins: [],
};

export default config;
