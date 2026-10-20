type IconProps = { className?: string; size?: number };

function base(size = 20) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true
  };
}

export function SearchIcon({ className, size }: IconProps) {
  return <svg {...base(size)} className={className}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>;
}

export function PlayIcon({ className, size }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M8 5.5v13l10-6.5-10-6.5Z" /></svg>;
}

export function BookmarkIcon({ className, size }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M6.5 4h11a1 1 0 0 1 1 1v15l-6.5-4.2L5.5 20V5a1 1 0 0 1 1-1Z" /></svg>;
}

export function DownloadIcon({ className, size }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M12 3.5v11" /><path d="m7.5 10.5 4.5 4.5 4.5-4.5" /><path d="M4.5 17.5v2a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-2" /></svg>;
}

export function LayersIcon({ className, size }: IconProps) {
  return <svg {...base(size)} className={className}><path d="m12 3.5 8.5 4.8-8.5 4.8-8.5-4.8L12 3.5Z" /><path d="m3.5 12.4 8.5 4.8 8.5-4.8" /><path d="m3.5 16.6 8.5 4.8 8.5-4.8" /></svg>;
}

export function SparkIcon({ className, size }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9L12 3.5Z" /><path d="M18.5 16.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" /></svg>;
}

export function CheckIcon({ className, size }: IconProps) {
  return <svg {...base(size)} className={className}><path d="m4.5 12.5 5 5 10-11" /></svg>;
}

export function ArrowRightIcon({ className, size }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M4.5 12h15" /><path d="m13.5 6 6 6-6 6" /></svg>;
}

export function ArrowUpRightIcon({ className, size }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M6.5 17.5 17.5 6.5" /><path d="M8.5 6.5h9v9" /></svg>;
}

export function ShieldIcon({ className, size }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M12 3.2 19 6v6.2c0 4.3-2.9 7.4-7 8.8-4.1-1.4-7-4.5-7-8.8V6l7-2.8Z" /><path d="m8.8 11.8 2.2 2.2 4.2-4.4" /></svg>;
}

export function AndroidIcon({ className, size }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M5 11.5a7 7 0 0 1 14 0v6.2a1.3 1.3 0 0 1-1.3 1.3H6.3A1.3 1.3 0 0 1 5 17.7v-6.2Z" /><path d="m7.4 5.6 1.4 2.1M16.6 5.6l-1.4 2.1" /><path d="M9.3 14.4h.01M14.7 14.4h.01" /></svg>;
}

export function CopyIcon({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="9" y="9" width="11" height="11" rx="2.4" />
      <path d="M15 5.5a1.5 1.5 0 0 0-1.5-1.5H5.5A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15" />
    </svg>
  );
}

export function ClockIcon({ className, size }: IconProps) {
  return <svg {...base(size)} className={className}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>;
}

export function ChevronDownIcon({ className, size }: IconProps) {
  return <svg {...base(size)} className={className}><path d="m6 9.5 6 6 6-6" /></svg>;
}

export function MenuIcon({ className, size }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M4 7.5h16M4 16.5h16" /></svg>;
}

export function CloseIcon({ className, size }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M6 6l12 12M18 6 6 18" /></svg>;
}
