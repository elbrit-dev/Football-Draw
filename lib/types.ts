export interface Team {
  /** FIFA-style 3-letter code, e.g. "ESP". */
  code: string;
  /** Display name, e.g. "Spain". */
  name: string;
  /** Path to a real flag image (public/); falls back to the inline SVG flag. */
  flag?: string;
}

/** The two finalists the doctor chooses between for the Champion prediction. */
export const TEAMS: Team[] = [
  { code: "ESP", name: "Spain", flag: "/spain-flag.png" },
  { code: "ARG", name: "Argentina", flag: "/argentina-flag.png" },
];

export interface PlayerOption {
  /** Stable id, unique within its own list. */
  id: string;
  name: string;
  country: string;
  /** 3-letter country code used by the <Flag> component. */
  countryCode: string;
}

/** Golden Boot — top scorer candidates (from the tournament goals table). */
export const GOLDEN_BOOT: PlayerOption[] = [
  { id: "mbappe", name: "Kylian Mbappé", country: "France", countryCode: "FRA" },
  { id: "messi", name: "Lionel Messi", country: "Argentina", countryCode: "ARG" },
  { id: "haaland", name: "Erling Haaland", country: "Norway", countryCode: "NOR" },
  { id: "kane", name: "Harry Kane", country: "England", countryCode: "ENG" },
  { id: "bellingham", name: "Jude Bellingham", country: "England", countryCode: "ENG" },
];

/** Golden Ball — best player candidates (from the assists table). */
export const GOLDEN_BALL: PlayerOption[] = [
  { id: "olise", name: "Michael Olise", country: "France", countryCode: "FRA" },
  { id: "brahim", name: "Brahim Díaz", country: "Morocco", countryCode: "MAR" },
  { id: "bruno", name: "Bruno Guimarães", country: "Brazil", countryCode: "BRA" },
  { id: "messi", name: "Lionel Messi", country: "Argentina", countryCode: "ARG" },
  { id: "odegaard", name: "Martin Ødegaard", country: "Norway", countryCode: "NOR" },
];

/** Golden Glove — best goalkeeper candidates. */
export const GOLDEN_GLOVE: PlayerOption[] = [
  { id: "emartinez", name: "Emiliano Martínez", country: "Argentina", countryCode: "ARG" },
  { id: "courtois", name: "Thibaut Courtois", country: "Belgium", countryCode: "BEL" },
  { id: "alisson", name: "Alisson Becker", country: "Brazil", countryCode: "BRA" },
  { id: "pickford", name: "Jordan Pickford", country: "England", countryCode: "ENG" },
  { id: "maignan", name: "Mike Maignan", country: "France", countryCode: "FRA" },
  { id: "usimon", name: "Unai Simón", country: "Spain", countryCode: "ESP" },
  { id: "bounou", name: "Yassine Bounou", country: "Morocco", countryCode: "MAR" },
];

/** The four predictions a doctor locks in on the first screen. */
export interface Predictions {
  team: Team;
  boot: PlayerOption;
  ball: PlayerOption;
  glove: PlayerOption;
}

export interface WorldCupEntry {
  name: string;
  email: string;
  phone: string;
  specialisation: string;
  city: string;
  clinic: string;
  /** Champion team. */
  team: string;
  teamCode: string;
  /** Golden Boot winner (player name). */
  goldenBoot: string;
  /** Golden Ball winner (player name). */
  goldenBall: string;
  /** Golden Glove winner (player name). */
  goldenGlove: string;
}

export interface StoredEntry extends WorldCupEntry {
  id: string;
  submittedAt: string;
}

export const SPECIALISATIONS = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "ENT Specialist",
  "Gastroenterologist",
  "Gynaecologist",
  "Neurologist",
  "Oncologist",
  "Orthopaedic Surgeon",
  "Paediatrician",
  "Psychiatrist",
  "Pulmonologist",
  "Radiologist",
  "Urologist",
  "Other",
] as const;
