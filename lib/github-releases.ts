export type GitHubAsset = { name: string; size: number; browser_download_url: string; content_type: string | null; download_count: number };
export type GitHubRelease = { id: number; name: string | null; tag_name: string; body: string | null; html_url: string; published_at: string | null; prerelease: boolean; draft: boolean; assets: GitHubAsset[] };

/** Release data trimmed down for client components. */
export type ReleaseView = {
  id: number;
  tag: string;
  name: string;
  url: string;
  publishedAt: string | null;
  prerelease: boolean;
  notes: string[];
  apk: { name: string; size: number; downloads: number; url: string } | null;
};

const API = "https://api.github.com/repos/senseiCodeHub/KitsuPlay-App/releases";

export function apkAsset(release: GitHubRelease) {
  return release.assets.find((a) => a.name.toLowerCase().endsWith(".apk"));
}

export async function getReleases(): Promise<GitHubRelease[]> {
  try {
    const all: GitHubRelease[] = [];
    for (let page = 1; page <= 10; page++) {
      const res = await fetch(`${API}?per_page=100&page=${page}`, {
        headers: { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
        next: { revalidate: 300 }
      });
      if (!res.ok) return all.filter((r) => !r.draft);
      const releases = (await res.json()) as GitHubRelease[];
      all.push(...releases);
      if (releases.length < 100) break;
    }
    return all.filter((r) => !r.draft);
  } catch {
    return [];
  }
}

function numericParts(tag: string) {
  return tag
    .replace(/^v/i, "")
    .split(".")
    .map((part) => Number.parseInt(part, 10))
    .map((part) => (Number.isFinite(part) ? part : 0));
}

/** Semantic-ish tag comparison, newest first. Ties fall back to publish date. */
export function sortReleases(releases: GitHubRelease[]) {
  return [...releases].sort((a, b) => {
    const left = numericParts(b.tag_name);
    const right = numericParts(a.tag_name);
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      const diff = (left[i] ?? 0) - (right[i] ?? 0);
      if (diff !== 0) return diff;
    }
    const leftDate = a.published_at ? Date.parse(a.published_at) : 0;
    const rightDate = b.published_at ? Date.parse(b.published_at) : 0;
    return rightDate - leftDate;
  });
}

export async function getLatestStableRelease(): Promise<GitHubRelease | null> {
  return sortReleases(await getReleases()).find((r) => !r.prerelease && !!apkAsset(r)) ?? null;
}

function plainText(line: string) {
  return line
    .replace(/^#{1,6}\s*/, "")
    .replace(/^[-*]\s*/, "• ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__|`)/g, "")
    .trim();
}

export function releaseNoteLines(body: string | null) {
  if (!body?.trim()) return [];
  return body
    .trim()
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map(plainText)
    .filter(Boolean);
}

export function toReleaseView(release: GitHubRelease): ReleaseView {
  const apk = apkAsset(release);
  return {
    id: release.id,
    tag: release.tag_name,
    name: release.name || `KitsuPlay ${release.tag_name}`,
    url: release.html_url,
    publishedAt: release.published_at,
    prerelease: release.prerelease,
    notes: releaseNoteLines(release.body),
    apk: apk ? { name: apk.name, size: apk.size, downloads: apk.download_count, url: apk.browser_download_url } : null
  };
}

export function formatDate(value: string | null) {
  if (!value) return "Date not provided";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date not provided"
    : new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}

export function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "Size unavailable";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit++;
  }
  return size.toFixed(unit >= 2 ? 1 : 0) + " " + units[unit];
}

export function formatDownloads(count: number) {
  return new Intl.NumberFormat("en", { notation: count >= 10000 ? "compact" : "standard", maximumFractionDigits: 1 }).format(
    Math.max(0, count || 0)
  );
}
