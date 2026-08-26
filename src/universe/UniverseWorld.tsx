"use client";

import { awards } from "@/content/awards";
import { exploring } from "@/content/exploring";
import { projects } from "@/content/projects";
import { skillDomains } from "@/content/skills";
import { timeline } from "@/content/timeline";
import type { ChapterBeat } from "@/universe/director/chapter-beats";
import { Float, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { ZONE_ORIGIN } from "./camera-path";
import { ColorDust, FresnelOrb, NebulaPlane } from "./materials/Atmosphere";
import "./materials/shaderMaterials";
import type { AwardCategory } from "./scroll-store";
import { useScrollUniverse } from "./scroll-store";

const DOMAIN_ANCHORS: Record<string, [number, number, number]> = {
  cv: [-3.2, 0.4, -1.2],
  physics: [3.4, 0.6, 0.8],
  geospatial: [2.2, -0.5, -2.4],
  simulation: [0.2, 1.1, 2.2],
  fullstack: [-2.4, -0.8, 2.0],
  robotics: [-1.2, 1.3, 3.2],
  games: [3.0, -1.0, 2.6],
};

const SKILL_COLORS: Record<string, string> = {
  "ai-ml": "#a78bfa",
  cv: "#5eead4",
  simulation: "#fbbf24",
  fullstack: "#e879f9",
  robotics: "#fb7185",
  math: "#fde68a",
};

const AWARD_REGIONS: Record<
  AwardCategory,
  { center: THREE.Vector3; color: string; label: string }
> = {
  cs: {
    center: new THREE.Vector3(-2.6, 0.4, 0.2),
    color: "#c4b5fd",
    label: "CS",
  },
  math: {
    center: new THREE.Vector3(0, 0.7, -0.4),
    color: "#fbbf24",
    label: "Math",
  },
  science: {
    center: new THREE.Vector3(2.6, 0.35, 0.1),
    color: "#5eead4",
    label: "Science",
  },
};

function journeyMotif(id: string) {
  if (id.includes("coding") || id.includes("khan") || id.includes("games"))
    return "code";
  if (id.includes("math")) return "math";
  if (id.includes("hardware") || id.includes("scioly")) return "robotics";
  if (id.includes("ai") || id.includes("teaching")) return "ai";
  if (id.includes("ammoc") || id.includes("astro")) return "research";
  if (id.includes("flagship")) return "vision";
  return "default";
}

function PhysicalCore({
  color,
  emissive,
  radius = 0.55,
}: {
  color: string;
  emissive: string;
  radius?: number;
}) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshPhysicalMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.45}
        metalness={0.55}
        roughness={0.22}
        clearcoat={0.8}
        clearcoatRoughness={0.25}
      />
    </mesh>
  );
}

