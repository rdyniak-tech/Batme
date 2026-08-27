"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Avatar } from "@/components/Avatar";
import { TrustBadge } from "@/components/TrustBadge";
import { opponents, frequentFriends } from "@/lib/mockData";

export default function ChooseOpponentPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? opponents.filter((o) => o.name.toLowerCase().includes(q)) : opponents;
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [query]);

  return (
    <PhoneScreen title="1. Gegner wählen" nav>
      <div className="flex flex-col gap-6">
        <label className="flex items-center gap-2 rounded-xl border border-(--color-surface-border) bg-(--color-surface) px-4 py-3">
          <Search size={18} className="text-(--color-text-muted)" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Gegner suchen (Username)"
            className="w-full bg-transparent text-sm text-(--color-text) outline-none placeholder:text-(--color-text-muted)"
          />
        </label>

        {!query && (
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
                <Avatar name={opponent.name} size="sm" />
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium">{opponent.name}</span>
                  <span className="text-xs text-(--color-text-muted)">{opponent.mainGame}</span>
                </div>
                <TrustBadge score={opponent.trustScore} />
              </Link>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-(--color-text-muted)">Kein Spieler gefunden.</p>
            )}
          </div>
        </div>
      </div>
    </PhoneScreen>
  );
}
