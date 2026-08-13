"use client";

import { LinkPlaceholder } from "@/components/observatory/LinkPlaceholders";
import { SceneSlot } from "@/components/observatory/SceneSlot";
import { Section } from "@/components/observatory/Section";
import { VisibilityGate } from "@/components/observatory/VisibilityGate";
import { exploring } from "@/content/exploring";
import { research } from "@/content/research";
import { getDprCap, getQualityTier } from "@/lib/quality";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ExploringScene = dynamic(
  () =>
    import("@/scenes/exploring/ExploringScene").then((m) => m.ExploringScene),
  { ssr: false },
);

export function ExploringSection() {
  const [tier, setTier] = useState(getQualityTier());
  useEffect(() => setTier(getQualityTier()), []);
  const dpr = getDprCap(tier);
  const active = exploring.filter((o) => o.status === "active");
  const planned = exploring.filter((o) => o.status === "planned");

  return (
    <Section
      id="exploring"
      eyebrow="Currently exploring"
      title="Active orbits"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          {active.map((orbit) => {
            const entry = orbit.researchId
              ? research.find((r) => r.id === orbit.researchId)
              : undefined;
            return (
              <article
                key={orbit.id}
                className="instrument-panel"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg text-[color:var(--text-primary)]">
                  {orbit.label}
                </h3>
                <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                  {orbit.blurb}
                </p>
                {entry ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <LinkPlaceholder label="PDF" href={entry.links.pdf} />
                    <LinkPlaceholder label="Notes" href={entry.links.notes} />
                    <LinkPlaceholder
                      label="External"
                      href={entry.links.external}
                    />
                  </div>
                ) : null}
              </article>
            );
          })}
          {planned.map((orbit) => (
            <article
              key={orbit.id}
              className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-3 opacity-60"
              aria-label={`${orbit.label} (planned, not started)`}
            >
              <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                Planned · not started
              </p>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-base text-[color:var(--text-secondary)]">
                {orbit.label}
              </h3>
              <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                {orbit.blurb}
              </p>
            </article>
          ))}
        </div>
        <SceneSlot
          sceneId="exploring"
          className="h-[320px]"
          fallbackClassName="exploring-fallback"
        >
          <VisibilityGate className="h-full w-full">
            <ExploringScene dpr={dpr} />
          </VisibilityGate>
        </SceneSlot>
      </div>
    </Section>
  );
}
