import type { ChapterId } from "@/lib/sections";

export type ChapterBeat = {
  fogColor: string;
  fogNear: number;
  fogFarBoost: number;
  bloomIntensity: number;
  ambient: number;
  accent: string;
};

export const CHAPTER_BEATS: Record<ChapterId, ChapterBeat> = {
  hero: {
    fogColor: "#050814",
    fogNear: 6,
    fogFarBoost: 0,
    bloomIntensity: 0.7,
    ambient: 0.22,
    accent: "#e879f9",
  },
  about: {
    fogColor: "#060818",
    fogNear: 7,
    fogFarBoost: 4,
    bloomIntensity: 0.6,
    ambient: 0.2,
    accent: "#a78bfa",
  },
  journey: {
    fogColor: "#08061a",
    fogNear: 8,
    fogFarBoost: 8,
    bloomIntensity: 0.65,
    ambient: 0.18,
    accent: "#67e8f9",
  },
  projects: {
    fogColor: "#06101c",
    fogNear: 9,
    fogFarBoost: 12,
    bloomIntensity: 0.75,
    ambient: 0.2,
    accent: "#fbbf24",
  },
  skills: {
    fogColor: "#071018",
    fogNear: 8,
    fogFarBoost: 10,
    bloomIntensity: 0.65,
    ambient: 0.2,
    accent: "#5eead4",
  },
  awards: {
    fogColor: "#0a0818",
    fogNear: 8,
    fogFarBoost: 10,
    bloomIntensity: 0.68,
    ambient: 0.19,
    accent: "#c4b5fd",
  },
  focus: {
    fogColor: "#050814",
    fogNear: 7,
    fogFarBoost: 8,
    bloomIntensity: 0.6,
    ambient: 0.2,
    accent: "#5eead4",
  },
  chess: {
    fogColor: "#0c0814",
    fogNear: 7,
    fogFarBoost: 6,
    bloomIntensity: 0.55,
    ambient: 0.21,
    accent: "#fbbf24",
  },
  contact: {
    fogColor: "#050814",
    fogNear: 6,
    fogFarBoost: 4,
    bloomIntensity: 0.62,
    ambient: 0.22,
    accent: "#5eead4",
  },
};

export function getChapterBeat(chapter: ChapterId): ChapterBeat {
  return CHAPTER_BEATS[chapter] ?? CHAPTER_BEATS.hero;
}
