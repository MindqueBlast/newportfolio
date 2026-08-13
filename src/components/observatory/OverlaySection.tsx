"use client";

import type { ReactNode } from "react";

type OverlaySectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  chapter?: boolean;
  wide?: boolean;
  short?: boolean;
  side?: "left" | "right";
};

export function OverlaySection({
  id,
  eyebrow,
  title,
  children,
  className = "",
  chapter = true,
  wide = false,
  short = false,
  side = "left",
}: OverlaySectionProps) {
  const height = short
    ? "min-h-[70svh]"
    : chapter
      ? "min-h-[100svh]"
      : "py-20";

  return (
    <section
      id={id}
      className={`relative z-10 scroll-mt-20 ${height} flex items-end md:items-center px-4 py-20 md:px-8 ${className}`}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          side === "left"
            ? "bg-gradient-to-r from-[color:var(--space-deep)]/88 via-[color:var(--space-deep)]/50 to-transparent md:max-w-[55%]"
            : "ml-auto bg-gradient-to-l from-[color:var(--space-deep)]/88 via-[color:var(--space-deep)]/50 to-transparent md:max-w-[55%]"
        }`}
        aria-hidden
      />
      <div
        className={`relative z-10 mx-auto flex w-full max-w-6xl ${
          side === "right" ? "justify-end" : "justify-start"
        }`}
        data-reveal
      >
        <div
          className={`pointer-events-auto rounded-2xl border border-[color:var(--line)] bg-[color:var(--panel)] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl md:p-8 ${
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
