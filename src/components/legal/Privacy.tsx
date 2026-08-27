import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "../../lib/i18n";

type Block = { type: "p"; text: string } | { type: "ul"; items: string[] };

type SectionData = {
  heading: string;
  blocks: Block[];
};

const sections: SectionData[] = [
  {
    heading: "1. Verantwortliche Stelle",
    blocks: [
      {
        type: "p",
        text: "Verantwortlich für die Bearbeitung von Personendaten über die Plattform Weligo ist:",
      },
      {
        type: "p",
        text: "Weligo\nHuebwiesenstrasse 37\n8954 Geroldswil\nSchweiz",
      },
      { type: "p", text: "E-Mail: info@weligo.ch\nWebsite: weligo.ch" },
      {
        type: "p",
        text: "Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Datenschutzrechte können Sie uns unter der oben genannten E-Mail-Adresse kontaktieren.",
      },
    ],
  },
  {
    heading: "1. Was ist Weligo?",
    blocks: [
      {
        type: "p",
        text: "Weligo betreibt eine digitale Vermittlungsplattform.",
      },
      {
        type: "p",
        text: "Über Weligo können insbesondere Familien, Privathaushalte und andere Auftraggebende mit Personen oder Unternehmen in Kontakt treten, die Dienstleistungen anbieten.",
      },
      { type: "p", text: "Dazu können beispielsweise gehören:" },
      {
        type: "ul",
        items: [
          "Kinderbetreuung,",
          "Babysitting,",
          "Nachhilfe,",
          "Haushaltshilfe,",
          "Reinigung,",
          "Tierbetreuung,",
          "Seniorenunterstützung und",
          "weitere Dienstleistungen zur Unterstützung im Alltag.",
        ],
      },
      {
        type: "p",
        text: "Damit eine solche Vermittlung funktionieren kann, müssen bestimmte Personendaten verarbeitet werden.",
      },
      {
        type: "p",
        text: "Wir bearbeiten grundsätzlich nur Personendaten, die für den Betrieb, die Sicherheit, die Weiterentwicklung und die Nutzung unserer Plattform erforderlich oder für weitere klar bezeichnete Zwecke vorgesehen sind.",
      },
    ],
  },
  {
    heading: "1. Welche Personendaten bearbeiten wir?",
    blocks: [
      {
        type: "p",
        text: "Je nachdem, wie Sie Weligo nutzen, können unterschiedliche Personendaten bearbeitet werden.",
      },
      { type: "p", text: "3.1 Registrierungs- und Stammdaten" },
      {
        type: "p",
        text: "Bei der Erstellung eines Benutzerkontos können insbesondere folgende Daten bearbeitet werden:",
      },
      {
        type: "ul",
        items: [
          "Vorname und Nachname,",
          "E-Mail-Adresse,",
          "Telefonnummer,",
          "Geburtsdatum, soweit erforderlich,",
          "Geschlecht, soweit freiwillig angegeben oder für bestimmte Funktionen erforderlich,",
          "Wohnort,",
          "Postleitzahl,",
          "Profilbild,",
          "Benutzerrolle,",
          "Sprache,",
          "Login- und Kontoinformationen.",
        ],
      },
    ],
  },
  {
    heading: "1. Daten von Dienstleistenden",
    blocks: [
      {
        type: "p",
        text: "Personen, die Dienstleistungen über Weligo anbieten, können zusätzliche Informationen in ihrem Profil hinterlegen.",
      },
      { type: "p", text: "Dazu können insbesondere gehören:" },
      {
        type: "ul",
        items: [
          "Profilbeschreibung,",
          "berufliche Erfahrung,",
          "Ausbildung,",
          "Qualifikationen,",
          "angebotene Dienstleistungen,",
          "Stundensatz oder Pauschalpreis,",
          "Verfügbarkeit,",
          "Arbeitsregion beziehungsweise Einsatzgebiet,",
          "Sprachkenntnisse,",
          "Referenzen,",
          "Zertifikate,",
          "Diplome,",
          "Erste-Hilfe-Nachweise,",
          "Strafregisterauszüge, sofern vorgesehen und rechtlich zulässig,",
          "Identitätsnachweise,",
          "Angaben zur Verifizierung,",
          "Bewertungen und",
          "weitere freiwillig bereitgestellte Profilinformationen.",
        ],
      },
      {
        type: "p",
        text: "Bestimmte Angaben können anderen Nutzern angezeigt werden, soweit dies für die Funktionsweise des Marktplatzes erforderlich ist.",
      },
      {
        type: "p",
        text: "Nicht alle von Weligo zur Prüfung erhaltenen Dokumente werden öffentlich angezeigt.",
      },
    ],
  },
  {
    heading: "1. Verifizierungsdaten",
    blocks: [
      {
        type: "p",
        text: "Weligo kann Verifizierungsverfahren anbieten, um das Vertrauen und die Sicherheit auf der Plattform zu erhöhen.",
      },
      {
        type: "p",
        text: "Hierfür können beispielsweise folgende Informationen verarbeitet werden:",
      },
      {
        type: "ul",
        items: [
          "Identitätsdokumente,",
          "Name und Geburtsdatum,",
          "Foto,",
          "Telefonnummer,",
          "E-Mail-Adresse,",
          "Zertifikate,",
          "Qualifikationsnachweise,",
          "Referenzen und",
          "weitere zur jeweiligen Prüfung erforderliche Informationen.",
        ],
      },
      {
        type: "p",
        text: "Weligo verwendet solche Informationen grundsätzlich nur für den jeweiligen Verifizierungs- und Sicherheitszweck.\nSoweit externe Verifizierungsdienstleister eingesetzt werden, können die hierfür erforderlichen Daten an diese übermittelt werden.",
      },
      {
        type: "p",
        text: "[Vor Veröffentlichung konkret eingesetzten Verifizierungsdienstleister ergänzen.]",
      },
    ],
  },
  {
    heading: "1. Daten von Familien und Auftraggebenden",
    blocks: [
      {
        type: "p",
        text: "Wenn Sie über Weligo nach Unterstützung suchen, können insbesondere folgende Daten bearbeitet werden:",
      },
      {
        type: "ul",
        items: [
          "Kontaktdaten,",
          "Wohn- beziehungsweise Einsatzregion,",
          "gewünschte Dienstleistung,",
          "gewünschter Zeitpunkt,",
          "Dauer einer Dienstleistung,",
          "Preisvorstellungen,",
          "Buchungsinformationen,",
          "besondere Anforderungen und",
          "Informationen, die Sie freiwillig in einer Anfrage mitteilen.",
        ],
      },
      {
        type: "p",
        text: "Bitte geben Sie nur Informationen an, die für die jeweilige Anfrage tatsächlich erforderlich sind.",
      },
      {
        type: "p",
        text: "Insbesondere sollten keine unnötigen besonders schützenswerten Informationen über Kinder, Familienmitglieder oder andere Personen in Freitextfeldern oder Chats geteilt werden.",
      },
    ],
  },
  {
    heading: "1. Daten über Kinder",
    blocks: [
      {
        type: "p",
        text: "Bei bestimmten über Weligo vermittelten Dienstleistungen, insbesondere Kinderbetreuung und Nachhilfe, können Informationen über Kinder erforderlich sein.",
      },
      { type: "p", text: "Dazu können beispielsweise gehören:" },
      {
        type: "ul",
        items: [
          "Vorname,",
          "ungefähres oder genaues Alter,",
          "Betreuungsbedarf,",
          "Schulstufe,",
          "benötigtes Nachhilfefach und",
          "für die Durchführung der Dienstleistung notwendige Informationen.",
        ],
      },
      {
        type: "p",
        text: "Wir empfehlen Eltern und anderen verantwortlichen Personen, nur diejenigen Informationen über Kinder anzugeben, die für die Vermittlung beziehungsweise sichere Durchführung der Dienstleistung erforderlich sind.",
      },
      {
        type: "p",
        text: "Besonders schützenswerte Informationen sollten nur mitgeteilt werden, wenn dies tatsächlich notwendig ist.",
      },
    ],
  },
  {
    heading: "1. Such- und Standortdaten",
    blocks: [
      {
        type: "p",
        text: "Weligo kann Standortinformationen verwenden, damit Nutzer passende Dienstleistende in ihrer Umgebung finden können.",
      },
      { type: "p", text: "Dazu können gehören:" },
      {
        type: "ul",
        items: [
          "eingegebener Wohnort,",
          "Postleitzahl,",
          "Suchradius,",
          "ungefähre Position und",
          "bei entsprechender Freigabe Standortinformationen des Endgeräts.",
        ],
      },
      {
        type: "p",
        text: "Eine präzise Standortbestimmung über das Endgerät erfolgt nur, soweit die entsprechende Funktion aktiviert beziehungsweise die erforderliche Berechtigung erteilt wurde.",
      },
      {
        type: "p",
        text: "Standortberechtigungen können grundsätzlich über die Einstellungen des jeweiligen Geräts oder Browsers verwaltet werden.",
      },
    ],
  },
  {
    heading: "1. Kommunikations- und Chatdaten",
    blocks: [
      {
        type: "p",
        text: "Wenn Nutzer über Weligo miteinander kommunizieren, können wir die dabei entstehenden Daten technisch verarbeiten und speichern.",
      },
      { type: "p", text: "Dazu können gehören:" },
      {
        type: "ul",
        items: [
          "Textnachrichten,",
          "Zeitpunkt der Kommunikation,",
          "Absender und Empfänger,",
          "Bilder,",
          "Dokumente und",
          "sonstige über die Plattform ausgetauschte Dateien.",
        ],
      },
      { type: "p", text: "Diese Verarbeitung dient insbesondere:" },
      {
        type: "ul",
        items: [
          "der Bereitstellung der Chatfunktion,",
          "der Durchführung der Vermittlung,",
          "der Sicherheit der Plattform,",
          "der Bearbeitung von Beschwerden,",
          "der Missbrauchsprävention und",
          "gegebenenfalls der Klärung von Streitfällen.",
        ],
      },
      {
        type: "p",
        text: "Weligo liest private Kommunikation nicht ohne Grund systematisch mit.",
      },
      {
        type: "p",
        text: "Soweit eine Prüfung erforderlich ist, erfolgt sie insbesondere im Zusammenhang mit gemeldeten Inhalten, Sicherheitsvorfällen, Betrugsverdacht, gesetzlichen Verpflichtungen oder der Durchsetzung unserer Nutzungsbedingungen.",
      },
    ],
  },
  {
    heading: "1. Buchungs- und Vermittlungsdaten",
    blocks: [
      {
        type: "p",
        text: "Bei einer Anfrage oder Vermittlung können wir insbesondere bearbeiten:",
      },
      {
        type: "ul",
        items: [
          "beteiligte Nutzer,",
          "Art der Dienstleistung,",
          "Datum und Uhrzeit,",
          "Dauer,",
          "vereinbarter Preis,",
          "Buchungsstatus,",
          "Stornierungen,",
          "Änderungen,",
          "abgeschlossene Vermittlungen,",
          "Bewertungen und",
          "gegebenenfalls Zahlungsstatus.",
        ],
      },
      {
        type: "p",
        text: "Diese Daten dienen insbesondere der Vermittlung, Plattformverwaltung, Abrechnung, Sicherheit und Verbesserung unserer Dienstleistungen.",
      },
    ],
  },
  {
    heading: "1. Zahlungsdaten",
    blocks: [
      {
        type: "p",
        text: "Soweit Zahlungen über Weligo ermöglicht werden, können externe Zahlungsdienstleister eingesetzt werden.",
      },
      { type: "p", text: "Weligo kann dabei Informationen über:" },
      {
        type: "ul",
        items: [
          "Zahlungsvorgänge,",
          "Rechnungsbeträge,",
          "Transaktionsnummern,",
          "Zahlungsstatus,",
          "Rückerstattungen und",
          "Auszahlungen",
        ],
      },
      { type: "p", text: "bearbeiten." },
      {
        type: "p",
        text: "Vollständige Kreditkartendaten werden nach Möglichkeit direkt durch den jeweiligen Zahlungsdienstleister verarbeitet und nicht dauerhaft von Weligo gespeichert.",
      },
      {
        type: "p",
        text: "[Vor Veröffentlichung den tatsächlich eingesetzten Zahlungsdienstleister, beispielsweise Stripe oder einen anderen Anbieter, ergänzen.]",
      },
      {
        type: "p",
        text: "Für die Datenbearbeitung durch den jeweiligen Zahlungsdienstleister gelten zusätzlich dessen Datenschutzbestimmungen.",
      },
    ],
  },
  {
    heading: "1. Bewertungen",
    blocks: [
      {
        type: "p",
        text: "Nutzer können gegebenenfalls Bewertungen über andere Nutzer abgeben.",
      },
      { type: "p", text: "Dabei können insbesondere:" },
      {
        type: "ul",
        items: [
          "Bewertung,",
          "Bewertungstext,",
          "Zeitpunkt,",
          "zugehörige Vermittlung und",
          "Benutzerprofil",
        ],
      },
      { type: "p", text: "verarbeitet werden." },
      {
        type: "p",
        text: "Bewertungen können auf der Plattform für andere Nutzer sichtbar sein.",
      },
    ],
  },
  {
    heading: "1. Technische Daten",
    blocks: [
      {
        type: "p",
        text: "Beim Besuch von weligo.ch können automatisch technische Informationen verarbeitet werden.",
      },
      { type: "p", text: "Dazu können insbesondere gehören:" },
      {
        type: "ul",
        items: [
          "IP-Adresse,",
          "Browsertyp,",
          "Betriebssystem,",
          "Gerätetyp,",
          "Datum und Uhrzeit des Zugriffs,",
          "aufgerufene Seiten,",
          "Referrer-Informationen,",
          "technische Fehlerdaten und",
          "Server-Logdaten.",
        ],
      },
      { type: "p", text: "Diese Informationen können insbesondere für:" },
      {
        type: "ul",
        items: [
          "den sicheren Betrieb der Plattform,",
          "Fehleranalyse,",
          "Missbrauchsbekämpfung,",
          "IT-Sicherheit und",
          "technische Optimierung",
        ],
      },
      { type: "p", text: "verwendet werden." },
    ],
  },
  {
    heading: "1. Zwecke der Datenbearbeitung",
    blocks: [
      {
        type: "p",
        text: "Wir bearbeiten Personendaten insbesondere für folgende Zwecke:",
      },
      {
        type: "ul",
        items: [
          "Betrieb von weligo.ch,",
          "Erstellung und Verwaltung von Benutzerkonten,",
          "Darstellung von Dienstleisterprofilen,",
          "Suche und Vermittlung,",
          "Kommunikation zwischen Nutzern,",
          "Verwaltung von Anfragen und Buchungen,",
          "Zahlungsabwicklung, soweit angeboten,",
          "Nutzerverifizierung,",
          "Sicherheit und Betrugsprävention,",
          "Bearbeitung von Supportanfragen,",
          "Bearbeitung von Beschwerden und Konflikten,",
          "Verbesserung und Weiterentwicklung der Plattform,",
          "Analyse der Nutzung,",
          "Erfüllung gesetzlicher Pflichten,",
          "Durchsetzung unserer AGB und",
          "Schutz der Rechte von Weligo und seinen Nutzern.",
        ],
      },
    ],
  },
  {
    heading: "1. E-Mails und Benachrichtigungen",
    blocks: [
      {
        type: "p",
        text: "Weligo kann Nutzern transaktionsbezogene Nachrichten senden.",
      },
      { type: "p", text: "Dazu gehören beispielsweise:" },
      {
        type: "ul",
        items: [
          "Registrierungsbestätigungen,",
          "Sicherheitsmeldungen,",
          "Buchungsanfragen,",
          "Buchungsbestätigungen,",
          "Chat-Benachrichtigungen,",
          "Änderungen oder Stornierungen,",
          "Zahlungsinformationen und",
          "wichtige Änderungen der Plattform.",
        ],
      },
      {
        type: "p",
        text: "Solche Nachrichten können erforderlich sein, damit Weligo ordnungsgemäss funktioniert.",
      },
    ],
  },
  {
    heading: "1. Newsletter und Marketing",
    blocks: [
      {
        type: "p",
        text: "Soweit Weligo Newsletter oder andere elektronische Marketingkommunikation anbietet, erfolgt deren Versand entsprechend den anwendbaren gesetzlichen Anforderungen.",
      },
      {
        type: "p",
        text: "Nutzer können sich von Marketingkommunikation grundsätzlich jederzeit wieder abmelden.",
      },
      {
        type: "p",
        text: "Eine Abmeldung von Marketingnachrichten verhindert nicht den Versand notwendiger transaktions- oder sicherheitsbezogener Nachrichten.",
      },
    ],
  },
  {
    heading: "1. Cookies und ähnliche Technologien",
    blocks: [
      {
        type: "p",
        text: "Weligo kann Cookies und vergleichbare Technologien einsetzen.",
      },
      {
        type: "p",
        text: "Cookies sind kleine Dateien beziehungsweise Informationen, die beim Besuch einer Website auf dem Endgerät gespeichert oder ausgelesen werden können.",
      },
      { type: "p", text: "Wir können Cookies insbesondere einsetzen für:" },
      { type: "p", text: "Notwendige Funktionen" },
      { type: "p", text: "Beispielsweise:" },
      {
        type: "ul",
        items: [
          "Login,",
          "Sicherheit,",
          "Sitzungsverwaltung,",
          "Spracheinstellungen und",
          "technische Funktionen.",
        ],
      },
      { type: "p", text: "Analyse" },
      {
        type: "p",
        text: "Soweit entsprechende Dienste eingesetzt werden, können wir analysieren, wie unsere Plattform genutzt wird.",
      },
      { type: "p", text: "Marketing" },
      {
        type: "p",
        text: "Soweit entsprechende Marketing- oder Trackingtechnologien eingesetzt werden, können diese dazu dienen, Werbung zu messen oder relevanter auszuspielen.",
      },
      {
        type: "p",
        text: "Nicht notwendige Cookies beziehungsweise vergleichbare Technologien werden entsprechend den gesetzlichen Anforderungen eingesetzt.",
      },
      {
        type: "p",
        text: "Nutzer können ihre Cookie-Einstellungen über die auf der Website bereitgestellten Möglichkeiten beziehungsweise über ihren Browser verwalten.",
      },
      {
        type: "p",
        text: "[Hier müssen vor Veröffentlichung sämtliche tatsächlich eingesetzten Analytics-, Marketing- und Trackingdienste ergänzt werden.]",
      },
    ],
  },
  {
    heading: "1. Analyse- und Statistikdienste",
    blocks: [
      {
        type: "p",
        text: "Weligo kann Analysewerkzeuge einsetzen, um zu verstehen, wie die Plattform genutzt wird.",
      },
      { type: "p", text: "Dabei können beispielsweise:" },
      {
        type: "ul",
        items: [
          "Seitenaufrufe,",
          "Klicks,",
          "Gerätedaten,",
          "ungefähre Standortinformationen,",
          "Nutzungsdauer und",
          "technische Informationen",
        ],
      },
      { type: "p", text: "bearbeitet werden." },
      {
        type: "p",
        text: "[Google Analytics, Matomo, Meta Pixel oder andere tatsächlich eingesetzte Dienste hier konkret nennen. Nicht verwendete Dienste dürfen nicht vorsorglich aufgeführt werden.]",
      },
    ],
  },
  {
    heading: "1. Weitergabe von Personendaten",
    blocks: [
      {
        type: "p",
        text: "Weligo verkauft grundsätzlich keine Personendaten seiner Nutzer.",
      },
      {
        type: "p",
        text: "Personendaten können jedoch an Dritte weitergegeben werden, wenn dies für den Betrieb der Plattform erforderlich ist.",
      },
      { type: "p", text: "Zu diesen Empfängern können insbesondere gehören:" },
      {
        type: "ul",
        items: [
          "Hostinganbieter,",
          "Cloudanbieter,",
          "IT-Dienstleister,",
          "Kommunikationsdienstleister,",
          "Zahlungsdienstleister,",
          "Identitäts- beziehungsweise Verifizierungsdienstleister,",
          "Analyseanbieter,",
          "Supportanbieter,",
          "Rechts- und Beratungsdienstleister und",
          "Behörden, soweit eine gesetzliche Verpflichtung besteht.",
        ],
      },
      {
        type: "p",
        text: "Dienstleister erhalten grundsätzlich nur diejenigen Informationen, die sie zur Erfüllung ihrer jeweiligen Aufgabe benötigen.",
      },
    ],
  },
  {
    heading: "1. Weitergabe zwischen Nutzern",
    blocks: [
      {
        type: "p",
        text: "Da Weligo eine Vermittlungsplattform ist, müssen bestimmte Informationen zwischen Auftraggebenden und Dienstleistenden ausgetauscht werden.",
      },
      {
        type: "p",
        text: "Beispielsweise können Dienstleistende Informationen sehen wie:",
      },
      {
        type: "ul",
        items: [
          "Name beziehungsweise Profilname,",
          "ungefähre Region,",
          "Dienstleistungsanfrage,",
          "gewünschter Zeitraum und",
          "weitere vom Auftraggebenden freigegebene Informationen.",
        ],
      },
      {
        type: "p",
        text: "Auftraggebende können wiederum die für die Auswahl relevanten Profilinformationen der Dienstleistenden sehen.",
      },
      {
        type: "p",
        text: "Weligo versucht, die Offenlegung personenbezogener Informationen auf das für die jeweilige Funktion erforderliche Mass zu begrenzen.",
      },
    ],
  },
  {
    heading: "1. Datenbearbeitung im Ausland",
    blocks: [
      {
        type: "p",
        text: "Einzelne von Weligo eingesetzte Dienstleister können ihren Sitz oder ihre Server ausserhalb der Schweiz haben.",
      },
      {
        type: "p",
        text: "Dadurch können Personendaten auch ausserhalb der Schweiz bearbeitet werden.",
      },
      {
        type: "p",
        text: "Bei Bekanntgabe von Personendaten in Staaten ohne angemessenes Datenschutzniveau treffen wir die nach Schweizer Datenschutzrecht erforderlichen Massnahmen, beispielsweise durch anerkannte Standarddatenschutzklauseln, soweit keine gesetzliche Ausnahme zur Anwendung kommt.",
      },
      {
        type: "p",
        text: "Vor Veröffentlichung sind hier die tatsächlich betroffenen Staaten und gegebenenfalls verwendeten Garantien konkret anzugeben.",
      },
    ],
  },
  {
    heading: "1. Aufbewahrungsdauer",
    blocks: [
      {
        type: "p",
        text: "Weligo speichert Personendaten grundsätzlich nur so lange, wie dies:",
      },
      {
        type: "ul",
        items: [
          "für den jeweiligen Bearbeitungszweck erforderlich ist,",
          "für die Durchführung des Vertragsverhältnisses notwendig ist,",
          "aufgrund gesetzlicher Aufbewahrungspflichten erforderlich ist oder",
          "zur Wahrung berechtigter Interessen, beispielsweise zur Durchsetzung oder Abwehr von Ansprüchen, erforderlich ist.",
        ],
      },
      {
        type: "p",
        text: "Anschliessend werden die betreffenden Daten gelöscht oder anonymisiert, soweit keine gesetzlichen oder sachlichen Gründe für eine weitere Aufbewahrung bestehen.",
      },
      {
        type: "p",
        text: "Einzelne Datenkategorien können unterschiedlichen Aufbewahrungsfristen unterliegen.",
      },
    ],
  },
  {
    heading: "1. Löschung eines Benutzerkontos",
    blocks: [
      {
        type: "p",
        text: "Nutzer können die Löschung ihres Benutzerkontos nach den auf Weligo vorgesehenen Möglichkeiten beziehungsweise über:",
      },
      { type: "p", text: "info@weligo.ch" },
      { type: "p", text: "beantragen." },
      {
        type: "p",
        text: "Die Löschung des Kontos führt nicht zwingend zur sofortigen Löschung sämtlicher Daten.",
      },
      {
        type: "p",
        text: "Bestimmte Informationen können insbesondere weiterhin gespeichert werden, wenn gesetzliche Aufbewahrungspflichten bestehen oder sie zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich sind.",
      },
    ],
  },
  {
    heading: "1. Datensicherheit",
    blocks: [
      {
        type: "p",
        text: "Weligo trifft angemessene technische und organisatorische Massnahmen zum Schutz von Personendaten.",
      },
      { type: "p", text: "Diese sollen Personendaten insbesondere vor:" },
      {
        type: "ul",
        items: [
          "Verlust,",
          "unberechtigtem Zugriff,",
          "unberechtigter Veränderung,",
          "unberechtigter Offenlegung und",
          "Missbrauch",
        ],
      },
      { type: "p", text: "schützen." },
      {
        type: "p",
        text: "Kein digitales System kann jedoch absolute Sicherheit garantieren.",
      },
      {
        type: "p",
        text: "Nutzer sind ebenfalls dafür verantwortlich, ihre Zugangsdaten vertraulich zu behandeln und sichere Passwörter zu verwenden.",
      },
    ],
  },
  {
    heading: "1. Rechte der betroffenen Personen",
    blocks: [
      {
        type: "p",
        text: "Nach Massgabe des anwendbaren Datenschutzrechts können betroffene Personen insbesondere das Recht haben:",
      },
      {
        type: "ul",
        items: [
          "Auskunft über ihre bearbeiteten Personendaten zu verlangen,",
          "unrichtige Personendaten berichtigen zu lassen,",
          "die Löschung bestimmter Personendaten zu verlangen,",
          "die Herausgabe beziehungsweise Übertragung bestimmter Personendaten zu verlangen, soweit die gesetzlichen Voraussetzungen erfüllt sind,",
          "eine erteilte Einwilligung für zukünftige Bearbeitungen zu widerrufen und",
          "weitere gesetzlich vorgesehene Datenschutzrechte geltend zu machen.",
        ],
      },
      {
        type: "p",
        text: "Diese Rechte können gesetzlichen Voraussetzungen, Einschränkungen oder Ausnahmen unterliegen.",
      },
      { type: "p", text: "Anfragen können gerichtet werden an:" },
      { type: "p", text: "info@weligo.ch" },
      {
        type: "p",
        text: "Zur Verhinderung unberechtigter Datenzugriffe können wir einen geeigneten Identitätsnachweis verlangen.",
      },
    ],
  },
  {
    heading: "1. Minderjährige Nutzer",
    blocks: [
      {
        type: "p",
        text: "Weligo richtet sich grundsätzlich an volljährige Personen, soweit für einzelne Funktionen nichts anderes vorgesehen ist.",
      },
      {
        type: "p",
        text: "Minderjährige dürfen Weligo nur im Rahmen der gesetzlichen Voraussetzungen und gegebenenfalls mit Zustimmung beziehungsweise Beteiligung ihrer gesetzlichen Vertretung nutzen.",
      },
      {
        type: "p",
        text: "Informationen über Kinder, die im Rahmen einer Betreuungs- oder Nachhilfeanfrage verarbeitet werden, werden grundsätzlich durch die hierfür verantwortlichen Erwachsenen bereitgestellt.",
      },
    ],
  },
  {
    heading: "1. Automatisierte Entscheidungen und Profiling",
    blocks: [
      {
        type: "p",
        text: "Soweit Weligo zukünftig automatisierte Empfehlungssysteme, Matching-Verfahren oder Profiling einsetzt, können bestimmte Informationen verwendet werden, um beispielsweise passende Dienstleistende vorzuschlagen.",
      },
      {
        type: "p",
        text: "Soweit eine solche Bearbeitung datenschutzrechtlich besondere Informations- oder Einwilligungspflichten auslöst, werden die betroffenen Nutzer entsprechend informiert.",
      },
      {
        type: "p",
        text: "Weligo wird diese Datenschutzerklärung bei Einführung entsprechender Funktionen aktualisieren.",
      },
    ],
  },
  {
    heading: "1. Datenschutz bei Verifizierungs- und Sicherheitsprüfungen",
    blocks: [
      {
        type: "p",
        text: "Daten, die Weligo ausschliesslich zur Sicherheits- oder Identitätsprüfung erhält, werden grundsätzlich nicht ohne entsprechenden Zweck öffentlich gemacht.",
      },
      {
        type: "p",
        text: "Weligo achtet insbesondere bei Identitätsdokumenten, Strafregisterauszügen und vergleichbaren Informationen auf einen erhöhten Schutz.",
      },
      {
        type: "p",
        text: "Solche Daten sollen nur verarbeitet werden, soweit dies für den jeweiligen Zweck erforderlich und rechtlich zulässig ist.",
      },
    ],
  },
  {
    heading: "1. Änderungen dieser Datenschutzerklärung",
    blocks: [
      {
        type: "p",
        text: "Weligo kann diese Datenschutzerklärung anpassen, wenn:",
      },
      {
        type: "ul",
        items: [
          "sich gesetzliche Anforderungen ändern,",
          "neue Funktionen eingeführt werden,",
          "neue Dienstleister eingesetzt werden oder",
          "sich Art oder Zweck der Datenbearbeitung ändern.",
        ],
      },
      {
        type: "p",
        text: "Die jeweils aktuelle Version wird auf weligo.ch veröffentlicht.",
      },
      {
        type: "p",
        text: "Bei wesentlichen Änderungen können registrierte Nutzer zusätzlich informiert werden.",
      },
    ],
  },
  {
    heading: "1. Kontakt",
    blocks: [
      {
        type: "p",
        text: "Bei Fragen zur Bearbeitung Ihrer Personendaten oder zur Ausübung Ihrer Datenschutzrechte wenden Sie sich bitte an:",
      },
      {
        type: "p",
        text: "Weligo\nHuebwiesenstrasse 37\n8954 Geroldswil\nSchweiz",
      },
      { type: "p", text: "E-Mail: info@weligo.ch" },
      { type: "p", text: "Website: weligo.ch" },
    ],
  },
  {
    heading: "Kurzfassung unseres Datenschutzverständnisses",
    blocks: [
      {
        type: "p",
        text: "Weligo möchte nur diejenigen Personendaten bearbeiten, die für einen sicheren und funktionierenden Familien-Marktplatz tatsächlich benötigt werden.",
      },
      {
        type: "p",
        text: "Wir möchten transparent erklären, weshalb Daten benötigt werden, sie angemessen schützen und Nutzern Kontrolle über ihre Informationen ermöglichen.",
      },
      {
        type: "p",
        text: "Vertrauen ist für Weligo nicht nur Teil der Vermittlung – sondern auch Grundlage unseres Umgangs mit Personendaten.",
      },
    ],
  },
];

