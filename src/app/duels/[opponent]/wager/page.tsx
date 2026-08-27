"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Handshake, Camera } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/Button";
import { getOpponent } from "@/lib/mockData";

export default function WagerPage({
  params,
}: {
  params: Promise<{ opponent: string }>;
}) {
  const { opponent: slug } = use(params);
  const opponent = getOpponent(slug);
  const router = useRouter();

  const [selectedGame, setSelectedGame] = useState(opponent?.mainGame ?? "");
  const [stake, setStake] = useState(20);
  const [mode, setMode] = useState<"trust" | "proof">("trust");

  if (!opponent) {
    return (
      <PhoneScreen title="Gegner nicht gefunden" nav>
        <p className="text-sm text-(--color-text-muted)">
          Dieser Spieler existiert nicht (mehr).
        </p>
      </PhoneScreen>
    );
  }

  function handleBetMe() {
    const params = new URLSearchParams({
      game: selectedGame,
      stake: String(stake),
      mode,
    });
    router.push(`/duels/${opponent!.slug}/confirm?${params.toString()}`);
  }

  return (
    <PhoneScreen title="3. Einsatz festlegen" nav>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-(--color-text-muted)">Spiel wählen</h2>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {opponent.games.map((g) => (
              <button
                key={g.game}
                type="button"
                onClick={() => setSelectedGame(g.game)}
                className={`flex w-40 shrink-0 flex-col gap-1 rounded-2xl border p-4 text-left ${
                  selectedGame === g.game
                    ? "border-(--color-accent) bg-(--color-surface)"
                    : "border-(--color-surface-border) bg-(--color-surface)"
                }`}
              >
                <span className="text-sm font-semibold">{g.game}</span>
                <span className="text-xs text-(--color-text-muted)">
                  {g.played} Spiele · {g.winRate}% Quote
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-(--color-surface-border) bg-(--color-surface) p-4">
          <div className="flex flex-col items-center gap-1.5">
            <Avatar name="Du" size="md" />
            <span className="text-xs text-(--color-text-muted)">Du</span>
          </div>
          <span className="text-sm font-bold italic text-(--color-text-muted)">vs</span>
          <div className="flex flex-col items-center gap-1.5">
            <Avatar name={opponent.name} size="md" />
            <span className="text-xs text-(--color-text-muted)">{opponent.name}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-(--color-text-muted)">Nachweis-Modus</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode("trust")}
              className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center ${
                mode === "trust"
                  ? "border-(--color-accent) bg-(--color-surface)"
                  : "border-(--color-surface-border) bg-(--color-surface)"
              }`}
            >
              <Handshake size={18} className="text-(--color-accent)" />
              <span className="text-sm font-semibold">Vertrauen</span>
              <span className="text-[11px] text-(--color-text-muted)">
                Beide bestätigen den Sieger
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMode("proof")}
              className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center ${
                mode === "proof"
                  ? "border-(--color-accent) bg-(--color-surface)"
                  : "border-(--color-surface-border) bg-(--color-surface)"
              }`}
            >
              <Camera size={18} className="text-(--color-accent)" />
              <span className="text-sm font-semibold">Nachweis</span>
              <span className="text-[11px] text-(--color-text-muted)">
                Foto vor & nach dem Match
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="stake" className="text-xs font-medium text-(--color-text-muted)">
            Betrag pro Spieler (€)
          </label>
          <input
            id="stake"
            type="number"
            min={1}
            step={1}
            value={stake}
            onChange={(e) => setStake(Math.max(1, Number(e.target.value) || 0))}
            className="w-full rounded-xl border border-(--color-surface-border) bg-(--color-surface) px-4 py-3 text-2xl font-extrabold italic text-(--color-text) outline-none focus:border-(--color-accent)"
          />
          <span className="text-xs text-(--color-text-muted)">
            Gesamtpot: {stake * 2}€
          </span>
        </div>

        <Button onClick={handleBetMe} disabled={!selectedGame || stake <= 0}>
          BET ME
        </Button>
      </div>
    </PhoneScreen>
  );
}
