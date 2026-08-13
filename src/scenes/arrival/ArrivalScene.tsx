"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { QualityTier } from "@/lib/quality";
import { particleBudget } from "@/lib/quality";
import { useGraphicsMode } from "@/lib/use-graphics-mode";

function GasCloud({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cWarm = new THREE.Color("#e8a45a");
    const cCool = new THREE.Color("#7ec8c4");
    const cDust = new THREE.Color("#d4784a");
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.5;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * r * 0.85 - 1;
      const mix = Math.random();
      const c =
        mix > 0.66 ? cWarm : mix > 0.33 ? cCool : cDust;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame(({ clock, pointer }, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.04;
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      pointer.y * 0.12,
      0.04,
    );
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.15) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ObservatoryWorld({ animate }: { animate: boolean }) {
  const planet = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!animate) return;
    if (planet.current) {
      planet.current.rotation.y = clock.elapsedTime * 0.12;
      planet.current.rotation.x = THREE.MathUtils.lerp(
        planet.current.rotation.x,
        pointer.y * 0.15,
        0.05,
      );
      planet.current.position.x = THREE.MathUtils.lerp(
        planet.current.position.x,
        pointer.x * 0.45,
        0.05,
      );
    }
    if (ring.current) {
      ring.current.rotation.z = clock.elapsedTime * 0.08;
    }
  });

  return (
    <Float speed={animate ? 1.2 : 0} rotationIntensity={0.15} floatIntensity={0.35}>
      <group ref={planet} position={[1.1, 0.15, 0]}>
        <mesh>
          <sphereGeometry args={[1.55, 64, 64]} />
          <meshStandardMaterial
            color="#1c2a44"
            emissive="#e8a45a"
            emissiveIntensity={0.22}
            roughness={0.55}
            metalness={0.25}
          />
        </mesh>
        <mesh scale={1.02}>
          <sphereGeometry args={[1.55, 32, 32]} />
          <meshBasicMaterial
            color="#7ec8c4"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 2.6, 0.2, 0.15]}>
          <torusGeometry args={[2.35, 0.045, 16, 120]} />
          <meshStandardMaterial
            color="#f0d7a8"
            emissive="#e8a45a"
            emissiveIntensity={0.65}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.6, 0.2, 0.15]}>
          <torusGeometry args={[2.7, 0.018, 12, 100]} />
          <meshBasicMaterial color="#7ec8c4" transparent opacity={0.45} />
        </mesh>
        <mesh position={[2.1, 0.9, 0.6]}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial
            color="#c4bbaa"
            emissive="#7ec8c4"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}

function CameraRig({ animate }: { animate: boolean }) {
  useFrame(({ camera, clock, pointer }) => {
    if (!animate) return;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.6, 0.03);
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      0.35 + pointer.y * 0.35,
      0.03,
    );
    camera.position.z = 6.2 + Math.sin(clock.elapsedTime * 0.25) * 0.15;
    camera.lookAt(0.6, 0.1, 0);
  });
  return null;
}

export function ArrivalScene({
  dpr,
  tier,
}: {
  dpr: number;
  tier: QualityTier;
}) {
  const { mode } = useGraphicsMode();
  const animate = mode === "full";
  const count = particleBudget(tier);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0.4, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#070b14"]} />
      <fog attach="fog" args={["#070b14", 7, 18]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 3, 2]} intensity={1.4} color="#f0d7a8" />
      <pointLight position={[-3, 1, 2]} intensity={1.2} color="#7ec8c4" />
      <pointLight position={[2, -2, -1]} intensity={0.8} color="#e8a45a" />
      <Stars
        radius={60}
        depth={50}
        count={tier === "low" ? 1200 : 2500}
        factor={3.5}
        saturation={0.4}
        fade
        speed={animate ? 0.6 : 0}
      />
      <GasCloud count={count} />
      <ObservatoryWorld animate={animate} />
      <CameraRig animate={animate} />
      {tier !== "low" ? (
        <EffectComposer>
          <Bloom
            intensity={0.55}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.7}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.15} darkness={0.55} />
        </EffectComposer>
      ) : null}
    </Canvas>
  );
}
