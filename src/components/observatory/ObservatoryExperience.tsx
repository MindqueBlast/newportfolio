"use client";

import { BootOverlay } from "@/components/observatory/BootOverlay";
import { ObservatoryNav } from "@/components/observatory/ObservatoryNav";
import { ScrollReveal } from "@/components/observatory/ScrollReveal";
import { AboutSection } from "@/components/sections/AboutSection";
import { ArrivalSection } from "@/components/sections/ArrivalSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { ChessSection } from "@/components/sections/ChessSection";
import { ConstellationSection } from "@/components/sections/ConstellationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExploringSection } from "@/components/sections/ExploringSection";
import { FenLensSection } from "@/components/sections/FenLensSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { NeuroevolutionSection } from "@/components/sections/NeuroevolutionSection";
import { ResearchSection } from "@/components/sections/ResearchSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
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
      <BootOverlay />
      <UniverseCanvas />
      <ObservatoryNav />
      <ScrollReveal />
      <main className="relative z-10">
        <ArrivalSection />
        <AboutSection />
        <JourneySection />
        <ResearchSection />
        <FenLensSection />
        <SmartDeskSection />
        <NeuroevolutionSection />
        <ConstellationSection />
        <SkillsSection />
        <AwardsSection />
        <ExploringSection />
        <ChessSection />
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
