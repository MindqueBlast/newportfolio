"use client";

import { AchievementMeta } from "@/components/observatory/AchievementMeta";
import { OverlaySection } from "@/components/observatory/OverlaySection";
import { getAwardsByIds } from "@/content/awards";
import { teaching } from "@/content/teaching";
import { timeline } from "@/content/timeline";
import { journeyWaypointIndex } from "@/lib/chapter-progress";
import { useScrollUniverse } from "@/universe/scroll-store";
import { useMemo } from "react";

export function JourneySection() {
  const { progress } = useScrollUniverse();
  const active = useMemo(
    () => journeyWaypointIndex(progress, timeline.length),
    [progress],
  );

  const wp = timeline[active] ?? timeline[0];
  const awards = getAwardsByIds(wp.awardIds);
  const teach = wp.teachingId
    ? teaching.find((t) => t.id === wp.teachingId)
    : undefined;

  return (
    <OverlaySection id="journey" eyebrow="Journey" title="Path through the work">
      <p className="mb-4 text-xs uppercase tracking-[0.18em] text-[color:var(--instrument)]">
        {wp.year}
        {wp.kind === "planned" ? " · planned" : ""}
      </p>
      <h3 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--text-primary)]">
        {wp.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)]">
        {wp.description}
      </p>
      <AchievementMeta awards={awards} />
      {teach ? (
        <p className="mt-3 text-xs text-[color:var(--text-secondary)]">
          {teach.venue}
        </p>
      ) : null}
      <ol className="mt-6 flex flex-wrap gap-2" aria-label="Milestones">
        {timeline.map((item, i) => (
          <li key={item.id}>
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                i === active ? "bg-[color:var(--stellar)]" : "bg-white/25"
              }`}
              title={item.title}
            />
          </li>
        ))}
      </ol>
    </OverlaySection>
  );
}
