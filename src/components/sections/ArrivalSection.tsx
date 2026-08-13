"use client";

import { site } from "@/content/site";
import { SceneSlot } from "@/components/observatory/SceneSlot";
import { VisibilityGate } from "@/components/observatory/VisibilityGate";
import dynamic from "next/dynamic";
import { getDprCap, getQualityTier } from "@/lib/quality";
import { useEffect, useState } from "react";

const ArrivalScene = dynamic(
  () => import("@/scenes/arrival/ArrivalScene").then((m) => m.ArrivalScene),
  { ssr: false },
);

export function ArrivalSection() {
  const [tier, setTier] = useState(getQualityTier());
  useEffect(() => setTier(getQualityTier()), []);
  const dpr = getDprCap(tier);

  return (
    <section
      id="arrival"
      className="relative min-h-[100svh] scroll-mt-0 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <SceneSlot
          sceneId="arrival"
          className="h-full min-h-[100svh] rounded-none border-0"
          fallbackClassName="arrival-fallback"
        >
          <VisibilityGate className="h-full w-full" rootMargin="40% 0px">
            <ArrivalScene dpr={dpr} tier={tier} />
          </VisibilityGate>
        </SceneSlot>
      </div>

      {/* Soft readable scrim over left third only */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-full max-w-3xl bg-gradient-to-r from-[color:var(--space-deep)] via-[color:var(--space-deep)]/75 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 py-28 md:px-8">
        <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-[color:var(--stellar)]">
          Personal observatory
        </p>
        <h1 className="max-w-2xl font-[family-name:var(--font-display)] text-5xl font-semibold leading-[0.98] tracking-tight text-[color:var(--text-primary)] md:text-7xl lg:text-8xl">
          {site.brand}
        </h1>
        <p className="mt-5 max-w-md text-lg text-[color:var(--text-secondary)] md:text-xl">
          {site.headline}
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[color:var(--text-muted)] md:text-base">
          {site.support}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#fenlens" className="btn-primary">
            Explore systems
          </a>
          <a href="#contact" className="btn-ghost">
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
