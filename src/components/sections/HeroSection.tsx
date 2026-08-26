"use client";

import { site } from "@/content/site";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="pointer-events-none relative z-10 flex min-h-[100svh] scroll-mt-0 items-center px-4 py-28 md:px-8"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full max-w-3xl bg-gradient-to-r from-[color:var(--space-deep)] via-[color:var(--space-deep)]/70 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-auto relative z-10 mx-auto w-full max-w-6xl" data-reveal>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-4 text-[11px] uppercase tracking-[0.32em] text-[color:var(--stellar)]"
        >
          {site.name}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08 }}
          className="max-w-2xl font-[family-name:var(--font-display)] text-5xl font-semibold leading-[0.98] tracking-tight text-[color:var(--text-primary)] md:text-7xl lg:text-8xl"
        >
          {site.headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-5 max-w-lg text-lg text-[color:var(--text-secondary)] md:text-xl"
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
          <a href="#projects" className="btn-ghost">
            See my work
          </a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-14 text-xs uppercase tracking-[0.22em] text-[color:var(--instrument)]"
        >
          Scroll to begin
        </motion.p>
      </div>
    </section>
  );
}
