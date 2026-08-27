import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "outline";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-(--color-accent-2) to-(--color-accent) text-white shadow-[0_0_24px_-8px_rgba(52,211,224,0.6)] disabled:opacity-50 disabled:shadow-none",
  secondary:
    "bg-(--color-surface) text-(--color-text) border border-(--color-surface-border)",
  outline:
    "bg-transparent text-(--color-text) border border-(--color-surface-border)",
};

const baseClasses =
  "block w-full rounded-xl px-4 py-3.5 text-center text-sm font-semibold transition-opacity active:opacity-80 disabled:cursor-not-allowed";

export function Button({
  variant = "primary",
  className = "",
  href,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: string;
}) {
  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
