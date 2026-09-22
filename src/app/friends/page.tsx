"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, UserPlus, Check, X, ShieldOff } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Avatar } from "@/components/Avatar";
import { TrustBadge } from "@/components/TrustBadge";
import { opponents } from "@/lib/mockData";
import { useAppState } from "@/lib/store";

export default function FriendsPage() {
  const [query, setQuery] = useState("");
  const {
    friendRequests,
    friendSlugs,
    acceptFriendRequest,
    declineFriendRequest,
    sendFriendRequest,
    removeFriend,
  } = useAppState();

  const friends = opponents.filter((o) => friendSlugs.includes(o.slug));

  function handleAdd() {
    if (!query.trim()) return;
    sendFriendRequest(query.trim());
    setQuery("");
  }

  return (
    <PhoneScreen title="Freunde" back nav>
      <div className="flex flex-col gap-6">
        <label className="flex items-center gap-2 rounded-xl border border-(--color-surface-border) bg-(--color-surface) px-4 py-3">
          <Search size={18} className="text-(--color-text-muted)" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Username eingeben, um hinzuzufügen"
            className="w-full bg-transparent text-sm text-(--color-text) outline-none placeholder:text-(--color-text-muted)"
          />
          {query && (
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center gap-1 rounded-lg bg-(--color-accent)/15 px-2 py-1 text-xs font-semibold text-(--color-accent)"
            >
              <UserPlus size={12} /> Hinzufügen
            </button>
          )}
        </label>

        {friendRequests.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-(--color-text-muted)">Anfragen</h2>
            {friendRequests.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-3"
              >
                <Avatar name={r.name} size="sm" />
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium">{r.name}</span>
                  <span className="text-xs text-(--color-text-muted)">
                    {r.direction === "incoming" ? "Möchte dich hinzufügen" : "Angefragt"}
                  </span>
                </div>
                {r.direction === "incoming" ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => acceptFriendRequest(r.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-win)/15 text-(--color-win)"
                      aria-label="Annehmen"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => declineFriendRequest(r.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-lose)/15 text-(--color-lose)"
                      aria-label="Ablehnen"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-(--color-text-muted)">ausstehend</span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-(--color-text-muted)">
            Freunde ({friends.length})
          </h2>
          <div className="flex flex-col gap-2">
            {friends.map((f) => (
              <div
                key={f.slug}
                className="flex items-center gap-3 rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-3"
              >
                <Link href={`/duels/${f.slug}`} className="flex flex-1 items-center gap-3">
                  <Avatar name={f.name} size="sm" />
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium">{f.name}</span>
                    <span className="text-xs text-(--color-text-muted)">{f.mainGame}</span>
                  </div>
                  <TrustBadge score={f.trustScore} />
                </Link>
                <button
                  type="button"
                  onClick={() => removeFriend(f.slug)}
                  aria-label="Blockieren"
                  className="text-(--color-text-muted)"
                >
                  <ShieldOff size={16} />
                </button>
              </div>
            ))}
            {friends.length === 0 && (
              <p className="text-sm text-(--color-text-muted)">Noch keine Freunde.</p>
            )}
          </div>
        </div>
      </div>
    </PhoneScreen>
  );
}
