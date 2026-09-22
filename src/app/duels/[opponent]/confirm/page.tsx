"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Gamepad2, Camera, Handshake } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/Button";
import { getOpponent, currentUser } from "@/lib/mockData";
import { useAppState } from "@/lib/store";

export default function ConfirmBetPage({
  params,
  searchParams,
}: {
  params: Promise<{ opponent: string }>;
  searchParams: Promise<{ game?: string; stake?: string; mode?: string }>;
}) {
  const { opponent: slug } = use(params);
  const { game, stake: stakeParam, mode = "trust" } = use(searchParams);
  const opponent = getOpponent(slug);
  const router = useRouter();
  const { wallet, placeBet } = useAppState();
  const [error, setError] = useState("");

  if (!opponent) {
    return (
      <PhoneScreen title="Gegner nicht gefunden" nav>
        <p className="text-sm text-(--color-text-muted)">
          Dieser Spieler existiert nicht (mehr).
        </p>
      </PhoneScreen>
    );
  }

  const stake = Number(stakeParam) || 0;
  const isProof = mode === "proof";
  const insufficientFunds = stake > wallet;

  function handleConfirm() {
    const duelId = placeBet(opponent!.slug, opponent!.name, game ?? "", stake, mode as "trust" | "proof");
    if (!duelId) {
      setError("Nicht genügend Guthaben. Bitte zuerst dein Wallet aufladen.");
      return;
    }
    router.push(
      `/duels/${opponent!.slug}/match?game=${encodeURIComponent(game ?? "")}&stake=${stake}&mode=${mode}&duel=${duelId}`,
    );
  }

  return (
    <PhoneScreen title="4. Bestätigen" nav>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-(--color-surface-border) bg-(--color-surface) p-5">
          <div className="flex items-center justify-center gap-2 text-sm font-bold italic text-(--color-text)">
            <Gamepad2 size={18} className="text-(--color-accent)" />
            {game}
          </div>

          <div className="flex items-center justify-between px-2">
            <Avatar name={currentUser.name} size="lg" />
            <Avatar name={opponent.name} size="lg" />
          </div>
          <div className="flex items-center justify-between px-2 text-xs text-(--color-text-muted)">
            <span>{currentUser.name}</span>
            <span>{opponent.name}</span>
          </div>

          <div className="text-center text-2xl font-extrabold italic">
            {stake}€ <span className="text-(--color-text-muted)">vs</span> {stake}€
          </div>

          <div className="rounded-xl border border-(--color-surface-border) bg-(--color-bg-elevated) py-3 text-center text-lg font-bold">
            {stake * 2}€ Total Pot
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-(--color-text-muted)">
            {isProof ? <Camera size={13} /> : <Handshake size={13} />}
            {isProof ? "Nachweis-Modus: Foto vor & nach dem Match" : "Vertrauens-Modus"}
          </div>
        </div>

        {insufficientFunds && (
          <p className="text-center text-xs text-(--color-lose)">
            Dein Guthaben ({wallet}€) reicht für diesen Einsatz nicht aus.
          </p>
        )}
        {error && <p className="text-center text-xs text-(--color-lose)">{error}</p>}

        <Button onClick={handleConfirm} disabled={insufficientFunds}>
          Confirm Bet
        </Button>
      </div>
    </PhoneScreen>
  );
}
