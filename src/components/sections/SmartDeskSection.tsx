"use client";

import { DemoSourceLinks } from "@/components/observatory/LinkPlaceholders";
import { SceneSlot } from "@/components/observatory/SceneSlot";
import { Section } from "@/components/observatory/Section";
import { VisibilityGate } from "@/components/observatory/VisibilityGate";
import { getProject } from "@/content/projects";
import { getDprCap, getQualityTier } from "@/lib/quality";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SmartDeskScene = dynamic(
  () =>
    import("@/scenes/smart-desk/SmartDeskScene").then((m) => m.SmartDeskScene),
  { ssr: false },
);

export function SmartDeskSection() {
  const project = getProject("smart-desk")!;
  const [tier, setTier] = useState(getQualityTier());
  useEffect(() => setTier(getQualityTier()), []);
  const dpr = getDprCap(tier);

  return (
    <Section id="smart-desk" eyebrow="Flagship system" title={project.title}>
      <div className="grid gap-8 lg:grid-cols-2">
        <SceneSlot
          sceneId="smart-desk"
          className="order-2 h-[380px] lg:order-1"
          fallbackClassName="desk-fallback"
        >
          <VisibilityGate className="h-full w-full">
            <SmartDeskScene dpr={dpr} />
          </VisibilityGate>
        </SceneSlot>
        <div className="order-1 lg:order-2">
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
      </div>
    </Section>
  );
}
