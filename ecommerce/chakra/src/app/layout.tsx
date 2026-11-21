import type { Metadata } from "next";
import { satoshi, unbounded } from "@/assets/fonts";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Provider } from "@/components/ui/provider";

export const metadata: Metadata = {
  title: "SHOP.CO",
  description: "Find clothes that match your style.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${satoshi.variable} ${unbounded.variable}`}>
      <body>
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
