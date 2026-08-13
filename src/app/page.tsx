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

export default function Home() {
  return (
    <>
      <ObservatoryNav />
      <ScrollReveal />
      <main>
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
      <footer className="border-t border-white/10 px-4 py-10 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-[color:var(--text-muted)] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Built as an interactive
            observatory.
          </p>
          <p className="text-xs">
            Progressive enhancement — content first, WebGL when available.
          </p>
        </div>
      </footer>
    </>
  );
}
