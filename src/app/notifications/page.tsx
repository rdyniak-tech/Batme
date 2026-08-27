import { Swords, Wallet, Radio, UserPlus, Gavel } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { notifications, type NotificationItem } from "@/lib/mockData";

const typeMeta: Record<NotificationItem["type"], { icon: typeof Swords; color: string }> = {
  duel: { icon: Swords, color: "var(--color-accent)" },
  payout: { icon: Wallet, color: "var(--color-win)" },
  event: { icon: Radio, color: "var(--color-warn)" },
  friend: { icon: UserPlus, color: "var(--color-accent-2)" },
  dispute: { icon: Gavel, color: "var(--color-lose)" },
};

export default function NotificationsPage() {
  return (
    <PhoneScreen title="Benachrichtigungen" back nav>
      <div className="flex flex-col gap-2">
        {notifications.map((n) => {
          const meta = typeMeta[n.type];
          const Icon = meta.icon;
          return (
            <div
              key={n.id}
              className={`flex gap-3 rounded-xl border p-3 ${
                n.read
                  ? "border-(--color-surface-border) bg-(--color-surface)"
                  : "border-(--color-accent)/40 bg-(--color-surface)"
              }`}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
              >
                <Icon size={16} />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold">{n.title}</span>
                  {!n.read && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-(--color-accent)" />
                  )}
                </div>
                <span className="text-xs text-(--color-text-muted)">{n.body}</span>
                <span className="text-[11px] text-(--color-text-muted)">{n.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </PhoneScreen>
  );
}
