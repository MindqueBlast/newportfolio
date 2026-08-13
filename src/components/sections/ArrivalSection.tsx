"use client";

import { site } from "@/content/site";

export function ArrivalSection() {
  return (
    <section
      id="arrival"
      className="relative z-10 flex min-h-[100svh] scroll-mt-0 items-center px-4 py-28 md:px-8"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full max-w-3xl bg-gradient-to-r from-[color:var(--space-deep)] via-[color:var(--space-deep)]/80 to-transparent"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-[color:var(--stellar)]">
          Continuous observatory
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
          <a href="#about" className="btn-primary">
            Enter the field
          </a>
          <a href="#contact" className="btn-ghost">
            Transmit
          </a>
        </div>
      </div>
    </section>
  );
}
