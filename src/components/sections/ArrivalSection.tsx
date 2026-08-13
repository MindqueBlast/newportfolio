"use client";

import { site } from "@/content/site";
import { motion } from "framer-motion";

export function ArrivalSection() {
  return (
    <section
      id="arrival"
      className="pointer-events-none relative z-10 flex min-h-[100svh] scroll-mt-0 items-center px-4 py-28 md:px-8"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full max-w-3xl bg-gradient-to-r from-[color:var(--space-deep)] via-[color:var(--space-deep)]/75 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-auto relative z-10 mx-auto w-full max-w-6xl" data-reveal>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-4 text-[11px] uppercase tracking-[0.32em] text-[color:var(--stellar)]"
        >
          Portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08 }}
          className="max-w-2xl font-[family-name:var(--font-display)] text-5xl font-semibold leading-[0.98] tracking-tight text-[color:var(--text-primary)] md:text-7xl lg:text-8xl"
        >
          {site.brand}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-5 max-w-md text-lg text-[color:var(--text-secondary)] md:text-xl"
        >
          {site.headline}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="mt-3 max-w-md text-sm leading-relaxed text-[color:var(--text-muted)] md:text-base"
        >
          {site.support}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <a href="#about" className="btn-primary">
            About me
          </a>
          <a href="#contact" className="btn-ghost">
            Contact
          </a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-14 text-xs uppercase tracking-[0.22em] text-[color:var(--instrument)]"
        >
          Scroll to explore
        </motion.p>
      </div>
    </section>
  );
}
