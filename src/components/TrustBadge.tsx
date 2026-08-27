function tierOf(score: number) {
  if (score >= 85) return { color: "var(--color-win)", label: "Hoch" };
  if (score >= 60) return { color: "var(--color-warn)", label: "Mittel" };
  return { color: "var(--color-lose)", label: "Niedrig" };
}

export function TrustBadge({ score, className = "" }: { score: number; className?: string }) {
  const { color } = tierOf(score);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${className}`}
      style={{ color, borderColor: color, backgroundColor: `${color}1a` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {score}%
    </span>
  );
}
