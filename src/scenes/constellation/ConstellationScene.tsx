"use client";

import { projects } from "@/content/projects";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function NodeMesh({
  project,
  index,
  total,
  selected,
  onSelect,
  interactive,
}: {
  project: (typeof projects)[number];
  index: number;
  total: number;
  selected: boolean;
  onSelect: (id: string) => void;
  interactive: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / total) * Math.PI * 2;
  const radius =
    project.constellation?.size === "lg"
      ? 2.1
      : project.constellation?.size === "md"
        ? 2.8
        : 3.4;
  const size =
    project.constellation?.size === "lg"
      ? 0.22
      : project.constellation?.size === "md"
        ? 0.14
        : 0.09;

  const color =
    project.constellation?.visual === "lensing"
      ? "#9b7bff"
      : project.constellation?.visual === "earth"
        ? "#3ecfff"
        : project.constellation?.visual === "network"
          ? "#ffb86b"
          : project.tier === "flagship"
            ? "#c44b9a"
            : "#8aa4d6";

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * 0.15 + angle;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 2 + index) * 0.25;
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
      scale={selected ? 1.35 : 1}
    >
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={selected ? 0.7 : 0.35}
      />
    </mesh>
  );
}

function Field({
  selectedId,
  onSelect,
  interactive,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
  interactive: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.05 + pointer.x * 0.2;
  });

  const list = useMemo(() => projects, []);

  return (
    <group ref={group}>
      {list.map((p, i) => (
        <NodeMesh
          key={p.id}
          project={p}
          index={i}
          total={list.length}
          selected={selectedId === p.id}
          onSelect={onSelect}
          interactive={interactive}
        />
      ))}
      <mesh>
        <ringGeometry args={[1.6, 1.65, 64]} />
        <meshBasicMaterial color="#3ecfff" transparent opacity={0.25} />
      </mesh>
    </group>
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
  return (
    <div className={interactive ? "pointer-events-auto h-full w-full" : "h-full w-full"}>
      <Canvas dpr={dpr} camera={{ position: [0, 2.8, 6.5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 4, 2]} color="#ff7ac8" intensity={1} />
        <Field
          selectedId={selectedId}
          onSelect={onSelect}
          interactive={interactive}
        />
      </Canvas>
    </div>
  );
}
