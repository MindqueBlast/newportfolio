"use client";

import { awards } from "@/content/awards";
import { projects } from "@/content/projects";
import { skillDomains } from "@/content/skills";
import { timeline } from "@/content/timeline";
import { journeyWaypointIndex } from "@/lib/chapter-progress";
import { Float, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { chapterLocalProgress, sampleCamera, ZONE_ORIGIN } from "./camera-path";
import { useScrollUniverse } from "./scroll-store";

function journeyMotif(id: string) {
  if (id.includes("coding") || id.includes("khan") || id.includes("games"))
    return "code";
  if (id.includes("math")) return "math";
  if (id.includes("hardware") || id.includes("scioly") || id.includes("robot"))
    return "robotics";
  if (id.includes("ai") || id.includes("teaching") || id.includes("neuro"))
    return "ai";
  if (id.includes("ammoc") || id.includes("astro") || id.includes("research"))
    return "research";
  if (id.includes("flagship") || id.includes("vision")) return "vision";
  return "default";
}

const DOMAIN_ANCHORS: Record<string, [number, number, number]> = {
  cv: [-3.2, 0.4, -1.2],
  physics: [3.4, 0.6, 0.8],
  geospatial: [2.2, -0.5, -2.4],
  simulation: [0.2, 1.1, 2.2],
  fullstack: [-2.4, -0.8, 2.0],
  robotics: [-1.2, 1.3, 3.2],
  games: [3.0, -1.0, 2.6],
};

function AmbientField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const warm = new THREE.Color("#e8a45a");
    const cool = new THREE.Color("#7ec8c4");
    const violet = new THREE.Color("#8b6cff");
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 48;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = -Math.random() * 160;
      const c = i % 3 === 0 ? warm : i % 3 === 1 ? cool : violet;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function ArrivalZone() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!g.current) return;
    g.current.rotation.y = clock.elapsedTime * 0.08;
    g.current.position.x = ZONE_ORIGIN.arrival.x + pointer.x * 0.4;
    g.current.position.y = pointer.y * 0.15;
  });
  return (
    <group position={ZONE_ORIGIN.arrival.toArray()}>
      <Float speed={1} floatIntensity={0.25}>
        <group ref={g} position={[-1.4, 0, 0]}>
          <mesh>
            <sphereGeometry args={[1.85, 64, 64]} />
            <meshStandardMaterial
              color="#1a2744"
              emissive="#c44b9a"
              emissiveIntensity={0.18}
              roughness={0.45}
              metalness={0.2}
            />
          </mesh>
          <mesh scale={1.04}>
            <sphereGeometry args={[1.85, 32, 32]} />
            <meshBasicMaterial color="#7ec8c4" transparent opacity={0.07} side={THREE.BackSide} />
          </mesh>
          <mesh rotation={[1.15, 0.25, 0.1]}>
            <torusGeometry args={[2.65, 0.06, 16, 140]} />
            <meshStandardMaterial color="#f0d7a8" emissive="#e8a45a" emissiveIntensity={0.75} metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh rotation={[1.15, 0.25, 0.1]}>
            <torusGeometry args={[3.15, 0.02, 12, 100]} />
            <meshBasicMaterial color="#8b6cff" transparent opacity={0.45} />
          </mesh>
          <mesh position={[2.5, 0.85, 0.55]}>
            <sphereGeometry args={[0.28, 24, 24]} />
            <meshStandardMaterial color="#c4bbaa" emissive="#7ec8c4" emissiveIntensity={0.4} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function AboutZone() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = clock.elapsedTime * 0.12;
  });
  return (
    <group position={ZONE_ORIGIN.about.toArray()} ref={g}>
      {[1.3, 2.0, 2.7].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2.2, i * 0.4, 0]}>
          <torusGeometry args={[r, 0.02, 8, 64]} />
          <meshBasicMaterial
            color={i === 1 ? "#e8a45a" : "#7ec8c4"}
            transparent
            opacity={0.4 - i * 0.05}
          />
        </mesh>
      ))}
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color="#2a3d5c" emissive="#8b6cff" emissiveIntensity={0.35} flatShading metalness={0.3} />
      </mesh>
    </group>
  );
}

