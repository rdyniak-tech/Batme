"use client";

import { useState } from "react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Button } from "@/components/ui/Button";
import { currentUser } from "@/lib/mockData";

export default function LimitsSettingsPage() {
  const [depositLimit, setDepositLimit] = useState(currentUser.depositLimit);
  const [lossLimit, setLossLimit] = useState(currentUser.lossLimit);
  const [saved, setSaved] = useState(false);

  return (
    <PhoneScreen title="Einzahlungs- & Verlustlimits" back nav>
      <div className="flex flex-col gap-6">
        <p className="text-sm text-(--color-text-muted)">
          Setze dir wöchentliche Limits, um deine Ausgaben unter Kontrolle zu behalten. Eine
          Erhöhung wird erst nach 24 Stunden wirksam, eine Senkung sofort.
        </p>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="depositLimit" className="text-xs font-medium text-(--color-text-muted)">
            Einzahlungslimit pro Woche (€)
          </label>
          <input
            id="depositLimit"
            type="number"
            min={0}
            value={depositLimit}
            onChange={(e) => {
              setDepositLimit(Number(e.target.value) || 0);
              setSaved(false);
            }}
            className="w-full rounded-xl border border-(--color-surface-border) bg-(--color-surface) px-4 py-3 text-lg font-bold outline-none focus:border-(--color-accent)"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="lossLimit" className="text-xs font-medium text-(--color-text-muted)">
            Verlustlimit pro Woche (€)
          </label>
          <input
            id="lossLimit"
            type="number"
            min={0}
            value={lossLimit}
            onChange={(e) => {
              setLossLimit(Number(e.target.value) || 0);
              setSaved(false);
            }}
            className="w-full rounded-xl border border-(--color-surface-border) bg-(--color-surface) px-4 py-3 text-lg font-bold outline-none focus:border-(--color-accent)"
          />
        </div>

        <Button onClick={() => setSaved(true)}>{saved ? "Gespeichert ✓" : "Speichern"}</Button>
      </div>
    </PhoneScreen>
  );
}
