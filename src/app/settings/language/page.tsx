"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { currentUser } from "@/lib/mockData";

const languages = ["Deutsch", "English", "Español", "Français"];
const countries = ["Deutschland", "Österreich", "Schweiz", "Andere"];

export default function LanguageSettingsPage() {
  const [language, setLanguage] = useState(currentUser.language);
  const [country, setCountry] = useState(currentUser.country);

  return (
    <PhoneScreen title="Sprache & Land" back nav>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-(--color-text-muted)">Sprache</h2>
          <div className="flex flex-col gap-2">
            {languages.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLanguage(l)}
                className="flex items-center justify-between rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-3 text-sm"
              >
                {l}
                {language === l && <Check size={16} className="text-(--color-accent)" />}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-(--color-text-muted)">Land</h2>
          <p className="text-xs text-(--color-text-muted)">
            Bestimmt geltende Wett- und Jugendschutzregeln sowie verfügbare Zahlungsmethoden.
          </p>
          <div className="flex flex-col gap-2">
            {countries.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCountry(c)}
                className="flex items-center justify-between rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-3 text-sm"
              >
                {c}
                {country === c && <Check size={16} className="text-(--color-accent)" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </PhoneScreen>
  );
}
