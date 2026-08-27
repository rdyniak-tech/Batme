"use client";

import { use } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, Gamepad2 } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/Button";
import { getOpponent, currentUser } from "@/lib/mockData";

export default function MatchActivePage({
  params,
}: {
  params: Promise<{ opponent: string }>;
}) {
  const { opponent: slug } = use(params);
  const opponent = getOpponent(slug);
  const searchParams = useSearchParams();
  const game = searchParams.get("game") ?? "";
  const stake = Number(searchParams.get("stake")) || 0;

  if (!opponent) {
    return (
      <PhoneScreen title="Gegner nicht gefunden" nav>
        <p className="text-sm text-(--color-text-muted)">
          Dieser Spieler existiert nicht (mehr).
        </p>
      </PhoneScreen>
    );
  }

  return (
    <PhoneScreen title="5. Match aktiv" nav>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-(--color-surface-border) bg-(--color-surface) p-5">
          <div className="flex items-center justify-between px-2">
            <div className="flex flex-col items-center gap-1.5">
              <Avatar name={currentUser.name} size="lg" />
              <span className="text-xs text-(--color-text-muted)">{currentUser.name}</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-warn)/15 text-(--color-warn)">
                <Lock size={16} />
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold italic text-(--color-text)">
                <Gamepad2 size={12} className="text-(--color-accent)" />
                {game}
              </span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <Avatar name={opponent.name} size="lg" />
              <span className="text-xs text-(--color-text-muted)">{opponent.name}</span>
            </div>
          </div>

          <div className="text-center text-2xl font-extrabold italic">
            {stake}€ <span className="text-(--color-text-muted)">vs</span> {stake}€
          </div>

          <div className="animate-pulse rounded-xl border border-(--color-accent)/40 bg-(--color-bg-elevated) py-3 text-center text-lg font-bold">
            {stake * 2}€ Total Pot
          </div>

          <p className="text-center text-sm text-(--color-text-muted)">
            Running · Waiting for Result…
          </p>
        </div>

        <p className="text-center text-xs text-(--color-text-muted)">
          Spiel auf eurer Konsole/PC fertig gespielt? Beide Seiten bestätigen anschließend das
          Ergebnis.
        </p>

        <Button
          variant="secondary"
          href={`/duels/${opponent.slug}/result?game=${encodeURIComponent(game)}&stake=${stake}`}
        >
          Match beenden
        </Button>
      </div>
    </PhoneScreen>
  );
}
