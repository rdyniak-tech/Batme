"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, History, Users } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Avatar } from "@/components/Avatar";
import { TrustBadge } from "@/components/TrustBadge";
import { opponents } from "@/lib/mockData";
import { useAppState } from "@/lib/store";

export default function ChooseOpponentPage() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<"solo" | "team">("solo");
  const { friendSlugs, duelHistory } = useAppState();
  const frequentFriends = opponents.filter((o) => friendSlugs.includes(o.slug));
  const activeCount = duelHistory.filter((d) => d.status === "active").length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const scoped = opponents.filter((o) => Boolean(o.isTeam) === (scope === "team"));
    const list = q ? scoped.filter((o) => o.name.toLowerCase().includes(q)) : scoped;
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [query, scope]);

  return (
    <PhoneScreen
      title="1. Gegner wählen"
      nav
      headerAction={
        <Link
          href="/duels/history"
          className="flex items-center gap-1.5 text-xs font-medium text-(--color-text-muted)"
        >
          <History size={16} />
          Meine Duelle
          {activeCount > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-(--color-accent) px-1 text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </Link>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-1">
          <button
            type="button"
            onClick={() => setScope("solo")}
            className={`rounded-lg py-2 text-sm font-semibold ${
              scope === "solo"
                ? "bg-(--color-accent)/15 text-(--color-accent)"
                : "text-(--color-text-muted)"
            }`}
          >
            1 vs 1
          </button>
          <button
            type="button"
            onClick={() => setScope("team")}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold ${
              scope === "team"
                ? "bg-(--color-accent)/15 text-(--color-accent)"
                : "text-(--color-text-muted)"
            }`}
          >
            <Users size={14} />
            Team vs Team
          </button>
        </div>

        <label className="flex items-center gap-2 rounded-xl border border-(--color-surface-border) bg-(--color-surface) px-4 py-3">
          <Search size={18} className="text-(--color-text-muted)" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={scope === "team" ? "Team suchen" : "Gegner suchen (Username)"}
            className="w-full bg-transparent text-sm text-(--color-text) outline-none placeholder:text-(--color-text-muted)"
          />
        </label>

        {scope === "solo" && !query && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-(--color-text-muted)">Freunde</h2>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {frequentFriends.map((friend) => (
                <Link
                  key={friend.slug}
                  href={`/duels/${friend.slug}`}
                  className="flex w-20 shrink-0 flex-col items-center gap-1.5"
                >
                  <Avatar name={friend.name} size="md" />
                  <span className="truncate text-center text-xs text-(--color-text-muted)">
                    {friend.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-(--color-text-muted)">A-Z</h2>
          <div className="flex flex-col gap-2">
            {filtered.map((opponent) => (
              <Link
                key={opponent.slug}
                href={`/duels/${opponent.slug}`}
                className="flex items-center gap-3 rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-3"
              >
                {opponent.isTeam ? (
                  <div className="flex -space-x-3">
                    {(opponent.members ?? []).slice(0, 3).map((m) => (
                      <Avatar key={m} name={m} size="sm" />
                    ))}
                  </div>
                ) : (
                  <Avatar name={opponent.name} size="sm" />
                )}
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium">{opponent.name}</span>
                  <span className="text-xs text-(--color-text-muted)">
                    {opponent.isTeam
                      ? `${opponent.members?.length ?? 0} Spieler · ${opponent.mainGame}`
                      : opponent.mainGame}
                  </span>
                </div>
                <TrustBadge score={opponent.trustScore} />
              </Link>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-(--color-text-muted)">
                {scope === "team" ? "Kein Team gefunden." : "Kein Spieler gefunden."}
              </p>
            )}
          </div>
        </div>
      </div>
    </PhoneScreen>
  );
}
