import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { apkAsset, formatBytes, formatDate, formatDownloads, getLatestStableRelease, getReleases } from "@/lib/github-releases";
import { ArrowRightIcon, DownloadIcon, ShieldIcon } from "@/components/Icons";

function plainText(line: string) {
  return line
    .replace(/^#{1,6}\s*/, "")
    .replace(/^[-*]\s*/, "• ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__|`)/g, "");
}

export const metadata: Metadata = {
  title: "All Releases",
  description:
    "Browse KitsuPlay versions, published dates, APK file sizes, download counts, and changelogs. Download APKs directly."
};

export default async function ReleasesPage() {
  const releases = await getReleases();
  const latestStable = await getLatestStableRelease();
  const latestApk = latestStable ? apkAsset(latestStable) : undefined;
  const totalDownloads = releases.reduce((sum, release) => sum + (apkAsset(release)?.download_count ?? 0), 0);

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
            Download the latest stable KitsuPlay build or roll back to any previous version. Each entry is pulled straight
            from the project&apos;s public GitHub Releases.
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
          </div>
        </header>

        <div className="releases-layout">
          <aside className="release-aside">
            <div className="aside-card">
              <h2>Latest stable</h2>
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
              <h2>How this list works</h2>
              <p style={{ marginBottom: 14 }}>
                Release data comes live from GitHub. Drafts stay hidden, and builds without an APK are still listed for
                reference.
              </p>
              <a className="text-link" href="https://github.com/senseiCodeHub/KitsuPlay-App/releases" target="_blank" rel="noreferrer">
                Source releases <ArrowRightIcon size={14} />
              </a>
            </div>

            <p className="aside-note">
              <ShieldIcon size={14} /> Prefer the safest path? Install the latest stable build, then update from this page.
            </p>
          </aside>

          <div className="release-list" id="release-list">
            {releases.length ? (
              releases.map((release, index) => {
                const apk = apkAsset(release);
                const isLatestStable = !!latestStable && release.id === latestStable.id;

                return (
                  <article className={`release-card${isLatestStable ? " is-latest" : ""}`} key={release.id}>
                    <div className="release-head">
                      <div className="release-tag">
                        <span className="release-index">{String(index + 1).padStart(2, "0")}</span>
                        <b>{release.tag_name}</b>
                        {isLatestStable && <span className="release-badge">Latest stable</span>}
                        {release.prerelease && <span className="release-badge release-badge--pre">Pre-release</span>}
                      </div>
                      <time dateTime={release.published_at ?? undefined}>{formatDate(release.published_at)}</time>
                    </div>

                    <h2>{release.name || `KitsuPlay ${release.tag_name}`}</h2>

                    <div className="release-meta">
                      <span>Published {formatDate(release.published_at)}</span>
                      {apk && (
                        <>
                          <span>APK · {formatBytes(apk.size)}</span>
                          <span>{formatDownloads(apk.download_count)} downloads</span>
                        </>
                      )}
                      {!apk && <span>No APK attached</span>}
                    </div>

                    <div className="release-notes">
                      {release.body?.trim() ? (
                        release.body
                          .trim()
                          .split(/\r?\n/)
                          .filter(Boolean)
                          .slice(0, 18)
                          .map((line, lineIndex) => (
                            <p key={lineIndex}>{plainText(line)}</p>
                          ))
                      ) : (
                        <p>No release notes were provided for this version.</p>
                      )}
                    </div>

                    <div className="release-foot">
                      <span>{apk ? "Android APK" : "Download unavailable"}</span>
                      {apk ? (
                        <a className="btn btn-primary btn-sm" href={apk.browser_download_url} download>
                          Download APK <DownloadIcon size={15} />
                        </a>
                      ) : (
                        <a className="text-link" href={release.html_url} target="_blank" rel="noreferrer">
                          View on GitHub <ArrowRightIcon size={14} />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })
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
          </div>
        </div>

        <p className="back-link">
          <Link href="/">← Back to KitsuPlay home</Link>
        </p>
      </div>
    </section>
  );
}