function JourneyArtifact({
  kind,
  on,
  color,
}: {
  kind: string;
  on: boolean;
  color: string;
}) {
  const s = on ? 1.4 : 1;
  if (kind === "code") {
    return (
      <mesh scale={s}>
        <boxGeometry args={[0.32, 0.22, 0.08]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={on ? 0.85 : 0.28}
          metalness={0.45}
          roughness={0.3}
        />
      </mesh>
    );
  }
  if (kind === "math") {
    return (
      <mesh scale={s} rotation={[0.4, 0.5, 0]}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={on ? 0.9 : 0.3}
          metalness={0.35}
          roughness={0.25}
          flatShading
        />
      </mesh>
    );
  }
  if (kind === "robotics") {
    return (
      <group scale={s}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.16, 0.28, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={on ? 0.75 : 0.28}
            metalness={0.55}
            roughness={0.35}
          />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.22, 0.1, 0.22]} />
          <meshStandardMaterial color="#c4bbaa" metalness={0.4} roughness={0.4} />
        </mesh>
      </group>
    );
  }
  if (kind === "ai") {
    return (
      <mesh scale={s}>
        <icosahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={on ? 0.85 : 0.32}
          flatShading
          metalness={0.3}
        />
      </mesh>
    );
  }
  if (kind === "research") {
    return (
      <mesh scale={s}>
        <torusKnotGeometry args={[0.14, 0.035, 48, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={on ? 0.8 : 0.3}
          metalness={0.45}
          roughness={0.3}
        />
      </mesh>
    );
  }
  if (kind === "vision") {
    return (
      <group scale={s}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.04, 10, 28]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={on ? 0.85 : 0.3}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#1a2233" emissive="#7ec8c4" emissiveIntensity={0.4} />
        </mesh>
      </group>
    );
  }
  return (
    <mesh scale={s}>
      <sphereGeometry args={[0.16, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={on ? 0.8 : 0.28}
        metalness={0.35}
        roughness={0.35}
      />
    </mesh>
  );
}

function JourneyZone() {
  const { progress } = useScrollUniverse();
  const dust = useRef<THREE.Points>(null);
  const points = useMemo(() => {
    return timeline.map((_, i) => {
      const t = i / Math.max(1, timeline.length - 1);
      return new THREE.Vector3(
        Math.sin(t * Math.PI * 1.5) * 3.5,
        Math.cos(t * Math.PI * 2) * 1.1,
        t * -10,
      );
    });
  }, []);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const active = journeyWaypointIndex(progress, timeline.length);
  const era = active / Math.max(1, timeline.length - 1);

  const dustPos = useMemo(() => {
    const arr = new Float32Array(240 * 3);
    for (let i = 0; i < 240; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 3;
      arr[i * 3 + 2] = -Math.random() * 11;
    }
    return arr;
  }, []);

  useFrame((_, dt) => {
    if (dust.current) dust.current.rotation.y += dt * (0.02 + era * 0.04);
  });

  const tubeColor = era < 0.35 ? "#2a3558" : era < 0.7 ? "#2f3d52" : "#3a2f48";
  const tubeEmissive = era < 0.35 ? "#7ec8c4" : era < 0.7 ? "#e8a45a" : "#8b6cff";

  return (
    <group position={ZONE_ORIGIN.journey.toArray()}>
      <pointLight
        position={[0, 2, -4]}
        intensity={0.55 + era * 0.35}
        color={tubeEmissive}
        distance={18}
      />
      <mesh>
        <tubeGeometry args={[curve, 96, 0.055, 10, false]} />
        <meshStandardMaterial
          color={tubeColor}
          emissive={tubeEmissive}
          emissiveIntensity={0.28}
          metalness={0.4}
          roughness={0.4}
        />
      </mesh>
      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color={tubeEmissive}
          transparent
          opacity={0.35 + era * 0.2}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {timeline.map((wp, i) => {
        const p = points[i];
        const on = i === active || i === active - 1;
        const color =
          wp.kind === "planned"
            ? "#555566"
            : wp.teachingId
              ? "#e8a45a"
              : wp.awardIds?.length
                ? "#f0d7a8"
                : "#7ec8c4";
        return (
          <group key={wp.id} position={p}>
            <JourneyArtifact
              kind={journeyMotif(wp.id)}
              on={on}
              color={color}
            />
            {on ? (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.32, 0.4, 32]} />
                <meshBasicMaterial color="#f0d7a8" transparent opacity={0.55} />
              </mesh>
            ) : null}
          </group>
        );
      })}
    </group>
  );
}

