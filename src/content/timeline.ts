import type { TimelineWaypoint } from "./types";

export const timeline: TimelineWaypoint[] = [
  {
    id: "start-coding",
    year: "2017",
    title: "I started coding",
    description:
      "I learned programming on Khan Academy at age 7, messing around with interactive graphics.",
    kind: "standard",
  },
  {
    id: "khan-complete",
    year: "2019",
    title: "I finished every Khan course",
    description:
      "I completed all the programming courses on Khan Academy and started building my own games.",
    kind: "standard",
  },
  {
    id: "games-comps",
    year: "2020–2022",
    title: "Games & competitions",
    description:
      "I made a bunch of games, won programming competitions, and pushed into deeper tutorials and platforms.",
    kind: "standard",
    awardIds: ["khan-programming"],
  },
  {
    id: "math-comps",
    year: "Math tournaments",
    title: "Competitive math",
    description:
      "I competed at Berkeley and Stanford math tournaments, earned AMO Silver, and an AMC Prize (top 0.3%).",
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
    title: "Hardware & robotics",
    description:
      "I spent a lot of time with Arduinos, wiring, drones, RC airframes, and early computer-vision automation.",
    kind: "standard",
  },
  {
    id: "scioly",
    year: "Science Olympiad",
    title: "Science Olympiad",
    description:
      "I placed regionally and at state in Astronomy, Robot Tour, Bungee Drop, Water Quality, and Experimental Design.",
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
      "I focused hard on AI/ML, fine-tuning, and neural applications — which led into agentic systems and teaching.",
    kind: "standard",
  },
  {
    id: "teaching-ssu",
    year: "Teaching",
    title: "I taught an Agentic AI workshop",
    description:
      "I ran an intensive Agentic AI workshop at Shri Shri University covering ML evaluation, data engineering, LLMs, PEFT, RAG, and agents.",
    kind: "standard",
    teachingId: "ssu-agentic-ai",
  },
  {
    id: "ammoc",
    year: "Now",
    title: "AMMOC — analysis & linear algebra",
    description:
      "I'm in guided study through Linear Algebra and Real Analysis, including Terence Tao’s analysis material.",
    kind: "standard",
    researchId: "ammoc-analysis",
  },
  {
    id: "flagships",
    year: "2025–2026",
    title: "Vision systems & simulations",
    description:
      "I've been shipping FenLens, Smart Desk, Neuroevolution, City Crisis, and related systems.",
    kind: "standard",
  },
  {
    id: "astro-planned",
    year: "Future",
    title: "Astrophysics research",
    description:
      "I want to do astrophysics research someday — I haven't started yet.",
    kind: "planned",
    researchId: "astrophysics-future",
  },
];
