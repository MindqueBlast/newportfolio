export type ChapterId =
  | "arrival"
  | "about"
  | "journey"
  | "research"
  | "fenlens"
  | "smart-desk"
  | "neuroevolution"
  | "constellation"
  | "skills"
  | "awards"
  | "exploring"
  | "chess"
  | "contact";

/** Ordered chapter ids for section-weighted camera progress. */
export const CHAPTER_ORDER: ChapterId[] = [
  "arrival",
  "about",
  "journey",
  "research",
  "fenlens",
  "smart-desk",
  "neuroevolution",
  "constellation",
  "skills",
  "awards",
  "exploring",
  "chess",
  "contact",
];

/** Relative dwell weights (secondary moments get less). */
export const CHAPTER_WEIGHTS: Record<ChapterId, number> = {
  arrival: 1.1,
  about: 1,
  journey: 1.6,
  research: 0.55,
  fenlens: 0.9,
  "smart-desk": 0.9,
  neuroevolution: 1.05,
  constellation: 1.5,
  skills: 1.15,
  awards: 1.15,
  exploring: 0.95,
  chess: 0.55,
  contact: 0.85,
};

export const NAV_LINKS = [
  { href: "#arrival", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#fenlens", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#awards", label: "Awards" },
  { href: "#exploring", label: "Focus" },
  { href: "#contact", label: "Contact" },
] as const;
