export type ProjectTier = "flagship" | "highlight" | "supporting";

export type ConstellationVisual =
  | "chess"
  | "desk"
  | "neuro"
  | "lensing"
  | "earth"
  | "network"
  | "default";

export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  tags?: string[];
  tier: ProjectTier;
  constellation?: {
    size: "lg" | "md" | "sm";
    visual: ConstellationVisual;
  };
  links: { demo: string | null; source: string | null };
  relatedAwardIds?: string[];
  era?: string;
};

export type Award = {
  id: string;
  badge: string;
  title: string;
  description: string;
  domain: "cs" | "math" | "science" | "other";
};

export type ResearchEntry = {
  id: string;
  title: string;
  status: "active" | "planned";
  summary: string;
  links: { pdf: string | null; notes: string | null; external: string | null };
};

export type TeachingEntry = {
  id: string;
  title: string;
  venue: string;
  summary: string;
  links: { slides: string | null; materials: string | null; url: string | null };
};

export type ChessIdentity = {
  ratings: {
    chesscomRapid: string;
    lichessRapid: string;
    uscfClassical: string;
  };
  goal: string;
  links: {
    chesscom: string | null;
    lichess: string | null;
    uscf: string | null;
  };
};

export type TimelineWaypoint = {
  id: string;
  year: string;
  title: string;
  description: string;
  kind: "standard" | "future" | "planned";
  awardIds?: string[];
  researchId?: string;
  teachingId?: string;
};

export type ExploringOrbit = {
  id: string;
  label: string;
  blurb: string;
  status: "active" | "planned";
  researchId?: string;
};

export type SkillCategory = {
  category: string;
  items: string[];
};
