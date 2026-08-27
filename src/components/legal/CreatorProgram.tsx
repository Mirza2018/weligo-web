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
    heading: "1. Veranstalter",
    blocks: [
      { type: "p", text: "Veranstalter des Weligo Creator Programms ist:" },
      { type: "p", text: "Weligo\nKontakt: info@weligo.ch" },
    ],
  },
  {
    heading: "2. Teilnahmezeitraum",
    blocks: [
      {
        type: "p",
        text: "Das Weligo Creator Programm findet fortlaufend in monatlichen Teilnahmeperioden statt.",
      },
      {
        type: "p",
        text: "Eine Teilnahmeperiode beginnt jeweils am 1. Kalendertag eines Monats um 00:00 Uhr und endet am letzten Kalendertag desselben Monats um 23:59 Uhr Schweizer Zeit.",
      },
      {
        type: "p",
        text: "Entscheidend ist das Datum, an dem das Video erstmals auf TikTok oder Instagram veröffentlicht wurde.",
      },
      { type: "p", text: "Beispiel:" },
      {
        type: "p",
        text: "Ein am 12. September veröffentlichtes Video kann bis zum 30. September die erforderlichen Views und Kommentare erreichen.",
      },
      {
        type: "p",
        text: "Werden die Voraussetzungen erst im Oktober erfüllt, nimmt das Video nicht mehr an der September-Challenge teil.",
      },
      {
        type: "p",
        text: "Ein Video kann nicht in einen späteren Teilnahmezeitraum übertragen werden.",
      },
    ],
  },
  {
    heading: "3. Voraussetzungen für den Gewinn",
    blocks: [
      {
        type: "p",
        text: "Um sich für den Gewinn zu qualifizieren, muss ein Video innerhalb desselben Teilnahmezeitraums:",
      },
      {
        type: "ul",
        items: [
          "mindestens 100'000 gültige organische Views erreichen,",
          "mindestens 100 Kommentare von anderen Nutzern erhalten,",
          "einen klaren und erkennbaren Bezug zu Weligo haben,",
          "auf TikTok und/oder Instagram veröffentlicht worden sein,",
          "den offiziellen Weligo-Account markieren und",
          "während der Teilnahme öffentlich zugänglich sein.",
        ],
      },
      {
        type: "p",
        text: "Eigene Kommentare des Creators werden für die erforderlichen 100 Kommentare nicht mitgezählt.",
      },
      {
        type: "p",
        text: "Mehrere Kommentare derselben Person sowie offensichtlich künstlich erzeugte, gekaufte oder automatisierte Kommentare können bei der Prüfung unberücksichtigt bleiben.",
      },
    ],
  },
  {
    heading: "4. Gewinn",
    blocks: [
      {
        type: "p",
        text: "Wer sämtliche Voraussetzungen erfolgreich erfüllt, kann einen Preis von:",
      },
      { type: "p", text: "CHF 1'000.–" },
      { type: "p", text: "gewinnen." },
      {
        type: "p",
        text: "Pro Kalendermonat werden maximal zwei Preise zu je CHF 1'000.– vergeben.",
      },
      { type: "p", text: "Das maximale monatliche Preisgeld beträgt somit:" },
      { type: "p", text: "CHF 2'000.–" },
      {
        type: "p",
        text: "Gewinnberechtigt sind grundsätzlich die ersten zwei qualifizierten Creator eines Monats, deren Videos sämtliche Teilnahmevoraussetzungen erfüllt haben und deren Teilnahme von Weligo erfolgreich überprüft wurde.",
      },
      {
        type: "p",
        text: "Sind die zwei monatlichen Gewinne bereits vergeben, besteht für weitere Videos im selben Monat kein Anspruch auf eine Auszahlung, auch wenn diese später ebenfalls 100'000 Views und 100 Kommentare erreichen.",
      },
    ],
  },
  {
    heading: "5. Maximal ein Gewinn pro Creator und Monat",
    blocks: [
      {
        type: "p",
        text: "Jeder Creator kann pro Kalendermonat höchstens einmal CHF 1'000.– gewinnen.",
      },
      { type: "p", text: "Ein Creator darf mehrere Videos veröffentlichen." },
      {
        type: "p",
        text: "Erreichen mehrere Videos desselben Creators die Voraussetzungen, entsteht daraus jedoch kein Anspruch auf mehrere Gewinne innerhalb desselben Monats.",
      },
      {
        type: "p",
        text: "Im folgenden Kalendermonat kann derselbe Creator erneut teilnehmen und erneut gewinnen.",
      },
    ],
  },
  {
    heading: "6. Ausschliesslich organische Reichweite",
    blocks: [
      {
        type: "p",
        text: "Für das Weligo Creator Programm zählt ausschliesslich organisch erzielte Reichweite und organisches Engagement.",
      },
      { type: "p", text: "Nicht zulässig sind insbesondere:" },
      {
        type: "ul",
        items: [
          "gekaufte Views,",
          "gekaufte Kommentare,",
          "gekaufte Likes oder Shares,",
          "Bots oder automatisierte Zugriffe,",
          "Engagement-Gruppen oder vergleichbare Manipulationsmethoden,",
          "bezahlte Werbung für das teilnehmende Video,",
          "TikTok Promote,",
          "Instagram Boost,",
          "Meta Ads,",
          "TikTok Ads oder",
          "sonstige bezahlte Massnahmen zur Steigerung der Reichweite oder des Engagements.",
        ],
      },
      {
        type: "p",
        text: "Die erforderlichen 100'000 Views und 100 Kommentare müssen organisch entstanden sein.",
      },
    ],
  },
  {
    heading: "7. Überprüfung durch Weligo",
    blocks: [
      {
        type: "p",
        text: "Vor einer Auszahlung überprüft Weligo die Teilnahme.",
      },
      {
        type: "p",
        text: "Creator können insbesondere aufgefordert werden, Nachweise aus den offiziellen TikTok- beziehungsweise Instagram-Statistiken bereitzustellen.",
      },
      { type: "p", text: "Weligo kann unter anderem überprüfen:" },
      {
        type: "ul",
        items: [
          "Anzahl der Views,",
          "Anzahl der Kommentare,",
          "Veröffentlichungsdatum und -zeit,",
          "Reichweitenquellen,",
          "Engagement,",
          "Einsatz von Werbemassnahmen,",
          "Herkunft beziehungsweise Auffälligkeiten der Reichweite und",
          "weitere für die Überprüfung erforderliche Statistikdaten.",
        ],
      },
      {
        type: "p",
        text: "Bei begründetem Verdacht auf Manipulation kann Weligo zusätzliche Nachweise verlangen.",
      },
      {
        type: "p",
        text: "Kann die organische Reichweite beziehungsweise das organische Engagement nicht ausreichend nachgewiesen werden, kann die Auszahlung abgelehnt werden.",
      },
    ],
  },
  {
    heading: "8. Bestimmung der ersten zwei Gewinner",
    blocks: [
      {
        type: "p",
        text: "Da pro Monat maximal zwei Gewinne vergeben werden, ist der Zeitpunkt entscheidend, an dem ein Creator sämtliche Gewinnvoraussetzungen erfüllt.",
      },
      { type: "p", text: "Ein Video muss somit sowohl:" },
      { type: "p", text: "100'000 organische Views" },
      { type: "p", text: "als auch" },
      { type: "p", text: "100 gültige Kommentare" },
      { type: "p", text: "erreicht haben." },
      {
        type: "p",
        text: "Weligo kann zur Feststellung der Reihenfolge geeignete Plattformstatistiken und andere nachvollziehbare Nachweise verlangen.",
      },
      {
        type: "p",
        text: "Die Auszahlung erfolgt erst nach erfolgreicher Überprüfung.",
      },
    ],
  },
  {
    heading: "9. Eigene Inhalte und Rechte Dritter",
    blocks: [
      {
        type: "p",
        text: "Teilnehmer dürfen grundsätzlich nur Inhalte verwenden, zu deren Verwendung und Veröffentlichung sie berechtigt sind.",
      },
      { type: "p", text: "Insbesondere müssen Rechte an:" },
      {
        type: "ul",
        items: [
          "Bildern,",
          "Videos,",
          "Musik,",
          "Grafiken,",
          "Marken und",
          "sonstigen geschützten Inhalten",
        ],
      },
      { type: "p", text: "beachtet werden." },
      {
        type: "p",
        text: "Werden andere Personen erkennbar dargestellt, ist der Teilnehmer selbst dafür verantwortlich, erforderliche Zustimmungen einzuholen.",
      },
    ],
  },
  {
    heading: "10. Unzulässige Inhalte",
    blocks: [
      {
        type: "p",
        text: "Nicht teilnahmeberechtigt sind insbesondere Inhalte, die:",
      },
      {
        type: "ul",
        items: [
          "rechtswidrig sind,",
          "beleidigend oder diskriminierend sind,",
          "Gewalt verherrlichen,",
          "Personen gezielt herabsetzen,",
          "falsche oder irreführende Aussagen über Weligo enthalten,",
          "Rechte Dritter verletzen oder",
          "dem Zweck des Creator Programms offensichtlich widersprechen.",
        ],
      },
    ],
  },
  {
    heading: "11. Kennzeichnung",
    blocks: [
      {
        type: "p",
        text: "Teilnehmer sind selbst dafür verantwortlich, die für ihren Beitrag geltenden gesetzlichen Kennzeichnungs- und Transparenzpflichten einzuhalten.",
      },
      {
        type: "p",
        text: "Soweit aufgrund der Teilnahme, einer Kooperation oder einer erhaltenen Gegenleistung eine Kennzeichnung erforderlich ist, muss diese ordnungsgemäss erfolgen.",
      },
    ],
  },
  {
    heading: "12. Manipulation und Ausschluss",
    blocks: [
      {
        type: "p",
        text: "Weligo kann Teilnehmer ausschliessen, wenn konkrete Anhaltspunkte bestehen für:",
      },
      {
        type: "ul",
        items: [
          "Manipulation,",
          "Betrug,",
          "gekaufte Reichweite,",
          "gekaufte oder manipulierte Kommentare,",
          "Bots,",
          "falsche Angaben oder",
          "sonstige Verstösse gegen diese Teilnahmebedingungen.",
        ],
      },
      {
        type: "p",
        text: "Bereits ausbezahlte Beträge können im Fall nachträglich nachgewiesener Manipulation im gesetzlich zulässigen Umfang zurückgefordert werden.",
      },
    ],
  },
  {
    heading: "13. TikTok und Instagram",
    blocks: [
      {
        type: "p",
        text: "Das Weligo Creator Programm wird ausschliesslich von Weligo veranstaltet.",
      },
      {
        type: "p",
        text: "TikTok, Instagram und Meta sind weder Veranstalter noch Sponsoren des Weligo Creator Programms.",
      },
      {
        type: "p",
        text: "Teilnehmer müssen zusätzlich die jeweils geltenden Regeln der verwendeten Plattform beachten.",
      },
    ],
  },
  {
    heading: "14. Auszahlung",
    blocks: [
      {
        type: "p",
        text: "Vor der Auszahlung kann Weligo die Identität sowie die für die Auszahlung erforderlichen Angaben des Gewinners überprüfen.",
      },
      {
        type: "p",
        text: "Gewinner sind selbst dafür verantwortlich, allfällige persönliche Steuer- oder Deklarationspflichten im Zusammenhang mit dem Preis zu prüfen.",
      },
    ],
  },
  {
    heading: "15. Änderungen und Beendigung",
    blocks: [
      {
        type: "p",
        text: "Weligo kann das Creator Programm für zukünftige Teilnahmeperioden ändern, pausieren oder beenden.",
      },
      {
        type: "p",
        text: "Für bereits laufende Teilnahmeperioden gelten grundsätzlich die zum Zeitpunkt des Beginns der jeweiligen Teilnahmeperiode veröffentlichten Bedingungen, soweit zwingendes Recht nichts anderes verlangt.",
      },
    ],
  },
  {
    heading: "16. Anwendbares Recht",
    blocks: [
      { type: "p", text: "Es gilt Schweizer Recht." },
      {
        type: "p",
        text: "Zwingende gesetzliche Bestimmungen und zwingende Gerichtsstände bleiben vorbehalten.",
      },
    ],
  },
  {
    heading: "Kurz zusammengefasst",
    blocks: [
      { type: "p", text: "100'000 organische Views" },
      { type: "p", text: "+ mindestens 100 gültige Kommentare" },
      { type: "p", text: "+ @Weligo markieren" },
      { type: "p", text: "+ alles innerhalb desselben Kalendermonats" },
      { type: "p", text: "= Chance auf CHF 1'000.–" },
      {
        type: "p",
        text: "Pro Creator ist maximal ein Gewinn pro Monat möglich.",
      },
      {
        type: "p",
        text: "Pro Monat gewinnen maximal die ersten zwei qualifizierten Creator.",
      },
      {
        type: "p",
        text: "Keine gekauften Views. Keine Ads. Keine Bots. Keine gekauften Kommentare. Nur organische Reichweite.",
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

const CreatorProgram = () => {
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
          Teilnahmebedingungen – Weligo Creator Programm
        </h1>
        <p className="mt-4 text-sm font-medium text-[#313233]">
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

export default CreatorProgram;
