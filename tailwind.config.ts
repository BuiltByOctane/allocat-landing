import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ["Hanken Grotesk", "system-ui", "sans-serif"],
        display: ["Bricolage Grotesque", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        body: ["Hanken Grotesk", "sans-serif"], // legacy alias
      },
      colors: {
        // ── core (HSL) ──
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "muted-foreground": "hsl(var(--muted-foreground))",
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
        accent: {
          DEFAULT: "hsl(var(--accent-color))",
          strong: "hsl(var(--accent-strong))",
          ink: "hsl(var(--accent-ink))",
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
        ring: "hsl(var(--ring))",

        // ── semantic (HSL) ──
        pos: "hsl(var(--pos))",
        neg: "hsl(var(--neg))",
        warn: "hsl(var(--warn))",
        info: "hsl(var(--info))",

        // ── raw surfaces (carry alpha) ──
        border: "var(--border)",
        input: "var(--input)",
        muted: "var(--muted)",
        tile: "var(--tile)",
        chip: "var(--chip)",
        pill: {
          DEFAULT: "var(--pill)",
          foreground: "var(--pill-foreground)",
        },

        // ── legacy aliases (old monochrome class names → new tokens) ──
        bg: "hsl(var(--background))",
        surface: "hsl(var(--card))",
        "text-primary": "hsl(var(--foreground))",
        stroke: "var(--border)",
      },
      borderRadius: {
        card: "var(--radius-card)",
        stat: "var(--radius-stat)",
        sheet: "var(--radius-sheet)",
        pill: "var(--radius-pill)",
        tile: "var(--radius-tile)",
        nav: "var(--radius-nav)",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },
    },
  },
} satisfies Config;
