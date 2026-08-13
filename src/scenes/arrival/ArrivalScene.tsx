"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { QualityTier } from "@/lib/quality";
import { particleBudget } from "@/lib/quality";

function Nebula({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;
    }
    return arr;
  }, [count]);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.02 + pointer.x * 0.08;
    ref.current.rotation.x = pointer.y * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#c44b9a"
        transparent
        opacity={0.55}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function AuroraRibbon() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.z = Math.sin(clock.elapsedTime * 0.2) * 0.15;
    mesh.current.position.y = Math.sin(clock.elapsedTime * 0.35) * 0.3;
  });
  return (
    <mesh ref={mesh} position={[0, 0.5, -3]} rotation={[0.4, 0.2, 0.1]}>
      <torusGeometry args={[3.2, 0.08, 16, 100]} />
      <meshBasicMaterial color="#3ecfff" transparent opacity={0.35} />
    </mesh>
  );
}

export function ArrivalScene({
  dpr,
  tier,
}: {
  dpr: number;
  tier: QualityTier;
}) {
  const count = particleBudget(tier);
  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#0b1224"]} />
      <fog attach="fog" args={["#0b1224", 6, 16]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 2]} intensity={1.2} color="#ff7ac8" />
      <pointLight position={[-4, -2, 1]} intensity={0.8} color="#3ecfff" />
      <Stars radius={50} depth={40} count={tier === "low" ? 800 : 1800} factor={3} fade speed={0.4} />
      <Nebula count={count} />
      <AuroraRibbon />
      <mesh position={[2.5, -1.2, -2]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#6b3fa0"
          emissive="#c44b9a"
          emissiveIntensity={0.35}
          roughness={0.4}
        />
      </mesh>
    </Canvas>
  );
}
