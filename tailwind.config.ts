import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Livales brand colors (from the logo). Saturated green/rose are for the
        // logo, illustrations and small accents only; section backgrounds use
        // the soft tints. Flat colour, never gradients.
        ink: "#122023",
        livales: {
          green: "#2ecc40",
          "green-deep": "#168a2a", // green for text on white
          "green-soft": "#e6f5e3", // section background
          rose: "#f07c8f",
          "rose-soft": "#fce8eb", // section background
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // The page's one orchestrated motion: the dot settles into the L's embrace.
        "embrace-dot": {
          "0%": { transform: "translate(34px, -46px) scale(0.55)", opacity: "0" },
          "35%": { opacity: "1" },
          "75%": { transform: "translate(-3px, 3px) scale(1.04)" },
          "100%": { transform: "none", opacity: "1" },
        },
        "embrace-arm": {
          from: { transform: "scaleX(0.38)" },
          to: { transform: "none" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "embrace-dot": "embrace-dot 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.35s both",
        "embrace-arm": "embrace-arm 0.7s cubic-bezier(0.3, 0.7, 0.2, 1) 0.9s both",
      },
      fontFamily: {
        sans: ["Figtree", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Unbounded", "Figtree", "ui-sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