function HeroZone() {
  const g = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!g.current) return;
    g.current.rotation.y = clock.elapsedTime * 0.07;
    g.current.position.x = ZONE_ORIGIN.hero.x + pointer.x * 0.45;
    g.current.position.y = pointer.y * 0.2;
    if (ring.current) ring.current.rotation.z = clock.elapsedTime * 0.15;
  });
  return (
    <group position={ZONE_ORIGIN.hero.toArray()}>
      <NebulaPlane
        position={[-2, 0.5, -4]}
        scale={18}
        opacity={0.4}
        colorA="#a78bfa"
        colorB="#e879f9"
        colorC="#5eead4"
      />
      <Float speed={1.1} floatIntensity={0.3}>
        <group ref={g} position={[-1.4, 0, 0]}>
          <PhysicalCore color="#1e1b4b" emissive="#c026d3" radius={1.9} />
          <mesh scale={1.08}>
            <sphereGeometry args={[1.9, 48, 48]} />
            <meshPhysicalMaterial
              color="#5eead4"
              transparent
              opacity={0.12}
              roughness={0.1}
              metalness={0}
              side={THREE.BackSide}
            />
          </mesh>
          <FresnelOrb color="#e879f9" radius={2.05} intensity={0.9} />
          <group ref={ring}>
            <mesh rotation={[1.2, 0.2, 0.1]}>
              <torusGeometry args={[2.75, 0.08, 24, 160]} />
              <meshPhysicalMaterial
                color="#fde68a"
                emissive="#fbbf24"
                emissiveIntensity={0.85}
                metalness={0.6}
                roughness={0.25}
              />
            </mesh>
            <mesh rotation={[1.2, 0.2, 0.1]}>
              <torusGeometry args={[3.35, 0.025, 16, 120]} />
              <meshBasicMaterial color="#a78bfa" transparent opacity={0.55} />
            </mesh>
          </group>
          <mesh position={[2.7, 0.9, 0.6]}>
            <sphereGeometry args={[0.32, 32, 32]} />
            <meshPhysicalMaterial
              color="#e2e8f0"
              emissive="#5eead4"
              emissiveIntensity={0.5}
              metalness={0.3}
              roughness={0.35}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function AboutZone() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = clock.elapsedTime * 0.18;
  });
  return (
    <group position={ZONE_ORIGIN.about.toArray()} ref={g}>
      {[1.2, 1.85, 2.55, 3.2].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2.3, i * 0.5, i * 0.2]}>
          <torusGeometry args={[r, 0.03, 12, 96]} />
          <meshPhysicalMaterial
            color={i % 2 ? "#5eead4" : "#a78bfa"}
            emissive={i % 2 ? "#5eead4" : "#a78bfa"}
            emissiveIntensity={0.55}
            metalness={0.5}
            roughness={0.3}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
      <PhysicalCore color="#312e81" emissive="#8b5cf6" radius={0.5} />
      <FresnelOrb color="#67e8f9" radius={0.72} intensity={1.1} />
    </group>
  );
}

function JourneyArtifact({
  kind,
  on,
  past,
  color,
}: {
  kind: string;
  on: boolean;
  past: boolean;
  color: string;
}) {
  const s = on ? 1.45 : past ? 1.05 : 0.82;
  const emissive = on ? 1 : past ? 0.55 : 0.22;
  if (kind === "code") {
    return (
      <mesh scale={s}>
        <boxGeometry args={[0.38, 0.26, 0.1]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissive}
          metalness={0.55}
          roughness={0.25}
          clearcoat={0.6}
        />
      </mesh>
    );
  }
  if (kind === "math") {
    return (
      <mesh scale={s} rotation={[0.4, 0.5, 0]}>
        <octahedronGeometry args={[0.24, 0]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={on ? 1.1 : emissive}
          metalness={0.4}
          roughness={0.2}
          flatShading
        />
      </mesh>
    );
  }
  if (kind === "robotics") {
    return (
      <group scale={s}>
        <mesh>
          <cylinderGeometry args={[0.14, 0.18, 0.32, 10]} />
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={emissive}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0.26, 0]}>
          <boxGeometry args={[0.26, 0.12, 0.26]} />
          <meshPhysicalMaterial color="#e2e8f0" metalness={0.5} roughness={0.35} />
        </mesh>
      </group>
    );
  }
  if (kind === "ai") {
    return (
      <mesh scale={s}>
        <icosahedronGeometry args={[0.22, 1]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissive}
          flatShading
          metalness={0.35}
          roughness={0.25}
        />
      </mesh>
    );
  }
  if (kind === "research") {
    return (
      <mesh scale={s}>
        <torusKnotGeometry args={[0.16, 0.04, 64, 12]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissive}
          metalness={0.55}
          roughness={0.25}
        />
      </mesh>
    );
  }
  if (kind === "vision") {
    return (
      <group scale={s}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.24, 0.05, 12, 36]} />
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={emissive}
          />
        </mesh>
        <FresnelOrb color="#5eead4" radius={0.1} intensity={1.2} />
      </group>
    );
  }
  return (
    <mesh scale={s}>
      <sphereGeometry args={[0.18, 24, 24]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={emissive}
        metalness={0.4}
        roughness={0.3}
      />
    </mesh>
  );
}