function ResearchZone() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = clock.elapsedTime * 0.2;
  });
  return (
    <group position={ZONE_ORIGIN.research.toArray()}>
      <group ref={g}>
        <mesh>
          <torusKnotGeometry args={[0.55, 0.12, 100, 16]} />
          <meshStandardMaterial color="#8b6cff" emissive="#6b3fa0" emissiveIntensity={0.4} metalness={0.45} roughness={0.3} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[Math.cos(i) * 1.4, Math.sin(i * 1.3) * 0.4, Math.sin(i) * 1.4]}>
            <tetrahedronGeometry args={[0.12, 0]} />
            <meshStandardMaterial color="#f0d7a8" emissive="#e8a45a" emissiveIntensity={0.35} flatShading />
          </mesh>
        ))}
      </group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.6, 1.68, 48]} />
        <meshBasicMaterial color="#7ec8c4" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function FenLensZone() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.28;
  });
  const tiles = useMemo(() => {
    const out: { x: number; z: number; dark: boolean }[] = [];
    for (let r = 0; r < 8; r++)
      for (let f = 0; f < 8; f++)
        out.push({ x: f - 3.5, z: r - 3.5, dark: (r + f) % 2 === 1 });
    return out;
  }, []);
  return (
    <group position={ZONE_ORIGIN.fenlens.toArray()}>
      <group ref={g} rotation={[-0.55, 0.35, 0]}>
        <mesh position={[0, -0.16, 0]}>
          <boxGeometry args={[5.1, 0.22, 5.1]} />
          <meshStandardMaterial color="#152033" metalness={0.3} roughness={0.55} />
        </mesh>
        {tiles.map((t, i) => (
          <mesh key={i} position={[t.x * 0.55, 0, t.z * 0.55]}>
            <boxGeometry args={[0.52, 0.1, 0.52]} />
            <meshStandardMaterial
              color={t.dark ? "#243044" : "#e8dcc8"}
              emissive="#7ec8c4"
              emissiveIntensity={0.05}
              roughness={0.4}
            />
          </mesh>
        ))}
        {[0, 1, 2, 3, 4].map((f) => (
          <mesh key={f} position={[(f - 3.5) * 0.55, 0.3, -1.925]}>
            <cylinderGeometry args={[0.14, 0.17, 0.42, 14]} />
            <meshStandardMaterial color="#f3efe6" emissive="#e8a45a" emissiveIntensity={0.22} metalness={0.25} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function SmartDeskZone() {
  const ring = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ring.current) ring.current.rotation.y = clock.elapsedTime * 0.45;
  });
  return (
    <group position={ZONE_ORIGIN.smartDesk.toArray()}>
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[2.7, 0.14, 1.4]} />
        <meshStandardMaterial color="#1c2740" metalness={0.45} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.98, -0.42]}>
        <boxGeometry args={[1.1, 0.68, 0.08]} />
        <meshStandardMaterial color="#0d1524" emissive="#7ec8c4" emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[0, 1.42, 0.12]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#d8b79a" roughness={0.55} />
      </mesh>
      <group ref={ring} position={[0, 1.42, 0.12]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.52, 0.025, 12, 48]} />
          <meshBasicMaterial color="#7ec8c4" transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[Math.PI / 2.25, 0.25, 0]}>
          <torusGeometry args={[0.74, 0.02, 12, 48]} />
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
      Array.from({ length: 20 }, () => ({
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
      child.position.set(a.x + Math.sin(t) * 0.9, a.y + Math.cos(t * 0.7) * 0.45, a.z + Math.sin(t * 0.5) * 0.7);
    });
  });
  return (
    <group position={ZONE_ORIGIN.neuro.toArray()}>
      <mesh>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshStandardMaterial color="#ff6b8a" emissive="#ff6b8a" emissiveIntensity={0.55} />
      </mesh>
      <group ref={fish}>
        {agents.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshStandardMaterial color="#7dffb3" emissive="#7dffb3" emissiveIntensity={0.45} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Motif({ visual, size }: { visual: string; size: number }) {
  if (visual === "lensing") {
    return (
      <group>
        <mesh>
          <torusGeometry args={[size * 1.2, size * 0.18, 12, 32]} />
          <meshStandardMaterial color="#c9a0ff" emissive="#8b6cff" emissiveIntensity={0.7} />
        </mesh>
        <mesh>
          <sphereGeometry args={[size * 0.45, 16, 16]} />
          <meshStandardMaterial color="#1a1020" emissive="#c44b9a" emissiveIntensity={0.5} />
        </mesh>
      </group>
    );
  }
  if (visual === "earth") {
    return (
      <group>
        <mesh>
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial color="#3a7a6a" emissive="#7ec8c4" emissiveIntensity={0.35} />
        </mesh>
        <mesh position={[size * 1.5, 0.1, 0]}>
          <boxGeometry args={[size * 0.35, size * 0.2, size * 0.5]} />
          <meshStandardMaterial color="#c4bbaa" emissive="#f0d7a8" emissiveIntensity={0.3} />
        </mesh>
      </group>
    );
  }
  if (visual === "network") {
    return (
      <group>
        {[[0, 0], [1, 0.5], [-0.8, 0.6], [0.3, -0.7]].map(([x, y], i) => (
          <mesh key={i} position={[x * size, y * size, 0]}>
            <sphereGeometry args={[size * 0.28, 12, 12]} />
            <meshStandardMaterial color="#e8a45a" emissive="#e8a45a" emissiveIntensity={0.55} />
          </mesh>
        ))}
      </group>
    );
  }
  if (visual === "chess") {
    return (
      <mesh>
        <boxGeometry args={[size * 1.4, size * 0.25, size * 1.4]} />
        <meshStandardMaterial color="#e8dcc8" emissive="#e8a45a" emissiveIntensity={0.25} />
      </mesh>
    );
  }
  if (visual === "desk") {
    return (
      <mesh>
        <torusGeometry args={[size, size * 0.15, 10, 24]} />
        <meshStandardMaterial color="#7ec8c4" emissive="#7ec8c4" emissiveIntensity={0.55} />
      </mesh>
    );
  }
  if (visual === "neuro") {
    return (
      <mesh>
        <icosahedronGeometry args={[size, 0]} />
        <meshStandardMaterial color="#7dffb3" emissive="#7dffb3" emissiveIntensity={0.5} flatShading />
      </mesh>
    );
  }
  return (
    <mesh>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color="#6d7f9c" emissive="#7ec8c4" emissiveIntensity={0.25} />
    </mesh>
  );
}

function ConstellationZone() {
  const g = useRef<THREE.Group>(null);
  const { selectedProjectId, progress } = useScrollUniverse();
  const local = chapterLocalProgress(progress, "constellation");
  const near = local > -0.15 && local < 1.15;

  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = clock.elapsedTime * (near ? 0.06 : 0.03);
  });

  const layout = useMemo(() => {
    const domainCounts: Record<string, number> = {};
    return projects.map((p) => {
      const domain = p.domain ?? "games";
      const idx = domainCounts[domain] ?? 0;
      domainCounts[domain] = idx + 1;
      const [ax, ay, az] = DOMAIN_ANCHORS[domain] ?? [0, 0, 0];
      const a = idx * 0.9;
      const r = 0.55 + idx * 0.35;
      return {
        project: p,
        pos: new THREE.Vector3(ax + Math.cos(a) * r, ay + Math.sin(a * 1.3) * 0.35, az + Math.sin(a) * r),
      };
    });
  }, []);

  const edges = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    const byId = Object.fromEntries(layout.map((l) => [l.project.id, l.pos]));
    for (const l of layout) {
      for (const rid of l.project.relatedIds ?? []) {
        if (byId[rid] && l.project.id < rid) lines.push([l.pos, byId[rid]]);
      }
    }
    return lines;
  }, [layout]);

  return (
    <group position={ZONE_ORIGIN.constellation.toArray()}>
      <group ref={g}>
        <mesh>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial color="#f0d7a8" emissive="#e8a45a" emissiveIntensity={0.9} />
        </mesh>
        {edges.map(([a, b], i) => {
          const mid = a.clone().add(b).multiplyScalar(0.5);
          const dir = b.clone().sub(a);
          const len = dir.length();
          const quat = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            dir.clone().normalize(),
          );
          return (
            <mesh key={i} position={mid} quaternion={quat}>
              <cylinderGeometry args={[0.008, 0.008, len, 4]} />
              <meshBasicMaterial color="#7ec8c4" transparent opacity={0.28} />
            </mesh>
          );
        })}
        {layout.map(({ project: p, pos }) => {
          const size =
            p.constellation?.size === "lg" ? 0.32 : p.constellation?.size === "md" ? 0.2 : 0.12;
          const selected = selectedProjectId === p.id;
          return (
            <group key={p.id} position={pos} scale={selected ? 1.35 : 1}>
              <Motif visual={p.constellation?.visual ?? "default"} size={size} />
            </group>
          );
        })}
      </group>
    </group>
  );
}

