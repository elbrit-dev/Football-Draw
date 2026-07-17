interface FlagProps {
  /** 3-letter code: ESP, ARG, FRA, NOR, ENG, MAR, BRA, BEL. */
  code: string;
  className?: string;
}

/**
 * Inline SVG flags (simplified) for every team / country used in the
 * predictions. Rendered inside a rounded, clipped box via CSS.
 */
export default function Flag({ code, className }: FlagProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 90 60"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {code === "ESP" && (
        <>
          <rect width="90" height="60" fill="#C60B1E" />
          <rect y="15" width="90" height="30" fill="#FFC400" />
        </>
      )}
      {code === "ARG" && (
        <>
          <rect width="90" height="60" fill="#74ACDF" />
          <rect y="20" width="90" height="20" fill="#fff" />
          <circle cx="45" cy="30" r="7.5" fill="#F6B40E" />
          <circle cx="45" cy="30" r="4.6" fill="#F6B40E" stroke="#E09A00" strokeWidth="1" />
        </>
      )}
      {code === "FRA" && (
        <>
          <rect width="30" height="60" fill="#0055A4" />
          <rect x="30" width="30" height="60" fill="#fff" />
          <rect x="60" width="30" height="60" fill="#EF4135" />
        </>
      )}
      {code === "BEL" && (
        <>
          <rect width="30" height="60" fill="#0f0f0f" />
          <rect x="30" width="30" height="60" fill="#FDDA24" />
          <rect x="60" width="30" height="60" fill="#EF3340" />
        </>
      )}
      {code === "ENG" && (
        <>
          <rect width="90" height="60" fill="#fff" />
          <rect x="39" width="12" height="60" fill="#CE1124" />
          <rect y="24" width="90" height="12" fill="#CE1124" />
        </>
      )}
      {code === "NOR" && (
        <>
          <rect width="90" height="60" fill="#BA0C2F" />
          <rect x="18" width="16" height="60" fill="#fff" />
          <rect y="22" width="90" height="16" fill="#fff" />
          <rect x="22" width="8" height="60" fill="#00205B" />
          <rect y="26" width="90" height="8" fill="#00205B" />
        </>
      )}
      {code === "MAR" && (
        <>
          <rect width="90" height="60" fill="#C1272D" />
          <polygon
            points="45,15 48.53,25.15 59.27,25.36 50.71,31.85 53.82,42.14 45,36 36.18,42.14 39.29,31.85 30.73,25.36 41.47,25.15"
            fill="none"
            stroke="#006233"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        </>
      )}
      {code === "BRA" && (
        <>
          <rect width="90" height="60" fill="#009C3B" />
          <polygon points="45,7 83,30 45,53 7,30" fill="#FFDF00" />
          <circle cx="45" cy="30" r="12.5" fill="#002776" />
        </>
      )}
    </svg>
  );
}
