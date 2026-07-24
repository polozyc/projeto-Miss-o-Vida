/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1B4332",
          dark: "#0E2A20",
          light: "#2D6A4F"
        },
        marigold: {
          DEFAULT: "#F2A93B",
          light: "#FBCE87",
          dark: "#D68C1F"
        },
        coral: {
          DEFAULT: "#E8604C",
          dark: "#C94530"
        },
        cream: "#FBF7EF",
        ink: "#1F2421"
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"]
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(27,67,50,0.06) 1px, transparent 0)"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        ripple: {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" }
        }
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-out both",
        ripple: "ripple 2.2s ease-out infinite"
      }
    }
  },
  plugins: []
};
