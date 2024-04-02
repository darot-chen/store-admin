// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  plugins: [],
  theme: {
    fontSize: {
      "2xs": "0.6rem",
      ...defaultTheme.fontSize,
    },
    extend: {
      colors: {
        foreground: {
          light: "#f3f4f9",
        },
        brand: {
          primary: "#E02323",
          secondary: "#CBEEF3",
          lighter: "#FF5151",
          darker: "#FF0000",
        },
        dark: {
          secondary: "#7A7B9C",
        },
      },
    },
  },
};
