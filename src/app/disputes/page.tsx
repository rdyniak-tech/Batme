import Link from "next/link";
import { Gavel, ChevronRight } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { disputes } from "@/lib/mockData";

export default function DisputesPage() {
  return (
    <PhoneScreen title="Streitfall-Center" back nav>
      <div className="flex flex-col gap-6">
        <p className="text-sm text-(--color-text-muted)">
          Wenn sich zwei Spieler nicht auf ein Ergebnis einigen können, wird automatisch ein
          Streitfall eröffnet. Wir werten Nachweisfotos, Zeitstempel und TrustScore aus.
        </p>

        <div className="flex flex-col gap-3">
          {disputes.map((d) => (
            <Link
              key={d.id}
              href={`/disputes/${d.id}`}
              className="flex items-center gap-3 rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-3"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  d.status === "open"
                    ? "bg-(--color-warn)/15 text-(--color-warn)"
                    : "bg-(--color-win)/15 text-(--color-win)"
                }`}
              >
                <Gavel size={16} />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-medium">
                  vs. {d.opponentName} · {d.game}
                </span>
                <span className="text-xs text-(--color-text-muted)">
                  {d.stake}€ · {d.openedAt}
                </span>
              </div>
              <span
                className={`text-xs font-semibold ${
                  d.status === "open" ? "text-(--color-warn)" : "text-(--color-win)"
                }`}
              >
                {d.status === "open" ? "Offen" : "Entschieden"}
              </span>
              <ChevronRight size={16} className="text-(--color-text-muted)" />
            </Link>
          ))}
          {disputes.length === 0 && (
            <p className="text-sm text-(--color-text-muted)">Keine Streitfälle vorhanden.</p>
          )}
        </div>
      </div>
    </PhoneScreen>
  );
}
