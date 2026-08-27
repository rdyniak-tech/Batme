import Link from "next/link";
import { Bell, Search, Share2, Radio } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { DuelCard, type Duel } from "@/components/DuelCard";
import { Avatar } from "@/components/Avatar";
import { TrustBadge } from "@/components/TrustBadge";

const openDuels: Duel[] = [
  {
    id: "1",
    opponentSlug: "perino",
    game: "FIFA 26",
    you: "Du",
    opponent: "Perino",
    opponentTrust: 97,
    stake: 33,
    status: "open",
  },
  {
    id: "2",
    opponentSlug: "michaelle_s",
    game: "Call of Duty",
    you: "Du",
    opponent: "Michaelle_S",
    opponentTrust: 88,
    stake: 20,
    status: "locked",
  },
];

const publicMatches = [
  { id: "p1", slug: "hakan62aslan", game: "FIFA 26", player: "Hakan62aslan", trust: 91, stake: 15 },
  { id: "p2", slug: "teamnova", game: "COD: Warzone", player: "TeamNova", trust: 76, stake: 40 },
  { id: "p3", slug: "rafael_k", game: "FIFA 26", player: "Rafael_K", trust: 64, stake: 10 },
];

export default function HomePage() {
  return (
    <PhoneScreen
      nav
      headerAction={
        <div className="flex items-center gap-4 text-(--color-text-muted)">
          <Search size={20} />
          <Bell size={20} />
        </div>
      }
    >
      <section className="flex flex-col gap-3 pb-6">
        <h2 className="text-sm font-semibold text-(--color-text-muted)">Offene Duelle</h2>
        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1">
          {openDuels.map((duel) => (
            <DuelCard key={duel.id} duel={duel} />
          ))}
        </div>
      </section>

      <section className="pb-6">
        <Link
          href="/duels"
          className="flex w-full items-center justify-between gap-4 rounded-2xl border border-(--color-surface-border) bg-(--color-surface) p-4 text-left"
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-(--color-accent)">Gegner suchen</span>
            <span className="text-xs text-(--color-text-muted)">
              Ich bin allein, habe 20€ und will heute Abend zocken.
            </span>
          </div>
          <Share2 size={18} className="shrink-0 text-(--color-text-muted)" />
        </Link>
      </section>

      <section className="pb-6">
        <div className="flex flex-col gap-3 rounded-2xl border border-(--color-accent)/30 bg-gradient-to-br from-(--color-surface) to-(--color-bg-elevated) p-4 shadow-[0_0_40px_-20px_rgba(52,211,224,0.7)]">
          <div className="flex items-center gap-2 text-xs font-semibold text-(--color-accent)">
            <Radio size={14} />
            MAIN EVENT
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-1.5">
              <Avatar name="Perino" size="lg" />
              <span className="text-xs">Perino</span>
            </div>
            <span className="text-sm font-bold italic text-(--color-text-muted)">VS</span>
            <div className="flex flex-col items-center gap-1.5">
              <Avatar name="Michel_S" size="lg" />
              <span className="text-xs">Michel_S</span>
            </div>
          </div>
          <p className="text-center text-xs text-(--color-text-muted)">
            FIFA 26 · Sa. 20:00 Uhr · Live auf Twitch
          </p>
          <button
            type="button"
            className="w-full rounded-xl bg-gradient-to-r from-(--color-accent-2) to-(--color-accent) py-2.5 text-sm font-semibold text-white"
          >
            Jetzt mitwetten
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-3 pb-4">
        <h2 className="text-sm font-semibold text-(--color-text-muted)">Öffentliche Matches</h2>
        <div className="flex flex-col gap-2">
          {publicMatches.map((match) => (
            <Link
              key={match.id}
              href={`/duels/${match.slug}`}
              className="flex items-center gap-3 rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-3"
            >
              <Avatar name={match.player} size="sm" />
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-medium">{match.player}</span>
                <span className="text-xs text-(--color-text-muted)">{match.game}</span>
              </div>
              <TrustBadge score={match.trust} />
              <span className="text-sm font-bold">{match.stake}€</span>
            </Link>
          ))}
        </div>
      </section>
    </PhoneScreen>
  );
}