function JourneyZone() {
  const { journeyIndex, setJourneyJump } = useScrollUniverse();
  const ribbon = useRef<THREE.ShaderMaterial>(null);
  const [hover, setHover] = useState<number | null>(null);

  const points = useMemo(() => {
    return timeline.map((_, i) => {
      const t = i / Math.max(1, timeline.length - 1);
      return new THREE.Vector3(
        Math.sin(t * Math.PI * 1.5) * 3.6,
        Math.cos(t * Math.PI * 2) * 1.15,
        t * -10,
      );
    });
  }, []);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const active = Math.min(timeline.length - 1, Math.max(0, journeyIndex));
  const era = active / Math.max(1, timeline.length - 1);

  useFrame(({ clock }) => {
    if (ribbon.current) ribbon.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <group position={ZONE_ORIGIN.journey.toArray()}>
      <pointLight
        position={[0, 2.2, -4]}
        intensity={0.8 + era * 0.4}
        color={era < 0.4 ? "#5eead4" : era < 0.7 ? "#fbbf24" : "#a78bfa"}
        distance={20}
      />
      <mesh>
        <tubeGeometry args={[curve, 120, 0.07, 12, false]} />
        <energyRibbonMaterial
          ref={ribbon}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uColor={new THREE.Color("#67e8f9")}
          uColorB={new THREE.Color("#e879f9")}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve, 80, 0.035, 8, false]} />
        <meshPhysicalMaterial
          color="#1e1b4b"
          emissive="#5eead4"
          emissiveIntensity={0.35}
          metalness={0.5}
          roughness={0.35}
        />
      </mesh>
      {timeline.map((wp, i) => {
        const p = points[i];
        const on = i === active;
        const past = i < active;
        const near = hover === i;
        const color =
          wp.kind === "planned"
            ? "#64748b"
            : wp.teachingId
              ? "#fbbf24"
              : wp.awardIds?.length
                ? "#fde68a"
                : "#5eead4";
        return (
          <group key={wp.id} position={p}>
            <mesh
              visible={false}
              onClick={(e) => {
                e.stopPropagation();
                setJourneyJump(i);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHover(i);
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                setHover(null);
                document.body.style.cursor = "auto";
              }}
            >
              <sphereGeometry args={[0.45, 8, 8]} />
              <meshBasicMaterial />
            </mesh>
            <JourneyArtifact
              kind={journeyMotif(wp.id)}
              on={on || near}
              past={past}
              color={color}
            />
            {on || near ? (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.36, 0.46, 40]} />
                <meshBasicMaterial
                  color="#fbbf24"
                  transparent
                  opacity={on ? 0.75 : 0.4}
                />
              </mesh>
            ) : past ? (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.3, 0.36, 24]} />
                <meshBasicMaterial color="#94a3b8" transparent opacity={0.35} />
              </mesh>
            ) : (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.26, 0.3, 20]} />
                <meshBasicMaterial color="#475569" transparent opacity={0.18} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

function Motif({
  visual,
  size,
  hot,
}: {
  visual: string;
  size: number;
  hot: boolean;
}) {
  const s = hot ? 1.25 : 1;
  if (visual === "lensing") {
    return (
      <group scale={s}>
        <mesh>
          <torusGeometry args={[size * 1.25, size * 0.2, 16, 48]} />
          <meshPhysicalMaterial
            color="#c4b5fd"
            emissive="#a78bfa"
            emissiveIntensity={hot ? 1.1 : 0.7}
            metalness={0.5}
          />
        </mesh>
        <PhysicalCore color="#1e1030" emissive="#e879f9" radius={size * 0.45} />
      </group>
    );
  }
  if (visual === "earth") {
    return (
      <group scale={s}>
        <mesh>
          <sphereGeometry args={[size, 32, 32]} />
          <meshPhysicalMaterial
            color="#0f766e"
            emissive="#5eead4"
            emissiveIntensity={0.45}
            metalness={0.35}
            roughness={0.4}
          />
        </mesh>
        <mesh position={[size * 1.55, 0.1, 0]}>
          <boxGeometry args={[size * 0.4, size * 0.22, size * 0.55]} />
          <meshPhysicalMaterial
            color="#e2e8f0"
            emissive="#fbbf24"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>
    );
  }
  if (visual === "network") {
    return (
      <group scale={s}>
        {[
          [0, 0],
          [1, 0.5],
          [-0.8, 0.6],
          [0.3, -0.7],
        ].map(([x, y], i) => (
          <mesh key={i} position={[x * size, y * size, 0]}>
            <sphereGeometry args={[size * 0.28, 14, 14]} />
            <meshPhysicalMaterial
              color="#fbbf24"
              emissive="#f59e0b"
              emissiveIntensity={hot ? 0.9 : 0.55}
            />
          </mesh>
        ))}
      </group>
    );
  }
  if (visual === "chess") {
    return (
      <mesh scale={s}>
        <boxGeometry args={[size * 1.5, size * 0.28, size * 1.5]} />
        <meshPhysicalMaterial
          color="#f1e7d0"
          emissive="#fbbf24"
          emissiveIntensity={0.3}
          metalness={0.2}
        />
      </mesh>
    );
  }
  if (visual === "desk") {
    return (
      <mesh scale={s}>
        <torusGeometry args={[size, size * 0.16, 14, 36]} />
        <meshPhysicalMaterial
          color="#5eead4"
          emissive="#2dd4bf"
          emissiveIntensity={hot ? 0.9 : 0.55}
        />
      </mesh>
    );
  }
  if (visual === "neuro") {
    return (
      <mesh scale={s}>
        <icosahedronGeometry args={[size, 1]} />
        <meshPhysicalMaterial
          color="#5eead4"
          emissive="#2dd4bf"
          emissiveIntensity={0.65}
          flatShading
        />
      </mesh>
    );
  }
  return (
    <mesh scale={s}>
      <sphereGeometry args={[size, 20, 20]} />
      <meshPhysicalMaterial
        color="#64748b"
        emissive="#5eead4"
        emissiveIntensity={hot ? 0.55 : 0.3}
      />
    </mesh>
  );
}

function ProjectsZone() {
  const g = useRef<THREE.Group>(null);
  const {
    selectedProjectId,
    setSelectedProjectId,
    hoveredProjectId,
    setHoveredProjectId,
    dismissHint,
  } = useScrollUniverse();

  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = clock.elapsedTime * 0.05;
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
        pos: new THREE.Vector3(
          ax + Math.cos(a) * r,
          ay + Math.sin(a * 1.3) * 0.35,
          az + Math.sin(a) * r,
        ),
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
    <group position={ZONE_ORIGIN.projects.toArray()}>
      <NebulaPlane
        position={[0, 0, 2]}
        scale={14}
        opacity={0.28}
        colorA="#312e81"
        colorB="#0e7490"
        colorC="#fbbf24"
      />
      <group ref={g}>
        <FresnelOrb color="#fbbf24" radius={0.42} intensity={1.4} />
        <PhysicalCore color="#78350f" emissive="#f59e0b" radius={0.28} />
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
              <cylinderGeometry args={[0.012, 0.012, len, 6]} />
              <meshBasicMaterial color="#5eead4" transparent opacity={0.35} />
            </mesh>
          );
        })}
        {layout.map(({ project: p, pos }) => {
          const size =
            p.constellation?.size === "lg"
              ? 0.34
              : p.constellation?.size === "md"
                ? 0.22
                : 0.13;
          const selected = selectedProjectId === p.id;
          const hovered = hoveredProjectId === p.id;
          return (
            <group key={p.id} position={pos}>
              <mesh
                visible={false}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProjectId(p.id);
                  dismissHint("projects");
                }}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setHoveredProjectId(p.id);
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  setHoveredProjectId(null);
                  document.body.style.cursor = "auto";
                }}
              >
                <sphereGeometry args={[size * 2.2, 8, 8]} />
                <meshBasicMaterial />
              </mesh>
              <Motif
                visual={p.constellation?.visual ?? "default"}
                size={size}
                hot={selected || hovered}
              />
              {selected || hovered ? (
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[size * 1.6, size * 1.85, 32]} />
                  <meshBasicMaterial
                    color="#fbbf24"
                    transparent
                    opacity={0.65}
                  />
                </mesh>
              ) : null}
            </group>
          );
        })}
      </group>
    </group>
  );
}

