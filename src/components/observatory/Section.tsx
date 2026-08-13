import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 px-4 py-20 md:px-8 md:py-28 ${className}`}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <div className="relative z-10 mx-auto max-w-6xl" data-reveal>
        {eyebrow ? (
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[color:var(--cyan)]">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2
            id={`${id}-title`}
            className="mb-6 max-w-3xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] md:text-5xl"
          >
            {title}
          </h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}
