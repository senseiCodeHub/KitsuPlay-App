import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kitsu-play-app-iamrobi693-8567.vercel.app";
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: `${siteUrl}/sitemap.xml` };
}
