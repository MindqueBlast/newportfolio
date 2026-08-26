"use client";

import { InteractionHint } from "@/components/observatory/InteractionHint";
import { OverlaySection } from "@/components/observatory/OverlaySection";
import { exploring } from "@/content/exploring";
import { plannedResearch } from "@/content/research";
import { useScrollUniverse } from "@/universe/scroll-store";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

export type FocusTopic = {
  id: string;
  label: string;
  blurb: string;
  status: "active" | "planned";
};

export function FocusSection() {
  const { focusTopicId, setFocusTopicId, dismissHint } = useScrollUniverse();

  const topics = useMemo<FocusTopic[]>(() => {
    const fromExploring = exploring.map((o) => ({
      id: o.id,
      label: o.label,
      blurb: o.blurb,
      status: o.status,
    }));
    return fromExploring;
  }, []);

  const focused =
    topics.find((t) => t.id === focusTopicId) ?? topics[0] ?? null;

  return (
    <OverlaySection
      id="focus"
      eyebrow="Current focus & research"
      title="What I'm studying now"
      side="right"
    >
      <InteractionHint
        chapter="focus"
        message="Click an orbit — bright ones are active, dim ones are planned"
        onDismiss={() => dismissHint("focus")}
      />
      <p className="mb-4 text-sm text-[color:var(--text-muted)]">
        Right now I'm deep in math, ML, CV, and geospatial work — with
        astrophysics research as a future direction.
      </p>
      <div className="relative mx-auto mb-5 aspect-square w-full max-w-[200px]">
        <div
          className="absolute inset-[16%] animate-[spin_28s_linear_infinite] rounded-full border border-dashed border-white/20"
          aria-hidden
        />
        <div
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--violet)] shadow-[0_0_14px_rgba(139,108,255,0.6)]"
          aria-hidden
        />
        {topics
          .filter((t) => t.status === "active")
          .map((topic, i, arr) => {
            const a = (i / arr.length) * Math.PI * 2 - Math.PI / 2;
            const r = 36 + i * 8;
            const x = 50 + Math.cos(a) * r;
            const y = 50 + Math.sin(a) * r;
            const on = focusTopicId === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                title={topic.label}
                onClick={() => setFocusTopicId(topic.id)}
                className={`absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition ${
                  on
                    ? "bg-[color:var(--stellar)] shadow-[0_0_14px_rgba(251,191,36,0.65)]"
                    : "bg-[color:var(--instrument)] hover:scale-125"
                }`}
                style={{ left: `${x}%`, top: `${y}%` }}
              />
            );
          })}
        {topics
          .filter((t) => t.status === "planned")
          .map((topic, i) => {
            const a = Math.PI * 0.35 + i * 0.5;
            const x = 50 + Math.cos(a) * 44;
            const y = 50 + Math.sin(a) * 44;
            return (
              <button
                key={topic.id}
                type="button"
                title={`${topic.label} (planned)`}
                onClick={() => setFocusTopicId(topic.id)}
                className={`absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-transparent ${
                  focusTopicId === topic.id
                    ? "border-[color:var(--stellar)]"
                    : ""
                }`}
                style={{ left: `${x}%`, top: `${y}%` }}
              />
            );
          })}
      </div>
      <AnimatePresence mode="wait">
        {focused ? (
          <motion.article
            key={focused.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border-t border-[color:var(--line)] pt-4"
          >
            <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--instrument)]">
              {focused.status === "planned" ? "Planned · not started" : "Active"}
            </p>
            <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg text-[color:var(--text-primary)]">
              {focused.label}
            </h3>
            <p className="mt-2 text-sm text-[color:var(--text-muted)]">
              {focused.blurb}
            </p>
          </motion.article>
        ) : null}
      </AnimatePresence>
      {plannedResearch.length > 0 ? (
        <p className="mt-3 text-xs text-[color:var(--text-muted)]">
          {plannedResearch[0].summary}
        </p>
      ) : null}
    </OverlaySection>
  );
}
