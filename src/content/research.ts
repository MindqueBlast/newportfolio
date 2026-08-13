import type { ResearchEntry } from "./types";

export const research: ResearchEntry[] = [
  {
    id: "ammoc-analysis",
    title: "AMMOC — Linear Algebra & Real Analysis",
    status: "active",
    summary:
      "I'm in ongoing AMMOC guided study covering Linear Algebra and Real Analysis, including Terence Tao’s analysis material.",
    links: { pdf: null, notes: null, external: null },
  },
  {
    id: "astrophysics-future",
    title: "Astrophysics research",
    status: "planned",
    summary:
      "I want this to be a future direction — I haven't started yet.",
    links: { pdf: null, notes: null, external: null },
  },
];

export const activeResearch = research.filter((r) => r.status === "active");
export const plannedResearch = research.filter((r) => r.status === "planned");
