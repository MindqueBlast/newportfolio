"use client";

import { ChessTelemetry } from "@/components/observatory/ChessTelemetry";
import { SceneSlot } from "@/components/observatory/SceneSlot";
import { Section } from "@/components/observatory/Section";
import { VisibilityGate } from "@/components/observatory/VisibilityGate";
import { site } from "@/content/site";
import { skills } from "@/content/skills";
import { getDprCap, getQualityTier } from "@/lib/quality";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SignalScene = dynamic(
  () => import("@/scenes/signal/SignalScene").then((m) => m.SignalScene),
  { ssr: false },
);

export function SignalSection() {
  const [tier, setTier] = useState(getQualityTier());
  useEffect(() => setTier(getQualityTier()), []);
  const dpr = getDprCap(tier);

  return (
    <Section id="signal" eyebrow="Signal" title="How I think about systems">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-base leading-relaxed text-[color:var(--text-secondary)]">
            High school student building technically ambitious tools — computation,
            mathematics, physics, computer vision, robotics, and geospatial
            software. Self-taught since age 7. Astrophysics is part of the
            identity and future direction, not a costume.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-muted)]">
            Progression across{" "}
            <span className="text-[color:var(--text-secondary)]">
              {site.identityArc}
            </span>
            . Also taught an intensive Agentic AI workshop at Shri Shri
            University.
          </p>
          <p className="mt-4 text-sm text-[color:var(--text-muted)]">
            {site.education.school} · {site.education.classOf}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {skills.flatMap((s) =>
              s.items.slice(0, 3).map((item) => (
                <span
                  key={`${s.category}-${item}`}
                  className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[color:var(--text-muted)]"
                >
                  {item}
                </span>
              )),
            )}
          </div>
          <ChessTelemetry />
        </div>
        <SceneSlot
          sceneId="signal"
          className="h-[400px] rounded-2xl border border-[color:var(--line)] md:h-[460px]"
          fallbackClassName="signal-fallback"
        >
          <VisibilityGate className="h-full w-full">
            <SignalScene dpr={dpr} />
          </VisibilityGate>
        </SceneSlot>
      </div>
    </Section>
  );
}
