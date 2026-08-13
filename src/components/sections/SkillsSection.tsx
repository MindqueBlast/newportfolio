"use client";

import { OverlaySection } from "@/components/observatory/OverlaySection";
import { skillDomains } from "@/content/skills";
import { useScrollUniverse } from "@/universe/scroll-store";
import { AnimatePresence, motion } from "framer-motion";

export function SkillsSection() {
  const { selectedSkillDomain, setSelectedSkillDomain } = useScrollUniverse();
  const domain =
    skillDomains.find((d) => d.id === selectedSkillDomain) ?? skillDomains[0];

  return (
    <OverlaySection
      id="skills"
      eyebrow="Skills"
      title="What I work with"
      wide
      side="right"
    >
      <p className="mb-4 text-sm text-[color:var(--text-muted)]">
        Click a glowing hub in the field — or pick a domain here.
      </p>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Skill domains"
      >
        {skillDomains.map((d) => {
          const on = domain.id === d.id;
          return (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setSelectedSkillDomain(d.id)}
              className={`border px-2.5 py-1.5 text-xs transition ${
                on
                  ? "border-[color:var(--stellar)] text-[color:var(--stellar)]"
                  : "border-white/15 text-[color:var(--text-muted)] hover:border-white/35"
              }`}
            >
              {d.label}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={domain.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="mt-5"
        >
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[color:var(--text-primary)]">
            {domain.label}
          </h3>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            {domain.blurb}
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {domain.items.map((item) => (
              <li
                key={item}
                className="border-l-2 border-[color:var(--instrument)]/50 px-2.5 py-1 text-sm text-[color:var(--text-muted)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </OverlaySection>
  );
}
