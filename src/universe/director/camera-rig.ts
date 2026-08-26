import type { ChapterId } from "@/lib/sections";
import { sampleCamera } from "../camera-path";

export type CameraRigSample = {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
};

const FOV_BY_CHAPTER: Partial<Record<ChapterId, number>> = {
  hero: 42,
  projects: 38,
  journey: 40,
};

/** Apply chapter-specific camera offsets on top of scroll path. */
export function sampleCameraRig(
  progress: number,
  activeChapter: ChapterId,
  pointer: { x: number; y: number },
  animate: boolean,
): CameraRigSample {
  const base = sampleCamera(progress);
  const parallax = animate ? 0.3 : 0;
  const fov = FOV_BY_CHAPTER[activeChapter] ?? 40;

  let [px, py, pz] = base.position;
  let [lx, ly, lz] = base.lookAt;

  px += pointer.x * parallax;
  py += pointer.y * parallax * 0.45;

  if (activeChapter === "projects") {
    py += 0.15;
  }
  if (activeChapter === "journey") {
    lz -= 0.4;
  }

  return {
    position: [px, py, pz],
    lookAt: [lx, ly, lz],
    fov,
  };
}
