import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "fenlens",
    title: "FenLens",
    summary:
      "Interactive chess computer-vision system that detects boards and classifies pieces from images.",
    description:
      "Interactive chess computer-vision system using TypeScript, React, classical computer vision, Web Workers, and ONNX neural networks to detect chessboards and classify pieces from images.",
    tech: [
      "TypeScript",
      "React",
      "Computer Vision",
      "Web Workers",
      "ONNX",
    ],
    tags: ["Computer Vision", "Chess", "ONNX"],
    tier: "flagship",
    constellation: { size: "lg", visual: "chess" },
    links: {
      demo: "https://fenlens.vercel.app",
      source: null,
    },
    era: "2025–2026",
  },
  {
    id: "smart-desk",
    title: "Smart Desk",
    summary:
      "Computer-vision focus and posture system with real-time telemetry.",
    description:
      "Computer-vision focus/posture system using Python, OpenCV, PnP pose estimation, facial/eye tracking, and Firebase for real-time telemetry and behavioral analysis.",
    tech: [
      "Python",
      "OpenCV",
      "PnP Pose",
      "Eye Tracking",
      "Firebase",
    ],
    tags: ["Computer Vision", "Telemetry", "Behavior"],
    tier: "flagship",
    constellation: { size: "lg", visual: "desk" },
    links: { demo: null, source: null },
    era: "2025–2026",
  },
  {
    id: "neuroevolution",
    title: "Neuroevolution Simulator",
    summary:
      "Fish evolve neural controllers under shark pressure through mutation and selection.",
    description:
      "Interactive evolutionary simulation built with JavaScript, HTML Canvas, neural networks, genetic algorithms, and custom physics/simulation architecture, where fish evolve brains through mutation and fitness-based selection to survive a shark.",
    tech: [
      "JavaScript",
      "Canvas",
      "Neural Networks",
      "Genetic Algorithms",
      "Physics Sim",
    ],
    tags: ["Neuroevolution", "Simulation", "Emergent"],
    tier: "flagship",
    constellation: { size: "lg", visual: "neuro" },
    links: { demo: null, source: null },
    era: "2025–2026",
  },
  {
    id: "black-hole-ray-tracer",
    title: "Black Hole Ray Tracer",
    summary:
      "Gravitational lensing and ray-traced black hole visualization — details forthcoming.",
    description:
      "Placeholder entry for a black hole / gravitational lensing ray-tracing project. Copy and links will be filled in when ready.",
    tech: ["Ray Tracing", "Physics", "Visualization"],
    tags: ["Astrophysics", "Graphics"],
    tier: "highlight",
    constellation: { size: "lg", visual: "lensing" },
    links: { demo: null, source: null },
    era: "2025–2026",
  },
  {
    id: "terrawatch",
    title: "TerraWatch",
    summary:
      "Geospatial / Earth observation system — details forthcoming.",
    description:
      "Placeholder entry for TerraWatch, a geospatial computing project. Copy and links will be filled in when ready.",
    tech: ["Geospatial", "Visualization"],
    tags: ["Earth", "Mapping"],
    tier: "highlight",
    constellation: { size: "lg", visual: "earth" },
    links: { demo: null, source: null },
    era: "2025–2026",
  },
  {
    id: "city-crisis",
    title: "City Crisis Simulation Dashboard",
    summary:
      "Graph-theory simulation of cascading infrastructure failures in a city.",
    description:
      "An interactive real-time simulation tool that models how failures propagate through a city’s infrastructure network using graph theory. Users can run different scenarios such as power grid failures, floods, or disease spread and observe how interconnected systems like transport, healthcare, and energy influence cascading effects. Built as a full-stack system with a Python backend simulation engine and a real-time web visualization frontend.",
    tech: [
      "Python",
      "NetworkX",
      "FastAPI",
      "JavaScript",
      "Canvas",
      "WebSockets",
    ],
    tags: ["Simulation", "Systems", "Real-time"],
    tier: "highlight",
    constellation: { size: "lg", visual: "network" },
    links: {
      demo: "https://city-crisis-simulator.vercel.app/",
      source: null,
    },
    era: "2025–2026",
  },
  {
    id: "debate-elo",
    title: "Debate Elo Tracker",
    summary:
      "MERN app for debate rankings, analytics, and Elo history.",
    description:
      "A full-stack MERN application for tracking competitive debate performance in real time. Features dynamic rankings, analytics visualizations, tournament management, and Elo history computation.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    tags: ["Full-stack", "Data"],
    tier: "supporting",
    constellation: { size: "sm", visual: "default" },
    links: {
      demo: "https://mindqueblast.github.io/debate-elo-tracker/",
      source: null,
    },
    era: "2024–2025",
  },
  {
    id: "chat-app",
    title: "Fullstack Chat App",
    summary: "Real-time MERN chat with rooms and authentication.",
    description:
      "A real-time chat application built with MERN stack supporting multiple rooms, user authentication, and live message updates.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    tier: "supporting",
    constellation: { size: "sm", visual: "default" },
    links: {
      demo: "https://mern-fullstack-chat-app-1ihp.onrender.com",
      source: null,
    },
    era: "2024–2025",
  },
  {
    id: "webcraft",
    title: "Webcraft Academy",
    summary: "Beginner web-dev lessons with interactive examples.",
    description:
      "A demo website teaching web development concepts with interactive examples and structured lessons for beginners.",
    tech: ["HTML", "CSS", "JavaScript", "React"],
    tier: "supporting",
    constellation: { size: "sm", visual: "default" },
    links: {
      demo: "https://khanacademy.org/cs/i/5407525888114688",
      source: null,
    },
    era: "2020–2022",
  },
  {
    id: "unity-game",
    title: "Unity Game Development",
    summary: "3D Unity exploration of mechanics, physics, and interaction.",
    description:
      "A 3D Unity game developed to explore game mechanics, physics, and interactive design.",
    tech: ["Unity", "C#"],
    tier: "supporting",
    constellation: { size: "md", visual: "default" },
    links: { demo: null, source: null },
    era: "2020–2022",
  },
  {
    id: "processingjs-games",
    title: "ProcessingJS Games",
    summary: "Dino platformer, zombie shooter, and other interactive demos.",
    description:
      "Created multiple games on Khan Academy: a Dino platformer, a top-down zombie shooter, and other interactive demos.",
    tech: ["ProcessingJS", "JavaScript"],
    tier: "supporting",
    constellation: { size: "sm", visual: "default" },
    links: {
      demo: "https://www.khanacademy.org/profile/kaid_336884561727810616466311/",
      source: null,
    },
    relatedAwardIds: ["khan-programming"],
    era: "2019–2022",
  },
  {
    id: "vex-robot",
    title: "VEX Science Olympiad Robot",
    summary: "PID-tuned VEX robot for precise competitive driving.",
    description:
      "Programmed a VEX robot with PID algorithms for precise driving, strafing, and turning, used in competitive robotics events.",
    tech: ["C++", "PID Control", "Robotics"],
    tier: "supporting",
    constellation: { size: "md", visual: "default" },
    links: {
      demo: null,
      source: "https://github.com/MindqueBlast/vex25-26",
    },
    relatedAwardIds: ["robot-tour-regional"],
    era: "2025–2026",
  },
  {
    id: "arduino-sorter",
    title: "Arduino Paper Folder Sorter",
    summary: "Webcam + Arduino sorter distinguishing cereal vs marshmallows.",
    description:
      "Built a tiny Arduino-controlled paper sorter using a webcam to detect Lucky Charms vs. Marshmallows, automating sorting tasks.",
    tech: ["Arduino", "Python", "Computer Vision"],
    tier: "supporting",
    constellation: { size: "sm", visual: "default" },
    links: { demo: null, source: null },
    era: "2023–2024",
  },
  {
    id: "rc-airplane",
    title: "Foam RC Airplane",
    summary: "Hand-built foam RC airplane exploring aerodynamics.",
    description:
      "Designed and constructed a functional foam RC airplane for recreational and educational purposes, experimenting with aerodynamics.",
    tech: ["Mechanical Design", "Electronics"],
    tier: "supporting",
    constellation: { size: "sm", visual: "default" },
    links: { demo: null, source: null },
    era: "2023–2024",
  },
  {
    id: "drone-nav",
    title: "Python Drone Navigation",
    summary: "CV landing-pad search and automated landing sequence.",
    description:
      "Coded a drone in Python capable of searching for a landing pad and performing an automated landing sequence.",
    tech: ["Python", "Computer Vision", "Drone Control"],
    tier: "supporting",
    constellation: { size: "md", visual: "default" },
    links: { demo: null, source: null },
    era: "2023–2024",
  },
];

export const flagships = projects.filter((p) => p.tier === "flagship");
export const highlights = projects.filter((p) => p.tier === "highlight");
export const supporting = projects.filter((p) => p.tier === "supporting");

export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}
