type Kind = "boot" | "ball" | "glove";

/**
 * Metallic-gold vector icons for the three player awards (Golden Boot / Ball /
 * Glove). Drawn on a 48×48 grid; scales cleanly to any icon size. Each uses a
 * unique gradient id so several can render on the same page.
 */
export default function AwardIcon({ kind, className }: { kind: Kind; className?: string }) {
  const gid = `award-gold-${kind}`;
  const dark = "#a9760a";
  return (
    <svg viewBox="0 0 48 48" width="100%" height="100%" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe89a" />
          <stop offset="0.45" stopColor="#f6c945" />
          <stop offset="1" stopColor="#c8890c" />
        </linearGradient>
      </defs>

      {kind === "boot" && (
        <g>
          <path
            d="M5 26c0-3 2-5 6-5h2l1.9-3c.6-.9 1.7-1.4 2.8-1.1l1.4.4c.7.2 1.1.9 1 1.6l-.3 2.1c5 .3 9.9 1 14.5 2.6 3.6 1.2 6.7 3.4 6.7 6.4 0 1.9-1.6 3-3.9 3H9c-2.5 0-4-1.4-4-3.5z"
            fill={`url(#${gid})`}
          />
          <path d="M20 22.6c4 .2 7.9.8 11.4 2" stroke={dark} strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <g fill={dark}>
            <rect x="10" y="32" width="2.4" height="3.1" rx="1.1" />
            <rect x="18" y="32" width="2.4" height="3.1" rx="1.1" />
            <rect x="27" y="32" width="2.4" height="3.1" rx="1.1" />
            <rect x="35" y="32" width="2.4" height="3.1" rx="1.1" />
          </g>
        </g>
      )}

      {kind === "ball" && (
        <g>
          <circle cx="24" cy="24" r="16.5" fill={`url(#${gid})`} />
          <polygon points="24,18.5 29.2,22.3 27.2,28.4 20.8,28.4 18.8,22.3" fill={dark} />
          <g stroke={dark} strokeWidth="1.5" strokeLinecap="round">
            <line x1="24" y1="18.5" x2="24" y2="9" />
            <line x1="29.2" y1="22.3" x2="38.6" y2="19.3" />
            <line x1="27.2" y1="28.4" x2="33" y2="36.3" />
            <line x1="20.8" y1="28.4" x2="15" y2="36.3" />
            <line x1="18.8" y1="22.3" x2="9.4" y2="19.3" />
          </g>
          <circle cx="24" cy="24" r="16.5" fill="none" stroke={dark} strokeWidth="1" />
        </g>
      )}

      {kind === "glove" && (
        <g>
          <rect x="9" y="27" width="5" height="10" rx="2.5" transform="rotate(-24 11 32)" fill={`url(#${gid})`} />
          <rect x="13" y="25" width="20.5" height="16" rx="5.5" fill={`url(#${gid})`} />
          <g fill={`url(#${gid})`}>
            <rect x="14.4" y="15" width="4.4" height="15" rx="2.2" />
            <rect x="19.5" y="12.5" width="4.4" height="17.5" rx="2.2" />
            <rect x="24.6" y="13.5" width="4.4" height="16.5" rx="2.2" />
            <rect x="29.4" y="16.5" width="4.4" height="13.5" rx="2.2" />
          </g>
          <rect x="14" y="38" width="18.5" height="6" rx="2.6" fill={dark} />
        </g>
      )}
    </svg>
  );
}
