import localFont from "next/font/local";
import { Unbounded } from "next/font/google";

export const satoshi = localFont({
  src: [
    { path: "./satoshi-regular.woff2", weight: "400" },
    { path: "./satoshi-medium.woff2", weight: "500" },
    { path: "./satoshi-bold.woff2", weight: "700" },
  ],
  variable: "--font-satoshi",
});

// A free stand-in for the design's Integral CF: wide, heavy display caps.
export const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-unbounded",
});
