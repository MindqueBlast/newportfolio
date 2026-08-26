"use client";

import { CHAPTER_ORDER, CHAPTER_WEIGHTS, type ChapterId } from "@/lib/sections";
import { chapterLocalProgress } from "@/universe/camera-path";
import { timeline } from "@/content/timeline";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AwardCategory = "cs" | "math" | "science";

/** Chapters where the canvas receives pointer events for 3D picking. */
export const INTERACTIVE_CHAPTERS: ChapterId[] = [
  "journey",
  "projects",
  "skills",
  "awards",
  "focus",
];

type ScrollUniverseValue = {
  progress: number;
  setProgress: (n: number) => void;
  activeChapter: ChapterId;
  canvasInteractive: boolean;
  /** Scroll-driven journey index; optional jump override from a11y/click. */
  journeyIndex: number;
  setJourneyJump: (n: number | null) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  hoveredProjectId: string | null;
  setHoveredProjectId: (id: string | null) => void;
  selectedSkillDomain: string | null;
  setSelectedSkillDomain: (id: string | null) => void;
  selectedAwardId: string | null;
  setSelectedAwardId: (id: string | null) => void;
  /** Spatial category filter from 3D region exploration. */
  awardCategory: AwardCategory | null;
  setAwardCategory: (c: AwardCategory | null) => void;
  focusTopicId: string | null;
  setFocusTopicId: (id: string | null) => void;
  dismissedHints: Set<string>;
  dismissHint: (id: string) => void;
};

const ScrollUniverseContext = createContext<ScrollUniverseValue | null>(null);

export function ScrollUniverseProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState<ChapterId>("hero");
  const [journeyJump, setJourneyJump] = useState<number | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [selectedSkillDomain, setSelectedSkillDomain] = useState<string | null>(
    "ai-ml",
  );
  const [selectedAwardId, setSelectedAwardId] = useState<string | null>(null);
  const [awardCategory, setAwardCategory] = useState<AwardCategory | null>(
    null,
  );
  const [focusTopicId, setFocusTopicId] = useState<string | null>("ammoc");
  const [dismissedHints, setDismissedHints] = useState<Set<string>>(
    () => new Set(),
  );

  const scrollJourneyIndex = useMemo(() => {
    const u = chapterLocalProgress(progress, "journey");
    return Math.min(
      timeline.length - 1,
      Math.floor(u * timeline.length),
    );
  }, [progress]);

  const journeyIndex = journeyJump ?? scrollJourneyIndex;

  useEffect(() => {
    if (journeyJump !== null && activeChapter !== "journey") {
      setJourneyJump(null);
    }
  }, [activeChapter, journeyJump]);

  useEffect(() => {
    const total = CHAPTER_ORDER.reduce((s, id) => s + CHAPTER_WEIGHTS[id], 0);
    let acc = 0;
    let found: ChapterId = "hero";
    for (const id of CHAPTER_ORDER) {
      const next = (acc + CHAPTER_WEIGHTS[id]) / total;
      if (progress <= next || id === CHAPTER_ORDER[CHAPTER_ORDER.length - 1]) {
        found = id;
        break;
      }
      acc += CHAPTER_WEIGHTS[id];
    }
    setActiveChapter(found);
  }, [progress]);

  const canvasInteractive = INTERACTIVE_CHAPTERS.includes(activeChapter);

  const dismissHint = (id: string) => {
    setDismissedHints((prev) => new Set(prev).add(id));
  };

  const value = useMemo(
    () => ({
      progress,
      setProgress,
      activeChapter,
      canvasInteractive,
      journeyIndex,
      setJourneyJump,
      selectedProjectId,
      setSelectedProjectId,
      hoveredProjectId,
      setHoveredProjectId,
      selectedSkillDomain,
      setSelectedSkillDomain,
      selectedAwardId,
      setSelectedAwardId,
      awardCategory,
      setAwardCategory,
      focusTopicId,
      setFocusTopicId,
      dismissedHints,
      dismissHint,
    }),
    [
      progress,
      activeChapter,
      canvasInteractive,
      journeyIndex,
      selectedProjectId,
      hoveredProjectId,
      selectedSkillDomain,
      selectedAwardId,
      awardCategory,
      focusTopicId,
      dismissedHints,
    ],
  );

  return (
    <ScrollUniverseContext.Provider value={value}>
      {children}
    </ScrollUniverseContext.Provider>
  );
}

export function useScrollUniverse() {
  const ctx = useContext(ScrollUniverseContext);
  if (!ctx) {
    throw new Error("useScrollUniverse must be used within provider");
  }
  return ctx;
}

/** Section-weighted progress from chapter element positions. */
export function ScrollProgressBinder() {
  const { setProgress } = useScrollUniverse();

  useEffect(() => {
    const compute = () => {
      const nodes = CHAPTER_ORDER.map((id) =>
        document.getElementById(id),
      ).filter((el): el is HTMLElement => !!el);

      if (nodes.length < 2) {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
        return;
      }

      const scrollY = window.scrollY + window.innerHeight * 0.35;
      const starts = nodes.map((el) => el.offsetTop);
      const totalWeight = CHAPTER_ORDER.reduce(
        (s, id) => s + CHAPTER_WEIGHTS[id],
        0,
      );

      if (scrollY <= starts[0]) {
        setProgress(0);
        return;
      }

      let accWeight = 0;
      for (let i = 0; i < nodes.length - 1; i++) {
        const a = starts[i];
        const b = starts[i + 1];
        const w = CHAPTER_WEIGHTS[CHAPTER_ORDER[i]];
        if (scrollY <= b) {
          const u = (scrollY - a) / Math.max(1, b - a);
          const p = (accWeight + w * Math.min(1, Math.max(0, u))) / totalWeight;
          setProgress(p);
          return;
        }
        accWeight += w;
      }
      setProgress(1);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [setProgress]);

  return null;
}
