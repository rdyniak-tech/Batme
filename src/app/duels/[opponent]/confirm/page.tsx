import { notFound } from "next/navigation";
import { Gamepad2 } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/Button";
import { getOpponent, currentUser } from "@/lib/mockData";

export default async function ConfirmBetPage({
  params,
  searchParams,
}: {
  params: Promise<{ opponent: string }>;
  searchParams: Promise<{ game?: string; stake?: string }>;
}) {
  const { opponent: slug } = await params;
  const { game, stake: stakeParam } = await searchParams;
  const opponent = getOpponent(slug);
  if (!opponent) notFound();

  const stake = Number(stakeParam) || 0;

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
        </div>

        <Button href={`/duels/${opponent.slug}/match?game=${encodeURIComponent(game ?? "")}&stake=${stake}`}>
          Confirm Bet
        </Button>
      </div>
    </PhoneScreen>
  );
}
