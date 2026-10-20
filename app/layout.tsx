import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PremiumFX } from "@/components/PremiumFX";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kitsu-play-app-iamrobi693-8567.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "KitsuPlay — Chase Your Next Favourite", template: "%s | KitsuPlay" },
  description: "Download KitsuPlay for Android. Explore the latest stable APK, compare previous versions, read changelogs, and install safely.",
  applicationName: "KitsuPlay",
  keywords: ["KitsuPlay", "KitsuPlay APK", "Android app", "anime app", "release notes", "APK download"],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  openGraph: {
    title: "KitsuPlay — Chase Your Next Favourite",
    description: "Get the latest stable KitsuPlay Android APK and browse every available version.",
    siteName: "KitsuPlay",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "KitsuPlay Android app" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "KitsuPlay — Chase Your Next Favourite",
    description: "Get the latest stable KitsuPlay Android APK and browse every available version.",
    images: ["/opengraph-image"]
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080605",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <PremiumFX />
      </body>
    </html>
  );
}
