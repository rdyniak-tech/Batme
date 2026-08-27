import { PhoneScreen } from "@/components/PhoneScreen";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PhoneScreen nav>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <span className="text-4xl font-extrabold text-(--color-accent)">404</span>
        <p className="max-w-xs text-sm text-(--color-text-muted)">
          Diese Seite gibt es nicht (mehr).
        </p>
        <Button href="/home" className="mt-2 w-auto px-8">
          Zur Startseite
        </Button>
      </div>
    </PhoneScreen>
  );
}
