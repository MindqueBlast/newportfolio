"use client";

import type { Project } from "@/content/types";
import { getQualityTier } from "@/lib/quality";
import { NeuroevolutionSim } from "@/simulations/neuroevolution/NeuroevolutionSim";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DemoSourceLinks } from "./LinkPlaceholders";

type ProjectPanelProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectPanel({ project, onClose }: ProjectPanelProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [tier, setTier] = useState(getQualityTier());

  useEffect(() => setTier(getQualityTier()), []);

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
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
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
            className="instrument-panel relative max-h-[90vh] w-full max-w-2xl overflow-y-auto obs-scroll"
            initial={{ y: 40, opacity: 0, scale: 0.96, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ y: 24, opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 rounded px-2 py-1 text-xs text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--instrument)]"
            >
              Close
            </button>
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[color:var(--instrument)]">
              {project.domain ?? "Project"}
            </p>
            <h3
              id="project-panel-title"
              className="pr-16 font-[family-name:var(--font-display)] text-2xl text-[color:var(--text-primary)] md:text-3xl"
            >
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-secondary)] md:text-base">
              {project.description}
            </p>
            {project.id === "neuroevolution" ? (
              <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
                <NeuroevolutionSim tier={tier} />
              </div>
            ) : null}
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[color:var(--text-muted)]"
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
