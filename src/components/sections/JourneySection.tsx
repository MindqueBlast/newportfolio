"use client";

import { AchievementMeta } from "@/components/observatory/AchievementMeta";
import { LinkPlaceholder } from "@/components/observatory/LinkPlaceholders";
import { OverlaySection } from "@/components/observatory/OverlaySection";
import { getAwardsByIds } from "@/content/awards";
import { research } from "@/content/research";
import { teaching } from "@/content/teaching";
import { timeline } from "@/content/timeline";

export function JourneySection() {
  return (
    <OverlaySection id="journey" eyebrow="Journey" title="Path through the work">
      <ol className="relative max-h-[60vh] space-y-6 overflow-y-auto border-l border-white/15 pl-5 pr-1">
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
            <li key={wp.id} className={`relative ${muted ? "opacity-55" : ""}`}>
              <span
                className="absolute -left-[1.55rem] top-1 h-2.5 w-2.5 rounded-full bg-[color:var(--stellar)]"
                aria-hidden
              />
              <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--ember)]">
                {wp.year}
                {muted ? " · planned" : ""}
              </p>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg text-[color:var(--text-primary)]">
                {wp.title}
              </h3>
              <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                {wp.description}
              </p>
              <AchievementMeta awards={awards} />
              {teach ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  <LinkPlaceholder label="Slides" href={teach.links.slides} />
                  <LinkPlaceholder label="Materials" href={teach.links.materials} />
                  <LinkPlaceholder label="Link" href={teach.links.url} />
                </div>
              ) : null}
              {study && study.status === "active" ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  <LinkPlaceholder label="PDF" href={study.links.pdf} />
                  <LinkPlaceholder label="Notes" href={study.links.notes} />
                  <LinkPlaceholder label="External" href={study.links.external} />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </OverlaySection>
  );
}
