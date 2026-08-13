"use client";

import { OverlaySection } from "@/components/observatory/OverlaySection";
import { ProjectPanel } from "@/components/observatory/ProjectPanel";
import { getProject, projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { useScrollUniverse } from "@/universe/scroll-store";
import { useMemo, useState } from "react";

const DOMAIN_LABEL: Record<string, string> = {
  cv: "Vision",
  physics: "Physics",
  geospatial: "Geospatial",
  simulation: "Simulation",
  fullstack: "Full stack",
  robotics: "Robotics",
  games: "Games",
};

export function ConstellationSection() {
  const { selectedProjectId, setSelectedProjectId } = useScrollUniverse();
  const [hovered, setHovered] = useState<string | null>(null);
  const selected = useMemo(
    () => (selectedProjectId ? getProject(selectedProjectId) ?? null : null),
    [selectedProjectId],
  );
  const preview = useMemo(() => {
    const id = hovered ?? selectedProjectId;
    return id ? getProject(id) ?? null : null;
  }, [hovered, selectedProjectId]);

  const byDomain = useMemo(() => {
    const map = new Map<string, Project[]>();
    for (const p of projects.filter((x) => x.tier !== "flagship")) {
      const d = p.domain ?? "other";
      if (!map.has(d)) map.set(d, []);
      map.get(d)!.push(p);
    }
    return [...map.entries()];
  }, []);

  const flags = projects.filter((p) => p.tier === "flagship");

  return (
    <OverlaySection
      id="constellation"
      eyebrow="Other projects"
      title="Constellation"
      wide
    >
      <p className="mb-4 text-sm text-[color:var(--text-muted)]">
        Domain-clustered field — node size tracks weight. Hover to preview;
        select to open the instrument panel. The 3D map mirrors selection.
      </p>
      {preview ? (
        <p className="mb-4 border-l-2 border-[color:var(--stellar)] pl-3 text-sm text-[color:var(--text-secondary)]">
          <span className="font-[family-name:var(--font-display)] text-[color:var(--text-primary)]">
            {preview.title}
          </span>
          {" — "}
          {preview.summary.slice(0, 120)}
          {preview.summary.length > 120 ? "…" : ""}
        </p>
      ) : null}
      {byDomain.map(([domain, items]) => (
        <ProjectCluster
          key={domain}
          heading={DOMAIN_LABEL[domain] ?? domain}
          items={items}
          selectedId={selectedProjectId}
          onSelect={setSelectedProjectId}
          onHover={setHovered}
        />
      ))}
      <div className="mt-5">
        <ProjectCluster
          heading="Also in field · flagships"
          items={flags}
          selectedId={selectedProjectId}
          onSelect={setSelectedProjectId}
          onHover={setHovered}
        />
      </div>
      <ProjectPanel
        project={selected}
        onClose={() => setSelectedProjectId(null)}
      />
    </OverlaySection>
  );
}

function ProjectCluster({
  heading,
  items,
  selectedId,
  onSelect,
  onHover,
}: {
  heading: string;
  items: Project[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[color:var(--instrument)]">
        {heading}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((p) => {
          const on = selectedId === p.id;
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onSelect(p.id)}
                onMouseEnter={() => onHover(p.id)}
                onMouseLeave={() => onHover(null)}
                onFocus={() => onHover(p.id)}
                onBlur={() => onHover(null)}
                className={`border px-3 py-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--instrument)] ${
                  on
                    ? "border-[color:var(--stellar)] bg-[color:var(--stellar)]/10"
                    : "border-white/10 bg-white/[0.03] hover:border-[color:var(--stellar)]/40"
                }`}
              >
                <span className="block font-[family-name:var(--font-display)] text-sm text-[color:var(--text-primary)]">
                  {p.title}
                </span>
                <span className="mt-0.5 block max-w-[14rem] text-[11px] text-[color:var(--text-muted)]">
                  {DOMAIN_LABEL[p.domain ?? ""] ?? p.tier}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
