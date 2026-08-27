"use client";

import { use, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Avatar } from "@/components/Avatar";
import { getOpponent, currentUser } from "@/lib/mockData";

export default function ConfirmResultPage({
  params,
}: {
  params: Promise<{ opponent: string }>;
}) {
  const { opponent: slug } = use(params);
  const opponent = getOpponent(slug);
  const router = useRouter();
  const searchParams = useSearchParams();
  const game = searchParams.get("game") ?? "";
  const stake = Number(searchParams.get("stake")) || 0;
  const [picked, setPicked] = useState<"won" | "lost" | null>(null);

  if (!opponent) {
    return (
      <PhoneScreen title="Gegner nicht gefunden" nav>
        <p className="text-sm text-(--color-text-muted)">
          Dieser Spieler existiert nicht (mehr).
        </p>
      </PhoneScreen>
    );
  }

  function pick(result: "won" | "lost") {
    setPicked(result);
    const params = new URLSearchParams({ game, stake: String(stake), result });
    router.push(`/duels/${opponent!.slug}/outcome?${params.toString()}`);
  }

  return (
    <PhoneScreen title="6. Ergebnis bestätigen" nav>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center gap-6 rounded-2xl border border-(--color-surface-border) bg-(--color-surface) p-6">
          <Avatar name={currentUser.name} size="lg" />
          <Avatar name={opponent.name} size="lg" />
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => pick("won")}
            className="w-full rounded-xl border border-(--color-win)/50 bg-(--color-win)/15 py-3.5 text-sm font-semibold text-(--color-win)"
          >
            I Won
          </button>
          <button
            type="button"
            onClick={() => pick("lost")}
            className="w-full rounded-xl border border-(--color-lose)/50 bg-(--color-lose)/15 py-3.5 text-sm font-semibold text-(--color-lose)"
          >
            Opponent Won
          </button>
        </div>

        <p className="text-center text-sm text-(--color-text-muted)">
          {picked ? "Warte auf Bestätigung des Gegners…" : "Wer hat gewonnen?"}
        </p>
      </div>
    </PhoneScreen>
  );
}
