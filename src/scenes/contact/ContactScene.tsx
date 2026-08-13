"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Pulse() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 2) * 0.08;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial
        color="#3ecfff"
        emissive="#3ecfff"
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

export function ContactScene({ dpr }: { dpr: number }) {
  return (
    <Canvas dpr={dpr} camera={{ position: [0, 0, 3.2], fov: 40 }}>
      <ambientLight intensity={0.4} />
      <Pulse />
    </Canvas>
  );
}
