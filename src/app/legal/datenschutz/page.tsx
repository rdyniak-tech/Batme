import { LegalPage } from "@/components/LegalPage";

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <p>
        <strong>Verantwortlicher.</strong> BATME GmbH (Platzhalter), Kontakt siehe Impressum.
      </p>
      <p>
        <strong>Verarbeitete Daten.</strong> Registrierungsdaten, KYC-Nachweise, Zahlungsdaten,
        Nutzungs- und Gerätedaten, Nachweisfotos/-videos zu Duellen.
      </p>
      <p>
        <strong>Zwecke.</strong> Vertragserfüllung, Betrugsprävention, gesetzliche
        Aufbewahrungspflichten (AML/KYC), Verbesserung des Angebots.
      </p>
      <p>
        <strong>Weitergabe.</strong> An KYC-/Zahlungsdienstleister, soweit zur Vertragserfüllung
        erforderlich. Keine Weitergabe zu Werbezwecken ohne Einwilligung.
      </p>
      <p>
        <strong>Rechte.</strong> Auskunft, Berichtigung, Löschung, Widerspruch – Kontakt über die
        Support-Funktion in der App.
      </p>
    </LegalPage>
  );
}
