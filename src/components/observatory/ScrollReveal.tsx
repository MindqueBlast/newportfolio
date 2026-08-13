"use client";

import { useGraphicsMode } from "@/lib/use-graphics-mode";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

/** Fade/rise for section blocks — disabled under reduced motion. */
export function ScrollReveal() {
  const { reducedMotion, ready } = useGraphicsMode();

  useEffect(() => {
    if (!ready || reducedMotion) return;

    const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    const tweens = targets.map((el) =>
      gsap.fromTo(
        el,
        { opacity: 0.2, y: 36, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
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
