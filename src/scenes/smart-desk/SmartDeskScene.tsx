"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

function DeskRig({ focus, posture }: { focus: number; posture: number }) {
  const head = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!head.current) return;
    head.current.position.y = 1.35 + Math.sin(clock.elapsedTime) * 0.02;
    head.current.rotation.x = (1 - posture) * 0.35;
  });

  return (
    <group>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[2.4, 0.12, 1.2]} />
        <meshStandardMaterial color="#2c3a5e" />
      </mesh>
      <mesh position={[0, 0.85, -0.35]}>
        <boxGeometry args={[0.9, 0.55, 0.08]} />
        <meshStandardMaterial color="#1a2238" emissive="#3ecfff" emissiveIntensity={0.15} />
      </mesh>
      <mesh ref={head} position={[0, 1.35, 0.1]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#e8c4a8" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1.35, 0.1]}>
        <torusGeometry args={[0.45, 0.02, 8, 48]} />
        <meshBasicMaterial color="#3ecfff" transparent opacity={0.35 + focus * 0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1.35, 0.1]}>
        <torusGeometry args={[0.62, 0.015, 8, 48]} />
        <meshBasicMaterial color="#c44b9a" transparent opacity={0.25 + posture * 0.45} />
      </mesh>
    </group>
  );
}

export function SmartDeskScene({ dpr }: { dpr: number }) {
  const [focus, setFocus] = useState(0.72);
  const [posture, setPosture] = useState(0.81);

  return (
    <div className="pointer-events-auto relative h-full w-full">
      <Canvas dpr={dpr} camera={{ position: [2.2, 2.4, 3.2], fov: 40 }}>
        <ambientLight intensity={0.45} />
        <pointLight position={[2, 3, 2]} intensity={1} color="#ffb86b" />
        <DeskRig focus={focus} posture={posture} />
      </Canvas>
      <div className="absolute bottom-3 left-3 right-3 grid max-w-sm gap-2 text-xs text-white/80">
        <label className="flex flex-col gap-1">
          Focus {Math.round(focus * 100)}%
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={focus}
            onChange={(e) => setFocus(Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col gap-1">
          Posture {Math.round(posture * 100)}%
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={posture}
            onChange={(e) => setPosture(Number(e.target.value))}
          />
        </label>
        <p className="text-[10px] text-white/50">
          Simulated telemetry — no webcam by default
        </p>
      </div>
    </div>
  );
}
