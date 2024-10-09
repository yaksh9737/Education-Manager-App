module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  // tailwind.config.js
  darkMode: 'class', // Enables toggling dark mode via a class
  theme: {
    extend: {
      colors: {
        blue: {
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
        },
        red: {
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
        },
        green: {
          500: "#10B981",
          600: "#059669",
        },
        gray: {
          900: "#111827",
          800: "#1F2937",
          700: "#374151",
          600: "#4B5563",
          500: "#6B7280",
          400: "#9CA3AF",
          300: "#D1D5DB",
          100: "#F3F4F6",
          50: "#F9FAFB",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
