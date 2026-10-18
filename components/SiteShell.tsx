import Link from "next/link";

const iconLogo = "/img%20logo.png";
const textLogo = "/text%20logo.png";

function Brand() {
  return (
    <Link href="/" className="brand" aria-label="KitsuPlay home">
      <img src={iconLogo} alt="" width="34" height="34" style={{ objectFit: "contain", borderRadius: 9 }} />
      <img className="brand-wordmark" src={textLogo} alt="KitsuPlay" width="148" height="36" style={{ objectFit: "contain" }} />
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/#features">Features</Link>
          <Link href="/releases">Releases</Link>
          <Link href="/install">Install guide</Link>
        </nav>
        <Link className="header-cta" href="/#download">Get the app ↗</Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <Brand />
          <p>Your next watch starts here.</p>
        </div>
        <div className="footer-links">
          <Link href="/releases">All app versions</Link>
          <Link href="/install">Installation guide</Link>
          <a href="https://github.com/senseiCodeHub/KitsuPlay-App" target="_blank" rel="noreferrer">Source & releases ↗</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} KitsuPlay</span>
        <span>Official Android app downloads</span>
      </div>
    </footer>
  );
}
