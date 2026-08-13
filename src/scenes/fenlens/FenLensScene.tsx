"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

const PIECES = [
  { file: 0, rank: 0, label: "R", conf: 0.97 },
  { file: 1, rank: 0, label: "N", conf: 0.91 },
  { file: 2, rank: 0, label: "B", conf: 0.94 },
  { file: 3, rank: 0, label: "Q", conf: 0.88 },
  { file: 4, rank: 0, label: "K", conf: 0.96 },
  { file: 0, rank: 1, label: "P", conf: 0.99 },
  { file: 4, rank: 6, label: "p", conf: 0.93 },
  { file: 4, rank: 7, label: "k", conf: 0.95 },
];

function Board({ stage }: { stage: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.15;
  });

  const tiles = useMemo(() => {
    const out: { x: number; z: number; dark: boolean }[] = [];
    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        out.push({ x: f - 3.5, z: r - 3.5, dark: (r + f) % 2 === 1 });
      }
    }
    return out;
  }, []);

  return (
    <group ref={group} rotation={[-0.55, 0.35, 0]}>
      {tiles.map((t, i) => (
        <mesh key={i} position={[t.x * 0.55, 0, t.z * 0.55]}>
          <boxGeometry args={[0.5, 0.08, 0.5]} />
          <meshStandardMaterial
            color={t.dark ? "#2a3558" : "#d8e2ff"}
            emissive={stage >= 1 ? "#3ecfff" : "#000"}
            emissiveIntensity={stage >= 1 ? 0.05 : 0}
          />
        </mesh>
      ))}
      {stage >= 2
        ? PIECES.map((p, i) => (
            <mesh
              key={i}
              position={[(p.file - 3.5) * 0.55, 0.25, (p.rank - 3.5) * 0.55]}
            >
              <cylinderGeometry args={[0.14, 0.16, 0.35, 12]} />
              <meshStandardMaterial
                color={p.label === p.label.toUpperCase() ? "#f4f0e6" : "#1a1a22"}
                emissive="#c44b9a"
                emissiveIntensity={stage >= 3 ? 0.2 : 0}
              />
            </mesh>
          ))
        : null}
      {stage >= 1 ? (
        <lineLoop>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  -2.2, 0.06, -2.2, 2.2, 0.06, -2.2, 2.2, 0.06, 2.2, -2.2, 0.06,
                  2.2,
                ]),
                3,
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#3ecfff" />
        </lineLoop>
      ) : null}
    </group>
  );
}

export function FenLensScene({ dpr }: { dpr: number }) {
  const [stage, setStage] = useState(3);
  const stages = ["Idle", "Board find", "Grid", "Classify"];

  return (
    <div className="pointer-events-auto relative h-full w-full">
      <Canvas dpr={dpr} camera={{ position: [0, 3.2, 5.5], fov: 42 }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 5, 2]} intensity={1.1} />
        <Board stage={stage} />
      </Canvas>
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
        {stages.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => setStage(i)}
            className={`rounded-md px-2.5 py-1 text-[10px] uppercase tracking-wider ${
              stage === i
                ? "bg-[color:var(--cyan)]/30 text-[color:var(--cyan)]"
                : "bg-white/5 text-white/60"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="absolute right-3 top-3 rounded bg-black/40 px-2 py-1 font-mono text-[10px] text-[color:var(--stellar)]">
        FEN conf ~0.94 · Qd1
      </p>
    </div>
  );
}
