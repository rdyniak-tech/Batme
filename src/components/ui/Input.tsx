import type { InputHTMLAttributes } from "react";

export function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-(--color-text-muted)">{label}</span>
      <input
        id={id}
        className={`w-full rounded-xl border border-(--color-surface-border) bg-(--color-surface) px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-muted) outline-none focus:border-(--color-accent) ${
          error ? "border-(--color-lose)" : ""
        } ${className}`}
        {...props}
      />
      {error ? <span className="text-xs text-(--color-lose)">{error}</span> : null}
    </label>
  );
}
