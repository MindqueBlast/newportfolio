"use client";

import { AchievementMeta } from "@/components/observatory/AchievementMeta";
import { LinkPlaceholder } from "@/components/observatory/LinkPlaceholders";
import { SceneSlot } from "@/components/observatory/SceneSlot";
import { Section } from "@/components/observatory/Section";
import { VisibilityGate } from "@/components/observatory/VisibilityGate";
import { getAwardsByIds } from "@/content/awards";
import { research } from "@/content/research";
import { teaching } from "@/content/teaching";
import { timeline } from "@/content/timeline";
import { getDprCap, getQualityTier } from "@/lib/quality";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const JourneyScene = dynamic(
  () => import("@/scenes/journey/JourneyScene").then((m) => m.JourneyScene),
  { ssr: false },
);

export function JourneySection() {
  const [tier, setTier] = useState(getQualityTier());
  useEffect(() => setTier(getQualityTier()), []);
  const dpr = getDprCap(tier);

  return (
    <Section id="journey" eyebrow="Journey" title="Path through the work">
      <SceneSlot
        sceneId="journey"
        className="mb-10 h-[220px]"
        fallbackClassName="journey-fallback"
      >
        <VisibilityGate className="h-full w-full">
          <JourneyScene dpr={dpr} />
        </VisibilityGate>
      </SceneSlot>
      <ol className="relative space-y-8 border-l border-white/15 pl-6">
        {timeline.map((wp) => {
          const awards = getAwardsByIds(wp.awardIds);
          const teach = wp.teachingId
            ? teaching.find((t) => t.id === wp.teachingId)
            : undefined;
          const study = wp.researchId
            ? research.find((r) => r.id === wp.researchId)
            : undefined;
          const muted = wp.kind === "planned";
          return (
            <li
              key={wp.id}
              className={`relative ${muted ? "opacity-55" : ""}`}
            >
              <span
                className="absolute -left-[1.7rem] top-1 h-2.5 w-2.5 rounded-full bg-[color:var(--cyan)]"
                aria-hidden
              />
              <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--magenta)]">
                {wp.year}
                {muted ? " · planned" : ""}
              </p>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl text-[color:var(--text-primary)]">
                {wp.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-muted)]">
                {wp.description}
              </p>
              <AchievementMeta awards={awards} />
              {teach ? (
                <div className="mt-3">
                  <p className="text-xs text-[color:var(--text-secondary)]">
                    {teach.venue}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <LinkPlaceholder label="Slides" href={teach.links.slides} />
                    <LinkPlaceholder
                      label="Materials"
                      href={teach.links.materials}
                    />
                    <LinkPlaceholder label="Link" href={teach.links.url} />
                  </div>
                </div>
              ) : null}
              {study && study.status === "active" ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  <LinkPlaceholder label="PDF" href={study.links.pdf} />
                  <LinkPlaceholder label="Notes" href={study.links.notes} />
                  <LinkPlaceholder
                    label="External"
                    href={study.links.external}
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
