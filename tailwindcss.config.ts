/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient":
          'linear-gradient(180deg, rgba(0, 0, 0, 0) 82.52%, #000 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.53) 0%, rgba(0, 0, 0, 0.53) 100%), url("/images/hero-bg.jpg")',
        "download-gradient":
          "linear-gradient(270deg, #FBDDA3 0%, #E3B887 25%, #FBDDA3 50%, #E3B887 75%, #A87740 100%)",
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
