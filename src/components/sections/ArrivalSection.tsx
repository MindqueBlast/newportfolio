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
      className="relative flex min-h-[100svh] scroll-mt-0 flex-col justify-end overflow-hidden px-4 pb-16 pt-28 md:px-8 md:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <SceneSlot
          sceneId="arrival"
          className="h-full min-h-[100svh] rounded-none border-0"
          fallbackClassName="arrival-fallback"
        >
          <VisibilityGate className="h-full w-full">
            <ArrivalScene dpr={dpr} tier={tier} />
          </VisibilityGate>
        </SceneSlot>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-[color:var(--cyan)]">
          Personal observatory
        </p>
        <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-5xl font-semibold leading-[1.05] tracking-tight text-[color:var(--text-primary)] md:text-7xl">
          {site.brand}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-[color:var(--text-secondary)] md:text-xl">
          {site.headline}
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[color:var(--text-muted)] md:text-base">
          {site.support}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
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
