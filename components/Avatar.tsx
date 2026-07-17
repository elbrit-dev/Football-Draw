interface AvatarProps {
  name: string;
}

/** Deterministic soft gradient from the player's name (no photos shipped). */
function hueFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function Avatar({ name }: AvatarProps) {
  const h = hueFor(name);
  return (
    <span
      className="pl-avatar"
      style={{
        background: `linear-gradient(145deg, hsl(${h} 55% 42%), hsl(${(h + 40) % 360} 60% 26%))`,
      }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
