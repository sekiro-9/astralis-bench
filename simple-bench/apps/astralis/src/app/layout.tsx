import type { Metadata } from "next";
import { AstralisProvider } from "astralis-ui";
import "astralis-ui/styles.css";

export const metadata: Metadata = {
  title: "Astralis bench",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AstralisProvider defaultTheme="light">{children}</AstralisProvider>
      </body>
    </html>
  );
}
