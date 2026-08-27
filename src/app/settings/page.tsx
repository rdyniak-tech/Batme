import Link from "next/link";
import {
  ChevronRight,
  Globe,
  Bell,
  ShieldAlert,
  FileText,
  Scale,
  HeartHandshake,
  UserPlus,
  LogOut,
  Trash2,
} from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";

const groups: {
  title: string;
  items: { icon: typeof Globe; label: string; href: string; danger?: boolean }[];
}[] = [
  {
    title: "Konto",
    items: [
      { icon: Globe, label: "Sprache & Land", href: "#" },
      { icon: Bell, label: "Benachrichtigungen", href: "/notifications" },
      { icon: UserPlus, label: "Freunde einladen", href: "/duels" },
    ],
  },
  {
    title: "Sicherheit & verantwortungsvolles Spielen",
    items: [
      { icon: ShieldAlert, label: "Einzahlungs- & Verlustlimits", href: "#" },
      { icon: HeartHandshake, label: "Selbstsperre", href: "/legal/responsible-gaming" },
    ],
  },
  {
    title: "Rechtliches",
    items: [
      { icon: FileText, label: "Impressum", href: "/legal/impressum" },
      { icon: Scale, label: "AGB", href: "/legal/agb" },
      { icon: FileText, label: "Datenschutzerklärung", href: "/legal/datenschutz" },
      { icon: HeartHandshake, label: "Verantwortungsvolles Spielen", href: "/legal/responsible-gaming" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <PhoneScreen title="Einstellungen" back nav>
      <div className="flex flex-col gap-6">
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-(--color-text-muted)">{group.title}</h2>
            <div className="flex flex-col gap-2">
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl border border-(--color-surface-border) bg-(--color-surface) p-3"
                >
                  <item.icon size={18} className="text-(--color-text-muted)" />
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  <ChevronRight size={16} className="text-(--color-text-muted)" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-2 pt-2">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-(--color-surface-border) bg-(--color-surface) py-3 text-sm font-semibold text-(--color-text-muted)"
          >
            <LogOut size={16} />
            Abmelden
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-(--color-lose)/40 bg-(--color-lose)/10 py-3 text-sm font-semibold text-(--color-lose)"
          >
            <Trash2 size={16} />
            Konto löschen
          </button>
        </div>
      </div>
    </PhoneScreen>
  );
}
