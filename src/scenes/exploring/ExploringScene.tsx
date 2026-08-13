"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Orbits() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.12;
  });
  return (
    <group ref={ref}>
      {[1.2, 1.9, 2.6].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2.4, 0, i * 0.2]}>
          <torusGeometry args={[r, 0.015, 8, 64]} />
          <meshBasicMaterial
            color={i === 2 ? "#666" : i === 0 ? "#3ecfff" : "#c44b9a"}
            transparent
            opacity={i === 2 ? 0.25 : 0.55}
          />
        </mesh>
      ))}
      <mesh position={[1.2, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#3ecfff" emissive="#3ecfff" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, 0, 1.9]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#c44b9a" emissive="#c44b9a" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-2.4, 0.2, 0.4]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#555" wireframe />
      </mesh>
    </group>
  );
}

export function ExploringScene({ dpr }: { dpr: number }) {
  return (
    <Canvas dpr={dpr} camera={{ position: [0, 1.5, 5], fov: 42 }}>
      <ambientLight intensity={0.5} />
      <Orbits />
    </Canvas>
  );
}
