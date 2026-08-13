"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import "./shaderMaterials";

export function NebulaPlane({
  position,
  rotation,
  scale = 12,
  opacity = 0.32,
  colorA = "#a78bfa",
  colorB = "#fb7185",
  colorC = "#5eead4",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  opacity?: number;
  colorA?: string;
  colorB?: string;
  colorC?: string;
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  useFrame(({ clock }) => {
    if (mat.current) mat.current.uniforms.uTime.value = clock.elapsedTime;
  });
  return (
    <mesh position={position} rotation={rotation ?? [0, 0, 0]} scale={scale}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <nebulaMaterial
        ref={mat}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uOpacity={opacity}
        uColorA={new THREE.Color(colorA)}
        uColorB={new THREE.Color(colorB)}
        uColorC={new THREE.Color(colorC)}
      />
    </mesh>
  );
}

export function FresnelOrb({
  color = "#5eead4",
  radius = 0.5,
  intensity = 1.3,
}: {
  color?: string;
  radius?: number;
  intensity?: number;
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  useFrame(({ clock }) => {
    if (mat.current) mat.current.uniforms.uTime.value = clock.elapsedTime;
  });
  return (
    <mesh>
      <sphereGeometry args={[radius, 48, 48]} />
      <fresnelGlowMaterial
        ref={mat}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uColor={new THREE.Color(color)}
        uIntensity={intensity}
      />
    </mesh>
  );
}

export function ColorDust({
  count,
  spread = [40, 18, 140],
  origin = [0, 0, 0],
}: {
  count: number;
  spread?: [number, number, number];
  origin?: [number, number, number];
}) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#5eead4"),
      new THREE.Color("#a78bfa"),
      new THREE.Color("#fb7185"),
      new THREE.Color("#fbbf24"),
      new THREE.Color("#67e8f9"),
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = origin[0] + (Math.random() - 0.5) * spread[0];
      pos[i * 3 + 1] = origin[1] + (Math.random() - 0.5) * spread[1];
      pos[i * 3 + 2] = origin[2] - Math.random() * spread[2];
      const c = palette[i % palette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count, spread, origin]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.012;
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
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
