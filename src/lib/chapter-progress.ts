import type { ChapterId } from "@/lib/sections";
import { chapterLocalProgress } from "@/universe/camera-path";

/** Active timeline index from global scroll progress. */
export function journeyWaypointIndex(
  progress: number,
  length: number,
): number {
  const u = chapterLocalProgress(progress, "journey");
  return Math.min(length - 1, Math.floor(u * length));
}

export function isNearChapter(
  progress: number,
  chapter: ChapterId,
  pad = 0.04,
): boolean {
  const u = chapterLocalProgress(progress, chapter);
  return u > -pad && u < 1 + pad;
}
