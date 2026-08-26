"use client";

import { BootOverlay } from "@/components/observatory/BootOverlay";
import { ObservatoryNav } from "@/components/observatory/ObservatoryNav";
import { ScrollReveal } from "@/components/observatory/ScrollReveal";
import { AboutSection } from "@/components/sections/AboutSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { ChessSection } from "@/components/sections/ChessSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FocusSection } from "@/components/sections/FocusSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
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
        <HeroSection />
        <AboutSection />
        <JourneySection />
        <ProjectsSection />
        <SkillsSection />
        <AwardsSection />
        <FocusSection />
        <ChessSection />
        <ContactSection />
      </main>
      <footer className="pointer-events-auto relative z-10 border-t border-[color:var(--line)] bg-[color:var(--space-deep)]/70 px-4 py-10 backdrop-blur-md md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-[color:var(--text-muted)] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="text-xs">
            Scroll to travel · click to explore
          </p>
        </div>
      </footer>
    </ScrollUniverseProvider>
  );
}
