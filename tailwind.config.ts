import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      colors: {
        transparent: 'transparent',
        // current: 'currentColor',
        'primary': '#F8FAFC',
        'primary-dark':'#E2E8F0',
        'primary-text': '#334155',
        'dark-box': '#64748B0D',
        'tbl-head-text':'#64748B'
      },
      borderWidth: {
        DEFAULT: '1px',
        '12':'1.5rem'      }
    },
  },
  plugins: [],
};
export default config;
