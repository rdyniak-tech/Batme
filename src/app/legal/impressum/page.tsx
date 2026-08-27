import { LegalPage } from "@/components/LegalPage";

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <p>
        <strong>BATME GmbH</strong> (Platzhalter)
        <br />
        Musterstraße 1, 10115 Berlin, Deutschland
      </p>
      <p>
        Vertreten durch: Max Mustermann
        <br />
        Handelsregister: HRB XXXXX, Amtsgericht Berlin
        <br />
        USt-IdNr.: DE000000000
      </p>
      <p>
        Kontakt: kontakt@batme.app
        <br />
        Verantwortlich i.S.d. § 18 Abs. 2 MStV: Max Mustermann
      </p>
    </LegalPage>
  );
}
