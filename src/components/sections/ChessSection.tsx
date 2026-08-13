"use client";

import { ChessTelemetry } from "@/components/observatory/ChessTelemetry";
import { OverlaySection } from "@/components/observatory/OverlaySection";

export function ChessSection() {
  return (
    <OverlaySection
      id="chess"
      eyebrow="Chess moment"
      title="Board telemetry"
      short
      side="right"
    >
      <p className="mb-3 text-sm text-[color:var(--text-muted)]">
        A secondary orbit — competitive chess as intellectual practice, not the
        center of the portfolio.
      </p>
      <ChessTelemetry />
    </OverlaySection>
  );
}
