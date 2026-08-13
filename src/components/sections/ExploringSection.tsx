"use client";

import { OverlaySection } from "@/components/observatory/OverlaySection";
import { exploring } from "@/content/exploring";
import { useScrollUniverse } from "@/universe/scroll-store";
import { AnimatePresence, motion } from "framer-motion";

export function ExploringSection() {
  const { exploringFocusId, setExploringFocusId } = useScrollUniverse();
  const active = exploring.filter((o) => o.status === "active");
  const planned = exploring.filter((o) => o.status === "planned");
  const focused =
    exploring.find((o) => o.id === exploringFocusId) ?? active[0] ?? planned[0];

  return (
    <OverlaySection
      id="exploring"
      eyebrow="Current focus & research"
      title="What I’m into right now"
      side="right"
    >
      <p className="mb-4 text-sm text-[color:var(--text-muted)]">
        Click an orbit in the field — bright ones are active; dim ones are
        planned.
      </p>
      <div className="relative mx-auto mb-5 aspect-square w-full max-w-[200px]">
        <div
          className="absolute inset-[16%] animate-[spin_28s_linear_infinite] rounded-full border border-dashed border-white/20"
          aria-hidden
        />
        <div
          className="absolute inset-[6%] rounded-full border border-[color:var(--violet)]/30"
          aria-hidden
        />
        <div
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--violet)] shadow-[0_0_16px_rgba(139,108,255,0.7)]"
          aria-hidden
        />
        {active.map((orbit, i) => {
          const a = (i / Math.max(1, active.length)) * Math.PI * 2 - Math.PI / 2;
          const r = 36 + i * 7;
          const x = 50 + Math.cos(a) * r;
          const y = 50 + Math.sin(a) * r;
          const on = exploringFocusId === orbit.id;
          return (
            <button
              key={orbit.id}
              type="button"
              title={orbit.label}
              onClick={() => setExploringFocusId(orbit.id)}
              className={`absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition ${
                on
                  ? "bg-[color:var(--stellar)] shadow-[0_0_14px_rgba(232,164,90,0.65)]"
                  : "bg-[color:var(--instrument)] hover:scale-125"
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
            />
          );
        })}
        {planned.map((orbit, i) => {
          const a = Math.PI * 0.35 + i * 0.5;
          const x = 50 + Math.cos(a) * 44;
          const y = 50 + Math.sin(a) * 44;
          return (
            <button
              key={orbit.id}
              type="button"
              title={`${orbit.label} (planned)`}
              onClick={() => setExploringFocusId(orbit.id)}
              className={`absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-transparent ${
                exploringFocusId === orbit.id
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
    </OverlaySection>
  );
}
