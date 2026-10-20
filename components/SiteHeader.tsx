"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRightIcon, CloseIcon, MenuIcon } from "./Icons";

const links = [
  { href: "/#features", label: "Features", path: "/" },
  { href: "/releases", label: "Releases", path: "/releases" },
  { href: "/install", label: "Install guide", path: "/install" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="site-header" data-scrolled={scrolled} data-open={open}>
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="KitsuPlay home">
            <span className="brand-mark">
              <Image src="/brand-fox.png" alt="" width={38} height={38} priority />
            </span>
            <Image className="brand-wordmark" src="/brand-wordmark.png" alt="KitsuPlay" width={148} height={36} priority />
          </Link>

          <nav className="nav-links" aria-label="Main navigation">
            {links.map((link) => {
              const active = !link.href.includes("#") && pathname.startsWith(link.path);
              return (
                <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="header-actions">
            <Link className="header-cta" href="/#download">
              <span>Get the app</span>
              <ArrowUpRightIcon size={14} />
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="mobile-nav" id="mobile-nav">
          <nav className="container mobile-nav-inner" aria-label="Mobile navigation">
            {links.map((link, index) => (
              <Link key={link.href} href={link.href} style={{ animationDelay: `${60 + index * 55}ms` }}>
                <span className="mobile-nav-index">0{index + 1}</span>
                {link.label}
                <ArrowUpRightIcon size={16} />
              </Link>
            ))}
            <Link className="btn btn-primary mobile-nav-cta" href="/#download" style={{ animationDelay: "230ms" }}>
              Download for Android
            </Link>
            <p className="mobile-nav-note">Free download · Android APK · Every version archived</p>
          </nav>
        </div>
      )}
    </>
  );
}
