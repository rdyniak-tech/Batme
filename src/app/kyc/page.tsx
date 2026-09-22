"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, IdCard, ScanFace, CheckCircle2 } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Button } from "@/components/ui/Button";
import { useAppState } from "@/lib/store";

type Step = "intro" | "id-front" | "id-back" | "selfie" | "pending" | "done";

const stepOrder: Step[] = ["intro", "id-front", "id-back", "selfie", "pending", "done"];

export default function KycPage() {
  const [step, setStep] = useState<Step>("intro");
  const { verifyKyc } = useAppState();

  useEffect(() => {
    if (step !== "pending") return;
    const t = setTimeout(() => {
      verifyKyc();
      setStep("done");
    }, 1800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const progressIndex = stepOrder.indexOf(step);
  const showProgress = step !== "intro" && step !== "done";

  return (
    <PhoneScreen title="Identitätsprüfung (KYC)" back nav>
      <div className="flex flex-1 flex-col gap-6">
        {showProgress && (
          <div className="flex gap-1.5">
            {stepOrder.slice(1, 4).map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full ${
                  i <= progressIndex - 1 ? "bg-(--color-accent)" : "bg-(--color-surface-border)"
                }`}
              />
            ))}
          </div>
        )}

        {step === "intro" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--color-accent)/15 text-(--color-accent)">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-lg font-bold">Verifiziere dein Konto</h2>
            <p className="max-w-xs text-sm text-(--color-text-muted)">
              Damit du einzahlen, wetten und Gewinne auszahlen kannst, prüfen wir einmalig deine
              Identität und dein Alter (18+). Das ist gesetzlich vorgeschrieben und schützt vor
              Betrug und Geldwäsche.
            </p>
            <Button onClick={() => setStep("id-front")} className="mt-2">
              Verifizierung starten
            </Button>
          </div>
        )}

        {step === "id-front" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <IdCard size={28} className="text-(--color-accent)" />
            <h2 className="text-base font-semibold">Ausweis – Vorderseite</h2>
            <p className="max-w-xs text-sm text-(--color-text-muted)">
              Fotografiere die Vorderseite deines Personalausweises oder Reisepasses. Achte auf
              gute Beleuchtung und Lesbarkeit.
            </p>
            <Button onClick={() => setStep("id-back")}>Foto aufnehmen</Button>
          </div>
        )}

        {step === "id-back" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <IdCard size={28} className="text-(--color-accent)" />
            <h2 className="text-base font-semibold">Ausweis – Rückseite</h2>
            <p className="max-w-xs text-sm text-(--color-text-muted)">
              Jetzt die Rückseite fotografieren.
            </p>
            <Button onClick={() => setStep("selfie")}>Foto aufnehmen</Button>
          </div>
        )}

        {step === "selfie" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ScanFace size={28} className="text-(--color-accent)" />
            <h2 className="text-base font-semibold">Selfie zum Abgleich</h2>
            <p className="max-w-xs text-sm text-(--color-text-muted)">
              Zum Schluss ein kurzes Selfie, damit wir dein Gesicht mit dem Ausweisfoto
              abgleichen können.
            </p>
            <Button onClick={() => setStep("pending")}>Selfie aufnehmen</Button>
          </div>
        )}

        {step === "pending" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-(--color-accent) border-t-transparent" />
            <h2 className="text-base font-semibold">Wird geprüft…</h2>
            <p className="max-w-xs text-sm text-(--color-text-muted)">
              Unser Verifizierungsdienstleister prüft deine Angaben. Das dauert normalerweise nur
              wenige Minuten.
            </p>
          </div>
        )}

        {step === "done" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--color-win)/15 text-(--color-win)">
              <CheckCircle2 size={28} />
            </div>
            <h2 className="text-lg font-bold">Verifiziert</h2>
            <p className="max-w-xs text-sm text-(--color-text-muted)">
              Dein Konto ist jetzt für Einzahlungen, Wetten und Auszahlungen freigeschaltet.
            </p>
            <div className="mt-2 flex w-full flex-col gap-2">
              <Button href="/wallet">Zum Wallet</Button>
              <Button variant="secondary" href="/home">
                Zur Startseite
              </Button>
            </div>
          </div>
        )}
      </div>
    </PhoneScreen>
  );
}
