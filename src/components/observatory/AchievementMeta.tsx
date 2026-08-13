import type { Award } from "@/content/types";

export function AchievementMeta({ awards }: { awards: Award[] }) {
  if (!awards.length) return null;
  return (
    <ul className="mt-3 space-y-1.5" aria-label="Related achievements">
      {awards.map((a) => (
        <li
          key={a.id}
          className="text-xs text-[color:var(--text-muted)]"
        >
          <span className="text-[color:var(--stellar)]">{a.badge}</span>
          {" · "}
          {a.title}
        </li>
      ))}
    </ul>
  );
}
