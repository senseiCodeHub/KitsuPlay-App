import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KitsuPlay",
    short_name: "KitsuPlay",
    description: "Official KitsuPlay Android app downloads and release history.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b10",
    theme_color: "#ff7138",
    icons: [
      { src: "https://raw.githubusercontent.com/senseiCodeHub/KitsuPlay/main/assets/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "https://raw.githubusercontent.com/senseiCodeHub/KitsuPlay/main/assets/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
