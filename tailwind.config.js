/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0071E3",
          bluehover: "#0077ED",
          // Sparing accent color — used only in small, specific spots (like
          // highlight bullets) so it never competes with the primary blue CTAs.
          amber: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "SF Pro Text", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
