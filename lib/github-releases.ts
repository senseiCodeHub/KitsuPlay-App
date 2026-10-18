export type GitHubAsset = { name: string; size: number; browser_download_url: string; content_type: string | null; download_count: number };
export type GitHubRelease = { id: number; name: string | null; tag_name: string; body: string | null; html_url: string; published_at: string | null; prerelease: boolean; draft: boolean; assets: GitHubAsset[] };
const API = "https://api.github.com/repos/senseiCodeHub/KitsuPlay-App/releases";
export function apkAsset(release: GitHubRelease) { return release.assets.find((a) => a.name.toLowerCase().endsWith(".apk")); }
export async function getReleases(): Promise<GitHubRelease[]> {
  try {
    const res = await fetch(API + "?per_page=30", { headers: { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" }, next: { revalidate: 300 } });
    if (!res.ok) return [];
    const releases = await res.json() as GitHubRelease[];
    return releases.filter((r) => !r.draft);
  } catch { return []; }
}
export async function getLatestStableRelease(): Promise<GitHubRelease | null> {
  return (await getReleases()).find((r) => !r.prerelease && !!apkAsset(r)) ?? null;
}
export function formatDate(value: string | null) {
  if (!value) return "Date not provided";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date not provided" : new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}
export function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "Size unavailable";
  const units = ["B", "KB", "MB", "GB"]; let size = bytes; let unit = 0;
  while (size >= 1024 && unit < units.length - 1) { size /= 1024; unit++; }
  return size.toFixed(unit >= 2 ? 1 : 0) + " " + units[unit];
}