"use client";

import { site } from "@/content/site";
import { teaching } from "@/content/teaching";
import { OverlaySection } from "@/components/observatory/OverlaySection";

export function AboutSection() {
  const workshop = teaching[0];
  return (
    <OverlaySection id="about" eyebrow="About me" title="Who I am">
      <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] md:text-base">
        I’m a high school student who builds ambitious tools across math,
        physics, computer vision, AI, robotics, and geospatial software. I’ve
        been teaching myself since I was 7. Astrophysics isn’t a costume for me —
        it’s part of where I’m headed.
      </p>
      <p className="mt-3 text-sm text-[color:var(--text-muted)]">
        How I got here:{" "}
        <span className="text-[color:var(--text-secondary)]">
          {site.identityArc}
        </span>
        .
      </p>
      <p className="mt-3 text-sm text-[color:var(--text-muted)]">
        {site.education.school} · {site.education.classOf}
      </p>
      {workshop ? (
        <p className="mt-4 text-sm text-[color:var(--text-secondary)]">
          I also taught an intensive Agentic AI workshop at {workshop.venue}.
        </p>
      ) : null}
    </OverlaySection>
  );
}
