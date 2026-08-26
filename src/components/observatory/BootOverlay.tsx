"use client";

import { useGraphicsMode } from "@/lib/use-graphics-mode";
import { useEffect, useState } from "react";

/** Brief observatory boot — dismisses once graphics mode is ready. */
export function BootOverlay() {
  const { ready } = useGraphicsMode();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => setVisible(false), 650);
    return () => window.clearTimeout(t);
  }, [ready]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-[color:var(--space-deep)] transition-opacity duration-500"
      style={{ opacity: ready ? 0 : 1 }}
      aria-hidden
    >
      <p className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.32em] text-[color:var(--instrument)]">
        Loading
      </p>
    </div>
  );
}
