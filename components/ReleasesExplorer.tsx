"use client";

import { useMemo, useState } from "react";
import { formatBytes, formatDate, formatDownloads, type ReleaseView } from "@/lib/github-releases";
import {
  AndroidIcon,
  ArrowUpRightIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  DownloadIcon,
  SearchIcon
} from "./Icons";
import { SortMenu } from "./SortMenu";

const CHANNELS = [
  { value: "all", label: "All" },
  { value: "stable", label: "Stable" },
  { value: "pre", label: "Pre-release" }
] as const;

type Channel = (typeof CHANNELS)[number]["value"];
const ORDER_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "downloads", label: "Most downloaded" }
] as const;
const NOTE_LIMIT = 6;

export function ReleasesExplorer({ releases, latestId }: { releases: ReleaseView[]; latestId: number | null }) {
  const [channel, setChannel] = useState<Channel>("all");
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<"newest" | "oldest" | "downloads">("newest");
  const [copied, setCopied] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number[]>([]);

  const stableCount = releases.filter((release) => !release.prerelease).length;
  const counts: Record<Channel, number> = {
    all: releases.length,
    stable: stableCount,
    pre: releases.length - stableCount
  };

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = releases.filter((release) => {
      if (channel === "stable" && release.prerelease) return false;
      if (channel === "pre" && !release.prerelease) return false;
      if (!needle) return true;
      return release.tag.toLowerCase().includes(needle) || release.name.toLowerCase().includes(needle);
    });
    if (order === "downloads") return [...filtered].sort((a, b) => (b.apk?.downloads ?? 0) - (a.apk?.downloads ?? 0));
    return order === "newest" ? filtered : [...filtered].reverse();
  }, [releases, channel, query, order]);

  const reset = () => {
    setChannel("all");
    setQuery("");
    setOrder("newest");
  };

  const copy = async (tag: string) => {
    try {
      await navigator.clipboard.writeText(tag);
      setCopied(tag);
      window.setTimeout(() => setCopied((current) => (current === tag ? null : current)), 1600);
    } catch {
      /* Clipboard access can be blocked; the tag stays selectable. */
    }
  };

  const toggleNotes = (id: number) => {
    setExpanded((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  return (
    <div className="release-panel">
      <div className="releases-toolbar">
        <div className="segmented" role="group" aria-label="Filter releases by channel">
          {CHANNELS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              aria-pressed={channel === value}
              onClick={() => setChannel(value)}
            >
              {label}
              <i>{counts[value]}</i>
            </button>
          ))}
        </div>

        <div className="releases-tools">
          <label className="release-search">
            <SearchIcon size={14} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter versions"
              aria-label="Filter versions"
            />
          </label>

          <SortMenu value={order} options={ORDER_OPTIONS} onChange={setOrder} label="Sort releases" />
        </div>
      </div>

      <p className="release-count" aria-live="polite">
        {visible.length} of {releases.length} builds
        {channel !== "all" ? ` · ${channel === "stable" ? "stable channel" : "pre-release channel"}` : ""}
        {order === "oldest" ? " · oldest first" : order === "downloads" ? " · most downloaded" : ""}
      </p>

      <div className="release-list">
        {visible.length ? (
          visible.map((release) => {
            const isLatest = release.id === latestId;
            const isExpanded = expanded.includes(release.id);
            const extraNotes = release.notes.slice(NOTE_LIMIT);

            return (
              <article className={`release-card${isLatest ? " is-latest" : ""}`} key={release.id}>
                <div className="release-head">
                  <div className="release-tag">
                    <span
                      className={`release-dot${release.prerelease ? " is-pre" : ""}`}
                      aria-hidden="true"
                    />
                    <b>{release.tag}</b>
                    <button
                      type="button"
                      className={`copy-btn${copied === release.tag ? " is-copied" : ""}`}
                      onClick={() => copy(release.tag)}
                      aria-label={`Copy version ${release.tag}`}
                    >
                      {copied === release.tag ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                      {copied === release.tag ? "Copied" : "Copy"}
                    </button>
                    {isLatest && <span className="release-badge">Latest stable</span>}
                    {release.prerelease && <span className="release-badge release-badge--pre">Pre-release</span>}
                    {!release.apk && <span className="release-badge release-badge--muted">No APK</span>}
                  </div>
                  <time dateTime={release.publishedAt ?? undefined}>{formatDate(release.publishedAt)}</time>
                </div>

                <h2>{release.name}</h2>

                <div className="release-meta">
                  <span>{release.apk ? formatBytes(release.apk.size) : "Size unavailable"}</span>
                  <span>{release.apk ? `${formatDownloads(release.apk.downloads)} downloads` : "No APK attached"}</span>
                  <span>{release.prerelease ? "Preview channel" : "Stable channel"}</span>
                </div>

                {release.notes.length ? (
                  <>
                    <div className="release-notes">
                      {release.notes.slice(0, NOTE_LIMIT).map((line, index) => (
                        <p key={`${release.id}-${index}`}>{line}</p>
                      ))}
                    </div>

                    {extraNotes.length > 0 && (
                      <>
                        <div className={`notes-rest${isExpanded ? " is-open" : ""}`}>
                          <div className="notes-rest-inner">
                            <div className="release-notes">
                              {extraNotes.map((line, index) => (
                                <p key={`${release.id}-extra-${index}`}>{line}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="notes-toggle"
                          aria-expanded={isExpanded}
                          onClick={() => toggleNotes(release.id)}
                        >
                          {isExpanded ? "Show less" : `Show all ${release.notes.length} lines`}
                          <ChevronDownIcon size={14} />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <p className="release-notes release-notes--empty">No release notes were provided for this version.</p>
                )}

                <div className="release-foot">
                  <span className="release-file">
                    {release.apk ? (
                      <>
                        <AndroidIcon size={14} />
                        <span>{release.apk.name}</span>
                      </>
                    ) : (
                      "Download unavailable"
                    )}
                  </span>
                  <div className="release-actions">
                    <a className="text-link" href={release.url} target="_blank" rel="noreferrer">
                      GitHub <ArrowUpRightIcon size={13} />
                    </a>
                    {release.apk && (
                      <a className="btn btn-primary btn-sm" href={release.apk.url} download>
                        Download APK <DownloadIcon size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="release-empty">
            <h2>No builds match that filter</h2>
            <p>Try a different version tag or switch back to every channel.</p>
            <button type="button" className="btn btn-sm btn-ghost" onClick={reset}>
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
