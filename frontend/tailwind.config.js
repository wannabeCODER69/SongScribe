/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // ─── THEME TOKENS — sourced from SongScribe_Design_System_v1 ───
        // Single source of truth. Components reference these, never raw hex.

        // Background tiers (never plain #000000)
        bg: {
          base: "#07050D",     // design-system "Base Color"
          deep: "#05050A",     // gradient end-stop / darkest tier
          elevated: "#0B0714", // gradient mid-stop / recessed surfaces
          input: "#10101a",    // inputs, step tracks, pill backgrounds
        },
        // Card surface — "Your cards are not solid": rgba(16,16,26,.78)
        surface: {
          card: "rgba(16,16,26,0.78)",
          hover: "rgba(255,255,255,0.065)",
          soft: "rgba(255,255,255,0.02)",
          secondary: "rgba(255,255,255,0.05)", // secondary button surface
        },
        // Borders — primary .08 / secondary .05
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          soft: "rgba(255,255,255,0.05)",
          glow: "rgba(139,92,246,0.4)",
        },
        // Typography — avoid grey, use transparent white
        ink: {
          primary: "#FFFFFF",
          body: "rgba(255,255,255,0.85)",
          muted: "rgba(255,255,255,0.55)",
        },
        // Brand gradient family
        primary: {
          blue: "#3B82F6",
          indigo: "#6366F1",
          purple: "#8B5CF6",
        },
        // Accent magenta — lighting only, never a primary surface
        accent: {
          DEFAULT: "#D946EF",
        },
        success: {
          DEFAULT: "#34d399",
          bg: "rgba(52,211,153,0.12)",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        // Major cards 20–24px
        xl2: "20px",
        xl3: "22px",
      },
      boxShadow: {
        // Layered card shadow: drop shadow + inner highlight + ambient purple glow, per spec §9
        premium:
          "0 34px 120px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 60px rgba(139,92,246,0.08)",
        // Primary button glow, per spec §15
        btnGlow: "0 0 35px rgba(139,92,246,0.25)",
      },
      backdropBlur: {
        // Glassmorphism, per spec §6 — blur(24px)
        DEFAULT: "24px",
      },
    },
  },
  plugins: [],
};
