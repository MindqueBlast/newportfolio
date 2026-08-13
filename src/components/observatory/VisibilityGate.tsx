"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Mount children only when near viewport — keeps a single active GPU scene pattern. */
export function VisibilityGate({
  children,
  rootMargin = "20% 0px",
  className = "",
}: {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin, threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : null}
    </div>
  );
}
