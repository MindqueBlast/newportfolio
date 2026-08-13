"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useGraphicsMode } from "@/lib/use-graphics-mode";

function DeskRig({
  focus,
  posture,
  animate,
}: {
  focus: number;
  posture: number;
  animate: boolean;
}) {
  const head = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.elapsedTime;
    if (head.current) {
      head.current.position.y = 1.4 + Math.sin(t) * 0.03;
      head.current.rotation.x = (1 - posture) * 0.4;
      head.current.rotation.y = Math.sin(t * 0.4) * 0.08;
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.4;
    if (ringB.current) ringB.current.rotation.z = -t * 0.25;
  });

  return (
    <Float speed={animate ? 0.8 : 0} floatIntensity={0.15}>
      <group>
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[2.6, 0.14, 1.35]} />
          <meshStandardMaterial color="#1c2740" metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[-0.9, 0.2, 0.4]}>
          <boxGeometry args={[0.12, 0.45, 0.12]} />
          <meshStandardMaterial color="#121a2c" />
        </mesh>
        <mesh position={[0.9, 0.2, 0.4]}>
          <boxGeometry args={[0.12, 0.45, 0.12]} />
          <meshStandardMaterial color="#121a2c" />
        </mesh>
        <mesh position={[0, 0.95, -0.4]}>
          <boxGeometry args={[1.05, 0.65, 0.08]} />
          <meshStandardMaterial
            color="#0d1524"
            emissive="#7ec8c4"
            emissiveIntensity={0.25 + focus * 0.45}
          />
        </mesh>
        <mesh ref={head} position={[0, 1.4, 0.15]}>
          <sphereGeometry args={[0.24, 32, 32]} />
          <meshStandardMaterial color="#d8b79a" roughness={0.55} />
        </mesh>
        <mesh ref={ringA} rotation={[Math.PI / 2, 0, 0]} position={[0, 1.4, 0.15]}>
          <torusGeometry args={[0.5, 0.025, 12, 64]} />
          <meshBasicMaterial
            color="#7ec8c4"
            transparent
            opacity={0.35 + focus * 0.5}
          />
        </mesh>
        <mesh ref={ringB} rotation={[Math.PI / 2.2, 0.2, 0]} position={[0, 1.4, 0.15]}>
          <torusGeometry args={[0.72, 0.02, 12, 64]} />
          <meshBasicMaterial
            color="#e8a45a"
            transparent
            opacity={0.3 + posture * 0.5}
          />
        </mesh>
        <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={8} blur={2} />
      </group>
    </Float>
  );
}

export function SmartDeskScene({ dpr }: { dpr: number }) {
  const [focus, setFocus] = useState(0.78);
  const [posture, setPosture] = useState(0.84);
  const { mode } = useGraphicsMode();
  const animate = mode === "full";

  return (
    <div className="pointer-events-auto relative h-full w-full">
      <Canvas
        dpr={dpr}
        camera={{ position: [2.6, 2.6, 3.6], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0a1220"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 3, 2]} intensity={1.2} color="#f0d7a8" />
        <pointLight position={[-2, 1, 1]} intensity={0.7} color="#7ec8c4" />
        <DeskRig focus={focus} posture={posture} animate={animate} />
        <EffectComposer>
          <Bloom intensity={0.45} luminanceThreshold={0.35} mipmapBlur />
        </EffectComposer>
      </Canvas>
      <div className="absolute bottom-3 left-3 right-3 grid max-w-sm gap-2 rounded-lg bg-black/45 p-3 text-xs text-white/85 backdrop-blur">
        <label className="flex flex-col gap-1">
          Focus {Math.round(focus * 100)}%
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={focus}
            onChange={(e) => setFocus(Number(e.target.value))}
            className="accent-[color:var(--instrument)]"
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
            className="accent-[color:var(--stellar)]"
          />
        </label>
        <p className="text-[10px] text-white/45">
          Simulated telemetry — no webcam
        </p>
      </div>
    </div>
  );
}
