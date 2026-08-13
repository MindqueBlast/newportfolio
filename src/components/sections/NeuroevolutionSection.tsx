"use client";

import { DemoSourceLinks } from "@/components/observatory/LinkPlaceholders";
import { Section } from "@/components/observatory/Section";
import { getProject } from "@/content/projects";
import { getQualityTier } from "@/lib/quality";
import { NeuroevolutionSim } from "@/simulations/neuroevolution/NeuroevolutionSim";
import { useEffect, useState } from "react";

export function NeuroevolutionSection() {
  const project = getProject("neuroevolution")!;
  const [tier, setTier] = useState(getQualityTier());
  useEffect(() => setTier(getQualityTier()), []);

  return (
    <Section
      id="neuroevolution"
      eyebrow="Flagship artifact"
      title={project.title}
    >
      <p className="mb-6 max-w-3xl text-base leading-relaxed text-[color:var(--text-secondary)]">
        {project.description}
      </p>
      <NeuroevolutionSim tier={tier} />
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
        <DemoSourceLinks
          demo={project.links.demo}
          source={project.links.source}
        />
      </div>
    </Section>
  );
}
