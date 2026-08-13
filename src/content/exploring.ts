import type { ExploringOrbit } from "./types";

export const exploring: ExploringOrbit[] = [
  {
    id: "ammoc",
    label: "AMMOC — Analysis & Linear Algebra",
    blurb:
      "I'm working through Real Analysis (including Tao) and Linear Algebra in guided study.",
    status: "active",
    researchId: "ammoc-analysis",
  },
  {
    id: "cv",
    label: "Computer vision systems",
    blurb:
      "I'm building board detection, pose, and interactive CV tools I actually ship.",
    status: "active",
  },
  {
    id: "neuroevo",
    label: "Neuroevolution & sim",
    blurb:
      "I'm evolving controllers and watching fitness landscapes and emergent behavior.",
    status: "active",
  },
  {
    id: "robotics",
    label: "Robotics & control",
    blurb: "I'm into PID, VEX stacks, and physical systems that move.",
    status: "active",
  },
  {
    id: "geospatial",
    label: "Geospatial computing",
    blurb:
      "I'm exploring Earth-scale data and spatial visualization (TerraWatch track).",
    status: "active",
  },
  {
    id: "astro-research",
    label: "Astrophysics research",
    blurb: "Something I want to do — not started yet.",
    status: "planned",
    researchId: "astrophysics-future",
  },
];
