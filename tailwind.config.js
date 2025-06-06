/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "bg-white",
    "bg-neutral-900",
    "bg-red-600",
    "bg-orange-600",
    "bg-amber-500",
    "bg-green-600",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-300",
    "bg-yellow-500",
    "bg-blue-600",
    "bg-yellow-600",
    "bg-pink-500",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "14/15": "14 / 15", // Custom aspect ratio for 280px width and 300px height
      },
      willChange: {
        opacity: "opacity",
        transform: "transform",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
