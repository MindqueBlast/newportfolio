"use client";

import { InteractionHint } from "@/components/observatory/InteractionHint";
import { OverlaySection } from "@/components/observatory/OverlaySection";
import { ProjectPanel } from "@/components/observatory/ProjectPanel";
import { getProject, projects } from "@/content/projects";
import { useScrollUniverse } from "@/universe/scroll-store";
import { useMemo, useState } from "react";

export function ProjectsSection() {
  const {
    selectedProjectId,
    setSelectedProjectId,
    hoveredProjectId,
    dismissHint,
  } = useScrollUniverse();
  const [listOpen, setListOpen] = useState(false);

  const selected = useMemo(
    () => (selectedProjectId ? getProject(selectedProjectId) ?? null : null),
    [selectedProjectId],
  );
  const preview = useMemo(() => {
    const id = hoveredProjectId ?? selectedProjectId;
    return id ? getProject(id) ?? null : null;
  }, [hoveredProjectId, selectedProjectId]);

  return (
    <OverlaySection
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
      wide
      side="left"
    >
      <InteractionHint
        chapter="projects"
        message="Click glowing nodes to open a project"
        onDismiss={() => dismissHint("projects")}
      />
      <p className="mb-3 text-sm text-[color:var(--text-muted)]">
        I work across vision, simulation, robotics, and full-stack software.
        Explore the field — hover to preview, click to read more.
      </p>
      {preview ? (
        <p className="mb-4 border-l-2 border-[color:var(--stellar)] pl-3 text-sm text-[color:var(--text-secondary)]">
          <span className="font-[family-name:var(--font-display)] text-[color:var(--text-primary)]">
            {preview.title}
          </span>
          {" — "}
          {preview.summary.slice(0, 150)}
          {preview.summary.length > 150 ? "…" : ""}
        </p>
      ) : (
        <p className="mb-4 text-sm text-[color:var(--instrument)]">
          Move near a node to preview it.
        </p>
      )}
      <button
        type="button"
        className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-muted)] underline-offset-4 hover:text-[color:var(--stellar)] hover:underline"
        onClick={() => setListOpen((v) => !v)}
        aria-expanded={listOpen}
      >
        {listOpen ? "Hide list" : "List all projects"}
      </button>
      {listOpen ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {projects.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setSelectedProjectId(p.id)}
                className="border border-white/10 px-2.5 py-1.5 text-left text-xs text-[color:var(--text-secondary)] hover:border-[color:var(--stellar)]/40"
              >
                {p.title}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <ProjectPanel
        project={selected}
        onClose={() => setSelectedProjectId(null)}
      />
    </OverlaySection>
  );
}
