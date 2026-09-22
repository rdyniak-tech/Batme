import { notFound } from "next/navigation";
import { Camera, Gavel, Clock, CheckCircle2 } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Avatar } from "@/components/Avatar";
import { currentUser, disputes } from "@/lib/mockData";

export default async function DisputeDetailPage({
  params,
}: {
  params: Promise<{ dispute: string }>;
}) {
  const { dispute: id } = await params;
  const dispute = disputes.find((d) => d.id === id);
  if (!dispute) notFound();

  return (
    <PhoneScreen title="Streitfall" back nav>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between rounded-2xl border border-(--color-surface-border) bg-(--color-surface) p-4">
          <div className="flex flex-col items-center gap-1.5">
            <Avatar name={currentUser.name} size="md" />
            <span className="text-xs text-(--color-text-muted)">{currentUser.name}</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-xs text-(--color-text-muted)">
            <Gavel size={18} />
            {dispute.game}
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Avatar name={dispute.opponentName} size="md" />
            <span className="text-xs text-(--color-text-muted)">{dispute.opponentName}</span>
          </div>
        </div>

        <div
          className={`flex items-center gap-2 rounded-xl border p-3 text-xs font-semibold ${
            dispute.status === "open"
              ? "border-(--color-warn)/30 bg-(--color-warn)/10 text-(--color-warn)"
              : "border-(--color-win)/30 bg-(--color-win)/10 text-(--color-win)"
          }`}
        >
          {dispute.status === "open" ? <Clock size={16} /> : <CheckCircle2 size={16} />}
          {dispute.status === "open" ? "In Prüfung" : "Entschieden"}
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-(--color-text-muted)">Grund</h2>
          <p className="text-sm">{dispute.reason}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-(--color-text-muted)">Eingereichte Nachweise</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-xl border border-(--color-surface-border) bg-(--color-bg-elevated) text-(--color-text-muted)">
              <Camera size={20} />
              <span className="text-xs">Dein Beweis</span>
            </div>
            <div className="flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-xl border border-(--color-surface-border) bg-(--color-bg-elevated) text-(--color-text-muted)">
              <Camera size={20} />
              <span className="text-xs">
                {dispute.status === "open" ? "Ausstehend" : "Beweis Gegner"}
              </span>
            </div>
          </div>
        </div>

        {dispute.status === "resolved" ? (
          <div className="flex flex-col gap-2 rounded-xl border border-(--color-win)/30 bg-(--color-win)/10 p-4">
            <span className="text-sm font-semibold text-(--color-win)">Entscheidung</span>
            <p className="text-sm text-(--color-text)">{dispute.resolution}</p>
          </div>
        ) : (
          <p className="text-center text-xs text-(--color-text-muted)">
            Wir prüfen den Fall und melden uns in Kürze mit einer Entscheidung.
          </p>
        )}
      </div>
    </PhoneScreen>
  );
}
