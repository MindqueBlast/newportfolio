import * as THREE from "three";

export type CameraWaypoint = {
  id: string;
  t: number; // 0..1 scroll progress
  position: [number, number, number];
  lookAt: [number, number, number];
};

/** Ordered flight path through the observatory. */
export const CAMERA_PATH: CameraWaypoint[] = [
  {
    id: "arrival",
    t: 0,
    position: [0, 1.2, 8.5],
    lookAt: [1.2, 0.2, 0],
  },
  {
    id: "signal",
    t: 0.12,
    position: [-1.5, 3.5, -6],
    lookAt: [0, 0, -10],
  },
  {
    id: "fenlens",
    t: 0.24,
    position: [2.5, 4.2, -18],
    lookAt: [0, 0.2, -22],
  },
  {
    id: "smart-desk",
    t: 0.36,
    position: [-3, 3.5, -30],
    lookAt: [0, 1.2, -34],
  },
  {
    id: "neuroevolution",
    t: 0.48,
    position: [0, 2.5, -44],
    lookAt: [0, 0, -48],
  },
  {
    id: "constellation",
    t: 0.6,
    position: [0, 4, -58],
    lookAt: [0, 0, -64],
  },
  {
    id: "exploring",
    t: 0.72,
    position: [2, 2.5, -74],
    lookAt: [0, 0, -78],
  },
  {
    id: "journey",
    t: 0.84,
    position: [-1, 2, -88],
    lookAt: [0, 0.5, -94],
  },
  {
    id: "contact",
    t: 1,
    position: [0, 1.5, -102],
    lookAt: [0, 0.4, -106],
  },
];

export const ZONE_ORIGIN = {
  arrival: new THREE.Vector3(1.2, 0, 0),
  signal: new THREE.Vector3(0, 0, -10),
  fenlens: new THREE.Vector3(0, 0, -22),
  smartDesk: new THREE.Vector3(0, 0, -34),
  neuro: new THREE.Vector3(0, 0, -48),
  constellation: new THREE.Vector3(0, 0, -64),
  exploring: new THREE.Vector3(0, 0, -78),
  journey: new THREE.Vector3(0, 0, -94),
  contact: new THREE.Vector3(0, 0.4, -106),
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
} {
  const p = Math.min(1, Math.max(0, progress));
  const path = CAMERA_PATH;
  if (p <= path[0].t) {
    return { position: path[0].position, lookAt: path[0].lookAt };
  }
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    if (p <= b.t) {
      const u = (p - a.t) / (b.t - a.t);
      const ease = u * u * (3 - 2 * u);
      return {
        position: lerpVec(a.position, b.position, ease),
        lookAt: lerpVec(a.lookAt, b.lookAt, ease),
      };
    }
  }
  const last = path[path.length - 1];
  return { position: last.position, lookAt: last.lookAt };
}
