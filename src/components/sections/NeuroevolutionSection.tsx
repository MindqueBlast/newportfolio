"use client";

import { DemoSourceLinks } from "@/components/observatory/LinkPlaceholders";
import { OverlaySection } from "@/components/observatory/OverlaySection";
import { getProject } from "@/content/projects";
import { getQualityTier } from "@/lib/quality";
import { NeuroevolutionSim } from "@/simulations/neuroevolution/NeuroevolutionSim";
import { useEffect, useState } from "react";

export function NeuroevolutionSection() {
  const project = getProject("neuroevolution")!;
  const [tier, setTier] = useState(getQualityTier());
  useEffect(() => setTier(getQualityTier()), []);

  return (
    <OverlaySection
      id="neuroevolution"
      eyebrow="Flagship"
      title={project.title}
      wide
    >
      <p className="mb-4 text-sm leading-relaxed text-[color:var(--text-secondary)] md:text-base">
        {project.description}
      </p>
      <div className="-mx-2 overflow-hidden rounded-xl md:-mx-3">
        <NeuroevolutionSim tier={tier} />
      </div>
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
