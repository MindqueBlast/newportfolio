"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Path() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.15;
  });
  const points = Array.from({ length: 12 }, (_, i) => {
    const t = i / 11;
    return new THREE.Vector3(
      (t - 0.5) * 6,
      Math.sin(t * Math.PI * 2) * 0.6,
      Math.cos(t * Math.PI) * 0.8,
    );
  });
  const curve = new THREE.CatmullRomCurve3(points);

  return (
    <group ref={ref}>
      <mesh>
        <tubeGeometry args={[curve, 64, 0.03, 8, false]} />
        <meshStandardMaterial color="#6b3fa0" emissive="#3ecfff" emissiveIntensity={0.2} />
      </mesh>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial
            color={i === points.length - 1 ? "#888" : "#ffb86b"}
            emissive={i === points.length - 1 ? "#444" : "#ffb86b"}
            emissiveIntensity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

export function JourneyScene({ dpr }: { dpr: number }) {
  return (
    <Canvas dpr={dpr} camera={{ position: [0, 1.2, 5], fov: 45 }}>
      <ambientLight intensity={0.45} />
      <Path />
    </Canvas>
  );
}
