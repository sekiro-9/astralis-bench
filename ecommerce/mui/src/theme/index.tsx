"use client";

import NextLink from "next/link";
import { createTheme } from "@mui/material/styles";
import type { LinkProps } from "@mui/material/Link";
import { createSvgIcon } from "@mui/material/utils";
import { keyframeStyles } from "./motion";

declare module "@mui/material/styles" {
  interface Palette {
    surface: { hero: string; panel: string };
  }
  interface PaletteOptions {
    surface?: { hero: string; panel: string };
  }
  interface TypeText {
    subtle: string;
  }
  interface TypographyVariants {
    logo: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    logo?: React.CSSProperties;
  }
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    logo: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    soft: true;
  }
}

const StarIcon = createSvgIcon(
  <path
    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
  />,
  "Star",
);

const zinc = {
  50: "#fafafa",
  100: "#f4f4f5",
  200: "#e4e4e7",
  300: "#d4d4d8",
  400: "#a1a1aa",
  500: "#71717a",
  600: "#52525b",
  700: "#3f3f46",
  800: "#27272a",
  900: "#18181b",
};

const body = "var(--font-satoshi), ui-sans-serif, system-ui, sans-serif";
const heading = "var(--font-unbounded), ui-sans-serif, system-ui, sans-serif";

// Two passes: the type scale needs `breakpoints.up` from the first theme
// (MUI's typography guide, "Responsive font sizes").
const base = createTheme({
  cssVariables: true,
  breakpoints: {
    values: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 },
  },
  palette: {
    primary: { main: zinc[900], contrastText: "#ffffff" },
    error: { main: "#dc2626", light: "#fee2e2", dark: "#991919" },
    success: { main: "#116932" },
    warning: { main: "#fde047" },
    common: { black: "#09090b", white: "#ffffff" },
    grey: zinc,
    text: { primary: zinc[900], secondary: zinc[600], subtle: zinc[500] },
    divider: zinc[300],
    surface: { hero: "#f2f0f1", panel: "#f0f0f0" },
  },
  shape: { borderRadius: 8 },
  typography: { fontFamily: body },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...keyframeStyles,
        // MUI's transitions and ripples ignore the user's motion setting, so
        // reduced motion is honoured here, once, for every component.
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.01ms !important",
            scrollBehavior: "auto !important",
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: { LinkComponent: NextLink },
    },
    MuiLink: {
      defaultProps: { component: NextLink, underline: "hover" } as LinkProps,
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 9999, fontSize: "1rem" },
        sizeLarge: { height: 48, paddingInline: 20, fontSize: "1.125rem" },
        outlined: ({ theme }) => ({ borderColor: theme.vars.palette.grey[200], color: theme.vars.palette.grey[800] }),
      },
    },
    MuiIconButton: {
      styleOverrides: { sizeSmall: { padding: 4 } },
    },
    MuiChip: {
      variants: [
        {
          props: { variant: "soft", color: "error" },
          style: ({ theme }) => ({
            backgroundColor: theme.vars.palette.error.light,
            color: theme.vars.palette.error.dark,
          }),
        },
      ],
      styleOverrides: {
        sizeSmall: { height: 20, fontSize: "0.75rem", fontWeight: 500 },
        labelSmall: { paddingInline: 8 },
      },
    },
    MuiRating: {
      defaultProps: {
        icon: <StarIcon fontSize="inherit" />,
        emptyIcon: <StarIcon fontSize="inherit" />,
      },
      styleOverrides: {
        root: { gap: 2 },
        iconFilled: ({ theme }) => ({ color: theme.vars.palette.warning.main }),
        iconEmpty: ({ theme }) => ({ color: theme.vars.palette.grey[400] }),
      },
    },
    MuiDivider: {
      styleOverrides: { root: ({ theme }) => ({ borderColor: theme.vars.palette.divider }) },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
    },
  },
});

const { up } = base.breakpoints;

export const theme = createTheme(base, {
  typography: {
    h1: {
      fontFamily: heading,
      fontWeight: 800,
      fontSize: "2.25rem",
      lineHeight: 1.25,
      letterSpacing: "-0.025em",
      textTransform: "uppercase",
      [up("lg")]: { fontSize: "3rem" },
      [up("xl")]: { fontSize: "3.75rem" },
    },
    h2: {
      fontFamily: heading,
      fontWeight: 800,
      fontSize: "1.875rem",
      lineHeight: 1,
      letterSpacing: "-0.025em",
      textTransform: "uppercase",
      [up("lg")]: { fontSize: "3rem" },
    },
    h3: {
      fontWeight: 700,
      fontSize: "1rem",
      lineHeight: 1.5,
      [up("lg")]: { fontSize: "1.25rem", lineHeight: 1.4 },
    },
    body1: { fontSize: "1rem", lineHeight: 1.5 },
    body2: { fontSize: "0.875rem", lineHeight: 1.43 },
    caption: { fontSize: "0.75rem", lineHeight: 1.33 },
    button: { textTransform: "none", fontWeight: 500 },
    logo: {
      fontFamily: heading,
      fontWeight: 800,
      fontSize: "1.5rem",
      lineHeight: 1,
      [up("lg")]: { fontSize: "1.875rem" },
    },
  },
});
