"use client";

import { DemoSourceLinks } from "@/components/observatory/LinkPlaceholders";
import { OverlaySection } from "@/components/observatory/OverlaySection";
import { getProject } from "@/content/projects";

export function SmartDeskSection() {
  const project = getProject("smart-desk")!;
  return (
    <OverlaySection id="smart-desk" eyebrow="Flagship system" title={project.title}>
      <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] md:text-base">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[color:var(--text-muted)]"
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