function SkillsZone() {
  const { selectedSkillDomain, setSelectedSkillDomain, dismissHint } =
    useScrollUniverse();
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
            Math.cos(a) * 2.9,
            Math.sin(a * 2) * 0.45,
            Math.sin(a) * 2.9,
          ),
          color: SKILL_COLORS[d.id] ?? "#5eead4",
        };
      }),
    [],
  );

  return (
    <group position={ZONE_ORIGIN.skills.toArray()} ref={g}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.4, 3.55, 72]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.22} />
      </mesh>
      {hubs.map(({ pos, color }, i) => {
        const next = hubs[(i + 1) % hubs.length].pos;
        const mid = pos.clone().add(next).multiplyScalar(0.5);
        const dir = next.clone().sub(pos);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize(),
        );
        return (
          <mesh key={`e-${i}`} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.012, 0.012, len, 6]} />
            <meshBasicMaterial color={color} transparent opacity={0.28} />
          </mesh>
        );
      })}
      {hubs.map(({ d, pos, color }) => {
        const selected = selectedSkillDomain === d.id;
        return (
          <group key={d.id} position={pos}>
            <mesh
              visible={false}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSkillDomain(d.id);
                dismissHint("skills");
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto";
              }}
            >
              <sphereGeometry args={[0.65, 8, 8]} />
              <meshBasicMaterial />
            </mesh>
            <mesh scale={selected ? 1.5 : 1}>
              <icosahedronGeometry args={[0.28, 1]} />
              <meshPhysicalMaterial
                color={color}
                emissive={color}
                emissiveIntensity={selected ? 1.05 : 0.42}
                metalness={0.45}
                roughness={0.22}
                flatShading
              />
            </mesh>
            {selected
              ? d.items.slice(0, 6).map((item, j) => {
                  const a = (j / 6) * Math.PI * 2;
                  const r = 0.95 + (j % 2) * 0.15;
                  return (
                    <mesh
                      key={item}
                      position={[
                        Math.cos(a) * r,
                        0.15 + Math.sin(j) * 0.08,
                        Math.sin(a) * r,
                      ]}
                    >
                      <sphereGeometry args={[0.09, 10, 10]} />
                      <meshPhysicalMaterial
                        color="#fde68a"
                        emissive="#fbbf24"
                        emissiveIntensity={0.75}
                      />
                    </mesh>
                  );
                })
              : null}
          </group>
        );
      })}
      <FresnelOrb color="#a78bfa" radius={0.45} intensity={1.25} />
    </group>
  );
}

