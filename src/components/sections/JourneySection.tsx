"use client";

import { AchievementMeta } from "@/components/observatory/AchievementMeta";
import { OverlaySection } from "@/components/observatory/OverlaySection";
import { getAwardsByIds } from "@/content/awards";
import { teaching } from "@/content/teaching";
import { timeline } from "@/content/timeline";
import { useScrollUniverse } from "@/universe/scroll-store";
import { AnimatePresence, motion } from "framer-motion";

export function JourneySection() {
  const { journeyIndex, setJourneyIndex } = useScrollUniverse();
  const active = Math.min(
    timeline.length - 1,
    Math.max(0, journeyIndex),
  );
  const wp = timeline[active] ?? timeline[0];
  const awards = getAwardsByIds(wp.awardIds);
  const teach = wp.teachingId
    ? teaching.find((t) => t.id === wp.teachingId)
    : undefined;

  return (
    <OverlaySection
      id="journey"
      eyebrow="My journey"
      title="Click through my path"
      side="bottom"
      wide
    >
      <p className="mb-4 text-sm text-[color:var(--text-muted)]">
        Scroll keeps you flying through the site. Explore milestones here —
        click the glowing nodes ahead, or use the controls below.
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={wp.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
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
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="btn-ghost !px-3 !py-2"
          disabled={active <= 0}
          onClick={() => setJourneyIndex(Math.max(0, active - 1))}
        >
          Prev
        </button>
        <button
          type="button"
          className="btn-ghost !px-3 !py-2"
          disabled={active >= timeline.length - 1}
          onClick={() =>
            setJourneyIndex(Math.min(timeline.length - 1, active + 1))
          }
        >
          Next
        </button>
        <ol className="flex flex-wrap gap-2" aria-label="Milestones">
          {timeline.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                title={item.title}
                aria-current={i === active ? "step" : undefined}
                onClick={() => setJourneyIndex(i)}
                className={`inline-block h-2.5 w-2.5 rounded-full transition ${
                  i === active
                    ? "scale-125 bg-[color:var(--stellar)] shadow-[0_0_10px_rgba(232,164,90,0.6)]"
                    : "bg-white/25 hover:bg-white/50"
                }`}
              />
            </li>
          ))}
        </ol>
      </div>
    </OverlaySection>
  );
}
