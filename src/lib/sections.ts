export type ChapterId =
  | "hero"
  | "about"
  | "journey"
  | "projects"
  | "skills"
  | "awards"
  | "focus"
  | "chess"
  | "contact";

/** Ordered chapter ids for section-weighted camera progress. */
export const CHAPTER_ORDER: ChapterId[] = [
  "hero",
  "about",
  "journey",
  "projects",
  "skills",
  "awards",
  "focus",
  "chess",
  "contact",
];

/** Relative dwell weights (secondary moments get less). */
export const CHAPTER_WEIGHTS: Record<ChapterId, number> = {
  hero: 1.15,
  about: 1,
  journey: 1.75,
  projects: 1.65,
  skills: 1.15,
  awards: 1.2,
  focus: 1,
  chess: 0.5,
  contact: 0.85,
};

export const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#awards", label: "Awards" },
  { href: "#focus", label: "Focus" },
  { href: "#contact", label: "Contact" },
] as const;
