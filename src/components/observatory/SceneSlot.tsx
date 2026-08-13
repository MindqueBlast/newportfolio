"use client";

import { useGraphicsMode } from "@/lib/use-graphics-mode";
import type { ReactNode } from "react";

type SceneSlotProps = {
  sceneId: string;
  fallbackClassName?: string;
  children: ReactNode;
  className?: string;
};

/** Progressive enhancement: HTML always present; WebGL when available (incl. reduced-motion stills). */
export function SceneSlot({
  sceneId,
  fallbackClassName = "",
  children,
  className = "",
}: SceneSlotProps) {
  const { mode, ready, webgl } = useGraphicsMode();
  const show3d = ready && webgl && mode !== "html-only";

  return (
    <div
      className={`scene-slot relative overflow-hidden ${className}`}
      data-scene={sceneId}
      data-graphics={mode}
    >
      <div
        className={`absolute inset-0 scene-fallback ${fallbackClassName}`}
        aria-hidden
      />
      {show3d ? (
        <div className="absolute inset-0 z-[1]">{children}</div>
      ) : null}
    </div>
  );
}
