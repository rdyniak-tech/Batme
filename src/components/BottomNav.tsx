"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Swords, Wallet } from "lucide-react";

const items = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/duels", label: "Duels", icon: Swords },
  { href: "/wallet", label: "Wallet", icon: Wallet },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 mt-6 flex items-center justify-around border-t border-(--color-surface-border) bg-(--color-bg)/90 px-6 py-3 backdrop-blur">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 text-xs ${
              active ? "text-(--color-accent)" : "text-(--color-text-muted)"
            }`}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 2} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
