import { LegalPage } from "@/components/LegalPage";

export default function ResponsibleGamingPage() {
  return (
    <LegalPage title="Verantwortungsvolles Spielen">
      <p>
        BATME setzt sich für verantwortungsvolles Spielverhalten ein. Wetten sind kein Weg, um
        finanzielle Probleme zu lösen, und sollten nur mit Geld erfolgen, dessen Verlust du dir
        leisten kannst.
      </p>
      <p>
        <strong>Limits.</strong> Du kannst in den Einstellungen Einzahlungs- und Verlustlimits
        festlegen.
      </p>
      <p>
        <strong>Selbstsperre.</strong> Eine vorübergehende oder dauerhafte Sperre deines Kontos
        kannst du jederzeit über Einstellungen → Sicherheit beantragen.
      </p>
      <p>
        <strong>Hilfe.</strong> Beratungsstellen: BZgA-Hotline 0800 137 27 00 (Deutschland),
        buss-sucht.de.
      </p>
      <p>Teilnahme erst ab 18 Jahren.</p>
    </LegalPage>
  );
}
