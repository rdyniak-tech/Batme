"use client";

import Link from "next/link";
import {
  ChevronRight,
  Globe,
  Bell,
  ShieldAlert,
  ShieldCheck,
  FileText,
  Scale,
  HeartHandshake,
  UserPlus,
  Gavel,
  LogOut,
  Trash2,
} from "lucide-react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { useAppState } from "@/lib/store";

type SettingsItem = { icon: typeof Globe; label: string; href: string; badge?: string };

export default function SettingsPage() {
  const { kycVerified } = useAppState();

  const groups: { title: string; items: SettingsItem[] }[] = [
    {
      title: "Konto",
      items: [
        {
          icon: ShieldCheck,
          label: "Identität verifizieren (KYC)",
          href: "/kyc",
          badge: kycVerified ? "Verifiziert" : "Ausstehend",
        },
        { icon: Globe, label: "Sprache & Land", href: "/settings/language" },
        { icon: Bell, label: "Benachrichtigungen", href: "/notifications" },
        { icon: UserPlus, label: "Freunde", href: "/friends" },
      ],
    },
    {
      title: "Sicherheit & verantwortungsvolles Spielen",
      items: [
        { icon: ShieldAlert, label: "Einzahlungs- & Verlustlimits", href: "/settings/limits" },
        { icon: HeartHandshake, label: "Selbstsperre", href: "/legal/responsible-gaming" },
        { icon: Gavel, label: "Streitfall-Center", href: "/disputes" },
      ],
    },
    {
      title: "Rechtliches",
      items: [
        { icon: FileText, label: "Impressum", href: "/legal/impressum" },
        { icon: Scale, label: "AGB", href: "/legal/agb" },
        { icon: FileText, label: "Datenschutzerklärung", href: "/legal/datenschutz" },
        {
          icon: HeartHandshake,
          label: "Verantwortungsvolles Spielen",
          href: "/legal/responsible-gaming",
        },
      ],
    },
  ];

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
                  {item.badge && (
                    <span
                      className={`text-xs font-semibold ${
                        item.badge === "Verifiziert"
                          ? "text-(--color-win)"
                          : "text-(--color-warn)"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
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
