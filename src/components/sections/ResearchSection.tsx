"use client";

import { LinkPlaceholder } from "@/components/observatory/LinkPlaceholders";
import { OverlaySection } from "@/components/observatory/OverlaySection";
import { activeResearch } from "@/content/research";

export function ResearchSection() {
  const entry = activeResearch[0];
  if (!entry) return null;
  return (
    <OverlaySection
      id="research"
      eyebrow="Research"
      title={entry.title}
      short
      side="right"
    >
      <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
        {entry.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <LinkPlaceholder label="PDF" href={entry.links.pdf} />
        <LinkPlaceholder label="Notes" href={entry.links.notes} />
        <LinkPlaceholder label="External" href={entry.links.external} />
      </div>
    </OverlaySection>
  );
}
