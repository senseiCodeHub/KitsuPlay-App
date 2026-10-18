import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://kitsu-play-app.vercel.app");
  const lastModified = new Date();
  return [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/releases`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/install`, lastModified, changeFrequency: "monthly", priority: 0.6 }
  ];
}
