"use client";

import { SceneSlot } from "@/components/observatory/SceneSlot";
import { Section } from "@/components/observatory/Section";
import { VisibilityGate } from "@/components/observatory/VisibilityGate";
import { site } from "@/content/site";
import { getDprCap, getQualityTier } from "@/lib/quality";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ContactScene = dynamic(
  () => import("@/scenes/contact/ContactScene").then((m) => m.ContactScene),
  { ssr: false },
);

export function ContactSection() {
  const [tier, setTier] = useState(getQualityTier());
  useEffect(() => setTier(getQualityTier()), []);
  const dpr = getDprCap(tier);

  return (
    <Section id="contact" eyebrow="Transmit" title="Start a conversation">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="max-w-md text-base text-[color:var(--text-secondary)]">
            Open to collaborations, research conversations, and systems that need
            careful engineering.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className="btn-primary">
              Email
            </a>
            <a
              href={site.socials.github}
              className="btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href={site.socials.linkedin}
              className="btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <SceneSlot
          sceneId="contact"
          className="h-[240px]"
          fallbackClassName="contact-fallback"
        >
          <VisibilityGate className="h-full w-full">
            <ContactScene dpr={dpr} />
          </VisibilityGate>
        </SceneSlot>
      </div>
    </Section>
  );
}
