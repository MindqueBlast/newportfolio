import type { SkillCategory } from "./types";

/** Domain-centric skills for the instrument map. */
export type SkillDomain = {
  id: string;
  label: string;
  blurb: string;
  items: string[];
};

export const skillDomains: SkillDomain[] = [
  {
    id: "ai-ml",
    label: "AI / ML",
    blurb: "Models, agents, and learning systems.",
    items: [
      "PyTorch",
      "TensorFlow",
      "ONNX",
      "Neuroevolution",
      "Agentic systems",
      "PEFT / RAG",
    ],
  },
  {
    id: "cv",
    label: "Computer Vision",
    blurb: "Perception pipelines from classical CV to neural classifiers.",
    items: ["OpenCV", "ONNX", "Web Workers", "Pose / PnP", "Board detection"],
  },
  {
    id: "fullstack",
    label: "Full Stack",
    blurb: "Product surfaces with realtime backends.",
    items: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "FastAPI"],
  },
  {
    id: "robotics",
    label: "Robotics",
    blurb: "Control loops and physical systems that move.",
    items: ["PID control", "VEX", "C++", "Drone nav", "Arduino"],
  },
  {
    id: "math",
    label: "Mathematics",
    blurb: "Structure, proof, and competitive problem-solving.",
    items: ["Linear algebra", "Real analysis", "Competition math"],
  },
  {
    id: "physics",
    label: "Physics / SciComp",
    blurb: "Simulation, ray tracing, and scientific visualization.",
    items: ["WebGL / GLSL", "Geodesics", "Simulation", "Three.js"],
  },
  {
    id: "geospatial",
    label: "Geospatial",
    blurb: "Earth-scale imagery and spatial analytics.",
    items: ["Sentinel-2", "NDVI", "Leaflet", "Planetary Computer", "xarray"],
  },
  {
    id: "embedded",
    label: "Embedded Systems",
    blurb: "Hardware, sensing, and constrained compute.",
    items: ["Arduino", "Raspberry Pi", "Sensors", "Electronics"],
  },
];

/** Legacy chip categories (kept for compatibility). */
export const skills: SkillCategory[] = skillDomains.map((d) => ({
  category: d.label,
  items: d.items,
}));
