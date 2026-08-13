"use client";

import { DemoSourceLinks } from "@/components/observatory/LinkPlaceholders";
import { SceneSlot } from "@/components/observatory/SceneSlot";
import { Section } from "@/components/observatory/Section";
import { VisibilityGate } from "@/components/observatory/VisibilityGate";
import { getProject } from "@/content/projects";
import { getDprCap, getQualityTier } from "@/lib/quality";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FenLensScene = dynamic(
  () => import("@/scenes/fenlens/FenLensScene").then((m) => m.FenLensScene),
  { ssr: false },
);

export function FenLensSection() {
  const project = getProject("fenlens")!;
  const [tier, setTier] = useState(getQualityTier());
  useEffect(() => setTier(getQualityTier()), []);
  const dpr = getDprCap(tier);

  return (
    <Section id="fenlens" eyebrow="Flagship system" title={project.title}>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-base leading-relaxed text-[color:var(--text-secondary)]">
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
            <DemoSourceLinks
              demo={project.links.demo}
              source={project.links.source}
            />
          </div>
        </div>
        <SceneSlot
          sceneId="fenlens"
          className="h-[380px]"
          fallbackClassName="fenlens-fallback"
        >
          <VisibilityGate className="h-full w-full">
            <FenLensScene dpr={dpr} />
          </VisibilityGate>
        </SceneSlot>
      </div>
    </Section>
  );
}
