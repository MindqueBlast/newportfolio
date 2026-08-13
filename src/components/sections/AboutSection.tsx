"use client";

import { site } from "@/content/site";
import { teaching } from "@/content/teaching";
import { OverlaySection } from "@/components/observatory/OverlaySection";

export function AboutSection() {
  const workshop = teaching[0];
  return (
    <OverlaySection id="about" eyebrow="About" title="How I think about systems">
      <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] md:text-base">
        High school student building technically ambitious tools across
        computation, mathematics, physics, computer vision, robotics, and
        geospatial software. Self-taught since age 7. Astrophysics is part of
        the identity and future direction — not a costume.
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
      {workshop ? (
        <p className="mt-4 border-t border-[color:var(--line)] pt-4 text-sm text-[color:var(--text-secondary)]">
          Also taught an intensive Agentic AI workshop at {workshop.venue}.
        </p>
      ) : null}
    </OverlaySection>
  );
}
