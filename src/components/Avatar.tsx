function initialsOf(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

const sizeClasses = {
  xs: "h-7 w-7 text-[10px]",
  sm: "h-10 w-10 text-xs",
  md: "h-14 w-14 text-base",
  lg: "h-20 w-20 text-xl",
};

export function Avatar({
  name,
  size = "md",
  ring = true,
}: {
  name: string;
  size?: keyof typeof sizeClasses;
  ring?: boolean;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-(--color-surface) to-(--color-bg-elevated) font-bold text-(--color-text) ${
        sizeClasses[size]
      } ${ring ? "ring-2 ring-(--color-accent)/40" : ""}`}
    >
      {initialsOf(name)}
    </div>
  );
}
