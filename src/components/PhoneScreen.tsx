"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { BottomNav } from "./BottomNav";

export function PhoneScreen({
  children,
  title,
  back,
  headerAction,
  nav,
}: {
  children: ReactNode;
  title?: string;
  back?: boolean;
  headerAction?: ReactNode;
  nav?: boolean;
}) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full justify-center">
      <div className="flex w-full max-w-md flex-col pb-4 pt-6 sm:min-h-screen sm:py-10">
        <header className="flex items-center gap-3 px-5 pb-6">
          {back ? (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Zurück"
              className="text-xl text-(--color-text-muted)"
            >
              ←
            </button>
          ) : null}
          <Logo className="h-6" />
          {headerAction ? <div className="ml-auto">{headerAction}</div> : null}
        </header>
        {title ? (
          <h1 className="px-5 pb-5 text-lg font-semibold text-(--color-text)">{title}</h1>
        ) : null}
        <div className="flex flex-1 flex-col px-5">{children}</div>
        {nav ? <BottomNav /> : null}
      </div>
    </div>
  );
}
