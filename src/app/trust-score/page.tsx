import { CheckCircle2, XCircle } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { TrustBadge } from "@/components/TrustBadge";
import { currentUser } from "@/lib/mockData";

const positives = [
  "Pünktliche Ergebnis-Bestätigungen",
  "Saubere Nachweisfotos/-videos",
  "Wenige oder keine Streitfälle",
  "Faires, kooperatives Verhalten",
];

const negatives = [
  "Verweigerte oder verspätete Bestätigungen",
  "Wiederholte Streitfälle",
  "Verdacht auf Cheating oder Manipulation",
  "Abbrüche ohne Ergebnis-Bestätigung",
];

export default function TrustScorePage() {
  return (
    <PhoneScreen title="TrustScore" back nav>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-(--color-surface-border) bg-(--color-surface) p-6 text-center">
          <span className="text-xs text-(--color-text-muted)">Dein aktueller TrustScore</span>
          <TrustBadge score={currentUser.trustScore} className="px-3 py-1 text-sm" />
        </div>

        <p className="text-sm text-(--color-text-muted)">
          Der TrustScore zeigt, wie zuverlässig und fair ein Spieler ist. Ein hoher Score
          bedeutet schnellere Auszahlungen, geringere Gebühren und leichteren Zugang zu
          attraktiven Events. Ein niedriger Score kann dazu führen, dass nur noch Wetten im
          Nachweis-Modus möglich sind.
        </p>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-(--color-win)">Erhöht den Score</h2>
          <div className="flex flex-col gap-2">
            {positives.map((p) => (
              <div key={p} className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={16} className="shrink-0 text-(--color-win)" />
                {p}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-(--color-lose)">Senkt den Score</h2>
          <div className="flex flex-col gap-2">
            {negatives.map((n) => (
              <div key={n} className="flex items-center gap-2 text-sm">
                <XCircle size={16} className="shrink-0 text-(--color-lose)" />
                {n}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between gap-3 text-center text-xs">
          <div className="flex-1 rounded-xl border border-(--color-win)/40 bg-(--color-win)/10 p-3 text-(--color-win)">
            85–100%
            <br />
            Hoch
          </div>
          <div className="flex-1 rounded-xl border border-(--color-warn)/40 bg-(--color-warn)/10 p-3 text-(--color-warn)">
            60–84%
            <br />
            Mittel
          </div>
          <div className="flex-1 rounded-xl border border-(--color-lose)/40 bg-(--color-lose)/10 p-3 text-(--color-lose)">
            &lt; 60%
            <br />
            Niedrig
          </div>
        </div>
      </div>
    </PhoneScreen>
  );
}
