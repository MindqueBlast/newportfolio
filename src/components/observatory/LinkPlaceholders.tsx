type LinkPlaceholderProps = {
  label: string;
  href: string | null;
  external?: boolean;
};

export function LinkPlaceholder({
  label,
  href,
  external = true,
}: LinkPlaceholderProps) {
  if (!href) {
    return (
      <span
        className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-dashed border-white/20 px-3 py-2 text-xs uppercase tracking-[0.12em] text-[color:var(--text-muted)]"
        title="Link placeholder — add when ready"
      >
        {label}
        <span className="opacity-60">· pending</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-md border border-[color:var(--cyan)]/40 bg-[color:var(--cyan)]/10 px-3 py-2 text-xs uppercase tracking-[0.12em] text-[color:var(--cyan)] transition-colors hover:bg-[color:var(--cyan)]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cyan)]"
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {label}
      <span aria-hidden>↗</span>
    </a>
  );
}

export function DemoSourceLinks({
  demo,
  source,
}: {
  demo: string | null;
  source: string | null;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <LinkPlaceholder label="Live Demo" href={demo} />
      <LinkPlaceholder label="Source Code" href={source} />
    </div>
  );
}
