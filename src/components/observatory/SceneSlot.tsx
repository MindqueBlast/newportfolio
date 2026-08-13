"use client";

import { useGraphicsMode } from "@/lib/use-graphics-mode";
import type { ReactNode } from "react";

type SceneSlotProps = {
  sceneId: string;
  fallbackClassName?: string;
  children: ReactNode;
  className?: string;
};

/** Progressive enhancement: HTML always present; WebGL children only when allowed. */
export function SceneSlot({
  sceneId,
  fallbackClassName = "",
  children,
  className = "",
}: SceneSlotProps) {
  const { mode, ready } = useGraphicsMode();
  const show3d = ready && mode === "full";

  return (
    <div
      className={`scene-slot relative overflow-hidden rounded-2xl border border-white/10 ${className}`}
      data-scene={sceneId}
    >
      <div
        className={`absolute inset-0 scene-fallback ${fallbackClassName}`}
        aria-hidden
      />
      {show3d ? (
        <div className="absolute inset-0 z-[1]">{children}</div>
      ) : null}
      {mode === "reduced" ? (
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-[color:var(--nebula-violet)]/30 via-transparent to-[color:var(--cyan)]/20" />
      ) : null}
    </div>
  );
}