function AwardsZone() {
  const {
    selectedAwardId,
    setSelectedAwardId,
    awardCategory,
    setAwardCategory,
    dismissHint,
  } = useScrollUniverse();

  const byRegion = useMemo(() => {
    const map: Record<AwardCategory, typeof awards> = {
      cs: [],
      math: [],
      science: [],
    };
    for (const a of awards) {
      if (a.domain === "cs" || a.domain === "math" || a.domain === "science") {
        map[a.domain].push(a);
      }
    }
    return map;
  }, []);

  return (
    <group position={ZONE_ORIGIN.awards.toArray()}>
      {(Object.keys(AWARD_REGIONS) as AwardCategory[]).map((cat) => {
        const region = AWARD_REGIONS[cat];
        const highlighted = !awardCategory || awardCategory === cat;
        return (
          <group key={cat} position={region.center}>
            <mesh
              rotation={[Math.PI / 2.2, 0, 0]}
              onPointerOver={(e) => {
                e.stopPropagation();
                setAwardCategory(cat);
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto";
              }}
            >
              <torusGeometry args={[1.35, 0.04, 12, 64]} />
              <meshBasicMaterial
                color={region.color}
                transparent
                opacity={highlighted ? 0.55 : 0.15}
              />
            </mesh>
            <mesh position={[0, 0.9, 0]}>
              <boxGeometry args={[0.01, 0.01, 0.01]} />
            </mesh>
          </group>
        );
      })}
      {(Object.keys(byRegion) as AwardCategory[]).flatMap((cat) => {
        const region = AWARD_REGIONS[cat];
        const list = byRegion[cat];
        const dimmed = awardCategory !== null && awardCategory !== cat;
        return list.map((a, i) => {
          const row = Math.floor(i / 3);
          const col = i % 3;
          const selected = selectedAwardId === a.id;
          const pos = new THREE.Vector3(
            region.center.x + (col - 1) * 0.55,
            region.center.y + 0.35 - row * 0.55,
            region.center.z + row * -0.25,
          );
          return (
            <group key={a.id} position={pos}>
              <mesh
                visible={false}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAwardId(a.id);
                  setAwardCategory(cat);
                  dismissHint("awards");
                }}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setAwardCategory(cat);
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "auto";
                }}
              >
                <sphereGeometry args={[0.35, 8, 8]} />
                <meshBasicMaterial />
              </mesh>
              <mesh scale={selected ? 1.35 : dimmed ? 0.85 : 1}>
                <cylinderGeometry args={[0.08, 0.12, 0.48, 10]} />
                <meshPhysicalMaterial
                  color="#1e293b"
                  emissive={region.color}
                  emissiveIntensity={
                    selected ? 1 : dimmed ? 0.15 : 0.45
                  }
                  metalness={0.6}
                  transparent
                  opacity={dimmed ? 0.45 : 1}
                />
              </mesh>
              <mesh position={[0, 0.38, 0]}>
                <sphereGeometry args={[0.14, 16, 16]} />
                <meshPhysicalMaterial
                  color={region.color}
                  emissive={region.color}
                  emissiveIntensity={selected ? 0.95 : dimmed ? 0.2 : 0.65}
                  metalness={0.4}
                  roughness={0.2}
                />
              </mesh>
            </group>
          );
        });
      })}
    </group>
  );
}

