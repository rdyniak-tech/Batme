import { Lock, Swords } from "lucide-react";
import { Avatar } from "./Avatar";
import { TrustBadge } from "./TrustBadge";

export type Duel = {
  id: string;
  game: string;
  opponent: string;
  opponentTrust: number;
  you: string;
  stake: number;
  status: "open" | "locked";
};

export function DuelCard({ duel }: { duel: Duel }) {
  return (
    <div className="flex w-64 shrink-0 flex-col gap-4 rounded-2xl border border-(--color-surface-border) bg-(--color-surface) p-4 shadow-[0_0_30px_-18px_rgba(52,211,224,0.5)]">
      <div className="flex items-center justify-between text-xs text-(--color-text-muted)">
        <span className="font-semibold text-(--color-accent)">{duel.game}</span>
        <TrustBadge score={duel.opponentTrust} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-1.5">
          <Avatar name={duel.you} size="md" />
          <span className="text-xs text-(--color-text-muted)">{duel.you}</span>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-bg-elevated) text-(--color-text-muted)">
          {duel.status === "locked" ? <Lock size={14} /> : <Swords size={14} />}
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <Avatar name={duel.opponent} size="md" />
          <span className="text-xs text-(--color-text-muted)">{duel.opponent}</span>
        </div>
      </div>

      <div className="text-center text-lg font-extrabold italic">
        {duel.stake}€ <span className="text-(--color-text-muted)">vs</span> {duel.stake}€
      </div>

      <button
        type="button"
        className="w-full rounded-xl bg-gradient-to-r from-(--color-accent-2) to-(--color-accent) py-2.5 text-sm font-semibold text-white"
      >
        {duel.status === "locked" ? "Läuft" : "Annehmen"}
      </button>
    </div>
  );
}
