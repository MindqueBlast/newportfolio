"use client";

import { chess } from "@/content/chess";
import { LinkPlaceholder } from "./LinkPlaceholders";

export function ChessTelemetry() {
  return (
    <aside
      className="instrument-panel mt-8 max-w-md"
      aria-label="Chess telemetry"
    >
      <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[color:var(--cyan)]">
        Chess telemetry
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
      <p className="mt-4 text-sm text-[color:var(--text-secondary)]">
        Goal: {chess.goal}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <LinkPlaceholder label="Chess.com" href={chess.links.chesscom} />
        <LinkPlaceholder label="Lichess" href={chess.links.lichess} />
        <LinkPlaceholder label="USCF" href={chess.links.uscf} />
      </div>
    </aside>
  );
}
