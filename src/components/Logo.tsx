import Image from "next/image";
import logo from "../../public/brand/batme-logo.png";

export function Logo({ className = "h-6" }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="BATME"
      className={`w-auto ${className}`}
      priority
    />
  );
}
