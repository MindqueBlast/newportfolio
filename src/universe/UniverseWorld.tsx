"use client";

import { projects } from "@/content/projects";
import { Float, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { ZONE_ORIGIN } from "./camera-path";
import { useScrollUniverse } from "./scroll-store";

function AmbientDust({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = -Math.random() * 120;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#f0d7a8"
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ArrivalZone() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!g.current) return;
    g.current.rotation.y = clock.elapsedTime * 0.1;
    g.current.position.x =
      ZONE_ORIGIN.arrival.x + pointer.x * 0.35;
  });
  return (
    <group position={ZONE_ORIGIN.arrival.toArray()}>
      <Float speed={1.1} floatIntensity={0.3}>
        <group ref={g}>
          <mesh>
            <sphereGeometry args={[1.7, 64, 64]} />
            <meshStandardMaterial
              color="#1c2a44"
              emissive="#e8a45a"
              emissiveIntensity={0.28}
              roughness={0.5}
            />
          </mesh>
          <mesh rotation={[1.2, 0.2, 0.1]}>
            <torusGeometry args={[2.5, 0.05, 16, 120]} />
            <meshStandardMaterial
              color="#f0d7a8"
              emissive="#e8a45a"
              emissiveIntensity={0.7}
            />
          </mesh>
          <mesh rotation={[1.2, 0.2, 0.1]}>
            <torusGeometry args={[2.95, 0.02, 12, 100]} />
            <meshBasicMaterial color="#7ec8c4" transparent opacity={0.5} />
          </mesh>
          <mesh position={[2.3, 0.8, 0.5]}>
            <sphereGeometry args={[0.24, 24, 24]} />
            <meshStandardMaterial
              color="#c4bbaa"
              emissive="#7ec8c4"
              emissiveIntensity={0.35}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function SignalZone() {
  const planet = useRef<THREE.Mesh>(null);
  const angle = useRef(0);
  useFrame((_, dt) => {
    angle.current += dt * 0.7;
    const r = 2.2;
    if (planet.current) {
      planet.current.position.set(
        Math.cos(angle.current) * r,
        0,
        Math.sin(angle.current) * r,
      );
    }
  });
  return (
    <group position={ZONE_ORIGIN.signal.toArray()}>
      <mesh>
        <sphereGeometry args={[0.55, 48, 48]} />
        <meshStandardMaterial
          color="#e8a45a"
          emissive="#e8a45a"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh ref={planet}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#7ec8c4"
          emissive="#7ec8c4"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.01, 8, 64]} />
        <meshBasicMaterial color="#f0d7a8" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function FenLensZone() {
  const g = useRef<THREE.Group>(null);
  const tiles = useMemo(() => {
    const out: { x: number; z: number; dark: boolean }[] = [];
    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        out.push({ x: f - 3.5, z: r - 3.5, dark: (r + f) % 2 === 1 });
      }
    }
    return out;
  }, []);

  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.25;
  });

  return (
    <group position={ZONE_ORIGIN.fenlens.toArray()}>
      <group ref={g} rotation={[-0.55, 0.4, 0]}>
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[5, 0.2, 5]} />
          <meshStandardMaterial color="#152033" />
        </mesh>
        {tiles.map((t, i) => (
          <mesh key={i} position={[t.x * 0.55, 0, t.z * 0.55]}>
            <boxGeometry args={[0.52, 0.1, 0.52]} />
            <meshStandardMaterial
              color={t.dark ? "#243044" : "#e8dcc8"}
              emissive="#7ec8c4"
              emissiveIntensity={0.06}
            />
          </mesh>
        ))}
        {[0, 1, 2, 3, 4].map((f) => (
          <mesh key={f} position={[(f - 3.5) * 0.55, 0.28, -3.5 * 0.55]}>
            <cylinderGeometry args={[0.14, 0.16, 0.4, 12]} />
            <meshStandardMaterial
              color="#f3efe6"
              emissive="#e8a45a"
              emissiveIntensity={0.25}
            />
          </mesh>
        ))}
        <mesh position={[0.55, 0.28, 3.5 * 0.55]}>
          <cylinderGeometry args={[0.14, 0.16, 0.45, 12]} />
          <meshStandardMaterial
            color="#1a1a22"
            emissive="#e8a45a"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}

function SmartDeskZone() {
  const ring = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ring.current) return;
    ring.current.rotation.y = clock.elapsedTime * 0.4;
  });
  return (
    <group position={ZONE_ORIGIN.smartDesk.toArray()}>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[2.6, 0.14, 1.4]} />
        <meshStandardMaterial color="#1c2740" metalness={0.35} />
      </mesh>
      <mesh position={[0, 0.95, -0.4]}>
        <boxGeometry args={[1.05, 0.65, 0.08]} />
        <meshStandardMaterial
          color="#0d1524"
          emissive="#7ec8c4"
          emissiveIntensity={0.55}
        />
      </mesh>
      <mesh position={[0, 1.4, 0.1]}>
        <sphereGeometry args={[0.24, 32, 32]} />
        <meshStandardMaterial color="#d8b79a" />
      </mesh>
      <group ref={ring} position={[0, 1.4, 0.1]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.025, 12, 48]} />
          <meshBasicMaterial color="#7ec8c4" transparent opacity={0.65} />
        </mesh>
        <mesh rotation={[Math.PI / 2.3, 0.3, 0]}>
          <torusGeometry args={[0.72, 0.02, 12, 48]} />
          <meshBasicMaterial color="#e8a45a" transparent opacity={0.55} />
        </mesh>
      </group>
    </group>
  );
}

