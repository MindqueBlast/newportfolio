import type { SkillCategory } from "./types";

export const skills: SkillCategory[] = [
  {
    category: "Programming",
    items: [
      "Python",
      "TypeScript",
      "JavaScript",
      "React",
      "Node.js",
      "C++",
      "C#",
      "Java",
    ],
  },
  {
    category: "AI & ML",
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
    category: "Systems & hardware",
    items: ["Arduino", "Raspberry Pi", "VEX", "PID control", "Drones"],
  },
  {
    category: "Science & design",
    items: [
      "Linear algebra",
      "Real analysis",
      "Simulation",
      "Data visualization",
      "System design",
    ],
  },
];
