"use client";

import { LinkPlaceholder } from "@/components/observatory/LinkPlaceholders";
import { OverlaySection } from "@/components/observatory/OverlaySection";
import { exploring } from "@/content/exploring";
import { research } from "@/content/research";

export function ExploringSection() {
  const active = exploring.filter((o) => o.status === "active");
  const planned = exploring.filter((o) => o.status === "planned");

  return (
    <OverlaySection id="exploring" eyebrow="Currently exploring" title="Active orbits">
      <div className="space-y-3">
        {active.map((orbit) => {
          const entry = orbit.researchId
            ? research.find((r) => r.id === orbit.researchId)
            : undefined;
          return (
            <article key={orbit.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <h3 className="font-[family-name:var(--font-display)] text-base text-[color:var(--text-primary)]">
                {orbit.label}
              </h3>
              <p className="mt-1 text-sm text-[color:var(--text-muted)]">{orbit.blurb}</p>
              {entry ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  <LinkPlaceholder label="PDF" href={entry.links.pdf} />
                  <LinkPlaceholder label="Notes" href={entry.links.notes} />
                  <LinkPlaceholder label="External" href={entry.links.external} />
                </div>
              ) : null}
            </article>
          );
        })}
        {planned.map((orbit) => (
          <article
            key={orbit.id}
            className="rounded-lg border border-dashed border-white/15 p-3 opacity-55"
            aria-label={`${orbit.label} (planned, not started)`}
          >
            <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
              Planned · not started
            </p>
            <h3 className="mt-1 font-[family-name:var(--font-display)] text-base text-[color:var(--text-secondary)]">
              {orbit.label}
            </h3>
            <p className="mt-1 text-sm text-[color:var(--text-muted)]">{orbit.blurb}</p>
          </article>
        ))}
      </div>
    </OverlaySection>
  );
}
