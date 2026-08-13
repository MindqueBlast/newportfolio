export type QualityTier = "high" | "medium" | "low";

export function getQualityTier(): QualityTier {
  if (typeof window === "undefined") return "medium";
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const mobile = window.matchMedia("(max-width: 768px)").matches;
  if (mobile || cores <= 4 || mem <= 4) return "low";
  if (cores >= 8 && mem >= 8) return "high";
  return "medium";
}

export function getDprCap(tier: QualityTier): number {
  if (typeof window === "undefined") return 1.5;
  const dpr = window.devicePixelRatio || 1;
  const cap = tier === "high" ? 2 : tier === "medium" ? 1.5 : 1.25;
  return Math.min(dpr, cap);
}

export function particleBudget(tier: QualityTier): number {
  return tier === "high" ? 1200 : tier === "medium" ? 700 : 350;
}

export function neuroAgentBudget(tier: QualityTier): number {
  return tier === "high" ? 28 : tier === "medium" ? 18 : 12;
}
