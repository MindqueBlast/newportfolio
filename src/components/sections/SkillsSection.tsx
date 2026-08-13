"use client";

import { OverlaySection } from "@/components/observatory/OverlaySection";
import { skillDomains } from "@/content/skills";
import { useScrollUniverse } from "@/universe/scroll-store";

export function SkillsSection() {
  const { selectedSkillDomain, setSelectedSkillDomain } = useScrollUniverse();
  const domain =
    skillDomains.find((d) => d.id === selectedSkillDomain) ?? skillDomains[0];

  return (
    <OverlaySection
      id="skills"
      eyebrow="Skills"
      title="Instrument map"
      wide
      side="right"
    >
      <p className="mb-4 text-sm text-[color:var(--text-muted)]">
        Domains as connected systems — select a hub; technologies appear as
        instrument readouts.
      </p>
      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
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
              className={`border px-2.5 py-2.5 text-left transition ${
                on
                  ? "border-[color:var(--stellar)] bg-[color:var(--stellar)]/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/25"
              }`}
            >
              <span className="block text-[10px] uppercase tracking-[0.16em] text-[color:var(--instrument)]">
                Hub
              </span>
              <span className="mt-1 block font-[family-name:var(--font-display)] text-sm text-[color:var(--text-primary)]">
                {d.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-6 border-t border-[color:var(--line)] pt-5">
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
              className="flex items-center gap-2 border-l-2 border-[color:var(--instrument)]/40 px-2.5 py-1.5 text-sm text-[color:var(--text-muted)]"
            >
              <span
                className="h-1 w-1 shrink-0 bg-[color:var(--stellar)]"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </OverlaySection>
  );
}
