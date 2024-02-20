/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      nav2: "#232f3e",
      nav1: "#0f1111"
    },
  },
  plugins: [require("flowbite/plugin")],
};
