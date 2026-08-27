import Link from "next/link";
import { Settings, ChevronRight, Gamepad2, Users } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Avatar } from "@/components/Avatar";
import { TrustBadge } from "@/components/TrustBadge";
import { currentUser, frequentFriends } from "@/lib/mockData";

export default function ProfilePage() {
  return (
    <PhoneScreen
      title="Profil"
      nav
      headerAction={
        <Link href="/settings" aria-label="Einstellungen" className="text-(--color-text-muted)">
          <Settings size={20} />
        </Link>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-(--color-surface-border) bg-(--color-surface) p-6">
          <Avatar name={currentUser.username} size="lg" />
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">{currentUser.username}</span>
            <TrustBadge score={currentUser.trustScore} />
          </div>
          <span className="text-xs text-(--color-text-muted)">{currentUser.mainGame}</span>
          <Link href="/trust-score" className="text-xs font-medium text-(--color-accent)">
            Was ist der TrustScore?
          </Link>

          <div className="mt-4 grid w-full grid-cols-4 divide-x divide-(--color-surface-border) text-center">
            <div className="flex flex-col gap-0.5 px-1">
              <span className="text-base font-bold">{currentUser.wins}</span>
              <span className="text-[11px] text-(--color-text-muted)">Wins</span>
            </div>
            <div className="flex flex-col gap-0.5 px-1">
              <span className="text-base font-bold">{currentUser.losses}</span>
              <span className="text-[11px] text-(--color-text-muted)">Losses</span>
            </div>
            <div className="flex flex-col gap-0.5 px-1">
              <span className="text-base font-bold text-(--color-win)">
                {currentUser.betsWon}
              </span>
              <span className="text-[11px] text-(--color-text-muted)">Wetten +</span>
            </div>
            <div className="flex flex-col gap-0.5 px-1">
              <span className="text-base font-bold text-(--color-lose)">
                {currentUser.betsLost}
              </span>
              <span className="text-[11px] text-(--color-text-muted)">Wetten -</span>
            </div>
          </div>
        </div>

        <Link
          href="/duels"
          className="flex items-center gap-3 rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-accent)/15 text-(--color-accent)">
            <Users size={16} />
          </div>
          <div className="flex flex-1 flex-col">
            <span className="text-sm font-medium">Freunde</span>
            <span className="text-xs text-(--color-text-muted)">
              {frequentFriends.length} Freunde verbunden
            </span>
          </div>
          <ChevronRight size={16} className="text-(--color-text-muted)" />
        </Link>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-(--color-text-muted)">
            Verknüpfte Gaming-Accounts
          </h2>
          <div className="flex flex-col gap-2">
            {currentUser.linkedAccounts.map((acc) => (
              <div
                key={acc.platform}
                className="flex items-center gap-3 rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-bg-elevated) text-(--color-text-muted)">
                  <Gamepad2 size={16} />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium">{acc.platform}</span>
                  {acc.linked ? (
                    <span className="text-xs text-(--color-text-muted)">{acc.handle}</span>
                  ) : (
                    <span className="text-xs text-(--color-text-muted)">Nicht verknüpft</span>
                  )}
                </div>
                {acc.linked ? (
                  <span className="text-xs font-semibold text-(--color-win)">Verknüpft</span>
                ) : (
                  <button
                    type="button"
                    className="rounded-lg border border-(--color-surface-border) px-3 py-1.5 text-xs font-semibold"
                  >
                    Verknüpfen
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneScreen>
  );
}
