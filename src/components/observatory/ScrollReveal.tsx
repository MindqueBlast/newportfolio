"use client";

import { useGraphicsMode } from "@/lib/use-graphics-mode";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

/** Subtle fade/rise for section blocks — disabled under reduced motion. */
export function ScrollReveal() {
  const { reducedMotion, ready } = useGraphicsMode();

  useEffect(() => {
    if (!ready || reducedMotion) return;

    const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    const tweens = targets.map((el) =>
      gsap.fromTo(
        el,
        { opacity: 0.35, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      ),
    );

    return () => {
      tweens.forEach((t) => t.scrollTrigger?.kill());
      tweens.forEach((t) => t.kill());
    };
  }, [ready, reducedMotion]);

  return null;
}
