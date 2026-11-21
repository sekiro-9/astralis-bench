import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const revealOnScroll = {
  animationTimingFunction: "linear",
  animationFillMode: "both",
  animationTimeline: "view()",
  animationRange: "entry 0% cover 30%",
} as const;

const config = defineConfig({
  theme: {
    breakpoints: {
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      "2xl": "96rem",
    },
    tokens: {
      fonts: {
        body: { value: "var(--font-satoshi), ui-sans-serif, system-ui, sans-serif" },
        heading: { value: "var(--font-unbounded), ui-sans-serif, system-ui, sans-serif" },
      },
      durations: {
        entrance: { value: "700ms" },
      },
    },
    keyframes: {
      pop: {
        "0%": { opacity: 0, scale: "0.8" },
        "60%": { opacity: 1, scale: "1.04" },
        "100%": { opacity: 1, scale: "1" },
      },
      "blur-in": {
        from: { opacity: 0, filter: "blur(8px)" },
        to: { opacity: 1, filter: "blur(0)" },
      },
    },
    semanticTokens: {
      colors: {
        fg: {
          DEFAULT: { value: "{colors.gray.900}" },
          muted: { value: "{colors.gray.600}" },
        },
        // Not under `bg`: Chakra already uses `bg.panel` for cards, menus and drawers.
        surface: {
          hero: { value: "#f2f0f1" },
          panel: { value: "#f0f0f0" },
        },
      },
    },
    // Every style starts from the element's own resting state and only runs
    // under `prefers-reduced-motion: no-preference`, so reduced motion (or a
    // browser without scroll timelines) simply shows the finished content.
    animationStyles: {
      "slide-right-in": {
        value: {
          _motionSafe: {
            "--slide-from-left-distance": "2rem",
            animationName: "slide-from-left, fade-in",
            animationTimingFunction: "ease-out",
            animationFillMode: "both",
          },
        },
      },
      "fade-up-in": {
        value: {
          _motionSafe: {
            "--slide-from-bottom-distance": "1rem",
            animationName: "slide-from-bottom, fade-in",
            animationTimingFunction: "ease-out",
            animationFillMode: "both",
          },
        },
      },
      "pop-in": {
        value: {
          _motionSafe: {
            animationName: "pop",
            animationTimingFunction: "ease-out",
            animationFillMode: "both",
          },
        },
      },
      "zoom-in": {
        value: {
          _motionSafe: {
            animationName: "scale-in, fade-in",
            animationTimingFunction: "ease-out",
            animationFillMode: "both",
          },
        },
      },
      "reveal-blur-in": {
        value: { _motionSafe: { animationName: "blur-in", ...revealOnScroll } },
      },
      "reveal-slide-left": {
        value: {
          _motionSafe: {
            "--slide-from-right-distance": "2rem",
            animationName: "slide-from-right, fade-in",
            ...revealOnScroll,
          },
        },
      },
      "reveal-pop": {
        value: { _motionSafe: { animationName: "pop", ...revealOnScroll } },
      },
      "reveal-scale-in": {
        value: { _motionSafe: { animationName: "scale-in, fade-in", ...revealOnScroll } },
      },
    },
    layerStyles: {
      lift: {
        value: {
          transition: "box-shadow 200ms, transform 200ms",
          cursor: "pointer",
          _hover: { boxShadow: "lg" },
          _motionSafe: {
            _hover: { transform: "translateY(-2px)" },
            _active: { transform: "scale(0.95)" },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
