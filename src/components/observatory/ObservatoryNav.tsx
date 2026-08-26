"use client";

import { site } from "@/content/site";
import { NAV_LINKS } from "@/lib/sections";
import { useState } from "react";

export function ObservatoryNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-auto fixed inset-x-0 top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--space-deep)]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a
          href="#hero"
          className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-[color:var(--text-primary)] md:text-base"
        >
          {site.brand}
        </a>
        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.14em] text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--stellar)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--instrument)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="rounded-md border border-white/15 px-3 py-1.5 text-xs uppercase tracking-wider text-[color:var(--text-primary)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-white/10 px-4 py-3 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 text-sm text-[color:var(--text-primary)]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
