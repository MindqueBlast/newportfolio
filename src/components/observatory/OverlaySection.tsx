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
  side?: "left" | "right" | "bottom";
  /** Lighter caption style — more atmosphere, less glass wall. */
  airy?: boolean;
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
  airy = true,
}: OverlaySectionProps) {
  const height = short
    ? "min-h-[75svh]"
    : chapter
      ? "min-h-[100svh]"
      : "py-20";

  const align =
    side === "bottom"
      ? "items-end justify-center pb-16 md:pb-24"
      : side === "right"
        ? "items-end md:items-center justify-end"
        : "items-end md:items-center justify-start";

  return (
    <section
      id={id}
      className={`pointer-events-none relative z-10 scroll-mt-20 ${height} flex ${align} px-4 py-20 md:px-8 ${className}`}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          side === "bottom"
            ? "bg-gradient-to-t from-[color:var(--space-deep)]/90 via-[color:var(--space-deep)]/35 to-transparent"
            : side === "right"
              ? "ml-auto bg-gradient-to-l from-[color:var(--space-deep)]/80 via-[color:var(--space-deep)]/40 to-transparent md:max-w-[52%]"
              : "bg-gradient-to-r from-[color:var(--space-deep)]/80 via-[color:var(--space-deep)]/40 to-transparent md:max-w-[52%]"
        }`}
        aria-hidden
      />
      <div
        className={`relative z-10 mx-auto flex w-full max-w-6xl ${
          side === "right"
            ? "justify-end"
            : side === "bottom"
              ? "justify-center"
              : "justify-start"
        }`}
        data-reveal
      >
        <div
          className={`pointer-events-auto ${
            airy
              ? "border-l-2 border-[color:var(--stellar)]/50 bg-transparent pl-5 md:pl-6"
              : "rounded-2xl border border-[color:var(--line)] bg-[color:var(--panel)] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl md:p-8"
          } ${wide ? "max-w-3xl" : "max-w-xl"} ${airy ? "py-2" : ""}`}
        >
          {eyebrow ? (
            <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--stellar)]">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2
              id={`${id}-title`}
              className="mb-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] md:text-4xl"
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
