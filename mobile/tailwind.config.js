/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "inter_100": ["Inter_100Thin"],
        "inter_200": ["Inter_200ExtraLight"],
        "inter_300": ["Inter_300Light"],
        "inter_400": ["Inter_400Regular"],
        "inter_500": ["Inter_500Medium"],
        "inter_600": ["Inter_600SemiBold"],
        "inter_700": ["Inter_700Bold"],
        "inter_800": ["Inter_800ExtraBold"],
        "inter_900": ["Inter_900Black"],
      },
      colors: {
        "primary": "dodgerblue",
        "dark_2": "#121212"
      }
    },
  },
  plugins: [],
}