function FocusZone() {
  const g = useRef<THREE.Group>(null);
  const { focusTopicId, setFocusTopicId, dismissHint } = useScrollUniverse();
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = clock.elapsedTime * 0.16;
  });
  const active = exploring.filter((o) => o.status === "active");
  const planned = exploring.filter((o) => o.status === "planned");
  return (
    <group position={ZONE_ORIGIN.focus.toArray()} ref={g}>
      {[1.5, 2.35, 3.2].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2.35, 0, i * 0.25]}>
          <torusGeometry args={[r, 0.03, 10, 80]} />
          <meshBasicMaterial
            color={i === 2 ? "#475569" : i === 0 ? "#5eead4" : "#fbbf24"}
            transparent
            opacity={i === 2 ? 0.3 : 0.65}
          />
        </mesh>
      ))}
      {active.map((orbit, i) => {
        const a = (i / active.length) * Math.PI * 2;
        const r = 1.5 + (i % 3) * 0.4;
        const on = focusTopicId === orbit.id;
        return (
          <group
            key={orbit.id}
            position={[Math.cos(a) * r, Math.sin(a * 0.3) * 0.2, Math.sin(a) * r]}
          >
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                setFocusTopicId(orbit.id);
                dismissHint("focus");
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto";
              }}
              scale={on ? 1.35 : 1}
            >
              <sphereGeometry args={[0.16, 20, 20]} />
              <meshPhysicalMaterial
                color="#5eead4"
                emissive="#2dd4bf"
                emissiveIntensity={on ? 1 : 0.55}
              />
            </mesh>
          </group>
        );
      })}
      {planned.map((orbit, i) => {
        const a = Math.PI * 0.4 + i;
        const on = focusTopicId === orbit.id;
        return (
          <mesh
            key={orbit.id}
            position={[Math.cos(a) * 3.0, 0.15, Math.sin(a) * 3.0]}
            onClick={(e) => {
              e.stopPropagation();
              setFocusTopicId(orbit.id);
              dismissHint("focus");
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto";
            }}
            scale={on ? 1.25 : 1}
          >
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshBasicMaterial
              color={on ? "#fbbf24" : "#64748b"}
              wireframe
            />
          </mesh>
        );
      })}
    </group>
  );
}

