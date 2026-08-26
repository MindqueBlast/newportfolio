"use client";

import type { ChapterId } from "@/lib/sections";
import { chapterLocalProgress } from "@/universe/camera-path";
import { useScrollUniverse } from "@/universe/scroll-store";

/** Chapter-local 0–1 progress for scrubbed beats and section animations. */
export function useChapterProgress(chapter: ChapterId): number {
  const { progress } = useScrollUniverse();
  return chapterLocalProgress(progress, chapter);
}
