"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpFromLine, Gift, Swords, Trophy, ShieldAlert } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Button } from "@/components/ui/Button";
import { useAppState } from "@/lib/store";
import type { Transaction } from "@/lib/mockData";

const typeMeta: Record<Transaction["type"], { icon: typeof Trophy; color: string }> = {
  win: { icon: Trophy, color: "var(--color-win)" },
  deposit: { icon: ArrowDownToLine, color: "var(--color-accent)" },
  withdrawal: { icon: ArrowUpFromLine, color: "var(--color-text-muted)" },
  stake: { icon: Swords, color: "var(--color-lose)" },
  bonus: { icon: Gift, color: "var(--color-warn)" },
};

export default function WalletPage() {
  const { wallet, transactions, kycVerified, deposit, withdraw } = useAppState();
  const [mode, setMode] = useState<"none" | "deposit" | "withdraw">("none");
  const [amount, setAmount] = useState(50);
  const [error, setError] = useState("");

  const totalWon = transactions
    .filter((t) => t.type === "win" || t.type === "bonus")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalLost = transactions
    .filter((t) => t.type === "stake")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  function handleConfirm() {
    setError("");
    if (mode === "deposit") {
      if (!kycVerified) {
        setError("Bitte zuerst dein Konto verifizieren.");
        return;
      }
      deposit(amount);
      setMode("none");
    } else if (mode === "withdraw") {
      if (!kycVerified) {
        setError("Bitte zuerst dein Konto verifizieren.");
        return;
      }
      const ok = withdraw(amount);
      if (!ok) {
        setError("Betrag übersteigt dein Guthaben.");
        return;
      }
      setMode("none");
    }
  }

  return (
    <PhoneScreen title="Wallet" nav>
      <div className="flex flex-col gap-6">
        {!kycVerified && (
          <Link
            href="/kyc"
            className="flex items-center gap-3 rounded-xl border border-(--color-warn)/30 bg-(--color-warn)/10 p-3 text-xs text-(--color-warn)"
          >
            <ShieldAlert size={18} className="shrink-0" />
            <span className="flex-1">
              Konto noch nicht verifiziert. Einzahlungen und Auszahlungen sind erst nach der
              Identitätsprüfung möglich.
            </span>
          </Link>
        )}

        <div className="flex flex-col items-center gap-4 rounded-2xl border border-(--color-accent)/30 bg-gradient-to-br from-(--color-surface) to-(--color-bg-elevated) p-6 text-center shadow-[0_0_40px_-20px_rgba(52,211,224,0.7)]">
          <span className="text-xs font-medium text-(--color-text-muted)">Guthaben</span>
          <span className="text-4xl font-extrabold">{wallet}€</span>

          {mode === "none" ? (
            <div className="grid w-full grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMode("deposit");
                  setAmount(50);
                  setError("");
                }}
                className="rounded-xl bg-gradient-to-r from-(--color-accent-2) to-(--color-accent) py-3 text-sm font-semibold text-white"
              >
                Einzahlen
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("withdraw");
                  setAmount(Math.min(50, wallet));
                  setError("");
                }}
                className="rounded-xl border border-(--color-surface-border) bg-(--color-surface) py-3 text-sm font-semibold"
              >
                Auszahlen
              </button>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-2 pt-2">
              <input
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(Math.max(1, Number(e.target.value) || 0))}
                className="w-full rounded-xl border border-(--color-surface-border) bg-(--color-bg-elevated) px-4 py-2.5 text-center text-lg font-bold text-(--color-text) outline-none focus:border-(--color-accent)"
              />
              {error && <p className="text-xs text-(--color-lose)">{error}</p>}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" onClick={() => setMode("none")}>
                  Abbrechen
                </Button>
                <Button onClick={handleConfirm}>
                  {mode === "deposit" ? "Einzahlen" : "Auszahlen"}
                </Button>
              </div>
            </div>
          )}
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
            {transactions.map((t) => {
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
