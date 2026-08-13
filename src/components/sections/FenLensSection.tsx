"use client";

import { DemoSourceLinks } from "@/components/observatory/LinkPlaceholders";
import { OverlaySection } from "@/components/observatory/OverlaySection";
import { getProject } from "@/content/projects";

export function FenLensSection() {
  const project = getProject("fenlens")!;
  return (
    <OverlaySection id="fenlens" eyebrow="Flagship" title={project.title}>
      <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] md:text-base">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li
            key={t}
            className="border border-white/15 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[color:var(--text-muted)]"
          >
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <DemoSourceLinks demo={project.links.demo} source={project.links.source} />
      </div>
    </OverlaySection>
  );
}
