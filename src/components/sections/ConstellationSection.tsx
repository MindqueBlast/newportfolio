"use client";

import { ProjectPanel } from "@/components/observatory/ProjectPanel";
import { SceneSlot } from "@/components/observatory/SceneSlot";
import { Section } from "@/components/observatory/Section";
import { VisibilityGate } from "@/components/observatory/VisibilityGate";
import { getProject, projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { getDprCap, getQualityTier } from "@/lib/quality";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const ConstellationScene = dynamic(
  () =>
    import("@/scenes/constellation/ConstellationScene").then(
      (m) => m.ConstellationScene,
    ),
  { ssr: false },
);

export function ConstellationSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tier, setTier] = useState(getQualityTier());
  useEffect(() => setTier(getQualityTier()), []);
  const dpr = getDprCap(tier);
  const selected = useMemo(
    () => (selectedId ? getProject(selectedId) ?? null : null),
    [selectedId],
  );

  const highlights = projects.filter((p) => p.tier === "highlight");
  const rest = projects.filter((p) => p.tier !== "highlight");

  return (
    <Section
      id="constellation"
      eyebrow="Constellation"
      title="Projects as artifacts in orbit"
    >
      <p className="mb-6 max-w-2xl text-sm text-[color:var(--text-muted)]">
        Highlight nodes — Black Hole Ray Tracer, TerraWatch, City Crisis — sit
        larger in the field. Select any node for details. An accessible list
        mirrors the map.
      </p>
      <SceneSlot
        sceneId="constellation"
        className="mb-8 h-[420px]"
        fallbackClassName="constellation-fallback"
      >
        <VisibilityGate className="h-full w-full">
          <ConstellationScene
            dpr={dpr}
            selectedId={selectedId}
            onSelect={setSelectedId}
            interactive
          />
        </VisibilityGate>
      </SceneSlot>

      <div className="grid gap-8 md:grid-cols-2">
        <ProjectList
          heading="Highlighted systems"
          items={highlights}
          onSelect={setSelectedId}
        />
        <ProjectList
          heading="Supporting artifacts"
          items={rest}
          onSelect={setSelectedId}
        />
      </div>

      <ProjectPanel project={selected} onClose={() => setSelectedId(null)} />
    </Section>
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
      <h3 className="mb-3 text-xs uppercase tracking-[0.18em] text-[color:var(--cyan)]">
        {heading}
      </h3>
      <ul className="space-y-2">
        {items.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onSelect(p.id)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-left transition hover:border-[color:var(--cyan)]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--cyan)]"
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
