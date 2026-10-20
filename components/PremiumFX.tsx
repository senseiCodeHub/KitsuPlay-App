"use client";

import { useEffect } from "react";

const INTERACTIVE = "a, button, summary, [data-cursor]";
const MAGNETIC = ".btn, .header-cta";
const SPOTLIGHT = ".bento-card, .download-panel, .cta-panel, .release-card";

export function PremiumFX() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    const cursor = document.querySelector<HTMLElement>(".cursor");
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let shown = false;

    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (dot) dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      if (ring) ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    let magnet: HTMLElement | null = null;
    const resetMagnet = () => {
      if (!magnet) return;
      magnet.style.setProperty("--mx", "0px");
      magnet.style.setProperty("--my", "0px");
      magnet = null;
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!shown) {
        shown = true;
        ringX = targetX;
        ringY = targetY;
        cursor?.classList.add("is-visible");
      }

      const target = event.target as Element | null;
      cursor?.classList.toggle("is-active", !!target?.closest(INTERACTIVE));

      const nextMagnet = target?.closest<HTMLElement>(MAGNETIC) ?? null;
      if (magnet && magnet !== nextMagnet) resetMagnet();
      if (nextMagnet) {
        magnet = nextMagnet;
        const rect = nextMagnet.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        nextMagnet.style.setProperty("--mx", `${(x * 7).toFixed(2)}px`);
        nextMagnet.style.setProperty("--my", `${(y * 5).toFixed(2)}px`);
      }

      const card = target?.closest<HTMLElement>(SPOTLIGHT);
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      }
    };

    const onPointerLeave = () => {
      shown = false;
      cursor?.classList.remove("is-visible", "is-active");
      resetMagnet();
    };

    const onPointerDown = () => cursor?.classList.add("is-down");
    const onPointerUp = () => cursor?.classList.remove("is-down");

    document.addEventListener("pointermove", onPointerMove);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    // Subtle 3D tilt on the hero phone.
    const stage = document.querySelector<HTMLElement>(".hero-visual");
    const phone = stage?.querySelector<HTMLElement>(".phone");

    const onTilt = (event: PointerEvent) => {
      if (!stage || !phone) return;
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      phone.style.setProperty("--ry", `${(x * 11).toFixed(2)}deg`);
      phone.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
    };
    const resetTilt = () => {
      phone?.style.setProperty("--ry", "0deg");
      phone?.style.setProperty("--rx", "0deg");
    };

    if (stage && phone) {
      stage.addEventListener("pointermove", onTilt);
      stage.addEventListener("pointerleave", resetTilt);
    }

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      stage?.removeEventListener("pointermove", onTilt);
      stage?.removeEventListener("pointerleave", resetTilt);
      root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <span className="cursor-ring" />
      <span className="cursor-dot" />
    </div>
  );
}
