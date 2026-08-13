"use client";

import { ObservatoryNav } from "@/components/observatory/ObservatoryNav";
import { ScrollReveal } from "@/components/observatory/ScrollReveal";
import { ArrivalSection } from "@/components/sections/ArrivalSection";
import { ConstellationSection } from "@/components/sections/ConstellationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExploringSection } from "@/components/sections/ExploringSection";
import { FenLensSection } from "@/components/sections/FenLensSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { NeuroevolutionSection } from "@/components/sections/NeuroevolutionSection";
import { SignalSection } from "@/components/sections/SignalSection";
import { SmartDeskSection } from "@/components/sections/SmartDeskSection";
import { site } from "@/content/site";
import {
  ScrollProgressBinder,
  ScrollUniverseProvider,
} from "@/universe/scroll-store";
import dynamic from "next/dynamic";

const UniverseCanvas = dynamic(
  () => import("@/universe/UniverseCanvas").then((m) => m.UniverseCanvas),
  { ssr: false },
);

export function ObservatoryExperience() {
  return (
    <ScrollUniverseProvider>
      <ScrollProgressBinder />
      <UniverseCanvas />
      <ObservatoryNav />
      <ScrollReveal />
      <main className="relative z-10">
        <ArrivalSection />
        <SignalSection />
        <FenLensSection />
        <SmartDeskSection />
        <NeuroevolutionSection />
        <ConstellationSection />
        <ExploringSection />
        <JourneySection />
        <ContactSection />
      </main>
      <footer className="relative z-10 border-t border-[color:var(--line)] bg-[color:var(--space-deep)]/70 px-4 py-10 backdrop-blur-md md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-[color:var(--text-muted)] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. One continuous observatory
            flight.
          </p>
          <p className="text-xs">Scroll to travel · content works without WebGL.</p>
        </div>
      </footer>
    </ScrollUniverseProvider>
  );
}
