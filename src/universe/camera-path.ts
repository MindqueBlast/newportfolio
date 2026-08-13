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
    arrival: { position: [0.2, 1.4, 9.2], lookAt: [1.4, 0.3, 0] },
    about: { position: [-2.2, 2.8, -4], lookAt: [0, 0.4, -8] },
    journey: { position: [0, 2.4, -16], lookAt: [0, 0.6, -22] },
    research: { position: [2.2, 2.2, -28], lookAt: [0.5, 0.5, -32] },
    fenlens: { position: [2.8, 4.0, -40], lookAt: [0, 0.3, -44] },
    "smart-desk": { position: [-3.2, 3.4, -52], lookAt: [0, 1.1, -56] },
    neuroevolution: { position: [0.5, 2.6, -64], lookAt: [0, 0.2, -68] },
    constellation: { position: [0, 4.5, -78], lookAt: [0, 0.2, -84] },
    skills: { position: [-2.5, 3.2, -94], lookAt: [0, 0.5, -98] },
    awards: { position: [2.5, 2.8, -108], lookAt: [0, 0.8, -112] },
    exploring: { position: [1.5, 2.4, -120], lookAt: [0, 0.3, -124] },
    chess: { position: [-1.8, 2.6, -132], lookAt: [0, 0.2, -136] },
    contact: { position: [0, 1.6, -144], lookAt: [0, 0.5, -148] },
  };

  return CHAPTER_ORDER.map((id) => {
    const t = acc / total;
    acc += CHAPTER_WEIGHTS[id];
    return { id, t, ...positions[id] };
  });
}

export const CAMERA_PATH: CameraWaypoint[] = buildPath();

export const ZONE_ORIGIN = {
  arrival: new THREE.Vector3(1.4, 0, 0),
  about: new THREE.Vector3(0, 0.2, -8),
  journey: new THREE.Vector3(0, 0, -22),
  research: new THREE.Vector3(0.5, 0.3, -32),
  fenlens: new THREE.Vector3(0, 0, -44),
  smartDesk: new THREE.Vector3(0, 0, -56),
  neuro: new THREE.Vector3(0, 0, -68),
  constellation: new THREE.Vector3(0, 0, -84),
  skills: new THREE.Vector3(0, 0.3, -98),
  awards: new THREE.Vector3(0, 0.5, -112),
  exploring: new THREE.Vector3(0, 0.2, -124),
  chess: new THREE.Vector3(0, 0.1, -136),
  contact: new THREE.Vector3(0, 0.4, -148),
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

/** 0–1 progress within a chapter’s camera segment. */
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
