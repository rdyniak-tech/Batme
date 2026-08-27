import type { ReactNode } from "react";
import { PhoneScreen } from "./PhoneScreen";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <PhoneScreen title={title} back nav>
      <div className="flex flex-col gap-4 pb-6 text-sm leading-relaxed text-(--color-text-muted)">
        <div className="rounded-xl border border-(--color-warn)/30 bg-(--color-warn)/10 p-3 text-xs text-(--color-warn)">
          Platzhaltertext – rechtsgültige Fassung folgt vor Launch (KYC/AML, Impressumspflicht,
          Glücksspielrecht je Land).
        </div>
        {children}
      </div>
    </PhoneScreen>
  );
}
