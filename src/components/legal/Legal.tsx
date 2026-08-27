import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "../../lib/i18n";

type Block = { type: "p"; text: string } | { type: "address"; text: string };

type SectionData = {
  heading: string;
  blocks: Block[];
};

const sections: SectionData[] = [
  {
    heading: "Anbieter und Betreiber der Plattform",
    blocks: [
      {
        type: "address",
        text: "Weligo\nHuebwiesenstrasse 37\n8954 Geroldswil\nSchweiz",
      },
      { type: "p", text: "Website: weligo.ch\nE-Mail: info@weligo.ch" },
    ],
  },
  {
    heading: "Vertretungsberechtigte Person",
    blocks: [{ type: "p", text: "Aykut Yildiz\nCEO und Inhaber" }],
  },
  {
    heading: "Verantwortlich für den Inhalt",
    blocks: [{ type: "p", text: "Aykut Yildiz\nCEO und Inhaber" }],
  },
  {
    heading: "Zweck der Plattform",
    blocks: [
      {
        type: "p",
        text: "Weligo betreibt eine digitale Vermittlungsplattform, über welche Familien, Privathaushalte und andere Auftraggebende mit Dienstleistenden in Kontakt treten können.",
      },
      {
        type: "p",
        text: "Weligo stellt hierfür insbesondere technische Funktionen zur Suche, Kontaktaufnahme, Kommunikation und Vermittlung zur Verfügung.",
      },
      {
        type: "p",
        text: "Soweit nicht ausdrücklich anders angegeben, erbringt Weligo die auf der Plattform angebotenen Dienstleistungen nicht selbst. Der jeweilige Vertrag über eine vermittelte Dienstleistung kommt grundsätzlich direkt zwischen dem Auftraggebenden und dem Dienstleistenden zustande.",
      },
      {
        type: "p",
        text: "Weitere Informationen zur Rolle von Weligo, zu den Rechten und Pflichten der Nutzer sowie zu vermittelten Dienstleistungen finden sich in den Allgemeinen Geschäftsbedingungen (AGB).",
      },
    ],
  },
  {
    heading: "Haftung für Inhalte",
    blocks: [
      {
        type: "p",
        text: "Weligo ist bemüht, die eigenen Inhalte auf der Plattform sorgfältig und aktuell zu halten. Eine Gewähr für die Vollständigkeit, Richtigkeit oder jederzeitige Aktualität sämtlicher Informationen kann jedoch, soweit gesetzlich zulässig, nicht übernommen werden.",
      },
      {
        type: "p",
        text: "Für Inhalte, Angaben, Angebote und sonstige Informationen, die von Nutzerinnen, Nutzern oder Dienstleistenden selbst veröffentlicht werden, sind grundsätzlich die jeweiligen Nutzer verantwortlich.",
      },
      {
        type: "p",
        text: "Zwingende gesetzliche Haftungsbestimmungen bleiben vorbehalten.",
      },
    ],
  },
  {
    heading: "Externe Links",
    blocks: [
      {
        type: "p",
        text: "Die Plattform kann Links zu externen Websites oder Diensten Dritter enthalten. Auf deren Inhalte und Verfügbarkeit hat Weligo grundsätzlich keinen Einfluss.",
      },
      {
        type: "p",
        text: "Für Inhalte externer Anbieter sind die jeweiligen Betreiber verantwortlich.",
      },
    ],
  },
  {
    heading: "Urheberrecht",
    blocks: [
      {
        type: "p",
        text: "Die von Weligo selbst erstellten Inhalte, Texte, Grafiken, Logos, Designs und sonstigen Werke auf dieser Website dürfen im Rahmen des anwendbaren Urheberrechts nicht ohne vorherige Zustimmung von Weligo vervielfältigt, bearbeitet, verbreitet oder anderweitig kommerziell verwendet werden.",
      },
      { type: "p", text: "Rechte Dritter bleiben vorbehalten." },
    ],
  },
  {
    heading: "Datenschutz",
    blocks: [
      {
        type: "p",
        text: "Informationen über die Bearbeitung personenbezogener Daten befinden sich in der separaten Datenschutzerklärung von Weligo.",
      },
    ],
  },
  {
    heading: "Kontakt",
    blocks: [
      { type: "p", text: "Bei Fragen zu Weligo oder zu diesem Impressum:" },
      { type: "p", text: "E-Mail: info@weligo.ch" },
    ],
  },
];

const renderBlock = (block: Block, idx: number) => (
  <p
    key={idx}
    className="mt-4 whitespace-pre-line text-base leading-relaxed text-[#313233]"
  >
    {block.text}
  </p>
);

const Legal = () => {
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
          Impressum
        </h1>

        <div className="mt-12 space-y-10">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-2xl font-bold tracking-tight">
                {section.heading}
              </h2>
              {section.blocks.map((block, j) => renderBlock(block, j))}
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm font-medium text-[#313233]">
          Stand: August 2026
        </p>
      </div>
    </section>
  );
};

export default Legal;
