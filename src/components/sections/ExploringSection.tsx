"use client";

import { OverlaySection } from "@/components/observatory/OverlaySection";
import { exploring } from "@/content/exploring";
import { useState } from "react";

export function ExploringSection() {
  const active = exploring.filter((o) => o.status === "active");
  const planned = exploring.filter((o) => o.status === "planned");
  const [focus, setFocus] = useState(active[0]?.id ?? null);
  const focused =
    exploring.find((o) => o.id === focus) ?? active[0] ?? planned[0];

  return (
    <OverlaySection
      id="exploring"
      eyebrow="Currently exploring"
      title="Active orbits"
      side="right"
    >
      <p className="mb-5 text-sm text-[color:var(--text-muted)]">
        Live trajectories in the field ahead — select an orbit to inspect.
      </p>
      <div className="relative mx-auto mb-6 aspect-square w-full max-w-[220px]">
        <div
          className="absolute inset-[18%] rounded-full border border-dashed border-white/15"
          aria-hidden
        />
        <div
          className="absolute inset-[8%] rounded-full border border-white/10"
          aria-hidden
        />
        <div
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--violet)]"
          aria-hidden
        />
        {active.map((orbit, i) => {
          const a = (i / Math.max(1, active.length)) * Math.PI * 2 - Math.PI / 2;
          const r = 38 + i * 8;
          const x = 50 + Math.cos(a) * r;
          const y = 50 + Math.sin(a) * r;
          const on = focus === orbit.id;
          return (
            <button
              key={orbit.id}
              type="button"
              title={orbit.label}
              onClick={() => setFocus(orbit.id)}
              className={`absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition ${
                on
                  ? "bg-[color:var(--stellar)] shadow-[0_0_12px_rgba(232,164,90,0.55)]"
                  : "bg-[color:var(--instrument)]"
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
            />
          );
        })}
        {planned.map((orbit, i) => {
          const a =
            Math.PI * 0.35 + (i / Math.max(1, planned.length)) * 0.8;
          const x = 50 + Math.cos(a) * 44;
          const y = 50 + Math.sin(a) * 44;
          return (
            <button
              key={orbit.id}
              type="button"
              title={`${orbit.label} (planned)`}
              onClick={() => setFocus(orbit.id)}
              className={`absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-transparent ${
                focus === orbit.id ? "border-[color:var(--stellar)]" : ""
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
            />
          );
        })}
      </div>
      {focused ? (
        <article className="border-t border-[color:var(--line)] pt-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--instrument)]">
            {focused.status === "planned" ? "Planned · locked" : "Active"}
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg text-[color:var(--text-primary)]">
            {focused.label}
          </h3>
          <p className="mt-2 text-sm text-[color:var(--text-muted)]">
            {focused.blurb}
          </p>
        </article>
      ) : null}
    </OverlaySection>
  );
}
