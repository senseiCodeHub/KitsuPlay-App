import Image from "next/image";
import Link from "next/link";
import { apkAsset, formatBytes, formatDate, formatDownloads, getLatestStableRelease } from "@/lib/github-releases";
import { Faq } from "@/components/Faq";
import { FoxMark } from "@/components/FoxMark";
import { HeroAura } from "@/components/HeroAura";
import { Reveal } from "@/components/Reveal";
import { TypingSearch } from "@/components/TypingSearch";
import {
  ArrowRightIcon,
  BookmarkIcon,
  CheckIcon,
  ClockIcon,
  DownloadIcon,
  LayersIcon,
  PlayIcon,
  SearchIcon,
  ShieldIcon
} from "@/components/Icons";

const marqueeWords = ["Anime", "Movies", "Series", "Search", "Watchlist", "Playback progress", "Downloads", "Every release"];

const appScreens = [
  {
    src: "/app-screens/home.jpg",
    label: "Home",
    alt: "KitsuPlay home screen with a featured series and trending shelves"
  },
  {
    src: "/app-screens/movies.jpg",
    label: "Movies",
    alt: "KitsuPlay movies screen with genre filters and poster shelves"
  },
  {
    src: "/app-screens/anime.jpg",
    label: "Anime",
    alt: "KitsuPlay anime screen with trending and seasonal shelves"
  },
  {
    src: "/app-screens/series.jpg",
    label: "Series",
    alt: "KitsuPlay series screen with top rated and K-drama shelves"
  },
  {
    src: "/app-screens/downloads.jpg",
    label: "Downloads",
    alt: "KitsuPlay downloads screen showing an offline library"
  }
];

const steps = [
  ["01", "Download the APK", "Use the official button on this page to pull the latest stable build from GitHub Releases."],
  ["02", "Open it and allow", "Tap the downloaded file, then allow your browser to install unknown apps if Android asks."],
  ["03", "Install and explore", "Finish the prompt, open KitsuPlay, and start with whatever catches your eye."]
];

const faqs = [
  {
    q: "Is KitsuPlay free?",
    a: "Yes. Downloading the app from this site is free, and the APK is served straight from the project's public GitHub Releases."
  },
  {
    q: "Where do the APK files come from?",
    a: "Every download links to the official GitHub release asset. This site never mirrors or re-uploads the APK itself."
  },
  {
    q: "Why does Android warn me about unknown apps?",
    a: "Android shows that warning for anything installed outside the Play Store. Only grant the permission to the browser or file manager you actually used to open the APK."
  },
  {
    q: "Can I go back to an older version?",
    a: "Yes — every previous release stays on the releases page. Android may refuse a downgrade, so uninstall the current build first if it does."
  },
  {
    q: "How do I know I have the latest version?",
    a: "The version tag, release date and file size on the download panel always match the newest stable GitHub release."
  }
];

