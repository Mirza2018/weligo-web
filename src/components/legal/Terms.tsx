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
    heading: "1. Geltungsbereich",
    blocks: [
      {
        type: "p",
        text: 'Diese Allgemeinen Geschäftsbedingungen („AGB") regeln die Nutzung der Plattform Weligo.ch („Weligo", „Plattform") durch registrierte und nicht registrierte Nutzerinnen und Nutzer.',
      },
      {
        type: "p",
        text: 'Weligo stellt eine digitale Plattform zur Verfügung, über welche insbesondere Familien, Privathaushalte und andere Auftraggebende („Auftraggebende") mit Personen oder Unternehmen zusammengebracht werden können, die Dienstleistungen anbieten („Dienstleistende").',
      },
      {
        type: "p",
        text: "Zu den über Weligo vermittelbaren Leistungen können insbesondere Kinderbetreuung, Babysitting, Nachhilfe, Haushaltshilfe, Reinigung, Tierbetreuung, Seniorenunterstützung sowie weitere alltagsbezogene Dienstleistungen gehören.",
      },
      {
        type: "p",
        text: "Mit der Registrierung beziehungsweise Nutzung von Weligo akzeptiert die Nutzerin oder der Nutzer diese AGB.",
      },
    ],
  },
  {
    heading: "2. Rolle von Weligo",
    blocks: [
      { type: "p", text: "2.1 Weligo ist Vermittlungsplattform" },
      {
        type: "p",
        text: "Weligo stellt die technische Infrastruktur zur Verfügung, über welche Auftraggebende und Dienstleistende miteinander in Kontakt treten können.",
      },
      { type: "p", text: "Weligo kann insbesondere Funktionen für:" },
      {
        type: "ul",
        items: [
          "Erstellung und Darstellung von Profilen,",
          "Suche nach Dienstleistenden,",
          "Kontaktaufnahme,",
          "Buchungsanfragen,",
          "Kommunikation,",
          "Bewertungen,",
          "Verifizierung,",
          "Terminorganisation und",
          "gegebenenfalls Zahlungsabwicklung",
        ],
      },
      { type: "p", text: "bereitstellen." },
      {
        type: "p",
        text: "2.2 Weligo ist grundsätzlich nicht Vertragspartei der vermittelten Dienstleistung",
      },
      {
        type: "p",
        text: "Soweit im konkreten Angebot nicht ausdrücklich etwas anderes angegeben wird, kommt der Vertrag über die jeweilige Dienstleistung direkt zwischen dem Auftraggebenden und dem Dienstleistenden zustande.",
      },
      { type: "p", text: "Weligo wird nicht Partei dieses Vertrags." },
      { type: "p", text: "Weligo ist insbesondere grundsätzlich nicht:" },
      {
        type: "ul",
        items: [
          "Arbeitgeber der Dienstleistenden,",
          "Arbeitnehmer des Auftraggebenden,",
          "Anbieter der vermittelten Dienstleistung,",
          "Personalverleiher,",
          "Vertreter einer Vertragspartei oder",
          "Garant für die Durchführung einer Dienstleistung.",
        ],
      },
      {
        type: "p",
        text: "Die Parteien sind selbst dafür verantwortlich, die Bedingungen ihres Vertrags festzulegen und die daraus entstehenden gesetzlichen Verpflichtungen einzuhalten.",
      },
      { type: "p", text: "2.3 Keine Weisungsbefugnis von Weligo" },
      {
        type: "p",
        text: "Soweit Weligo ausschliesslich als Vermittlungsplattform tätig ist, bestimmt Weligo grundsätzlich nicht, wie eine konkrete Dienstleistung ausgeführt wird.",
      },
      {
        type: "p",
        text: "Die konkrete Durchführung, Arbeitsweise, Terminierung und weitere Einzelheiten werden zwischen Auftraggebendem und Dienstleistendem vereinbart, soweit die Plattform keine zwingenden technischen Abläufe vorgibt.",
      },
    ],
  },
  {
    heading: "3. Vertrag zwischen Auftraggebenden und Dienstleistenden",
    blocks: [
      {
        type: "p",
        text: "Wird eine Dienstleistung über Weligo vereinbart, entsteht das zugrunde liegende Rechtsverhältnis grundsätzlich zwischen dem Auftraggebenden und dem Dienstleistenden.",
      },
      {
        type: "p",
        text: "Die Parteien sind selbst dafür verantwortlich zu prüfen, welche rechtliche Form dieses Verhältnis besitzt.",
      },
      {
        type: "p",
        text: "Abhängig von den tatsächlichen Umständen kann insbesondere:",
      },
      {
        type: "ul",
        items: [
          "ein Auftrag,",
          "ein Werkvertrag,",
          "ein Arbeitsvertrag oder",
          "ein anderes gesetzlich vorgesehenes Rechtsverhältnis",
        ],
      },
      { type: "p", text: "vorliegen." },
      {
        type: "p",
        text: "Die Bezeichnung eines Verhältnisses durch die Parteien oder durch die Plattform ist für dessen rechtliche Qualifikation nicht zwingend ausschlaggebend.",
      },
    ],
  },
  {
    heading: "4. Selbstständige und unselbstständige Erwerbstätigkeit",
    blocks: [
      {
        type: "p",
        text: "4.1 Keine automatische Selbstständigkeit durch Weligo",
      },
      {
        type: "p",
        text: "Die Registrierung als Dienstleistender auf Weligo führt nicht automatisch dazu, dass eine Person sozialversicherungs-, arbeits- oder steuerrechtlich als selbstständig erwerbend gilt.",
      },
      {
        type: "p",
        text: "Die rechtliche Einstufung richtet sich nach dem anwendbaren Schweizer Recht und den tatsächlichen Umständen des jeweiligen Einzelfalls.",
      },
      { type: "p", text: "4.2 Selbstständig Erwerbende" },
      {
        type: "p",
        text: "Dienstleistende, die rechtlich als selbstständig erwerbend gelten, sind grundsätzlich selbst dafür verantwortlich, die mit ihrer Tätigkeit verbundenen gesetzlichen Pflichten zu erfüllen.",
      },
      { type: "p", text: "Dazu können insbesondere gehören:" },
      {
        type: "ul",
        items: [
          "Anmeldung beziehungsweise Anerkennung bei der zuständigen AHV-Ausgleichskasse,",
          "Abrechnung und Bezahlung von AHV-, IV- und EO-Beiträgen,",
          "gegebenenfalls Mehrwertsteuerpflicht,",
          "Deklaration der erzielten Einkünfte gegenüber den Steuerbehörden,",
          "erforderliche Versicherungen,",
          "erforderliche Bewilligungen und",
          "weitere gesetzliche Melde- und Abrechnungspflichten.",
        ],
      },
      {
        type: "p",
        text: "Weligo übernimmt diese Pflichten nicht für selbstständig tätige Dienstleistende, sofern nicht ausdrücklich eine separate Dienstleistung angeboten und vereinbart wird.",
      },
      { type: "p", text: "4.3 Unselbstständige Erwerbstätigkeit" },
      {
        type: "p",
        text: "Liegt aufgrund der tatsächlichen Umstände ein Arbeitsverhältnis beziehungsweise eine unselbstständige Erwerbstätigkeit vor, gelten die gesetzlichen Pflichten des jeweiligen Arbeitgebers.",
      },
      {
        type: "p",
        text: "Dies kann insbesondere bei Dienstleistungen in Privathaushalten relevant sein.",
      },
      {
        type: "p",
        text: "Der Auftraggebende ist in einem solchen Fall dafür verantwortlich, die gesetzlichen Arbeitgeberpflichten zu prüfen und zu erfüllen.",
      },
      { type: "p", text: "Dazu können insbesondere gehören:" },
      {
        type: "ul",
        items: [
          "Anmeldung bei der zuständigen Ausgleichskasse,",
          "Abrechnung der Sozialversicherungsbeiträge,",
          "Unfallversicherung,",
          "Lohnabrechnung,",
          "Quellensteuer, soweit anwendbar,",
          "Einhaltung arbeitsrechtlicher Vorschriften sowie",
          "weitere gesetzliche Arbeitgeberpflichten.",
        ],
      },
      {
        type: "p",
        text: "Weligo übernimmt diese Arbeitgeberpflichten grundsätzlich nicht.",
      },
    ],
  },
  {
    heading: "5. Besondere Hinweise für Dienstleistungen in Privathaushalten",
    blocks: [
      { type: "p", text: "Bei Tätigkeiten wie beispielsweise:" },
      {
        type: "ul",
        items: [
          "Babysitting,",
          "Kinderbetreuung,",
          "Haushaltshilfe,",
          "Reinigung,",
          "Aufgabenhilfe,",
          "Betreuung älterer Personen oder",
          "vergleichbaren Tätigkeiten in Privathaushalten",
        ],
      },
      {
        type: "p",
        text: "können besondere sozialversicherungsrechtliche Bestimmungen gelten.",
      },
      {
        type: "p",
        text: "Auftraggebende und Dienstleistende sind verpflichtet, vor beziehungsweise im Zusammenhang mit der Durchführung einer Dienstleistung zu prüfen, welche gesetzlichen Melde-, Versicherungs- und Abrechnungspflichten bestehen.",
      },
      {
        type: "p",
        text: "Weligo kann hierzu allgemeine Informationen und Verweise auf zuständige Behörden bereitstellen. Solche Informationen stellen jedoch keine individuelle Rechts-, Steuer- oder Sozialversicherungsberatung dar.",
      },
    ],
  },
  {
    heading: "6. Steuern",
    blocks: [
      { type: "p", text: "6.1 Steuerpflicht der Dienstleistenden" },
      {
        type: "p",
        text: "Dienstleistende sind selbst dafür verantwortlich, die über Weligo erzielten Einkünfte ordnungsgemäss gegenüber den zuständigen Steuerbehörden zu deklarieren.",
      },
      {
        type: "p",
        text: "Einkünfte aus über Plattformen erbrachten Dienstleistungen können steuerbares Einkommen darstellen.",
      },
      {
        type: "p",
        text: "Dies gilt unabhängig davon, ob die Tätigkeit hauptberuflich, nebenberuflich, regelmässig oder nur gelegentlich ausgeübt wird, soweit das anwendbare Steuerrecht nichts anderes vorsieht.",
      },
      { type: "p", text: "6.2 Keine Steuerberatung durch Weligo" },
      {
        type: "p",
        text: "Weligo führt grundsätzlich keine Einkommenssteuern für Dienstleistende ab und übernimmt keine Verantwortung dafür, dass Nutzer ihre steuerlichen Verpflichtungen erfüllen.",
      },
      {
        type: "p",
        text: "Jede Nutzerin und jeder Nutzer ist selbst dafür verantwortlich, sich bei Unsicherheiten bei:",
      },
      {
        type: "ul",
        items: [
          "der zuständigen Steuerbehörde,",
          "einer Treuhandstelle oder",
          "einer anderen qualifizierten Fachperson",
        ],
      },
      { type: "p", text: "zu informieren." },
    ],
  },
  {
    heading: "7. Sozialversicherungen",
    blocks: [
      {
        type: "p",
        text: "Die Verantwortung für Sozialversicherungsbeiträge richtet sich nach der tatsächlichen rechtlichen Stellung der beteiligten Personen.",
      },
      {
        type: "p",
        text: "Bei selbstständig Erwerbenden liegt die Abrechnung grundsätzlich beim selbstständig Erwerbenden.",
      },
      {
        type: "p",
        text: "Bei einem Arbeitsverhältnis treffen die gesetzlichen Arbeitgeberpflichten grundsätzlich den Arbeitgeber.",
      },
      {
        type: "p",
        text: "Weligo übernimmt grundsätzlich weder Arbeitgeber- noch Arbeitnehmerbeiträge und führt solche Beiträge nicht im Namen der Parteien ab, sofern dies nicht ausdrücklich als separate Leistung angeboten wird.",
      },
      {
        type: "p",
        text: "Die Nutzer sind verpflichtet, ihren sozialversicherungsrechtlichen Status bei Bedarf mit der zuständigen Ausgleichskasse zu klären.",
      },
    ],
  },
  {
    heading: "8. Preise und Vergütung",
    blocks: [
      {
        type: "p",
        text: "Dienstleistende können ihre Preise innerhalb der von Weligo vorgesehenen technischen Möglichkeiten selbst festlegen, soweit Weligo für bestimmte Kategorien keine besonderen Regeln vorsieht.",
      },
      {
        type: "p",
        text: "Der vereinbarte Preis für eine Dienstleistung wird vor der Buchung beziehungsweise Beauftragung angezeigt oder zwischen den Parteien vereinbart.",
      },
      {
        type: "p",
        text: "Weligo kann für die Nutzung oder erfolgreiche Vermittlung eine:",
      },
      {
        type: "ul",
        items: [
          "Vermittlungsgebühr,",
          "Servicegebühr,",
          "Provision,",
          "Abonnementgebühr oder",
          "andere transparent ausgewiesene Plattformgebühr",
        ],
      },
      { type: "p", text: "erheben." },
      {
        type: "p",
        text: "Die jeweils geltenden Gebühren werden den Nutzern vor dem kostenpflichtigen Vorgang angezeigt.",
      },
    ],
  },
  {
    heading: "9. Zahlungen",
    blocks: [
      {
        type: "p",
        text: "Soweit Weligo Zahlungsfunktionen anbietet, kann die Zahlungsabwicklung über externe Zahlungsdienstleister erfolgen.",
      },
      {
        type: "p",
        text: "Weligo kann berechtigt sein, vereinbarte Plattformgebühren beziehungsweise Provisionen vor einer Auszahlung an den Dienstleistenden abzuziehen.",
      },
      {
        type: "p",
        text: "Die Nutzung eines Zahlungsdienstleisters kann zusätzlichen Bedingungen des jeweiligen Zahlungsdienstleisters unterliegen.",
      },
    ],
  },
  {
    heading: "10. Registrierung und Nutzerkonto",
    blocks: [
      {
        type: "p",
        text: "Nutzer müssen bei der Registrierung vollständige und wahrheitsgemässe Angaben machen.",
      },
      { type: "p", text: "Es ist insbesondere untersagt:" },
      {
        type: "ul",
        items: [
          "falsche Identitäten zu verwenden,",
          "sich als andere Person auszugeben,",
          "gefälschte Dokumente einzureichen,",
          "Qualifikationen vorzutäuschen oder",
          "bewusst falsche Angaben über Erfahrungen, Bewilligungen oder Fähigkeiten zu machen.",
        ],
      },
      {
        type: "p",
        text: "Nutzer sind für die Sicherheit ihrer Zugangsdaten verantwortlich.",
      },
    ],
  },
  {
    heading: "11. Verifizierung",
    blocks: [
      {
        type: "p",
        text: "Weligo kann bestimmte Nutzer oder Angaben überprüfen.",
      },
      {
        type: "p",
        text: "Eine Verifizierung kann beispielsweise die Prüfung von:",
      },
      {
        type: "ul",
        items: [
          "Identität,",
          "Telefonnummer,",
          "E-Mail-Adresse,",
          "Zertifikaten,",
          "Referenzen oder",
          "weiteren Dokumenten",
        ],
      },
      { type: "p", text: "umfassen." },
      {
        type: "p",
        text: "Eine erfolgreiche Verifizierung bedeutet jedoch nicht, dass Weligo die betreffende Person umfassend geprüft hat oder deren zukünftiges Verhalten garantiert.",
      },
      {
        type: "p",
        text: "Ein Verifizierungszeichen ist deshalb nicht als Garantie für Zuverlässigkeit, Qualität, Eignung oder Sicherheit zu verstehen.",
      },
    ],
  },
  {
    heading: "12. Verantwortung der Auftraggebenden",
    blocks: [
      {
        type: "p",
        text: "Auftraggebende sind insbesondere dafür verantwortlich:",
      },
      {
        type: "ul",
        items: [
          "geeignete Dienstleistende auszuwählen,",
          "relevante Informationen vollständig mitzuteilen,",
          "angemessene Rahmenbedingungen für die Tätigkeit bereitzustellen,",
          "vereinbarte Vergütungen zu bezahlen,",
          "gesetzliche Arbeitgeberpflichten zu erfüllen, sofern ein Arbeitsverhältnis besteht,",
          "notwendige Versicherungen und Meldungen zu prüfen und",
          "geltendes Recht einzuhalten.",
        ],
      },
      {
        type: "p",
        text: "Bei Dienstleistungen im Zusammenhang mit Kindern oder anderen besonders schutzbedürftigen Personen liegt es in der Verantwortung der Auftraggebenden, die Eignung des Dienstleistenden entsprechend den individuellen Anforderungen sorgfältig zu prüfen.",
      },
    ],
  },
  {
    heading: "13. Verantwortung der Dienstleistenden",
    blocks: [
      { type: "p", text: "Dienstleistende verpflichten sich:" },
      {
        type: "ul",
        items: [
          "wahrheitsgemässe Angaben zu machen,",
          "nur Leistungen anzubieten, für die sie ausreichend qualifiziert sind,",
          "vereinbarte Termine einzuhalten,",
          "Auftraggebende über relevante Umstände zu informieren,",
          "geltendes Recht einzuhalten,",
          "erforderliche Bewilligungen zu besitzen,",
          "ihre steuerlichen Verpflichtungen zu erfüllen und",
          "ihre sozialversicherungsrechtlichen Pflichten entsprechend ihrem tatsächlichen Status zu erfüllen.",
        ],
      },
    ],
  },
  {
    heading: "14. Bewertungen",
    blocks: [
      {
        type: "p",
        text: "Nach einer Dienstleistung können Nutzer die Möglichkeit erhalten, sich gegenseitig zu bewerten.",
      },
      { type: "p", text: "Bewertungen müssen:" },
      {
        type: "ul",
        items: [
          "wahrheitsgemäss,",
          "sachlich,",
          "auf eigener Erfahrung beruhend und",
          "respektvoll",
        ],
      },
      { type: "p", text: "sein." },
      { type: "p", text: "Unzulässig sind insbesondere:" },
      {
        type: "ul",
        items: [
          "erfundene Bewertungen,",
          "Beleidigungen,",
          "Drohungen,",
          "diskriminierende Inhalte,",
          "personenbezogene Daten Dritter und",
          "Bewertungen, die ausschliesslich der Rufschädigung dienen.",
        ],
      },
      {
        type: "p",
        text: "Weligo kann rechtswidrige oder offensichtlich missbräuchliche Bewertungen entfernen.",
      },
    ],
  },
  {
    heading: "15. Kommunikation über Weligo",
    blocks: [
      {
        type: "p",
        text: "Nutzer verpflichten sich, Kommunikationsfunktionen der Plattform nicht für rechtswidrige, betrügerische, belästigende oder anderweitig missbräuchliche Zwecke zu verwenden.",
      },
      {
        type: "p",
        text: "Weligo kann Konten bei schwerwiegenden oder wiederholten Verstössen einschränken oder sperren.",
      },
    ],
  },
  {
    heading: "16. Sicherheit",
    blocks: [
      {
        type: "p",
        text: "Weligo bemüht sich, eine vertrauenswürdige Plattform bereitzustellen.",
      },
      {
        type: "p",
        text: "Weligo kann jedoch nicht garantieren, dass jede registrierte Person jederzeit zuverlässig, geeignet oder ungefährlich ist.",
      },
      {
        type: "p",
        text: "Auftraggebende und Dienstleistende bleiben verpflichtet, bei persönlichen Treffen und Dienstleistungen angemessene Vorsicht walten zu lassen.",
      },
    ],
  },
  {
    heading: "17. Keine Erfolgsgarantie",
    blocks: [
      { type: "p", text: "Weligo garantiert nicht:" },
      {
        type: "ul",
        items: [
          "dass ein geeigneter Dienstleistender gefunden wird,",
          "dass eine Anfrage angenommen wird,",
          "dass eine bestimmte Anzahl von Aufträgen entsteht,",
          "dass ein bestimmtes Einkommen erzielt wird oder",
          "dass eine Dienstleistung zur vollständigen Zufriedenheit durchgeführt wird.",
        ],
      },
    ],
  },
  {
    heading: "18. Haftung",
    blocks: [
      {
        type: "p",
        text: "Weligo haftet im Rahmen der zwingenden gesetzlichen Bestimmungen für Schäden, die Weligo selbst zu vertreten hat.",
      },
      {
        type: "p",
        text: "Soweit gesetzlich zulässig, haftet Weligo insbesondere nicht für Schäden, die aus dem eigenständigen Vertrags- oder Dienstleistungsverhältnis zwischen Auftraggebenden und Dienstleistenden entstehen.",
      },
      { type: "p", text: "Dies betrifft insbesondere:" },
      {
        type: "ul",
        items: [
          "mangelhafte oder nicht erbrachte Dienstleistungen,",
          "Terminabsagen,",
          "persönliche Konflikte,",
          "Schäden an Gegenständen,",
          "ausstehende Zahlungen,",
          "unrichtige Nutzerangaben oder",
          "Verstösse eines Nutzers gegen gesetzliche Verpflichtungen.",
        ],
      },
      {
        type: "p",
        text: "Zwingende gesetzliche Haftungsbestimmungen bleiben vorbehalten.",
      },
    ],
  },
  {
    heading: "19. Umgehung der Plattform",
    blocks: [
      {
        type: "p",
        text: "Soweit Weligo für erfolgreiche Vermittlungen eine Provision oder Vermittlungsgebühr erhebt, dürfen Nutzer die Plattform nicht gezielt umgehen, um nach einer über Weligo hergestellten Kontaktaufnahme die vereinbarte Plattformgebühr zu vermeiden.",
      },
      {
        type: "p",
        text: "Einzelheiten können in den jeweils geltenden Gebührenbedingungen geregelt werden.",
      },
    ],
  },
  {
    heading: "20. Sperrung und Kündigung",
    blocks: [
      {
        type: "p",
        text: "Nutzer können ihr Konto nach den auf der Plattform vorgesehenen Möglichkeiten kündigen.",
      },
      { type: "p", text: "Weligo kann Nutzerkonten insbesondere bei:" },
      {
        type: "ul",
        items: [
          "Betrugsverdacht,",
          "falschen Angaben,",
          "Sicherheitsrisiken,",
          "Nichtzahlung,",
          "missbräuchlichem Verhalten,",
          "schweren oder wiederholten Verstössen gegen diese AGB oder",
          "gesetzlichen Verpflichtungen",
        ],
      },
      { type: "p", text: "vorübergehend einschränken oder dauerhaft sperren." },
    ],
  },
  {
    heading: "21. Datenschutz",
    blocks: [
      {
        type: "p",
        text: "Die Bearbeitung personenbezogener Daten richtet sich nach der separaten Datenschutzerklärung von Weligo.",
      },
      {
        type: "p",
        text: "Diese informiert insbesondere darüber, welche Daten erhoben werden, zu welchen Zwecken sie bearbeitet werden, an wen sie gegebenenfalls weitergegeben werden und welche Rechte betroffene Personen besitzen.",
      },
    ],
  },
  {
    heading: "22. Änderungen der Plattform",
    blocks: [
      { type: "p", text: "Weligo entwickelt seine Plattform laufend weiter." },
      {
        type: "p",
        text: "Funktionen können ergänzt, geändert oder eingestellt werden, soweit dies den Nutzern unter Berücksichtigung ihrer berechtigten Interessen zumutbar ist.",
      },
    ],
  },
  {
    heading: "23. Änderungen dieser AGB",
    blocks: [
      {
        type: "p",
        text: "Weligo kann diese AGB anpassen, wenn dies insbesondere aufgrund gesetzlicher Änderungen, neuer Funktionen oder Änderungen des Geschäftsmodells erforderlich ist.",
      },
      {
        type: "p",
        text: "Über wesentliche Änderungen werden registrierte Nutzer in angemessener Form informiert.",
      },
    ],
  },
  {
    heading: "24. Anwendbares Recht",
    blocks: [
      {
        type: "p",
        text: "Auf diese AGB und die Nutzung von Weligo findet grundsätzlich Schweizer Recht Anwendung.",
      },
      {
        type: "p",
        text: "Zwingende gesetzliche Bestimmungen, insbesondere zum Konsumentenschutz und zu zwingenden Gerichtsständen, bleiben vorbehalten.",
      },
    ],
  },
  {
    heading: "25. Schlussbestimmung",
    blocks: [
      {
        type: "p",
        text: "Sollte eine einzelne Bestimmung dieser AGB unwirksam oder nicht durchsetzbar sein, berührt dies die Wirksamkeit der übrigen Bestimmungen grundsätzlich nicht.",
      },
      { type: "p", text: "Weligo steht für eine einfache Idee:" },
      {
        type: "p",
        text: "Menschen zusammenzubringen, damit Familien Unterstützung finden und Dienstleistende ihre Fähigkeiten sinnvoll einsetzen können.",
      },
      { type: "p", text: "Die Plattform schafft die Verbindung." },
      {
        type: "p",
        text: "Die konkrete Zusammenarbeit entsteht zwischen den Menschen.",
      },
    ],
  },
];

const renderBlock = (block: Block, idx: number) => {
  if (block.type === "p") {
    return (
      <p key={idx} className="mt-4 text-base leading-relaxed text-[#313233]">
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

const Terms = () => {
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
          Allgemeine Geschäftsbedingungen (AGB) von Weligo.ch
        </h1>
        <p className="mt-4 text-sm font-medium text-[#313233]">
          Version: 1.0
          <br />
          Stand: August 2026
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

export default Terms;
