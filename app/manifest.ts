import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KitsuPlay",
    short_name: "KitsuPlay",
    description: "Official KitsuPlay Android app downloads and release history.",
    start_url: "/",
    display: "standalone",
    background_color: "#080605",
    theme_color: "#ff6a2c",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" }
    ]
  };
}
