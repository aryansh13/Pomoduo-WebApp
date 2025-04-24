import type { Metadata } from "next";
import { Quicksand, Comic_Neue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import PWASetup from "../components/PWASetup";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
});

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  variable: "--font-comic",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Pomoduo - Study With Me",
  description: "A cozy Pomodoro timer with to-do list for productive study sessions",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  manifest: "/manifest.json",
  themeColor: "#FF6347",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pomoduo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="application-name" content="Pomoduo" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pomoduo" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${quicksand.variable} ${comicNeue.variable} antialiased min-h-screen transition-colors duration-300`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <PWASetup />
      </body>
    </html>
  );
}