function SkillsZone() {
  const { selectedSkillDomain } = useScrollUniverse();
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = clock.elapsedTime * 0.1;
  });
  const hubs = useMemo(
    () =>
      skillDomains.map((d, i) => {
        const a = (i / skillDomains.length) * Math.PI * 2;
        return {
          d,
          pos: new THREE.Vector3(
            Math.cos(a) * 2.6,
            Math.sin(a * 2) * 0.35,
            Math.sin(a) * 2.6,
          ),
        };
      }),
    [],
  );
  return (
    <group position={ZONE_ORIGIN.skills.toArray()} ref={g}>
      {hubs.map(({ pos }, i) => {
        const next = hubs[(i + 1) % hubs.length].pos;
        const mid = pos.clone().add(next).multiplyScalar(0.5);
        const dir = next.clone().sub(pos);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize(),
        );
        return (
          <mesh key={`edge-${i}`} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.012, 0.012, len, 4]} />
            <meshBasicMaterial color="#7ec8c4" transparent opacity={0.22} />
          </mesh>
        );
      })}
      {hubs.map(({ d, pos }) => {
        const selected = selectedSkillDomain === d.id;
        return (
          <group key={d.id} position={pos}>
            <mesh scale={selected ? 1.35 : 1}>
              <octahedronGeometry args={[0.28, 0]} />
              <meshStandardMaterial
                color={selected ? "#e8a45a" : "#7ec8c4"}
                emissive={selected ? "#e8a45a" : "#7ec8c4"}
                emissiveIntensity={selected ? 0.8 : 0.35}
                metalness={0.4}
              />
            </mesh>
            {selected
              ? d.items.slice(0, 5).map((item, j) => (
                  <mesh
                    key={item}
                    position={[
                      Math.cos(j * 1.2) * 0.75,
                      0.2 + j * 0.04,
                      Math.sin(j * 1.2) * 0.75,
                    ]}
                  >
                    <boxGeometry args={[0.1, 0.06, 0.1]} />
                    <meshStandardMaterial
                      color="#f0d7a8"
                      emissive="#f0d7a8"
                      emissiveIntensity={0.4}
                    />
                  </mesh>
                ))
              : null}
          </group>
        );
      })}
      <mesh>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial
          color="#2a3d5c"
          emissive="#8b6cff"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

