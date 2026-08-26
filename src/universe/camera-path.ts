import * as THREE from "three";
import type { ChapterId } from "@/lib/sections";
import { CHAPTER_ORDER, CHAPTER_WEIGHTS } from "@/lib/sections";

export type CameraWaypoint = {
  id: ChapterId;
  t: number;
  position: [number, number, number];
  lookAt: [number, number, number];
};

function buildPath(): CameraWaypoint[] {
  const total = CHAPTER_ORDER.reduce((s, id) => s + CHAPTER_WEIGHTS[id], 0);
  let acc = 0;
  const positions: Record<
    ChapterId,
    { position: [number, number, number]; lookAt: [number, number, number] }
  > = {
    hero: { position: [0.2, 1.5, 9.5], lookAt: [1.4, 0.3, 0] },
    about: { position: [-2.4, 2.9, -6], lookAt: [0, 0.4, -10] },
    journey: { position: [0, 2.6, -20], lookAt: [0, 0.5, -26] },
    projects: { position: [0, 4.8, -38], lookAt: [0, 0.2, -44] },
    skills: { position: [-2.8, 3.4, -54], lookAt: [0, 0.4, -58] },
    awards: { position: [2.6, 3.0, -70], lookAt: [0, 0.6, -74] },
    focus: { position: [1.2, 2.5, -86], lookAt: [0, 0.3, -90] },
    chess: { position: [-1.6, 2.4, -98], lookAt: [0, 0.2, -102] },
    contact: { position: [0, 1.7, -110], lookAt: [0, 0.5, -114] },
  };

  return CHAPTER_ORDER.map((id) => {
    const t = acc / total;
    acc += CHAPTER_WEIGHTS[id];
    return { id, t, ...positions[id] };
  });
}

export const CAMERA_PATH: CameraWaypoint[] = buildPath();

export const ZONE_ORIGIN = {
  hero: new THREE.Vector3(1.4, 0, 0),
  about: new THREE.Vector3(0, 0.2, -10),
  journey: new THREE.Vector3(0, 0, -26),
  projects: new THREE.Vector3(0, 0, -44),
  skills: new THREE.Vector3(0, 0.3, -58),
  awards: new THREE.Vector3(0, 0.5, -74),
  focus: new THREE.Vector3(0, 0.2, -90),
  chess: new THREE.Vector3(0, 0.1, -102),
  contact: new THREE.Vector3(0, 0.4, -114),
} as const;

function lerpVec(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

export function sampleCamera(progress: number): {
  position: [number, number, number];
  lookAt: [number, number, number];
  chapterIndex: number;
} {
  const p = Math.min(1, Math.max(0, progress));
  const path = CAMERA_PATH;
  if (p <= path[0].t) {
    return {
      position: path[0].position,
      lookAt: path[0].lookAt,
      chapterIndex: 0,
    };
  }
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    if (p <= b.t || i === path.length - 2) {
      const span = Math.max(0.0001, b.t - a.t);
      const u = Math.min(1, Math.max(0, (p - a.t) / span));
      const ease = u * u * (3 - 2 * u);
      return {
        position: lerpVec(a.position, b.position, ease),
        lookAt: lerpVec(a.lookAt, b.lookAt, ease),
        chapterIndex: i,
      };
    }
  }
  const last = path[path.length - 1];
  return {
    position: last.position,
    lookAt: last.lookAt,
    chapterIndex: path.length - 1,
  };
}

/** 0–1 progress within a chapter's camera segment. */
export function chapterLocalProgress(
  progress: number,
  chapter: ChapterId,
): number {
  const idx = CHAPTER_ORDER.indexOf(chapter);
  if (idx < 0) return 0;
  const a = CAMERA_PATH[idx];
  const b = CAMERA_PATH[idx + 1];
  const end = b ? b.t : 1;
  const span = Math.max(0.0001, end - a.t);
  return Math.min(1, Math.max(0, (progress - a.t) / span));
}
