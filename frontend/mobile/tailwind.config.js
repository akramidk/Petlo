/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/providers/**/*.{js,jsx,ts,tsx}",
    "./src/utils/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "chillax-bold": "ChillaxBold",
        a100: ["IBMPlexSansArabic_100Thin"],
        a200: ["IBMPlexSansArabic_200ExtraLight"],
        a300: ["IBMPlexSansArabic_300Light"],
        a400: ["IBMPlexSansArabic_400Regular"],
        a500: ["IBMPlexSansArabic_500Medium"],
        a600: ["IBMPlexSansArabic_600SemiBold"],
        a700: ["IBMPlexSansArabic_700Bold"],
        e200: ["Manrope_200ExtraLight"],
        e300: ["Manrope_300Light"],
        e400: ["Manrope_400Regular"],
        e500: ["Manrope_500Medium"],
        e600: ["Manrope_600SemiBold"],
        e700: ["Manrope_700Bold"],
        e800: ["Manrope_800ExtraBold"],
      },
    },
  },
  plugins: [],
};
