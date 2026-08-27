"use client";

import { use, useState } from "react";
import { Radio, ExternalLink } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/Button";
import { getEvent } from "@/lib/mockData";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ event: string }>;
}) {
  const { event: slug } = use(params);
  const event = getEvent(slug);
  const [side, setSide] = useState<"A" | "B" | null>(null);
  const [amount, setAmount] = useState(10);
  const [placed, setPlaced] = useState(false);

  if (!event) {
    return (
      <PhoneScreen title="Event nicht gefunden" back nav>
        <p className="text-sm text-(--color-text-muted)">Dieses Event existiert nicht (mehr).</p>
      </PhoneScreen>
    );
  }

  const sharePct = Math.round((event.stakeA / (event.stakeA + event.stakeB)) * 100);

  return (
    <PhoneScreen title={event.title} back nav>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-(--color-accent)/30 bg-gradient-to-br from-(--color-surface) to-(--color-bg-elevated) p-5 shadow-[0_0_40px_-20px_rgba(52,211,224,0.7)]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-(--color-accent)">{event.game}</span>
            {event.status === "live" ? (
              <span className="flex items-center gap-1 rounded-full bg-(--color-lose)/15 px-2 py-0.5 font-semibold text-(--color-lose)">
                <Radio size={10} /> LIVE
              </span>
            ) : (
              <span className="text-(--color-text-muted)">{event.date}</span>
            )}
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex flex-col items-center gap-1.5">
              <Avatar name={event.playerA} size="lg" />
              <span className="text-xs">{event.playerA}</span>
            </div>
            <span className="text-sm font-bold italic text-(--color-text-muted)">VS</span>
            <div className="flex flex-col items-center gap-1.5">
              <Avatar name={event.playerB} size="lg" />
              <span className="text-xs">{event.playerB}</span>
            </div>
          </div>

          <a
            href={`https://${event.streamUrl}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 text-xs font-medium text-(--color-accent)"
          >
            {event.streamUrl} <ExternalLink size={12} />
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-(--color-text-muted)">
            <span>{event.playerA}</span>
            <span>{event.pot}€ Pool · {event.bettors} Wetten</span>
            <span>{event.playerB}</span>
          </div>
          <div className="flex h-2 overflow-hidden rounded-full bg-(--color-surface-border)">
            <div
              className="bg-(--color-accent)"
              style={{ width: `${sharePct}%` }}
            />
            <div className="flex-1 bg-(--color-lose)" />
          </div>
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>{sharePct}%</span>
            <span>{100 - sharePct}%</span>
          </div>
        </div>

        {placed ? (
          <div className="rounded-xl border border-(--color-win)/40 bg-(--color-win)/10 p-4 text-center text-sm text-(--color-win)">
            {amount}€ auf {side === "A" ? event.playerA : event.playerB} gesetzt.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSide("A")}
                className={`rounded-xl border py-3 text-sm font-semibold ${
                  side === "A"
                    ? "border-(--color-accent) bg-(--color-accent)/10 text-(--color-accent)"
                    : "border-(--color-surface-border) bg-(--color-surface)"
                }`}
              >
                {event.playerA}
              </button>
              <button
                type="button"
                onClick={() => setSide("B")}
                className={`rounded-xl border py-3 text-sm font-semibold ${
                  side === "B"
                    ? "border-(--color-accent) bg-(--color-accent)/10 text-(--color-accent)"
                    : "border-(--color-surface-border) bg-(--color-surface)"
                }`}
              >
                {event.playerB}
              </button>
            </div>

            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(Math.max(1, Number(e.target.value) || 0))}
              className="w-full rounded-xl border border-(--color-surface-border) bg-(--color-surface) px-4 py-3 text-lg font-bold outline-none focus:border-(--color-accent)"
            />

            <Button disabled={!side} onClick={() => setPlaced(true)}>
              Jetzt mitwetten
            </Button>
          </div>
        )}
      </div>
    </PhoneScreen>
  );
}
