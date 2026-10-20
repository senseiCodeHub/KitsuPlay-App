import type { Metadata } from "next";
import Link from "next/link";
import { apkAsset, formatBytes, getLatestStableRelease } from "@/lib/github-releases";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon, CheckIcon, ChevronDownIcon, DownloadIcon, ShieldIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Installation Guide",
  description: "Learn how to safely download and install the official KitsuPlay Android APK."
};

const steps = [
  [
    "01",
    "Download the APK",
    "Tap the download button on this page. Your browser saves the file to your device's Downloads folder."
  ],
  [
    "02",
    "Open the downloaded file",
    "Open it from your browser's download list or your device's Downloads folder. Some browsers ask for confirmation first."
  ],
  [
    "03",
    "Allow installs for that app",
    "Android may ask you to allow your browser or file manager to install unknown apps. Grant it only for the app you used to open the APK, then go back."
  ],
  [
    "04",
    "Install and open KitsuPlay",
    "Confirm the install and wait for it to finish. If Android blocks it, check that the download completed and that your device is compatible."
  ]
];

const checklist = [
  "An Android phone or tablet — the APK does not run on iOS.",
  "Free storage for the download plus the installed app.",
  "The file downloaded from this site, not a third-party mirror.",
  "Permission to install unknown apps for your browser or file manager."
];

const troubleshooting = [
  {
    q: "The install button is greyed out",
    a: "Android may block an older build or an incomplete download. Delete the file, download it again from this page, and make sure your device's Android version supports the app."
  },
  {
    q: "Play Protect warns me about the app",
    a: "Play Protect flags anything installed outside the Play Store. Before continuing, compare the version and file size on this page with the file you downloaded."
  },
  {
    q: "I can't downgrade to an older version",
    a: "Android usually refuses to install an older version over a newer one. Uninstall KitsuPlay first, then install the older APK and your chosen version."
  },
  {
    q: "Where do I check for a newer build?",
    a: "The releases page lists every public build newest-first. The download panel on the home page always points at the latest stable release."
  }
];

export default async function InstallPage() {
  const release = await getLatestStableRelease();
  const apk = release ? apkAsset(release) : undefined;

  return (
    <section className="page">
      <div className="container">
        <header className="page-head">
          <span className="kicker">Quick setup</span>
          <h1>
            From download to <span className="text-gradient">first episode.</span>
          </h1>
          <p>
            Four short steps and you&apos;re in. Keep this page open while you install — it works nicely on a second screen.
          </p>
        </header>

        <div className="install-layout">
          <ol className="install-steps">
            {steps.map(([num, title, copy]) => (
              <li className="install-step" key={num}>
                <span className="install-step-num">{num}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="install-aside">
            <div className="aside-card">
              <h2>Before you start</h2>
              <p>Four things worth checking so the install goes smoothly.</p>
              <ul className="checklist">
                {checklist.map((item) => (
                  <li key={item}>
                    <CheckIcon size={14} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="install-download">
              <span className="kicker">Official Android build</span>
              <h2>{release && apk ? `${release.tag_name} · ${formatBytes(apk.size)}` : "Latest stable APK"}</h2>
              <p>
                {apk
                  ? "Served directly from the published GitHub release."
                  : "The download becomes available once the first APK release is published."}
              </p>
              <a
                className="btn btn-primary"
                href={apk ? apk.browser_download_url : "https://github.com/senseiCodeHub/KitsuPlay-App/releases"}
                {...(apk ? { download: true } : { target: "_blank", rel: "noreferrer" })}
              >
                {apk ? "Download APK" : "View releases"}
                {apk ? <DownloadIcon size={17} /> : <ArrowRightIcon size={15} />}
              </a>
            </div>

            <p className="aside-note">
              <ShieldIcon size={14} /> This site links to the project&apos;s own GitHub release assets — nothing is
              re-uploaded or mirrored.
            </p>
          </aside>
        </div>

        <div className="troubleshoot">
          <Reveal className="section-head">
            <span className="kicker">If it sticks</span>
            <h2 className="section-title">Common bumps, sorted.</h2>
            <p>Android throws a few predictable warnings at sideloaded apps. Here&apos;s what they usually mean.</p>
          </Reveal>

          <Reveal className="faq-list" delay={100}>
            {troubleshooting.map((item) => (
              <details className="faq" key={item.q}>
                <summary>
                  {item.q}
                  <ChevronDownIcon size={18} />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </Reveal>
        </div>

        <p className="back-link">
          <Link href="/">← Back to KitsuPlay home</Link>
        </p>
      </div>
    </section>
  );
}
