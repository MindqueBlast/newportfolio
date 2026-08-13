"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useGraphicsMode } from "@/lib/use-graphics-mode";

function OrbitSystem({ mass, animate }: { mass: number; animate: boolean }) {
  const planet = useRef<THREE.Mesh>(null);
  const moon = useRef<THREE.Mesh>(null);
  const trail = useRef<THREE.Points>(null);
  const angle = useRef(0);
  const trailPos = useMemo(() => new Float32Array(120 * 3), []);

  useFrame((_, dt) => {
    if (!animate) return;
    const a = 2.4 / Math.sqrt(mass);
    angle.current += dt * (0.95 / a);
    const e = 0.28;
    const r =
      (a * (1 - e * e)) / (1 + e * Math.cos(angle.current));
    const x = Math.cos(angle.current) * r;
    const z = Math.sin(angle.current) * r;
    if (planet.current) planet.current.position.set(x, 0, z);
    if (moon.current) {
      moon.current.position.set(
        x + Math.cos(angle.current * 3) * 0.45,
        Math.sin(angle.current * 2) * 0.15,
        z + Math.sin(angle.current * 3) * 0.45,
      );
    }
    for (let i = trailPos.length - 3; i >= 3; i -= 3) {
      trailPos[i] = trailPos[i - 3];
      trailPos[i + 1] = trailPos[i - 2];
      trailPos[i + 2] = trailPos[i - 1];
    }
    trailPos[0] = x;
    trailPos[1] = 0;
    trailPos[2] = z;
    if (trail.current) {
      trail.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.42 * Math.sqrt(mass), 48, 48]} />
        <meshStandardMaterial
          color="#e8a45a"
          emissive="#e8a45a"
          emissiveIntensity={0.75}
          roughness={0.35}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.55 * Math.sqrt(mass), 32, 32]} />
        <meshBasicMaterial color="#f0d7a8" transparent opacity={0.12} />
      </mesh>
      <mesh ref={planet}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color="#7ec8c4"
          emissive="#7ec8c4"
          emissiveIntensity={0.45}
        />
      </mesh>
      <mesh ref={moon}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#c4bbaa" />
      </mesh>
      <points ref={trail}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[trailPos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#f0d7a8"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function SignalScene({ dpr }: { dpr: number }) {
  const [mass, setMass] = useState(1.15);
  const { mode } = useGraphicsMode();
  const animate = mode === "full";

  return (
    <div className="pointer-events-auto relative h-full w-full">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 4.2, 5.8], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
      >
        <color attach="background" args={["#0a1220"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 4, 2]} intensity={1.3} color="#f0d7a8" />
        <pointLight position={[-2, 1, 2]} intensity={0.7} color="#7ec8c4" />
        <OrbitSystem mass={mass} animate={animate} />
        <EffectComposer>
          <Bloom intensity={0.55} luminanceThreshold={0.3} mipmapBlur />
        </EffectComposer>
      </Canvas>
      <label className="absolute bottom-4 left-4 right-4 flex max-w-xs flex-col gap-1 rounded-lg bg-black/40 px-3 py-2 text-xs text-white/80 backdrop-blur">
        Central mass
        <input
          type="range"
          min={0.6}
          max={2.4}
          step={0.05}
          value={mass}
          onChange={(e) => setMass(Number(e.target.value))}
          className="accent-[color:var(--stellar)]"
        />
      </label>
    </div>
  );
}
