import { ArrowDownToLine, ArrowUpFromLine, Gift, Swords, Trophy } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { currentUser, walletTransactions, type Transaction } from "@/lib/mockData";

const typeMeta: Record<Transaction["type"], { icon: typeof Trophy; color: string }> = {
  win: { icon: Trophy, color: "var(--color-win)" },
  deposit: { icon: ArrowDownToLine, color: "var(--color-accent)" },
  withdrawal: { icon: ArrowUpFromLine, color: "var(--color-text-muted)" },
  stake: { icon: Swords, color: "var(--color-lose)" },
  bonus: { icon: Gift, color: "var(--color-warn)" },
};

export default function WalletPage() {
  const totalWon = walletTransactions
    .filter((t) => t.type === "win" || t.type === "bonus")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalLost = walletTransactions
    .filter((t) => t.type === "stake")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <PhoneScreen title="Wallet" nav>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-(--color-accent)/30 bg-gradient-to-br from-(--color-surface) to-(--color-bg-elevated) p-6 text-center shadow-[0_0_40px_-20px_rgba(52,211,224,0.7)]">
          <span className="text-xs font-medium text-(--color-text-muted)">Guthaben</span>
          <span className="text-4xl font-extrabold">{currentUser.wallet}€</span>
          <div className="grid w-full grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              className="rounded-xl bg-gradient-to-r from-(--color-accent-2) to-(--color-accent) py-3 text-sm font-semibold text-white"
            >
              Einzahlen
            </button>
            <button
              type="button"
              className="rounded-xl border border-(--color-surface-border) bg-(--color-surface) py-3 text-sm font-semibold"
            >
              Auszahlen
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-3">
            <span className="text-xs text-(--color-text-muted)">Gewinne (30 Tage)</span>
            <span className="text-lg font-bold text-(--color-win)">+{totalWon}€</span>
          </div>
          <div className="flex flex-col gap-1 rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-3">
            <span className="text-xs text-(--color-text-muted)">Einsätze (30 Tage)</span>
            <span className="text-lg font-bold text-(--color-lose)">-{totalLost}€</span>
          </div>
        </div>

        <p className="rounded-xl border border-(--color-warn)/30 bg-(--color-warn)/10 p-3 text-xs text-(--color-warn)">
          Spiele verantwortungsvoll. Setze dir Limits in den Einstellungen und behalte deine
          Bilanz im Blick.
        </p>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-(--color-text-muted)">Historie</h2>
          <div className="flex flex-col gap-2">
            {walletTransactions.map((t) => {
              const meta = typeMeta[t.type];
              const Icon = meta.icon;
              return (
                <div
                  key={t.id}
                  className="flex items-center gap-3 rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-3"
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium">{t.label}</span>
                    <span className="text-xs text-(--color-text-muted)">{t.date}</span>
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      t.amount >= 0 ? "text-(--color-win)" : "text-(--color-text)"
                    }`}
                  >
                    {t.amount >= 0 ? "+" : ""}
                    {t.amount}€
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PhoneScreen>
  );
}