export default async function HomePage() {
  const release = await getLatestStableRelease();
  const apk = release ? apkAsset(release) : undefined;
  const downloadHref = apk ? apk.browser_download_url : "/releases";
  const downloadLabel = apk ? "Download APK" : "Browse available versions";

  return (
    <>
      <section className="hero">
        <HeroAura />
        <div className="hero-glow hero-glow--one" aria-hidden="true" />
        <div className="hero-glow hero-glow--two" aria-hidden="true" />

        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <i className="pulse-dot" aria-hidden="true" />
              KitsuPlay · Android app
            </span>
            <h1>
              Chase your next <span className="text-gradient">favourite.</span>
            </h1>
            <p className="hero-lede">
              Anime, movies and series tucked into one quick little app. Search it, save it, and pick up exactly where you
              left off.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={downloadHref} {...(apk ? { download: true } : {})}>
                <DownloadIcon size={18} />
                {downloadLabel}
              </a>
              <Link className="btn btn-ghost" href="/releases">
                See every version
                <ArrowRightIcon size={16} />
              </Link>
            </div>
            <ul className="trust-row">
              <li>
                <CheckIcon size={14} /> Free download
              </li>
              <li>
                <CheckIcon size={14} /> Direct Android APK
              </li>
              <li>
                <CheckIcon size={14} /> Full version history
              </li>
            </ul>
          </div>

          <div className="hero-visual">
            <div className="halo" aria-hidden="true" />
            <div className="phone-float">
              <div className="phone">
                <div className="phone-screen">
                  <Image
                    src="/app-screens/home.jpg"
                    alt="KitsuPlay app home screen showing a featured title"
                    width={720}
                    height={1544}
                    priority
                    sizes="(max-width: 680px) 280px, 292px"
                  />
                </div>
              </div>
            </div>

            <div className="float-chip float-chip--version">
              <LayersIcon size={18} />
              <div>
                <small>{release ? "Latest stable" : "Android build"}</small>
                <b>{release ? release.tag_name : "KitsuPlay"}</b>
              </div>
            </div>

            <div className="float-chip float-chip--size">
              <DownloadIcon size={18} />
              <div>
                <small>APK file</small>
                <b>{apk ? formatBytes(apk.size) : "Free"}</b>
              </div>
            </div>
          </div>
        </div>

        <div className="container hero-foot">
          <span>Built for your next binge</span>
          <i aria-hidden="true" />
          <span>Android · Simple · Fast</span>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((group) => (
            <div className="marquee-group" key={group}>
              {marqueeWords.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="section" id="download">
        <div className="container download-layout">
          <Reveal className="section-head">
            <span className="kicker">Get the app</span>
            <h2 className="section-title">
              One tap from <span className="text-gradient">your next watch.</span>
            </h2>
            <p>
              Grab the official Android build straight from this page. Every stable release stays archived with its notes,
              file size and download count.
            </p>
            <div className="download-points">
              <span>
                <ShieldIcon size={14} /> Official release assets
              </span>
              <span>
                <ClockIcon size={14} /> Synced with GitHub Releases
              </span>
            </div>
          </Reveal>

          <Reveal className="download-wrap" delay={120}>
            <article className="download-panel">
              <header className="panel-head">
                <span className="status">
                  <i aria-hidden="true" />
                  {release ? "Latest stable release" : "No stable APK yet"}
                </span>
                {release && <span className="pill">{release.tag_name}</span>}
              </header>

              <div className="panel-app">
                <Image className="panel-icon" src="/brand-fox.png" alt="" width={58} height={58} />
                <div>
                  <h3>KitsuPlay for Android</h3>
                  <p>
                    {apk
                      ? `${formatBytes(apk.size)} · ${formatDownloads(apk.download_count)} downloads`
                      : "The newest APK lands here as soon as a stable release is published."}
                  </p>
                </div>
              </div>

              <a className="btn btn-primary panel-btn" href={downloadHref} {...(apk ? { download: true } : {})}>
                {downloadLabel}
                {apk ? <DownloadIcon size={18} /> : <ArrowRightIcon size={16} />}
              </a>

              <dl className="panel-meta">
                <div>
                  <dt>Version</dt>
                  <dd>{release?.tag_name ?? "—"}</dd>
                </div>
                <div>
                  <dt>Released</dt>
                  <dd>{release ? formatDate(release.published_at) : "—"}</dd>
                </div>
                <div>
                  <dt>File size</dt>
                  <dd>{apk ? formatBytes(apk.size) : "—"}</dd>
                </div>
                <div>
                  <dt>Platform</dt>
                  <dd>Android APK</dd>
                </div>
              </dl>

              <div className="panel-foot">
                <Link href="/install">How to install</Link>
                <Link href="/releases">
                  All versions <ArrowRightIcon size={14} />
                </Link>
              </div>
            </article>
            <p className="panel-note">
              <ShieldIcon size={14} />
              Fetched live from the project&apos;s public GitHub Releases.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section features-section" id="features">
        <div className="container">
          <Reveal className="features-head">
            <div>
              <span className="kicker">Why KitsuPlay</span>
              <h2 className="section-title">
                Small app. <span className="text-gradient">Sharp instincts.</span>
              </h2>
            </div>
            <p className="features-lede">
              Find it, keep it, finish it. Every step of the watch loop is built to feel like one tap.
            </p>
          </Reveal>

          <Reveal className="bento" delay={80}>
            <article className="bento-card bento-card--search">
              <span className="bento-icon">
                <SearchIcon size={20} />
              </span>
              <h3>Sniff out anything</h3>
              <p>Search anime, movies and series, then jump straight into details and episodes.</p>
              <div className="search-demo" aria-hidden="true">
                <div className="search-bar">
                  <SearchIcon size={15} />
                  <TypingSearch />
                  <span className="search-scope">All</span>
                </div>
                <div className="search-results">
                  <Image
                    src="/app-art/search.jpg"
                    alt=""
                    width={720}
                    height={332}
                    sizes="(max-width: 720px) 88vw, (max-width: 1100px) 88vw, 380px"
                  />
                </div>
              </div>
            </article>

            <article className="bento-card bento-card--resume">
              <span className="bento-icon">
                <PlayIcon size={20} />
              </span>
              <h3>Right where you stopped</h3>
              <p>Playback progress is remembered, so the next episode is one tap away.</p>
              <div className="resume-demo" aria-hidden="true">
                <div className="resume-art">
                  <Image
                    className="resume-art-bg"
                    src="/app-art/resume.jpg"
                    alt=""
                    width={700}
                    height={392}
                    sizes="(max-width: 720px) 88vw, (max-width: 1100px) 44vw, 300px"
                  />
                  <Image
                    className="resume-art-img"
                    src="/app-art/resume.jpg"
                    alt=""
                    width={700}
                    height={392}
                    sizes="(max-width: 720px) 88vw, (max-width: 1100px) 44vw, 300px"
                  />
                </div>
                <div className="resume-meta">
                  <span>Continue watching</span>
                  <b>62%</b>
                </div>
                <div className="resume-track">
                  <i />
                </div>
              </div>
            </article>

            <article className="bento-card bento-card--list">
              <span className="bento-icon">
                <BookmarkIcon size={20} />
              </span>
              <h3>A watchlist that waits</h3>
              <p>Keep everything you want to watch in one tidy place.</p>
              <div className="poster-fan" aria-hidden="true">
                <Image className="fan-a" src="/app-art/poster-anime.jpg" alt="" width={212} height={290} sizes="82px" />
                <Image className="fan-b" src="/app-art/poster-series.jpg" alt="" width={212} height={290} sizes="82px" />
                <Image className="fan-c" src="/app-art/poster-movies.jpg" alt="" width={212} height={290} sizes="82px" />
              </div>
            </article>

            <article className="bento-card bento-card--download">
              <span className="bento-icon">
                <DownloadIcon size={20} />
              </span>
              <h3>Take it offline</h3>
              <p>Saved downloads stay in your library for when the signal drops.</p>
              <div className="offline-demo" aria-hidden="true">
                <div className="offline-row">
                  <span className="offline-thumb">
                    <Image
                      src="/app-art/offline.jpg"
                      alt=""
                      width={350}
                      height={570}
                      sizes="40px"
                    />
                  </span>
                  <div>
                    <b>Dr. STONE</b>
                    <small>12 of 24 · no signal needed</small>
                  </div>
                  <CheckIcon size={15} />
                </div>
                <span className="offline-chip">
                  <DownloadIcon size={11} />
                  Available offline
                </span>
              </div>
            </article>

            <article className="bento-card bento-card--versions">
              <span className="bento-icon">
                <LayersIcon size={20} />
              </span>
              <h3>No build left behind</h3>
              <p>Every public release stays listed with its notes, sizes and downloads.</p>
              <ul className="update-list" aria-hidden="true">
                <li className="is-current">
                  <i className="update-dot" />
                  <div>
                    <b>{release?.tag_name ?? "Latest stable"}</b>
                    <small>Newest release</small>
                  </div>
                  <span>APK</span>
                </li>
                <li>
                  <i className="update-dot" />
                  <div>
                    <b>Previous builds</b>
                    <small>Full notes kept</small>
                  </div>
                  <span>Listed</span>
                </li>
                <li>
                  <i className="update-dot" />
                  <div>
                    <b>Pre-releases</b>
                    <small>Clearly labelled</small>
                  </div>
                  <span>Tagged</span>
                </li>
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section screens-section">
        <div className="container">
          <Reveal className="screens-head">
            <div className="section-head">
              <span className="kicker">Inside the app</span>
              <h2 className="section-title">
                One library. <span className="text-gradient">Every mood.</span>
              </h2>
              <p>Anime, movies and series each get their own shelf — plus an offline corner for whatever you saved.</p>
            </div>
            <span className="screens-hint">
              Swipe to explore <ArrowRightIcon size={14} />
            </span>
          </Reveal>

          <Reveal delay={80}>
            <ul className="screens-track">
              {appScreens.map((screen, index) => (
                <li className="screen" key={screen.src}>
                  <div className="screen-frame">
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      width={720}
                      height={1544}
                      sizes="(max-width: 680px) 58vw, (max-width: 960px) 30vw, 220px"
                    />
                  </div>
                  <span className="screen-caption">
                    <span>0{index + 1}</span>
                    {screen.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container steps-layout">
          <Reveal className="section-head">
            <span className="kicker">Up and running</span>
            <h2 className="section-title">
              Installed in <span className="text-gradient">three steps.</span>
            </h2>
            <p>Android asks for one extra confirmation before it trusts a new app. Here&apos;s the short version.</p>
            <Link className="text-link" href="/install">
              Read the full install guide <ArrowRightIcon size={14} />
            </Link>
          </Reveal>

          <ol className="steps">
            {steps.map(([num, title, copy]) => (
              <li className="step" key={num}>
                <span className="step-num">{num}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container faq-layout">
          <Reveal className="section-head">
            <span className="kicker">Good to know</span>
            <h2 className="section-title">
              Questions, <span className="text-gradient">answered.</span>
            </h2>
            <p>The bits people usually ask before their first install.</p>
          </Reveal>

          <Reveal delay={80}>
            <Faq items={faqs} />
          </Reveal>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-panel">
            <FoxMark className="cta-fox" size={220} />
            <span className="kicker">Ready when you are</span>
            <h2>Chase something new tonight.</h2>
            <p>
              {apk
                ? `The latest stable KitsuPlay build for Android is ${formatBytes(apk.size)} — one tap away.`
                : "The latest stable KitsuPlay build for Android will appear here as soon as it is published."}
            </p>
            <div className="cta-actions">
              <a className="btn btn-dark" href={downloadHref} {...(apk ? { download: true } : {})}>
                {downloadLabel}
                <DownloadIcon size={18} />
              </a>
              <Link className="btn btn-outline-ink" href="/install">
                Install guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
