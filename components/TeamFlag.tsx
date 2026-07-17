import Image from "next/image";
import Flag from "./Flag";
import { TEAMS } from "@/lib/types";

/**
 * Renders a team's real flag image (with crest) when one is configured in
 * TEAMS, falling back to the inline SVG <Flag> for every other country.
 * The parent element must be `position: relative` (fill image).
 */
export default function TeamFlag({ code }: { code: string }) {
  const team = TEAMS.find((t) => t.code === code);
  if (team?.flag) {
    return (
      <Image
        src={team.flag}
        alt={`${team.name} flag`}
        fill
        sizes="120px"
        style={{ objectFit: "cover" }}
      />
    );
  }
  return <Flag code={code} />;
}
