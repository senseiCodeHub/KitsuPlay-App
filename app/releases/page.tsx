import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  apkAsset,
  formatBytes,
  formatDate,
  formatDownloads,
  getReleases,
  sortReleases,
  toReleaseView
} from "@/lib/github-releases";
import { ArrowRightIcon, DownloadIcon, ShieldIcon } from "@/components/Icons";
import { ReleasesExplorer } from "@/components/ReleasesExplorer";

export const metadata: Metadata = {
  title: "All Releases",
  description:
    "Browse KitsuPlay versions, published dates, APK file sizes, download counts, and changelogs. Download APKs directly."
};

export default async function ReleasesPage() {
  const releases = sortReleases(await getReleases());
  const latestStable = releases.find((release) => !release.prerelease && apkAsset(release)) ?? null;
  const latestApk = latestStable ? apkAsset(latestStable) : undefined;
  const totalDownloads = releases.reduce((sum, release) => sum + (apkAsset(release)?.download_count ?? 0), 0);
  const preReleases = releases.filter((release) => release.prerelease).length;
  const views = releases.map(toReleaseView);
  const newest = releases[0];
  const newestApk = newest ? apkAsset(newest) : undefined;

  return (
    <section className="page">
      <div className="container">
        <header className="page-head">
          <span className="kicker">Version history</span>
          <h1>
            Every build.
            <br />
            <span className="text-gradient">Nothing hidden.</span>
          </h1>
          <p>
            Download the latest stable KitsuPlay build or roll back to any previous version. Filter by channel, compare
            sizes and read every changelog — each entry is pulled straight from the project&apos;s public GitHub Releases.
          </p>
          <div className="stats">
            <div>
              <strong>{releases.length || "0"}</strong>
              <span>Builds listed</span>
            </div>
            <div>
              <strong>{latestStable?.tag_name ?? "—"}</strong>
              <span>Latest stable</span>
            </div>
            <div>
              <strong>{formatDownloads(totalDownloads)}</strong>
              <span>APK downloads</span>
            </div>
            <div>
              <strong>{preReleases}</strong>
              <span>Pre-releases</span>
            </div>
          </div>
        </header>

        <div className="releases-layout">
          <aside className="release-aside">
            <div className="aside-card aside-card--latest">
              <div className="aside-card-head">
                <h2>Latest stable</h2>
                <span className="release-dot" aria-hidden="true" />
              </div>
              <p>
                {latestStable && latestApk
                  ? "The current recommended build for most devices."
                  : "A stable build with an attached APK will show up here."}
              </p>
              <div className="aside-latest-app">
                <Image src="/brand-fox.png" alt="" width={46} height={46} />
                <div>
                  <b>{latestStable?.tag_name ?? "KitsuPlay"}</b>
                  <span>
                    {latestStable && latestApk
                      ? `${formatBytes(latestApk.size)} · ${formatDate(latestStable.published_at)}`
                      : "No APK available yet"}
                  </span>
                </div>
              </div>
              <a
                className="btn btn-primary btn-sm"
                href={latestApk ? latestApk.browser_download_url : "#release-list"}
                {...(latestApk ? { download: true } : {})}
              >
                {latestApk ? "Download APK" : "Browse builds"}
                {latestApk ? <DownloadIcon size={16} /> : <ArrowRightIcon size={15} />}
              </a>
            </div>

            <div className="aside-card">
              <h2>Channels</h2>
              <ul className="channel-list">
                <li>
                  <span className="release-dot" aria-hidden="true" />
                  <div>
                    <b>Stable</b>
                    <small>Tested builds recommended for daily use.</small>
                  </div>
                </li>
                <li>
                  <span className="release-dot is-pre" aria-hidden="true" />
                  <div>
                    <b>Pre-release</b>
                    <small>Early builds — expect rough edges.</small>
                  </div>
                </li>
              </ul>
              {newest && (
                <p className="aside-newest">
                  Newest public build: <b>{newest.tag_name}</b>
                  {newestApk ? ` · ${formatBytes(newestApk.size)}` : ""}
                </p>
              )}
            </div>

            <div className="aside-card">
              <h2>How this list works</h2>
              <p style={{ marginBottom: 14 }}>
                Release data comes live from GitHub. Drafts stay hidden, and builds without an APK are still listed for
                reference.
              </p>
              <a
                className="text-link"
                href="https://github.com/senseiCodeHub/KitsuPlay-App/releases"
                target="_blank"
                rel="noreferrer"
              >
                Source releases <ArrowRightIcon size={14} />
              </a>
            </div>

            <p className="aside-note">
              <ShieldIcon size={14} /> Prefer the safest path? Install the latest stable build, then update from this page.
            </p>
          </aside>

          <section id="release-list" aria-label="Release list">
            {releases.length ? (
              <ReleasesExplorer releases={views} latestId={latestStable?.id ?? null} />
            ) : (
              <div className="empty-state">
                <span className="kicker">Nothing here yet</span>
                <h2>No public releases yet</h2>
                <p>
                  When a public release is published, it appears here automatically with its changelog and APK download.
                </p>
                <Link className="btn btn-primary" href="/">
                  Back to KitsuPlay home
                </Link>
              </div>
            )}
          </section>
        </div>

        <p className="back-link">
          <Link href="/">← Back to KitsuPlay home</Link>
        </p>
      </div>
    </section>
  );
}
