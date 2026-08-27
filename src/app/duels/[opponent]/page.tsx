import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Avatar } from "@/components/Avatar";
import { TrustBadge } from "@/components/TrustBadge";
import { Button } from "@/components/ui/Button";
import { getOpponent } from "@/lib/mockData";

export default async function OpponentProfilePage({
  params,
}: {
  params: Promise<{ opponent: string }>;
}) {
  const { opponent: slug } = await params;
  const opponent = getOpponent(slug);
  if (!opponent) notFound();

  return (
    <PhoneScreen title="2. Spielerprofil" nav>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-(--color-surface-border) bg-(--color-surface) p-6">
          <div className="relative">
            <Avatar name={opponent.name} size="lg" />
            {opponent.isFriend && (
              <Star
                size={16}
                className="absolute -right-1 -top-1 fill-(--color-warn) text-(--color-warn)"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">{opponent.name}</span>
            <TrustBadge score={opponent.trustScore} />
          </div>
          <span className="text-xs text-(--color-text-muted)">{opponent.mainGame}</span>

          <div className="mt-4 grid w-full grid-cols-3 divide-x divide-(--color-surface-border) text-center">
            <div className="flex flex-col gap-0.5 px-2">
              <span className="text-lg font-bold">{opponent.wins}</span>
              <span className="text-xs text-(--color-text-muted)">Wins</span>
            </div>
            <div className="flex flex-col gap-0.5 px-2">
              <span className="text-lg font-bold">{opponent.losses}</span>
              <span className="text-xs text-(--color-text-muted)">Losses</span>
            </div>
            <div className="flex flex-col gap-0.5 px-2">
              <span className="text-lg font-bold">
                {opponent.headToHeadWins}:{opponent.headToHeadLosses}
              </span>
              <span className="text-xs text-(--color-text-muted)">Vs. dir</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-(--color-text-muted)">
            Statistik pro Spiel
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {opponent.games.map((g) => (
              <div
                key={g.game}
                className="flex w-56 shrink-0 flex-col gap-2 rounded-2xl border border-(--color-surface-border) bg-(--color-surface) p-4"
              >
                <span className="text-sm font-semibold text-(--color-accent)">{g.game}</span>
                <div className="grid grid-cols-2 gap-y-1.5 text-xs">
                  <span className="text-(--color-text-muted)">Gesamtspiele</span>
                  <span className="text-right font-medium">{g.played}</span>
                  <span className="text-(--color-text-muted)">Gewonnen</span>
                  <span className="text-right font-medium">{g.wins}</span>
                  <span className="text-(--color-text-muted)">Verloren</span>
                  <span className="text-right font-medium">{g.losses}</span>
                  <span className="text-(--color-text-muted)">Unentschieden</span>
                  <span className="text-right font-medium">{g.draws}</span>
                  <span className="text-(--color-text-muted)">Gesamtquote</span>
                  <span className="text-right font-medium">{g.winRate}%</span>
                  <span className="text-(--color-text-muted)">Gewinn/Verlust</span>
                  <span
                    className={`text-right font-medium ${
                      g.profitLoss >= 0 ? "text-(--color-win)" : "text-(--color-lose)"
                    }`}
                  >
                    {g.profitLoss >= 0 ? "+" : ""}
                    {g.profitLoss}€
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button href={`/duels/${opponent.slug}/wager`}>Herausfordern</Button>
      </div>
    </PhoneScreen>
  );
}
