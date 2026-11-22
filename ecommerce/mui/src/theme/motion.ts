// Plain objects, so Server Components can pass them to `sx`: the keyframes
// live in CssBaseline (theme) and are referenced here by name only.
export const keyframeStyles = {
  "@keyframes shop-fade-up": { from: { opacity: 0, transform: "translateY(1rem)" } },
  "@keyframes shop-slide-right": { from: { opacity: 0, transform: "translateX(-2rem)" } },
  "@keyframes shop-slide-left": { from: { opacity: 0, transform: "translateX(2rem)" } },
  "@keyframes shop-scale-in": { from: { opacity: 0, transform: "scale(0.92)" } },
  "@keyframes shop-pop": {
    "0%": { opacity: 0, transform: "scale(0.8)" },
    "60%": { opacity: 1, transform: "scale(1.04)" },
    "100%": { opacity: 1, transform: "scale(1)" },
  },
  "@keyframes shop-blur-in": { from: { opacity: 0, filter: "blur(8px)" } },
};

type Motion = "fade-up" | "slide-right" | "slide-left" | "scale-in" | "pop" | "blur-in";

const motionSafe = "@media (prefers-reduced-motion: no-preference)";

export function entrance(name: Motion, delayMs = 0) {
  return {
    [motionSafe]: {
      animation: `shop-${name} 700ms ease-out ${delayMs}ms both`,
    },
  };
}

// A scroll-driven reveal: without view timelines the animation has no
// duration and simply shows its end state.
export function reveal(name: Motion) {
  return {
    [motionSafe]: {
      animationName: `shop-${name}`,
      animationTimingFunction: "linear",
      animationFillMode: "both",
      animationTimeline: "view()",
      animationRange: "cover 0% cover 30%",
    },
  };
}

export const lift = {
  cursor: "pointer",
  transition: "box-shadow 200ms, transform 200ms",
  "&:hover": { boxShadow: "0 20px 25px -5px #09090b1a, 0 8px 10px -6px #09090b1a" },
  [motionSafe]: {
    "&:hover": { transform: "translateY(-4px)" },
    "&:active": { transform: "scale(0.95)" },
  },
} as const;
