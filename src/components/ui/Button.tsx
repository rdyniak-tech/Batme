import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-(--color-accent-2) to-(--color-accent) text-white shadow-[0_0_24px_-8px_rgba(52,211,224,0.6)] disabled:opacity-50 disabled:shadow-none",
  secondary:
    "bg-(--color-surface) text-(--color-text) border border-(--color-surface-border)",
  outline:
    "bg-transparent text-(--color-text) border border-(--color-surface-border)",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`w-full rounded-xl px-4 py-3.5 text-center text-sm font-semibold transition-opacity active:opacity-80 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
