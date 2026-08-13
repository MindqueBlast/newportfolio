"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

function OrbitSystem({ mass }: { mass: number }) {
  const planet = useRef<THREE.Mesh>(null);
  const trail = useRef<THREE.Points>(null);
  const angle = useRef(0);
  const trailPos = useMemo(() => new Float32Array(90 * 3), []);

  useFrame((_, dt) => {
    const a = 2.2 / Math.sqrt(mass);
    angle.current += dt * (0.8 / a);
    const e = 0.25;
    const r = a * (1 - e * e) / (1 + e * Math.cos(angle.current));
    const x = Math.cos(angle.current) * r;
    const z = Math.sin(angle.current) * r;
    if (planet.current) {
      planet.current.position.set(x, 0, z);
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
        <sphereGeometry args={[0.35 * Math.sqrt(mass), 32, 32]} />
        <meshStandardMaterial
          color="#ffb86b"
          emissive="#ff8c42"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh ref={planet}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color="#3ecfff" emissive="#1a6a8a" />
      </mesh>
      <points ref={trail}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[trailPos, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#9b7bff" transparent opacity={0.5} />
      </points>
    </group>
  );
}

export function SignalScene({ dpr }: { dpr: number }) {
  const [mass, setMass] = useState(1);

  return (
    <div className="pointer-events-auto relative h-full w-full">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 3.5, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 4, 2]} intensity={1} color="#ffb86b" />
        <OrbitSystem mass={mass} />
      </Canvas>
      <label className="absolute bottom-4 left-4 right-4 flex max-w-xs flex-col gap-1 text-xs text-white/80">
        Central mass
        <input
          type="range"
          min={0.6}
          max={2.4}
          step={0.05}
          value={mass}
          onChange={(e) => setMass(Number(e.target.value))}
          className="accent-[color:var(--cyan)]"
        />
      </label>
    </div>
  );
}
