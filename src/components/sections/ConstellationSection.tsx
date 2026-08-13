"use client";

import { OverlaySection } from "@/components/observatory/OverlaySection";
import { ProjectPanel } from "@/components/observatory/ProjectPanel";
import { getProject, projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { useScrollUniverse } from "@/universe/scroll-store";
import { useMemo } from "react";

export function ConstellationSection() {
  const { selectedProjectId, setSelectedProjectId } = useScrollUniverse();
  const selected = useMemo(
    () => (selectedProjectId ? getProject(selectedProjectId) ?? null : null),
    [selectedProjectId],
  );
  const highlights = projects.filter((p) => p.tier === "highlight");
  const rest = projects.filter((p) => p.tier !== "highlight");

  return (
    <OverlaySection
      id="constellation"
      eyebrow="Constellation"
      title="Projects as artifacts in orbit"
      wide
    >
      <p className="mb-4 text-sm text-[color:var(--text-muted)]">
        The starfield around you is the project map. Open any artifact below —
        highlights sit larger in the field ahead.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        <ProjectList
          heading="Highlighted"
          items={highlights}
          onSelect={setSelectedProjectId}
        />
        <ProjectList
          heading="Supporting"
          items={rest}
          onSelect={setSelectedProjectId}
        />
      </div>
      <ProjectPanel
        project={selected}
        onClose={() => setSelectedProjectId(null)}
      />
    </OverlaySection>
  );
}

function ProjectList({
  heading,
  items,
  onSelect,
}: {
  heading: string;
  items: Project[];
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h3 className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[color:var(--instrument)]">
        {heading}
      </h3>
      <ul className="max-h-64 space-y-2 overflow-y-auto pr-1">
        {items.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onSelect(p.id)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-left transition hover:border-[color:var(--stellar)]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--instrument)]"
            >
              <span className="font-[family-name:var(--font-display)] text-sm text-[color:var(--text-primary)]">
                {p.title}
              </span>
              <span className="mt-1 block text-xs text-[color:var(--text-muted)]">
                {p.summary}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
