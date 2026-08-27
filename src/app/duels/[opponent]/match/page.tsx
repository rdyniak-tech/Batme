"use client";

import { use, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, Gamepad2, Camera, CheckCircle2 } from "lucide-react";
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
  const isProof = searchParams.get("mode") === "proof";

  const [beforeProof, setBeforeProof] = useState(!isProof);
  const [afterProof, setAfterProof] = useState(false);

  if (!opponent) {
    return (
      <PhoneScreen title="Gegner nicht gefunden" nav>
        <p className="text-sm text-(--color-text-muted)">
          Dieser Spieler existiert nicht (mehr).
        </p>
      </PhoneScreen>
    );
  }

  const resultHref = `/duels/${opponent.slug}/result?game=${encodeURIComponent(game)}&stake=${stake}`;

  if (!beforeProof) {
    return (
      <PhoneScreen title="5. Match aktiv" nav>
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-(--color-surface-border) bg-(--color-surface) p-6 text-center">
          <Camera size={28} className="text-(--color-accent)" />
          <h2 className="text-base font-semibold">Beweisfoto vor dem Match</h2>
          <p className="text-sm text-(--color-text-muted)">
            Erstelle einen Screenshot vom Spielstart (z.B. 0:0-Anzeige oder Lobby). BATME
            versieht das Foto automatisch mit Zeitstempel und QR-Code.
          </p>
          <Button onClick={() => setBeforeProof(true)}>Beweisfoto aufnehmen</Button>
        </div>
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

          {isProof && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-(--color-win)">
              <CheckCircle2 size={13} /> Vor-Match-Beweis gespeichert
            </div>
          )}
        </div>

        {isProof && !afterProof ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-(--color-surface-border) bg-(--color-surface) p-5 text-center">
            <Camera size={24} className="text-(--color-accent)" />
            <p className="text-sm text-(--color-text-muted)">
              Spiel beendet? Erstelle jetzt den Beweis-Screenshot vom Endergebnis.
            </p>
            <Button variant="secondary" onClick={() => setAfterProof(true)}>
              Beweisfoto (Endergebnis) aufnehmen
            </Button>
          </div>
        ) : (
          <>
            <p className="text-center text-xs text-(--color-text-muted)">
              Spiel auf eurer Konsole/PC fertig gespielt? Beide Seiten bestätigen anschließend
              das Ergebnis.
            </p>
            <Button variant="secondary" href={resultHref}>
              Match beenden
            </Button>
          </>
        )}
      </div>
    </PhoneScreen>
  );
}
