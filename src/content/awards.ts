import type { Award } from "./types";

export const awards: Award[] = [
  {
    id: "khan-programming",
    badge: "Winner",
    title: "Khan Academy Programming Competitions",
    description:
      "Won multiple competitions for games and interactive projects built using ProcessingJS.",
    domain: "cs",
  },
  {
    id: "berkeley-math",
    badge: "Distinguished Honorable Mention",
    title: "Berkeley Math Tournament",
    description: "Awarded for Algebra",
    domain: "math",
  },
  {
    id: "stanford-math",
    badge: "Honorable Mention",
    title: "Stanford Math Tournament",
    description: "Awarded for Algebra.",
    domain: "math",
  },
  {
    id: "amo-silver",
    badge: "Silver Award",
    title: "American Mathematics Olympiad",
    description:
      "Recognized for outstanding achievement in national mathematics competitions.",
    domain: "math",
  },
  {
    id: "amc-prize",
    badge: "Prize Award",
    title: "Australian Mathematics Competition",
    description: "Placed in the top 0.3% of participants internationally.",
    domain: "math",
  },
  {
    id: "bungee-drop",
    badge: "1st Place",
    title: "Bungee Drop — Regional Science Olympiad",
    description: "Won first place at the regional Science Olympiad competition.",
    domain: "science",
  },
  {
    id: "astronomy-regional",
    badge: "1st Place",
    title: "Astronomy — Regional Science Olympiad",
    description: "Won first place at the regional Science Olympiad competition.",
    domain: "science",
  },
  {
    id: "robot-tour-regional",
    badge: "5th Place",
    title: "Robot Tour — Regional Science Olympiad",
    description:
      "Placed fifth at the regional Science Olympiad competition, showcasing robotics and PID control skills.",
    domain: "science",
  },
  {
    id: "water-quality",
    badge: "2nd Place",
    title: "Water Quality — Regional Science Olympiad",
    description:
      "Placed second at the regional Science Olympiad competition with hands-on environmental analysis and data collection.",
    domain: "science",
  },
  {
    id: "experimental-design",
    badge: "3rd Place",
    title: "Experimental Design — Regional Science Olympiad",
    description:
      "Placed third at the regional Science Olympiad competition for designing and testing a novel experiment.",
    domain: "science",
  },
  {
    id: "astronomy-state",
    badge: "5th Place",
    title: "Astronomy — New York State Science Olympiad",
    description:
      "Placed fifth in the state-level Astronomy competition, demonstrating advanced understanding of celestial events.",
    domain: "science",
  },
];

export function getAwardsByIds(ids: string[] | undefined) {
  if (!ids?.length) return [];
  return awards.filter((a) => ids.includes(a.id));
}
