import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/SiteShell";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kitsu-play-app-iamrobi693-8567.vercel.app";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "KitsuPlay — Official Android Download", template: "%s | KitsuPlay" },
  description: "Download KitsuPlay for Android. Explore the latest stable APK, compare previous versions, read changelogs, and install safely.",
  applicationName: "KitsuPlay",
  keywords: ["KitsuPlay", "KitsuPlay APK", "Android app", "anime app", "release notes", "APK download"],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "https://raw.githubusercontent.com/senseiCodeHub/KitsuPlay/main/assets/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "https://raw.githubusercontent.com/senseiCodeHub/KitsuPlay/main/assets/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "https://raw.githubusercontent.com/senseiCodeHub/KitsuPlay/main/assets/favicon/favicon.ico" }
    ],
    apple: "https://raw.githubusercontent.com/senseiCodeHub/KitsuPlay/main/assets/favicon/apple-touch-icon.png"
  },
  openGraph: { title: "KitsuPlay — Official Android Download", description: "Get the latest stable KitsuPlay Android APK and browse every available version.", siteName: "KitsuPlay", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "KitsuPlay Android app" }] },
  twitter: { card: "summary_large_image", title: "KitsuPlay — Official Android Download", description: "Get the latest stable KitsuPlay Android APK and browse every available version.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ff7138" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><main>{children}</main><SiteFooter /></body></html>;
}