function AwardsZone() {
  const { selectedAwardId, awardFilter } = useScrollUniverse();
  const list = awards.filter(
    (a) => awardFilter === "all" || a.domain === awardFilter,
  );
  return (
    <group position={ZONE_ORIGIN.awards.toArray()}>
      {list.map((a, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        const selected = selectedAwardId === a.id;
        const color =
          a.domain === "math"
            ? "#e8a45a"
            : a.domain === "science"
              ? "#7ec8c4"
              : "#c9a0ff";
        return (
          <group
            key={a.id}
            position={[(col - 1.5) * 1.15, 1.2 - row * 0.95, row * -0.4]}
          >
            <mesh scale={selected ? 1.25 : 1}>
              <cylinderGeometry args={[0.08, 0.12, 0.55, 8]} />
              <meshStandardMaterial
                color="#2a3558"
                emissive={color}
                emissiveIntensity={selected ? 0.85 : 0.4}
                metalness={0.5}
              />
            </mesh>
            <mesh position={[0, 0.4, 0]}>
              <sphereGeometry args={[0.14, 14, 14]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.65} />
            </mesh>
          </group>
        );
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <ringGeometry args={[2.8, 2.9, 64]} />
        <meshBasicMaterial color="#f0d7a8" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function ExploringZone() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = clock.elapsedTime * 0.14;
  });
  return (
    <group position={ZONE_ORIGIN.exploring.toArray()} ref={g}>
      {[1.5, 2.3, 3.1].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2.35, 0, i * 0.25]}>
          <torusGeometry args={[r, 0.025, 8, 64]} />
          <meshBasicMaterial
            color={i === 2 ? "#555" : i === 0 ? "#7ec8c4" : "#e8a45a"}
            transparent
            opacity={i === 2 ? 0.25 : 0.55}
          />
        </mesh>
      ))}
      <mesh position={[1.5, 0, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#7ec8c4" emissive="#7ec8c4" emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[0, 0, 2.3]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#e8a45a" emissive="#e8a45a" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-2.8, 0.2, 0.5]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#555" wireframe />
      </mesh>
    </group>
  );
}