function ChessZone() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (g.current)
      g.current.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.25;
  });
  return (
    <group position={ZONE_ORIGIN.chess.toArray()}>
      <NebulaPlane
        position={[0, 0.5, -1]}
        scale={8}
        opacity={0.22}
        colorA="#fbbf24"
        colorB="#fb7185"
        colorC="#a78bfa"
      />
      <group ref={g} rotation={[-0.5, 0.3, 0]}>
        <mesh>
          <boxGeometry args={[2.3, 0.14, 2.3]} />
          <meshPhysicalMaterial color="#1e293b" metalness={0.4} roughness={0.35} />
        </mesh>
        {Array.from({ length: 16 }).map((_, i) => {
          const f = i % 4;
          const r = Math.floor(i / 4);
          return (
            <mesh
              key={i}
              position={[(f - 1.5) * 0.48, 0.1, (r - 1.5) * 0.48]}
            >
              <boxGeometry args={[0.42, 0.07, 0.42]} />
              <meshPhysicalMaterial
                color={(f + r) % 2 ? "#334155" : "#f8fafc"}
                emissive="#fbbf24"
                emissiveIntensity={0.06}
              />
            </mesh>
          );
        })}
        <mesh position={[-0.48, 0.32, 0.48]}>
          <cylinderGeometry args={[0.11, 0.13, 0.4, 14]} />
          <meshPhysicalMaterial
            color="#f8fafc"
            emissive="#5eead4"
            emissiveIntensity={0.35}
          />
        </mesh>
        <mesh position={[0.48, 0.36, -0.48]}>
          <cylinderGeometry args={[0.11, 0.13, 0.45, 14]} />
          <meshPhysicalMaterial
            color="#0f172a"
            emissive="#fbbf24"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}

function ContactZone() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 1.6) * 0.08;
    ref.current.scale.setScalar(s);
  });
  return (
    <group position={ZONE_ORIGIN.contact.toArray()}>
      <group ref={ref}>
        <FresnelOrb color="#5eead4" radius={0.85} intensity={1.3} />
        <PhysicalCore color="#0f766e" emissive="#14b8a6" radius={0.55} />
      </group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.35, 1.5, 64]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0.2, 0]}>
        <ringGeometry args={[1.7, 1.78, 64]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export function UniverseWorld({
  dense,
  beat,
}: {
  dense: boolean;
  beat: ChapterBeat;
}) {
  const { progress } = useScrollUniverse();
  const fogFar = 38 + progress * 32 + beat.fogFarBoost;
  const fogNear = beat.fogNear;
  const fogColor = beat.fogColor;

  return (
    <>
      <color attach="background" args={[fogColor]} />
      <fog attach="fog" args={[fogColor, fogNear, fogFar]} />
      <ambientLight intensity={beat.ambient} />
      <hemisphereLight args={["#a78bfa", "#1a1020", 0.45]} />
      <directionalLight position={[8, 12, 5]} intensity={1.15} color="#fde68a" />
      <directionalLight position={[-6, 4, -40]} intensity={0.45} color="#5eead4" />
      <pointLight
        position={ZONE_ORIGIN.hero.toArray()}
        intensity={1.4}
        color={beat.accent}
        distance={24}
      />
      <pointLight
        position={ZONE_ORIGIN.projects.toArray()}
        intensity={1.2}
        color="#fbbf24"
        distance={22}
      />
      <pointLight
        position={ZONE_ORIGIN.journey.toArray()}
        intensity={1.0}
        color="#67e8f9"
        distance={20}
      />
      <pointLight
        position={ZONE_ORIGIN.contact.toArray()}
        intensity={1.0}
        color="#5eead4"
        distance={16}
      />
      <Stars
        radius={150}
        depth={100}
        count={dense ? 5000 : 2200}
        factor={3.8}
        saturation={0.6}
        fade
        speed={0.55}
      />
      <ColorDust count={dense ? 2200 : 1100} />
      <NebulaPlane position={[4, 2, -30]} scale={22} opacity={0.3} />
      <NebulaPlane
        position={[-6, -1, -75]}
        scale={20}
        opacity={0.26}
        colorA="#0e7490"
        colorB="#a78bfa"
        colorC="#fb7185"
      />
      <NebulaPlane
        position={[5, 1, -115]}
        scale={18}
        opacity={0.24}
        colorA="#e879f9"
        colorB="#fbbf24"
        colorC="#5eead4"
      />
      <HeroZone />
      <AboutZone />
      <JourneyZone />
      <ProjectsZone />
      <SkillsZone />
      <AwardsZone />
      <FocusZone />
      <ChessZone />
      <ContactZone />
    </>
  );
}
