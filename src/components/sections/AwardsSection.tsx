"use client";

import { OverlaySection } from "@/components/observatory/OverlaySection";
import { awards } from "@/content/awards";
import { useScrollUniverse } from "@/universe/scroll-store";
import { useMemo } from "react";

export function AwardsSection() {
  const {
    awardFilter,
    setAwardFilter,
    selectedAwardId,
    setSelectedAwardId,
  } = useScrollUniverse();

  const filtered = useMemo(
    () =>
      awards.filter(
        (a) => awardFilter === "all" || a.domain === awardFilter,
      ),
    [awardFilter],
  );

  const selected =
    filtered.find((a) => a.id === selectedAwardId) ?? filtered[0] ?? null;

  return (
    <OverlaySection
      id="awards"
      eyebrow="Mission records"
      title="Awards & signals"
      wide
    >
      <p className="mb-4 text-sm text-[color:var(--text-muted)]">
        Discovered signals from competitions and olympiads — not a trophy shelf.
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", "cs", "math", "science"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              setAwardFilter(f);
              setSelectedAwardId(null);
            }}
            className={`rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-wider ${
              awardFilter === f
                ? "border-[color:var(--instrument)] text-[color:var(--instrument)]"
                : "border-white/10 text-[color:var(--text-muted)]"
            }`}
          >
            {f === "cs" ? "CS" : f}
          </button>
        ))}
      </div>
      <ul className="mb-4 flex flex-wrap gap-2">
        {filtered.map((a) => (
          <li key={a.id}>
            <button
              type="button"
              onClick={() => setSelectedAwardId(a.id)}
              className={`rounded-md border px-2.5 py-1 text-left text-xs ${
                selected?.id === a.id
                  ? "border-[color:var(--stellar)] text-[color:var(--text-primary)]"
                  : "border-white/10 text-[color:var(--text-muted)]"
              }`}
            >
              {a.badge}
            </button>
          </li>
        ))}
      </ul>
      {selected ? (
        <article className="border-t border-[color:var(--line)] pt-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--stellar)]">
            {selected.badge} · {selected.domain}
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg text-[color:var(--text-primary)]">
            {selected.title}
          </h3>
          <p className="mt-2 text-sm text-[color:var(--text-muted)]">
            {selected.description}
          </p>
        </article>
      ) : null}
    </OverlaySection>
  );
}
