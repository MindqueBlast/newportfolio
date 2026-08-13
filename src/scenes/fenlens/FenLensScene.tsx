"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useGraphicsMode } from "@/lib/use-graphics-mode";

const PIECES = [
  { file: 0, rank: 0, h: 0.42, conf: 0.97 },
  { file: 1, rank: 0, h: 0.38, conf: 0.91 },
  { file: 2, rank: 0, h: 0.4, conf: 0.94 },
  { file: 3, rank: 0, h: 0.48, conf: 0.88 },
  { file: 4, rank: 0, h: 0.52, conf: 0.96 },
  { file: 0, rank: 1, h: 0.28, conf: 0.99 },
  { file: 1, rank: 1, h: 0.28, conf: 0.98 },
  { file: 4, rank: 6, h: 0.28, conf: 0.93 },
  { file: 4, rank: 7, h: 0.5, conf: 0.95 },
  { file: 3, rank: 7, h: 0.46, conf: 0.9 },
];

function Board({ stage, animate }: { stage: number; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current || !animate) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.28;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.05;
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
    <Float speed={animate ? 1 : 0} floatIntensity={0.2}>
      <group ref={group} rotation={[-0.65, 0.45, 0]} position={[0, -0.2, 0]}>
        <mesh position={[0, -0.12, 0]} receiveShadow>
          <boxGeometry args={[4.8, 0.18, 4.8]} />
          <meshStandardMaterial color="#1a2233" roughness={0.7} />
        </mesh>
        {tiles.map((t, i) => (
          <mesh key={i} position={[t.x * 0.55, 0, t.z * 0.55]}>
            <boxGeometry args={[0.52, 0.1, 0.52]} />
            <meshStandardMaterial
              color={t.dark ? "#243044" : "#e8dcc8"}
              emissive={stage >= 1 ? "#7ec8c4" : "#000"}
              emissiveIntensity={stage >= 1 ? 0.08 : 0}
              roughness={0.45}
            />
          </mesh>
        ))}
        {stage >= 2
          ? PIECES.map((p, i) => (
              <mesh
                key={i}
                position={[
                  (p.file - 3.5) * 0.55,
                  p.h / 2 + 0.05,
                  (p.rank - 3.5) * 0.55,
                ]}
              >
                <cylinderGeometry args={[0.13, 0.16, p.h, 16]} />
                <meshStandardMaterial
                  color={p.rank < 2 ? "#f3efe6" : "#1a1a22"}
                  emissive={stage >= 3 ? "#e8a45a" : "#000"}
                  emissiveIntensity={stage >= 3 ? 0.35 * p.conf : 0}
                  metalness={0.3}
                  roughness={0.35}
                />
              </mesh>
            ))
          : null}
        {stage >= 1 ? (
          <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.15, 2.22, 64]} />
            <meshBasicMaterial color="#7ec8c4" transparent opacity={0.7} />
          </mesh>
        ) : null}
      </group>
      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.45}
        scale={10}
        blur={2.5}
        far={4}
      />
    </Float>
  );
}

export function FenLensScene({ dpr }: { dpr: number }) {
  const [stage, setStage] = useState(3);
  const { mode } = useGraphicsMode();
  const animate = mode === "full";
  const stages = ["Idle", "Board find", "Grid", "Classify"];

  return (
    <div className="pointer-events-auto relative h-full w-full">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 3.8, 6.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0a1220"]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 3]} intensity={1.3} color="#f0d7a8" />
        <pointLight position={[-3, 2, 2]} intensity={0.8} color="#7ec8c4" />
        <Board stage={stage} animate={animate} />
        <EffectComposer>
          <Bloom intensity={0.4} luminanceThreshold={0.4} mipmapBlur />
        </EffectComposer>
      </Canvas>
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
        {stages.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => setStage(i)}
            className={`rounded-full px-3 py-1.5 text-[10px] uppercase tracking-wider ${
              stage === i
                ? "bg-[color:var(--stellar)] text-[#1a1208]"
                : "bg-white/10 text-white/70"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="absolute right-3 top-3 rounded-md bg-black/50 px-2.5 py-1.5 font-mono text-[11px] text-[color:var(--signal)] backdrop-blur">
        FEN conf ~0.94 · Qd1
      </p>
    </div>
  );
}
