"use client";

import { projects } from "@/content/projects";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useGraphicsMode } from "@/lib/use-graphics-mode";

function NodeMesh({
  project,
  index,
  total,
  selected,
  onSelect,
  interactive,
  animate,
}: {
  project: (typeof projects)[number];
  index: number;
  total: number;
  selected: boolean;
  onSelect: (id: string) => void;
  interactive: boolean;
  animate: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const angle0 = (index / total) * Math.PI * 2;
  const radius =
    project.constellation?.size === "lg"
      ? 2.35
      : project.constellation?.size === "md"
        ? 3.1
        : 3.75;
  const size =
    project.constellation?.size === "lg"
      ? 0.32
      : project.constellation?.size === "md"
        ? 0.18
        : 0.11;

  const color =
    project.constellation?.visual === "lensing"
      ? "#c9a0ff"
      : project.constellation?.visual === "earth"
        ? "#7ec8c4"
        : project.constellation?.visual === "network"
          ? "#e8a45a"
          : project.tier === "flagship"
            ? "#f0d7a8"
            : "#6d7f9c";

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = animate ? clock.elapsedTime * 0.18 + angle0 : angle0;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.7 + index) * 0.35;
  });

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        if (!interactive) return;
        e.stopPropagation();
        onSelect(project.id);
      }}
      onPointerOver={() => {
        if (interactive) document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
      scale={selected ? 1.45 : 1}
    >
      <sphereGeometry args={[size, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={selected ? 0.95 : 0.55}
        roughness={0.3}
        metalness={0.2}
      />
    </mesh>
  );
}

function Field({
  selectedId,
  onSelect,
  interactive,
  animate,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
  interactive: boolean;
  animate: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!group.current || !animate) return;
    group.current.rotation.y = clock.elapsedTime * 0.06 + pointer.x * 0.25;
    group.current.rotation.x = pointer.y * 0.1;
  });

  const list = useMemo(() => projects, []);

  return (
    <Float speed={animate ? 0.6 : 0} floatIntensity={0.2}>
      <group ref={group}>
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color="#f0d7a8"
            emissive="#e8a45a"
            emissiveIntensity={0.8}
          />
        </mesh>
        {list.map((p, i) => (
          <NodeMesh
            key={p.id}
            project={p}
            index={i}
            total={list.length}
            selected={selectedId === p.id}
            onSelect={onSelect}
            interactive={interactive}
            animate={animate}
          />
        ))}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.2, 2.28, 64]} />
          <meshBasicMaterial color="#7ec8c4" transparent opacity={0.35} />
        </mesh>
        <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
          <ringGeometry args={[3.0, 3.06, 64]} />
          <meshBasicMaterial color="#e8a45a" transparent opacity={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

export function ConstellationScene({
  dpr,
  selectedId,
  onSelect,
  interactive = false,
}: {
  dpr: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  interactive?: boolean;
}) {
  const { mode } = useGraphicsMode();
  const animate = mode === "full";

  return (
    <div
      className={
        interactive ? "pointer-events-auto h-full w-full" : "h-full w-full"
      }
    >
      <Canvas dpr={dpr} camera={{ position: [0, 3.2, 7.2], fov: 42 }}>
        <color attach="background" args={["#070b14"]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[4, 5, 2]} color="#e8a45a" intensity={1.3} />
        <pointLight position={[-3, 2, 3]} color="#7ec8c4" intensity={0.9} />
        <Field
          selectedId={selectedId}
          onSelect={onSelect}
          interactive={interactive}
          animate={animate}
        />
        <EffectComposer>
          <Bloom intensity={0.65} luminanceThreshold={0.25} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
