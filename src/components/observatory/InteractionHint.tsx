"use client";

import type { ChapterId } from "@/lib/sections";
import { useScrollUniverse } from "@/universe/scroll-store";
import { motion, AnimatePresence } from "framer-motion";

const HINTS: Partial<Record<ChapterId, string>> = {
  journey: "Scroll to move through my timeline",
  projects: "Click nodes to explore projects",
  skills: "Click a hub to see technologies",
  awards: "Explore regions to filter by category",
  focus: "Click orbits to see what I'm studying",
};

type InteractionHintProps = {
  chapter: ChapterId;
  message?: string;
  onDismiss: () => void;
};

export function InteractionHint({
  chapter,
  message,
  onDismiss,
}: InteractionHintProps) {
  const { activeChapter, dismissedHints } = useScrollUniverse();
  const text = message ?? HINTS[chapter];
  const show =
    activeChapter === chapter &&
    text &&
    !dismissedHints.has(chapter);

  return (
    <AnimatePresence>
      {show ? (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mb-3 text-xs uppercase tracking-[0.14em] text-[color:var(--instrument)]"
          onClick={onDismiss}
          role="note"
        >
          {text}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}
