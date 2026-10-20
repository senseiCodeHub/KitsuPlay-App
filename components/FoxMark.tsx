type FoxMarkProps = { className?: string; size?: number; title?: string };

/** Geometric fox mark — geometric ears, cream muzzle, ember coat. */
export function FoxMark({ className, size = 44, title }: FoxMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id="fox-coat" x1="10" y1="8" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFC178" />
          <stop offset=".5" stopColor="#FF8A45" />
          <stop offset="1" stopColor="#F0571C" />
        </linearGradient>
      </defs>
      <path
        d="M9 5.5 24.5 15h15L55 5.5l2.2 18.2C57.2 39.4 46.6 50.4 32 55.5 17.4 50.4 6.8 39.4 6.8 23.7L9 5.5Z"
        fill="url(#fox-coat)"
      />
      <path d="M9 5.5 24.5 15l-3.9 9.1L9.8 12.4 9 5.5Z" fill="#FFE1BE" fillOpacity=".55" />
      <path d="M55 5.5 39.5 15l3.9 9.1 10.8-11.7L55 5.5Z" fill="#FFE1BE" fillOpacity=".35" />
      <path
        d="M32 25c7.4 0 13.1 5 13.1 11.4 0 7.3-5.9 13.3-13.1 17.1-7.2-3.8-13.1-9.8-13.1-17.1C18.9 30 24.6 25 32 25Z"
        fill="#FFF4E6"
      />
      <ellipse cx="25.4" cy="34.1" rx="2" ry="2.6" transform="rotate(-14 25.4 34.1)" fill="#180D07" />
      <ellipse cx="38.6" cy="34.1" rx="2" ry="2.6" transform="rotate(14 38.6 34.1)" fill="#180D07" />
      <path d="M32 40.4c1.7 0 3 .9 3 2s-1.3 1.7-3 1.7-3-.6-3-1.7 1.3-2 3-2Z" fill="#F0571C" />
      <path d="M32 44.1v2.4" stroke="#F0571C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
