"use client";

import type { ReactNode } from "react";

type OverlaySectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  /** Full-viewport chapter for the continuous flight */
  chapter?: boolean;
  wide?: boolean;
};

export function OverlaySection({
  id,
  eyebrow,
  title,
  children,
  className = "",
  chapter = true,
  wide = false,
}: OverlaySectionProps) {
  return (
    <section
      id={id}
      className={`relative z-10 scroll-mt-20 ${
        chapter ? "flex min-h-[100svh] items-end md:items-center" : "py-20"
      } px-4 py-24 md:px-8 ${className}`}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[color:var(--space-deep)]/85 via-[color:var(--space-deep)]/45 to-transparent md:max-w-[58%]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl" data-reveal>
        <div
          className={`pointer-events-auto rounded-2xl border border-[color:var(--line)] bg-[color:var(--panel)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8 ${
            wide ? "max-w-3xl" : "max-w-xl"
          }`}
        >
          {eyebrow ? (
            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[color:var(--stellar)]">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2
              id={`${id}-title`}
              className="mb-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] md:text-4xl"
            >
              {title}
            </h2>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
