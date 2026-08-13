"use client";

import { useEffect, useState } from "react";

export type SceneId =
  | "arrival"
  | "signal"
  | "fenlens"
  | "smart-desk"
  | "neuroevolution"
  | "constellation"
  | "exploring"
  | "journey"
  | "contact";

export function useActiveScene(sectionIds: SceneId[]): SceneId {
  const [active, setActive] = useState<SceneId>(sectionIds[0] ?? "arrival");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!elements.length) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = active;
        let best = -1;
        for (const id of sectionIds) {
          const r = ratios.get(id) ?? 0;
          if (r > best) {
            best = r;
            bestId = id;
          }
        }
        if (best > 0.08) setActive(bestId);
      },
      {
        threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8],
        rootMargin: "-10% 0px -35% 0px",
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join("|")]);

  return active;
}
