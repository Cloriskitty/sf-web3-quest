import "maplibre-gl/dist/maplibre-gl.css";

import type { Metadata } from "next";
import { Geist_Mono, Inter, Press_Start_2P } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SF AI Startup Map",
  description:
    "Explore San Francisco AI startups on an interactive map — retro quest style.",
  openGraph: {
    title: "SF AI Startup Map",
    description:
      "Explore San Francisco AI startups on an interactive map — retro quest style.",
    type: "website",
    images: [
      {
        url: "/ogp-sf-ai-startup-map.png",
        width: 1367,
        height: 768,
        alt: "SF Startup Quest pixel-art key visual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SF AI Startup Map",
    description:
      "Explore San Francisco AI startups on an interactive map — retro quest style.",
    images: ["/ogp-sf-ai-startup-map.png"],
  },
  icons: {
    icon: [{ url: "/brand-mark.svg", type: "image/svg+xml" }],
    apple: "/brand-mark.svg",
  },
};

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const fontPixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        fontPixel.variable,
        "font-sans",
        fontSans.variable
      )}
    >
      <body>
        <ThemeProvider
          attribute="class"
          forcedTheme="light"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