function ChessZone() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.2;
  });
  return (
    <group position={ZONE_ORIGIN.chess.toArray()}>
      <group ref={g} rotation={[-0.5, 0.3, 0]}>
        <mesh>
          <boxGeometry args={[2.2, 0.12, 2.2]} />
          <meshStandardMaterial color="#1a2233" metalness={0.3} />
        </mesh>
        {Array.from({ length: 16 }).map((_, i) => {
          const f = i % 4;
          const r = Math.floor(i / 4);
          return (
            <mesh key={i} position={[(f - 1.5) * 0.45, 0.08, (r - 1.5) * 0.45]}>
              <boxGeometry args={[0.4, 0.06, 0.4]} />
              <meshStandardMaterial
                color={(f + r) % 2 ? "#2a3558" : "#e8dcc8"}
                emissive="#e8a45a"
                emissiveIntensity={0.05}
              />
            </mesh>
          );
        })}
        <mesh position={[-0.45, 0.28, 0.45]}>
          <cylinderGeometry args={[0.1, 0.12, 0.35, 12]} />
          <meshStandardMaterial color="#f3efe6" emissive="#7ec8c4" emissiveIntensity={0.25} />
        </mesh>
        <mesh position={[0.45, 0.32, -0.45]}>
          <cylinderGeometry args={[0.1, 0.12, 0.4, 12]} />
          <meshStandardMaterial color="#1a1a22" emissive="#e8a45a" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

function ContactZone() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 1.8) * 0.1;
    ref.current.scale.setScalar(s);
  });
  return (
    <group position={ZONE_ORIGIN.contact.toArray()}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshStandardMaterial color="#7ec8c4" emissive="#7ec8c4" emissiveIntensity={0.75} transparent opacity={0.85} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.4, 48]} />
        <meshBasicMaterial color="#e8a45a" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function ZoneLights() {
  return (
    <>
      <pointLight position={ZONE_ORIGIN.arrival.toArray()} intensity={1.2} color="#c44b9a" distance={22} />
      <pointLight position={ZONE_ORIGIN.about.toArray()} intensity={0.7} color="#8b6cff" distance={14} />
      <pointLight position={ZONE_ORIGIN.research.toArray()} intensity={0.75} color="#8b6cff" distance={12} />
      <pointLight position={ZONE_ORIGIN.fenlens.toArray()} intensity={0.9} color="#7ec8c4" distance={16} />
      <pointLight position={ZONE_ORIGIN.smartDesk.toArray()} intensity={0.85} color="#e8a45a" distance={14} />
      <pointLight position={ZONE_ORIGIN.neuro.toArray()} intensity={0.8} color="#7dffb3" distance={14} />
      <pointLight position={ZONE_ORIGIN.constellation.toArray()} intensity={1.05} color="#f0d7a8" distance={20} />
      <pointLight position={ZONE_ORIGIN.skills.toArray()} intensity={0.8} color="#7ec8c4" distance={14} />
      <pointLight position={ZONE_ORIGIN.awards.toArray()} intensity={0.75} color="#e8a45a" distance={14} />
      <pointLight position={ZONE_ORIGIN.chess.toArray()} intensity={0.55} color="#e8a45a" distance={10} />
      <pointLight position={ZONE_ORIGIN.contact.toArray()} intensity={0.9} color="#7ec8c4" distance={14} />
    </>
  );
}

