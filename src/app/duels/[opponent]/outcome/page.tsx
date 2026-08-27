import { notFound } from "next/navigation";
import { Wallet } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/Button";
import { getOpponent, currentUser } from "@/lib/mockData";

export default async function OutcomePage({
  params,
  searchParams,
}: {
  params: Promise<{ opponent: string }>;
  searchParams: Promise<{ game?: string; stake?: string; result?: string }>;
}) {
  const { opponent: slug } = await params;
  const { stake: stakeParam, result } = await searchParams;
  const opponent = getOpponent(slug);
  if (!opponent) notFound();

  const stake = Number(stakeParam) || 0;
  const won = result === "won";
  const pot = stake * 2;
  const winnerName = won ? currentUser.name : opponent.name;

  return (
    <PhoneScreen title="7. Ergebnis" nav>
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-xl font-bold">
          {won ? "Du hast gewonnen" : "Du hast verloren"}
        </h2>
        <p
          className={`text-4xl font-extrabold ${
            won ? "text-(--color-win)" : "text-(--color-lose)"
          }`}
        >
          {won ? "+" : "-"}
          {won ? pot : stake}€
        </p>

        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full ${
            won ? "bg-(--color-win)/15 text-(--color-win)" : "bg-(--color-lose)/15 text-(--color-lose)"
          }`}
        >
          <Wallet size={32} />
        </div>

        <p className="text-sm text-(--color-text-muted)">
          {won ? "Wurde deinem Guthaben gutgeschrieben." : "Dein Guthaben wurde aktualisiert."}
        </p>

        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-3 rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-3">
            <Avatar name={winnerName} size="sm" />
            <div className="flex flex-1 flex-col text-left">
              <span className="text-sm font-medium">{winnerName}</span>
              <span className="text-xs text-(--color-win)">WON</span>
            </div>
            <span className="text-sm font-bold text-(--color-win)">+{pot}€</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-3 text-sm">
            <span className="text-(--color-text-muted)">Dein Einsatz</span>
            <span className="font-bold">-{stake}€</span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          {won ? (
            <Button href="/wallet">Auszahlen</Button>
          ) : (
            <Button href={`/duels/${opponent.slug}/wager`}>Revanche</Button>
          )}
          <Button variant="secondary" href="/home">
            Zur Startseite
          </Button>
        </div>
      </div>
    </PhoneScreen>
  );
}
