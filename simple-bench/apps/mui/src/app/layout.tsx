import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export const metadata = { title: "MUI bench" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