export function UniverseWorld({ dense }: { dense: boolean }) {
  const { progress } = useScrollUniverse();
  const chapter = sampleCamera(progress).chapterIndex;
  const fogFar = 36 + progress * 30;
  const fogNear = 8 + (chapter % 3) * 1.5;
  const fogColor =
    chapter < 3
      ? "#070b14"
      : chapter < 7
        ? "#0a1020"
        : chapter < 10
          ? "#0c0e1a"
          : "#070b14";

  return (
    <>
      <color attach="background" args={[fogColor]} />
      <fog attach="fog" args={[fogColor, fogNear, fogFar]} />
      <ambientLight intensity={0.22} />
      <hemisphereLight args={["#8b6cff", "#1a1208", 0.35]} />
      <directionalLight position={[6, 10, 4]} intensity={1.05} color="#f0d7a8" />
      <directionalLight position={[-4, 4, -30]} intensity={0.35} color="#7ec8c4" />
      <ZoneLights />
      <Stars
        radius={140}
        depth={90}
        count={dense ? 4000 : 1800}
        factor={3.4}
        saturation={0.45}
        fade
        speed={0.4}
      />
      <AmbientField count={dense ? 1800 : 900} />
      <ArrivalZone />
      <AboutZone />
      <JourneyZone />
      <ResearchZone />
      <FenLensZone />
      <SmartDeskZone />
      <NeuroZone />
      <ConstellationZone />
      <SkillsZone />
      <AwardsZone />
      <ExploringZone />
      <ChessZone />
      <ContactZone />
    </>
  );
}
