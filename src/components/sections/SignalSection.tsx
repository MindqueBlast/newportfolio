"use client";

import { ChessTelemetry } from "@/components/observatory/ChessTelemetry";
import { OverlaySection } from "@/components/observatory/OverlaySection";
import { site } from "@/content/site";
import { skills } from "@/content/skills";

export function SignalSection() {
  return (
    <OverlaySection id="signal" eyebrow="Signal" title="How I think about systems">
      <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] md:text-base">
        High school student building technically ambitious tools — computation,
        mathematics, physics, computer vision, robotics, and geospatial software.
        Self-taught since age 7. Astrophysics is part of the identity and future
        direction.
      </p>
      <p className="mt-3 text-sm text-[color:var(--text-muted)]">
        Progression across{" "}
        <span className="text-[color:var(--text-secondary)]">
          {site.identityArc}
        </span>
        .
      </p>
      <p className="mt-3 text-sm text-[color:var(--text-muted)]">
        {site.education.school} · {site.education.classOf}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.flatMap((s) =>
          s.items.slice(0, 3).map((item) => (
            <span
              key={`${s.category}-${item}`}
              className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[color:var(--text-muted)]"
            >
              {item}
            </span>
          )),
        )}
      </div>
      <ChessTelemetry />
    </OverlaySection>
  );
}
