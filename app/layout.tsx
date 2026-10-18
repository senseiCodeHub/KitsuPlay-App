import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/SiteShell";
export const metadata: Metadata = {
  title: "KitsuPlay — Download for Android",
  description: "Download KitsuPlay for Android. Explore the latest APK, release notes, and installation guide.",
  applicationName: "KitsuPlay",
  openGraph: { title: "KitsuPlay — Download for Android", description: "Get the latest KitsuPlay Android release.", type: "website" }
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#090b16" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><main>{children}</main><SiteFooter /></body></html>;
}