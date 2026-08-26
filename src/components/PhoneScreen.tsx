import type { ReactNode } from "react";
import { Logo } from "./Logo";

export function PhoneScreen({
  children,
  title,
  onBack,
}: {
  children: ReactNode;
  title?: string;
  onBack?: () => void;
}) {
  return (
    <div className="flex min-h-screen w-full justify-center">
      <div className="flex w-full max-w-md flex-col px-5 pb-8 pt-6 sm:min-h-screen sm:py-10">
        <header className="flex items-center gap-3 pb-6">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Zurück"
              className="text-xl text-(--color-text-muted)"
            >
              ←
            </button>
          ) : null}
          <Logo className="text-xl" />
        </header>
        {title ? (
          <h1 className="pb-5 text-lg font-semibold text-(--color-text)">{title}</h1>
        ) : null}
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
