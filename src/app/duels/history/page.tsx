"use client";

import Link from "next/link";
import { Camera, Handshake, Swords, Trophy, X } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Avatar } from "@/components/Avatar";
import { useAppState, type DuelRecord } from "@/lib/store";

const statusMeta: Record<DuelRecord["status"], { label: string; color: string; icon: typeof Swords }> = {
  active: { label: "Läuft", color: "var(--color-warn)", icon: Swords },
  won: { label: "Gewonnen", color: "var(--color-win)", icon: Trophy },
  lost: { label: "Verloren", color: "var(--color-lose)", icon: X },
};

export default function DuelHistoryPage() {
  const { duelHistory } = useAppState();
  const active = duelHistory.filter((d) => d.status === "active");
  const past = duelHistory.filter((d) => d.status !== "active");

  return (
    <PhoneScreen title="Meine Duelle" back nav>
      <div className="flex flex-col gap-6">
        {active.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-(--color-text-muted)">Laufend</h2>
            <div className="flex flex-col gap-2">
              {active.map((d) => (
                <Link
                  key={d.id}
                  href={`/duels/${d.opponentSlug}/match?game=${encodeURIComponent(d.game)}&stake=${d.stake}&mode=${d.mode}&duel=${d.id}`}
                  className="flex items-center gap-3 rounded-xl border border-(--color-warn)/30 bg-(--color-surface) p-3"
                >
                  <Avatar name={d.opponentName} size="sm" />
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium">vs. {d.opponentName}</span>
                    <span className="text-xs text-(--color-text-muted)">
                      {d.game} · {d.stake}€
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-(--color-warn)">Läuft</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-(--color-text-muted)">Vergangene Duelle</h2>
          <div className="flex flex-col gap-2">
            {past.map((d) => {
              const meta = statusMeta[d.status];
              return (
                <div
                  key={d.id}
                  className="flex items-center gap-3 rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-3"
                >
                  <Avatar name={d.opponentName} size="sm" />
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium">vs. {d.opponentName}</span>
                    <span className="flex items-center gap-1 text-xs text-(--color-text-muted)">
                      {d.game} · {d.stake}€ ·{" "}
                      {d.mode === "proof" ? <Camera size={11} /> : <Handshake size={11} />}
                      {d.date}
                    </span>
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold ${
                      d.status === "won" ? "text-(--color-win)" : "text-(--color-lose)"
                    }`}
                    style={{ color: meta.color }}
                  >
                    {d.status === "won" ? `+${d.stake * 2}€` : `-${d.stake}€`}
                  </span>
                </div>
              );
            })}
            {past.length === 0 && (
              <p className="text-sm text-(--color-text-muted)">Noch keine vergangenen Duelle.</p>
            )}
          </div>
        </div>
      </div>
    </PhoneScreen>
  );
}