function NeuroZone() {
  const fish = useRef<THREE.Group>(null);
  const agents = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 4,
        s: 0.4 + Math.random(),
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (!fish.current) return;
    fish.current.children.forEach((child, i) => {
      const a = agents[i];
      const t = clock.elapsedTime * a.s + i;
      child.position.set(
        a.x + Math.sin(t) * 0.8,
        a.y + Math.cos(t * 0.7) * 0.4,
        a.z + Math.sin(t * 0.5) * 0.6,
      );
    });
  });

  return (
    <group position={ZONE_ORIGIN.neuro.toArray()}>
      <mesh>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshStandardMaterial
          color="#ff6b8a"
          emissive="#ff6b8a"
          emissiveIntensity={0.5}
        />
      </mesh>
      <group ref={fish}>
        {agents.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshStandardMaterial
              color="#7dffb3"
              emissive="#7dffb3"
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}
      </group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2, 0.02, 8, 64]} />
        <meshBasicMaterial color="#7ec8c4" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function ConstellationZone() {
  const g = useRef<THREE.Group>(null);
  const { selectedProjectId } = useScrollUniverse();

  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = clock.elapsedTime * 0.08;
  });

  return (
    <group position={ZONE_ORIGIN.constellation.toArray()}>
      <group ref={g}>
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color="#f0d7a8"
            emissive="#e8a45a"
            emissiveIntensity={0.85}
          />
        </mesh>
        {projects.map((p, i) => {
          const angle = (i / projects.length) * Math.PI * 2;
          const radius =
            p.constellation?.size === "lg"
              ? 2.5
              : p.constellation?.size === "md"
                ? 3.3
                : 4;
          const size =
            p.constellation?.size === "lg"
              ? 0.28
              : p.constellation?.size === "md"
                ? 0.16
                : 0.1;
          const selected = selectedProjectId === p.id;
          const color =
            p.constellation?.visual === "lensing"
              ? "#c9a0ff"
              : p.constellation?.visual === "earth"
                ? "#7ec8c4"
                : p.constellation?.visual === "network"
                  ? "#e8a45a"
                  : p.tier === "flagship"
                    ? "#f0d7a8"
                    : "#6d7f9c";
          return (
            <mesh
              key={p.id}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 0.4,
                Math.sin(angle) * radius,
              ]}
              scale={selected ? 1.4 : 1}
            >
              <sphereGeometry args={[size, 20, 20]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={selected ? 1 : 0.55}
              />
            </mesh>
          );
        })}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.4, 2.48, 64]} />
          <meshBasicMaterial color="#7ec8c4" transparent opacity={0.35} />
        </mesh>
      </group>
    </group>
  );
}

function ExploringZone() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = clock.elapsedTime * 0.15;
  });
  return (
    <group position={ZONE_ORIGIN.exploring.toArray()} ref={g}>
      {[1.4, 2.2, 3.0].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2.3, 0, i * 0.3]}>
          <torusGeometry args={[r, 0.02, 8, 64]} />
          <meshBasicMaterial
            color={i === 2 ? "#555" : i === 0 ? "#7ec8c4" : "#e8a45a"}
            transparent
            opacity={i === 2 ? 0.25 : 0.55}
          />
        </mesh>
      ))}
      <mesh position={[1.4, 0, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#7ec8c4" emissive="#7ec8c4" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function JourneyZone() {
  const points = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const t = i / 11;
      return new THREE.Vector3(
        (t - 0.5) * 8,
        Math.sin(t * Math.PI * 2) * 0.7,
        Math.cos(t * Math.PI) * 1.2,
      );
    });
  }, []);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  return (
    <group position={ZONE_ORIGIN.journey.toArray()}>
      <mesh>
        <tubeGeometry args={[curve, 64, 0.04, 8, false]} />
        <meshStandardMaterial
          color="#2a3d5c"
          emissive="#7ec8c4"
          emissiveIntensity={0.25}
        />
      </mesh>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial
            color={i === points.length - 1 ? "#666" : "#e8a45a"}
            emissive={i === points.length - 1 ? "#333" : "#e8a45a"}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function ContactZone() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 2) * 0.12;
    ref.current.scale.setScalar(s);
  });
  return (
    <group position={ZONE_ORIGIN.contact.toArray()}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#7ec8c4"
          emissive="#7ec8c4"
          emissiveIntensity={0.7}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

export function UniverseWorld({ dense }: { dense: boolean }) {
  return (
    <>
      <color attach="background" args={["#070b14"]} />
      <fog attach="fog" args={["#070b14", 12, 55]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 4]} intensity={1.1} color="#f0d7a8" />
      <pointLight position={[-6, 3, -20]} intensity={1} color="#7ec8c4" />
      <pointLight position={[4, 2, -60]} intensity={0.9} color="#e8a45a" />
      <Stars
        radius={120}
        depth={80}
        count={dense ? 3500 : 1600}
        factor={3.2}
        saturation={0.35}
        fade
        speed={0.45}
      />
      <AmbientDust count={dense ? 1600 : 800} />
      <ArrivalZone />
      <SignalZone />
      <FenLensZone />
      <SmartDeskZone />
      <NeuroZone />
      <ConstellationZone />
      <ExploringZone />
      <JourneyZone />
      <ContactZone />
    </>
  );
}