const renderBlock = (block: Block, idx: number) => {
  if (block.type === "p") {
    return (
      <p
        key={idx}
        className="mt-4 whitespace-pre-line text-base leading-relaxed text-[#313233]"
      >
        {block.text}
      </p>
    );
  }
  return (
    <ul
      key={idx}
      className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-[#313233]"
    >
      {block.items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
};

const Privacy = () => {
  const { t } = useI18n();
  return (
    <section className="bg-muted-bg">
      <div className="mx-auto max-w-4xl px-6 py-24 fade-up">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> {t("common.backHome")}
        </Link>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Datenschutzerklärung von Weligo.ch
        </h1>
        <p className="mt-4 text-sm font-medium text-[#313233]">
          Version 1.0
          <br />
          Stand: August 2026
        </p>

        <p className="mt-8 text-base leading-relaxed text-[#313233]">
          Der Schutz Ihrer persönlichen Daten ist Weligo wichtig.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#313233]">
          In dieser Datenschutzerklärung informieren wir Sie darüber, welche
          Personendaten wir bei der Nutzung von weligo.ch erheben und
          bearbeiten, zu welchen Zwecken dies geschieht, wem Daten
          gegebenenfalls bekanntgegeben werden und welche Rechte Ihnen im
          Zusammenhang mit Ihren Personendaten zustehen.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#313233]">
          Diese Datenschutzerklärung richtet sich insbesondere nach dem
          schweizerischen Bundesgesetz über den Datenschutz (DSG) und der
          Datenschutzverordnung (DSV).
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#313233]">
          Soweit im Einzelfall die Datenschutz-Grundverordnung der Europäischen
          Union (DSGVO) anwendbar ist, berücksichtigen wir zusätzlich deren
          Anforderungen.
        </p>

        <div className="mt-12 space-y-12">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-2xl font-bold tracking-tight">
                {section.heading}
              </h2>
              {section.blocks.map((block, j) => renderBlock(block, j))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Privacy;
