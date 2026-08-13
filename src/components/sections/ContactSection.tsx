"use client";

import { OverlaySection } from "@/components/observatory/OverlaySection";
import { site } from "@/content/site";

export function ContactSection() {
  return (
    <OverlaySection id="contact" eyebrow="Transmit" title="Start a conversation">
      <p className="text-sm text-[color:var(--text-secondary)] md:text-base">
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
    </OverlaySection>
  );
}
