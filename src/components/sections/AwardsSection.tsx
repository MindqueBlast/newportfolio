"use client";

import { InteractionHint } from "@/components/observatory/InteractionHint";
import { OverlaySection } from "@/components/observatory/OverlaySection";
import { awards } from "@/content/awards";
import type { AwardCategory } from "@/universe/scroll-store";
import { useScrollUniverse } from "@/universe/scroll-store";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

const CATEGORY_LABEL: Record<AwardCategory, string> = {
  cs: "Computer Science",
  math: "Mathematics",
  science: "Science",
};

export function AwardsSection() {
  const {
    awardCategory,
    selectedAwardId,
    setSelectedAwardId,
    dismissHint,
  } = useScrollUniverse();

  const filtered = useMemo(
    () =>
      awardCategory
        ? awards.filter((a) => a.domain === awardCategory)
        : awards,
    [awardCategory],
  );

  const selected =
    filtered.find((a) => a.id === selectedAwardId) ??
    awards.find((a) => a.id === selectedAwardId) ??
    filtered[0] ??
    null;

  return (
    <OverlaySection
      id="awards"
      eyebrow="Awards & competitions"
      title="What I've competed in"
      wide
    >
      <InteractionHint
        chapter="awards"
        message="Explore the three regions in the field — CS, Math, Science"
        onDismiss={() => dismissHint("awards")}
      />
      {awardCategory ? (
        <p className="mb-3 text-sm text-[color:var(--instrument)]">
          Viewing: {CATEGORY_LABEL[awardCategory]}
        </p>
      ) : (
        <p className="mb-3 text-sm text-[color:var(--text-muted)]">
          Hover a region in the field to filter, then click a record for details.
        </p>
      )}
      <ul className="mb-4 flex flex-wrap gap-2" aria-label="Award records">
        {filtered.map((a) => (
          <li key={a.id}>
            <button
              type="button"
              onClick={() => setSelectedAwardId(a.id)}
              className={`border px-2.5 py-1 text-left text-xs transition ${
                selected?.id === a.id
                  ? "border-[color:var(--stellar)] text-[color:var(--text-primary)]"
                  : "border-white/10 text-[color:var(--text-muted)] hover:border-white/30"
              }`}
            >
              {a.badge}
            </button>
          </li>
        ))}
      </ul>
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.article
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border-t border-[color:var(--line)] pt-4"
          >
            <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--stellar)]">
              {selected.badge} · {selected.domain}
            </p>
            <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg text-[color:var(--text-primary)]">
              {selected.title}
            </h3>
            <p className="mt-2 text-sm text-[color:var(--text-muted)]">
              {selected.description}
            </p>
          </motion.article>
        ) : null}
      </AnimatePresence>
    </OverlaySection>
  );
}
