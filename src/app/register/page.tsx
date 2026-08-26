"use client";

import { useMemo, useState } from "react";
import { PhoneScreen } from "@/components/PhoneScreen";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type FormState = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  birthDate: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  birthDate: "",
};

function calculateAge(birthDate: string): number | null {
  if (!birthDate) return null;
  const dob = new Date(birthDate);
  if (Number.isNaN(dob.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age -= 1;
  }
  return age;
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const age = useMemo(() => calculateAge(form.birthDate), [form.birthDate]);

  const errors: Partial<Record<keyof FormState, string>> = {
    firstName: !form.firstName ? "Vorname fehlt" : undefined,
    lastName: !form.lastName ? "Nachname fehlt" : undefined,
    username: !form.username
      ? "Username fehlt"
      : form.username.length < 3
        ? "Mindestens 3 Zeichen"
        : undefined,
    email: !form.email
      ? "E-Mail fehlt"
      : !/^\S+@\S+\.\S+$/.test(form.email)
        ? "Ungültige E-Mail"
        : undefined,
    phone: !form.phone ? "Telefonnummer fehlt" : undefined,
    birthDate: !form.birthDate ? "Geburtsdatum fehlt" : undefined,
  };

  const isValid = Object.values(errors).every((error) => !error);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setTouched({
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      phone: true,
      birthDate: true,
    });
    if (!isValid) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <PhoneScreen>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--color-win)/15 text-3xl text-(--color-win)">
            ✓
          </div>
          <h2 className="text-xl font-bold">Konto erstellt</h2>
          <p className="max-w-xs text-sm text-(--color-text-muted)">
            Willkommen bei BATME, {form.firstName}! Der nächste Schritt (Startseite) folgt im
            nächsten Bauabschnitt.
          </p>
        </div>
      </PhoneScreen>
    );
  }

  return (
    <PhoneScreen title="Konto erstellen">
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="secondary"
            className="flex items-center justify-center gap-2"
          >
            Google
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="flex items-center justify-center gap-2"
          >
            Apple
          </Button>
        </div>

        <div className="my-2 flex items-center gap-3 text-xs text-(--color-text-muted)">
          <span className="h-px flex-1 bg-(--color-surface-border)" />
          oder mit E-Mail
          <span className="h-px flex-1 bg-(--color-surface-border)" />
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-2 gap-3">
            <Input
              id="firstName"
              label="Vorname"
              placeholder="Max"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
              error={touched.firstName ? errors.firstName : undefined}
            />
            <Input
              id="lastName"
              label="Nachname"
              placeholder="Mustermann"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, lastName: true }))}
              error={touched.lastName ? errors.lastName : undefined}
            />
          </div>

          <Input
            id="username"
            label="Username"
            placeholder="Hakan62aslan"
            value={form.username}
            onChange={(e) => update("username", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, username: true }))}
            error={touched.username ? errors.username : undefined}
          />

          <Input
            id="email"
            type="email"
            label="E-Mail"
            placeholder="du@beispiel.de"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            error={touched.email ? errors.email : undefined}
          />

          <Input
            id="phone"
            type="tel"
            label="Telefonnummer"
            placeholder="+49 151 23456789"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            error={touched.phone ? errors.phone : undefined}
          />

          <div className="flex flex-col gap-1.5">
            <Input
              id="birthDate"
              type="date"
              label="Geburtsdatum"
              value={form.birthDate}
              onChange={(e) => update("birthDate", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, birthDate: true }))}
              error={touched.birthDate ? errors.birthDate : undefined}
            />
            {age !== null && age < 18 ? (
              <p className="text-xs text-(--color-warn)">
                Für Wetten mit Einsatz ist eine Volljährigkeit ab 18 Jahren erforderlich. Die
                Altersprüfung erfolgt vor der ersten Wette.
              </p>
            ) : null}
          </div>

          <p className="text-xs text-(--color-text-muted)">
            Mit dem Erstellen eines Kontos akzeptierst du die AGB, die Datenschutzerklärung und
            den Hinweis zum verantwortungsvollen Spielen.
          </p>

          <Button type="submit">Konto erstellen</Button>
        </form>

        <p className="pt-2 text-center text-xs text-(--color-text-muted)">
          Bereits ein Konto?{" "}
          <span className="font-medium text-(--color-accent)">Anmelden</span>
        </p>
      </div>
    </PhoneScreen>
  );
}
