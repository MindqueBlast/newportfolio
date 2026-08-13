import type { ExploringOrbit } from "./types";

export const exploring: ExploringOrbit[] = [
  {
    id: "ammoc",
    label: "AMMOC — Analysis & Linear Algebra",
    blurb:
      "Guided study through Real Analysis (incl. Tao) and Linear Algebra.",
    status: "active",
    researchId: "ammoc-analysis",
  },
  {
    id: "cv",
    label: "Computer vision systems",
    blurb: "Board detection, pose, telemetry — shipping interactive CV tools.",
    status: "active",
  },
  {
    id: "neuroevo",
    label: "Neuroevolution & sim",
    blurb: "Evolving controllers, fitness landscapes, emergent behavior.",
    status: "active",
  },
  {
    id: "robotics",
    label: "Robotics & control",
    blurb: "PID, VEX competition stacks, physical systems that move.",
    status: "active",
  },
  {
    id: "geospatial",
    label: "Geospatial computing",
    blurb: "Earth-scale data and spatial visualization (TerraWatch track).",
    status: "active",
  },
  {
    id: "astro-research",
    label: "Astrophysics research",
    blurb: "Future orbit — not started yet.",
    status: "planned",
    researchId: "astrophysics-future",
  },
];
