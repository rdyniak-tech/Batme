export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center font-extrabold tracking-tight ${className}`}>
      <span className="text-(--color-accent)">B</span>
      <span className="text-white">ATME</span>
    </span>
  );
}
