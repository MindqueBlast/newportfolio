"use client";

import { chess } from "@/content/chess";
import { LinkPlaceholder } from "@/components/observatory/LinkPlaceholders";
import { OverlaySection } from "@/components/observatory/OverlaySection";

export function ChessSection() {
  return (
    <OverlaySection
      id="chess"
      eyebrow="Beyond work"
      title="I love to play chess"
      short
      side="right"
    >
      <p className="mb-4 text-sm leading-relaxed text-[color:var(--text-secondary)]">
        {chess.intro}
      </p>
      <dl className="grid grid-cols-3 gap-3 text-center">
        <div>
          <dt className="text-[10px] uppercase tracking-wider text-[color:var(--text-muted)]">
            Chess.com
          </dt>
          <dd className="font-[family-name:var(--font-display)] text-lg text-[color:var(--text-primary)]">
            {chess.ratings.chesscomRapid}
          </dd>
          <dd className="text-[10px] text-[color:var(--text-muted)]">Rapid</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wider text-[color:var(--text-muted)]">
            Lichess
          </dt>
          <dd className="font-[family-name:var(--font-display)] text-lg text-[color:var(--text-primary)]">
            {chess.ratings.lichessRapid}
          </dd>
          <dd className="text-[10px] text-[color:var(--text-muted)]">Rapid</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wider text-[color:var(--text-muted)]">
            USCF
          </dt>
          <dd className="font-[family-name:var(--font-display)] text-lg text-[color:var(--text-primary)]">
            {chess.ratings.uscfClassical}
          </dd>
          <dd className="text-[10px] text-[color:var(--text-muted)]">
            Classical
          </dd>
        </div>
      </dl>
      <p className="mt-4 text-sm text-[color:var(--text-muted)]">{chess.goal}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <LinkPlaceholder label="Chess.com" href={chess.links.chesscom} />
        <LinkPlaceholder label="Lichess" href={chess.links.lichess} />
        <LinkPlaceholder label="USCF" href={chess.links.uscf} />
      </div>
    </OverlaySection>
  );
}
