"use client";

import type { Project } from "@/content/types";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { DemoSourceLinks } from "./LinkPlaceholders";

type ProjectPanelProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectPanel({ project, onClose }: ProjectPanelProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/55 p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-panel-title"
            className="instrument-panel relative max-h-[85vh] w-full max-w-lg overflow-y-auto obs-scroll"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 rounded px-2 py-1 text-xs text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--cyan)]"
            >
              Close
            </button>
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[color:var(--magenta)]">
              {project.tier}
            </p>
            <h3
              id="project-panel-title"
              className="pr-16 font-[family-name:var(--font-display)] text-2xl text-[color:var(--text-primary)]"
            >
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-secondary)]">
              {project.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[color:var(--text-muted)]"
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <DemoSourceLinks
                demo={project.links.demo}
                source={project.links.source}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
