import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "./Icons";

const columns = [
  {
    title: "The app",
    links: [
      { label: "What's inside", href: "/#features" },
      { label: "Download APK", href: "/#download" },
      { label: "Install guide", href: "/install" }
    ]
  },
  {
    title: "Releases",
    links: [
      { label: "Every version", href: "/releases" },
      { label: "Latest build", href: "/#download" },
      { label: "GitHub releases", href: "https://github.com/senseiCodeHub/KitsuPlay-App/releases", external: true }
    ]
  },
  {
    title: "Project",
    links: [
      { label: "Source code", href: "https://github.com/senseiCodeHub/KitsuPlay-App", external: true },
      { label: "KitsuPlay on Android", href: "/install" }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand" aria-label="KitsuPlay home">
            <span className="brand-mark">
              <Image src="/brand-fox.png" alt="" width={34} height={34} />
            </span>
            <Image className="brand-wordmark" src="/brand-wordmark.png" alt="KitsuPlay" width={148} height={36} />
          </Link>
          <p>Quick as a fox. Built for your next favourite watch.</p>
          <span className="footer-pill">Official Android downloads</span>
        </div>

        {columns.map((column) => (
          <div className="footer-column" key={column.title}>
            <h2>{column.title}</h2>
            {column.links.map((link) =>
              link.external ? (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                  <ArrowUpRightIcon size={13} />
                </a>
              ) : (
                <Link key={link.label} href={link.href}>
                  {link.label}
                </Link>
              )
            )}
          </div>
        ))}
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} KitsuPlay · All rights reserved</span>
        <span className="footer-stamp">Made for Android</span>
      </div>
    </footer>
  );
}
