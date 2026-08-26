"use client";

import { AchievementMeta } from "@/components/observatory/AchievementMeta";
import { InteractionHint } from "@/components/observatory/InteractionHint";
import { OverlaySection } from "@/components/observatory/OverlaySection";
import { getAwardsByIds } from "@/content/awards";
import { teaching } from "@/content/teaching";
import { timeline } from "@/content/timeline";
import { useScrollUniverse } from "@/universe/scroll-store";
import { AnimatePresence, motion } from "framer-motion";

export function JourneySection() {
  const { journeyIndex, setJourneyJump, dismissHint } = useScrollUniverse();
  const wp = timeline[journeyIndex] ?? timeline[0];
  const awards = getAwardsByIds(wp.awardIds);
  const teach = wp.teachingId
    ? teaching.find((t) => t.id === wp.teachingId)
    : undefined;

  return (
    <OverlaySection
      id="journey"
      eyebrow="Journey"
      title="How I got here"
      side="bottom"
      wide
    >
      <InteractionHint
        chapter="journey"
        onDismiss={() => dismissHint("journey")}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={wp.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[color:var(--instrument)]">
            {wp.year}
            {wp.kind === "planned" ? " · planned" : ""}
          </p>
          <h3 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--text-primary)]">
            {wp.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-muted)]">
            {wp.description}
          </p>
          <AchievementMeta awards={awards} />
          {teach ? (
            <p className="mt-2 text-xs text-[color:var(--text-secondary)]">
              {teach.venue}
            </p>
          ) : null}
        </motion.div>
      </AnimatePresence>
      <ol className="mt-5 flex flex-wrap gap-2" aria-label="Jump to milestone">
        {timeline.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              title={item.title}
              aria-current={i === journeyIndex ? "step" : undefined}
              onClick={() => setJourneyJump(i)}
              className={`inline-block h-2 w-2 rounded-full transition ${
                i === journeyIndex
                  ? "scale-125 bg-[color:var(--stellar)] shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                  : i < journeyIndex
                    ? "bg-[color:var(--instrument)]/60"
                    : "bg-white/20 hover:bg-white/45"
              }`}
            />
          </li>
        ))}
      </ol>
    </OverlaySection>
  );
}
