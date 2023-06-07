/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "tig-dark-gray": "#3b3a38",
        "tig-light-gray": "#615f58",
      },
    },
  },
  plugins: [],
};
