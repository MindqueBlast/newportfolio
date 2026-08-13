import type { TimelineWaypoint } from "./types";

export const timeline: TimelineWaypoint[] = [
  {
    id: "start-coding",
    year: "2017",
    title: "Started coding",
    description:
      "Learned programming on Khan Academy at age 7, experimenting with basic interactive graphics.",
    kind: "standard",
  },
  {
    id: "khan-complete",
    year: "2019",
    title: "Completed all Khan courses",
    description:
      "Finished every programming course on Khan Academy and started building custom games.",
    kind: "standard",
  },
  {
    id: "games-comps",
    year: "2020–2022",
    title: "Games & competitions",
    description:
      "Created multiple games, won programming competitions, and moved into deeper tutorials and platforms.",
    kind: "standard",
    awardIds: ["khan-programming"],
  },
  {
    id: "math-comps",
    year: "Math tournaments",
    title: "Competitive mathematics",
    description:
      "Berkeley and Stanford math tournaments, AMO Silver, and AMC Prize (top 0.3%).",
    kind: "standard",
    awardIds: [
      "berkeley-math",
      "stanford-math",
      "amo-silver",
      "amc-prize",
    ],
  },
  {
    id: "hardware",
    year: "2023–2024",
    title: "Hardware & robotics experiments",
    description:
      "Arduinos, wiring, drones, RC airframes, and early computer-vision automation.",
    kind: "standard",
  },
  {
    id: "scioly",
    year: "Science Olympiad",
    title: "Science Olympiad placements",
    description:
      "Regional and state results across Astronomy, Robot Tour, Bungee Drop, Water Quality, and Experimental Design.",
    kind: "standard",
    awardIds: [
      "bungee-drop",
      "astronomy-regional",
      "robot-tour-regional",
      "water-quality",
      "experimental-design",
      "astronomy-state",
    ],
  },
  {
    id: "ai-ml",
    year: "Summer 2025",
    title: "AI & machine learning",
    description:
      "Focused on AI/ML, fine-tuning, and neural applications — leading into agentic systems and teaching.",
    kind: "standard",
  },
  {
    id: "teaching-ssu",
    year: "Teaching",
    title: "Agentic AI workshop",
    description:
      "Intensive Agentic AI workshop at Shri Shri University spanning ML evaluation, data engineering, LLMs, PEFT, RAG, and agent workflows.",
    kind: "standard",
    teachingId: "ssu-agentic-ai",
  },
  {
    id: "ammoc",
    year: "Now",
    title: "AMMOC — analysis & linear algebra",
    description:
      "Guided study in Linear Algebra and Real Analysis, including Terence Tao’s analysis material.",
    kind: "standard",
    researchId: "ammoc-analysis",
  },
  {
    id: "flagships",
    year: "2025–2026",
    title: "Vision systems & simulations",
    description:
      "FenLens, Smart Desk, Neuroevolution, City Crisis, and related engineering systems.",
    kind: "standard",
  },
  {
    id: "astro-planned",
    year: "Future",
    title: "Astrophysics research",
    description:
      "Planned direction — not started. Placeholder for future research.",
    kind: "planned",
    researchId: "astrophysics-future",
  },
];
