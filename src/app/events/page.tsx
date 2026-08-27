import Link from "next/link";
import { Radio, Users } from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Avatar } from "@/components/Avatar";
import { events } from "@/lib/mockData";

export default function EventsPage() {
  return (
    <PhoneScreen title="Events" back nav>
      <div className="flex flex-col gap-3">
        {events.map((event) => (
          <Link
            key={event.slug}
            href={`/events/${event.slug}`}
            className="flex flex-col gap-3 rounded-2xl border border-(--color-surface-border) bg-(--color-surface) p-4"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-(--color-accent)">{event.title}</span>
              {event.status === "live" ? (
                <span className="flex items-center gap-1 rounded-full bg-(--color-lose)/15 px-2 py-0.5 font-semibold text-(--color-lose)">
                  <Radio size={10} /> LIVE
                </span>
              ) : (
                <span className="text-(--color-text-muted)">{event.date}</span>
              )}
            </div>
            <div className="flex items-center justify-between px-4">
              <div className="flex flex-col items-center gap-1">
                <Avatar name={event.playerA} size="md" />
                <span className="text-xs">{event.playerA}</span>
              </div>
              <span className="text-xs font-bold italic text-(--color-text-muted)">VS</span>
              <div className="flex flex-col items-center gap-1">
                <Avatar name={event.playerB} size="md" />
                <span className="text-xs">{event.playerB}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-(--color-text-muted)">
              <span className="flex items-center gap-1">
                <Users size={12} /> {event.bettors} Wetten
              </span>
              <span>{event.pot}€ Pool</span>
            </div>
          </Link>
        ))}
      </div>
    </PhoneScreen>
  );
}
