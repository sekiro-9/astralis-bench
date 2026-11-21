import type { Metadata } from "next";
import { AstralisProvider, ThemeScript } from "astralis-ui";
import "astralis-ui/styles.css";
import { AstralisDevTools } from "astralis-devtools/next";
import { satoshi, unbounded } from "@/assets/fonts";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "SHOP.CO",
  description: "Find clothes that match your style.",
};

const themeTokens = {
  fontBody: "var(--font-satoshi), ui-sans-serif, system-ui, sans-serif",
  fontHeading: "var(--font-unbounded), ui-sans-serif, system-ui, sans-serif",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${satoshi.variable} ${unbounded.variable}`}>
      <head>
        <ThemeScript defaultTheme="light" />
      </head>
      <body>
        <AstralisProvider defaultTheme="light" tokens={themeTokens}>
          <Navbar />
          {children}
          <Footer />
        </AstralisProvider>
        <AstralisDevTools />
      </body>
    </html>
  );
}
