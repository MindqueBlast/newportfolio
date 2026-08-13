import type { SceneId } from "@/lib/scroll-bridge";

export const SECTION_IDS: SceneId[] = [
  "arrival",
  "signal",
  "fenlens",
  "smart-desk",
  "neuroevolution",
  "constellation",
  "exploring",
  "journey",
  "contact",
];

export const NAV_LINKS = [
  { href: "#arrival", label: "Arrival" },
  { href: "#signal", label: "Signal" },
  { href: "#fenlens", label: "Systems" },
  { href: "#constellation", label: "Constellation" },
  { href: "#exploring", label: "Exploring" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Transmit" },
] as const;
