/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        primary: {
          DEFAULT: "#FF6347", // Tomato red for the timer
          dark: "#D1483B"
        },
        background: {
          light: "#F9F5F1", // Warm light background
          dark: "#292524", // Dark warm background
        },
        accent: {
          light: "#DDBEA9", // Warm wood accent
          dark: "#8B7355", // Dark wood accent
        }
      },
      fontFamily: {
        sans: ['var(--font-quicksand)', 'sans-serif'],
        fun: ['var(--font-comic)', 'cursive'],
      },
      animation: {
        "spin": "spin 6s linear infinite",
        "spin-slow": "spin 10s linear infinite",
        "spin-reverse": "spin-reverse 4s linear infinite",
        "bounce-slow": "bounce 3s infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      }
    },
  },
  plugins: [],
}

