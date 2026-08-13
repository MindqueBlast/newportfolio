export type GraphicsMode = "full" | "reduced" | "html-only";

export function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export function detectReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function resolveGraphicsMode(
  webgl: boolean,
  reducedMotion: boolean,
): GraphicsMode {
  if (!webgl) return "html-only";
  if (reducedMotion) return "reduced";
  return "full";
}
