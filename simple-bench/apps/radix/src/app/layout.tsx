import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export const metadata = { title: "Radix Themes bench" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
