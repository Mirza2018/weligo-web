

/** Centralised marketing copy for the 4 public pages — keeps i18n.tsx lean. */

import AllImages from "../../assets/AllImages";
import type { Lang } from "../../lib/i18n";

type L = { de: string; en: string };
const pick = (l: Lang, v: L) => v[l];

export const IMG = {
  familiesHero:
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80",
  motherBaby:
    "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=1200&q=80",
  missionHands:
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80",
  nextChapter:
    "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1600&q=80",
  search:
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
  browse:
    "https://images.unsplash.com/photo-1576765608535-5f04d1e3c289?auto=format&fit=crop&w=1200&q=80",
  videoCall:
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80",
  bookPay:
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
  review:
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
  familyDashboard:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
  provider1:
    "https://images.unsplash.com/photo-1576765608535-5f04d1e3c289?auto=format&fit=crop&w=1200&q=80",
  provider2:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
  provider3:
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
  provider4:
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
  provider5:
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
};

/* ====== FAMILIES ====== */
export function familiesContent(lang: Lang) {
  return {
    hero: {
      eyebrow: pick(lang, { de: "FAMILIEN", en: "FAMILIES" }),
      titleA: pick(lang, { de: "Pflege, die zu", en: "Care that fits" }),
      titleB: pick(lang, { de: "Ihrem Leben passt.", en: "your life." }),
      sub: pick(lang, {
        de: "Verifizierte Betreuer. Transparente Preise. In Minuten gebucht. Gemacht für Schweizer Familien, die keine Zeit zu verlieren haben.",
        en: "Verified caregivers. Transparent pricing. Booked in minutes. Built for Swiss families who don't have time to waste.",
      }),
    },
    why: {
      eyebrow: pick(lang, { de: "WARUM WELIGO", en: "WHY WELIGO" }),
      titleA: pick(lang, { de: "Gemacht für echtes", en: "Built for real" }),
      titleB: pick(lang, { de: "Schweizer Leben.", en: "Swiss life." }),
      items: [
        {
          title: pick(lang, {
            de: "Pflege sollte leicht zu finden sein, nicht zum Zweitjob werden",
            en: "Care should be easy to find, not a second job",
          }),
          body: pick(lang, {
            de: "Die meisten Schweizer Familien suchen wochenlang nach einer vertrauenswürdigen Betreuung. Wir haben Weligo so gebaut, dass die Suche Minuten dauert, nicht Wochen.",
            en: "Most Swiss families spend weeks searching for a trustworthy caregiver. We built Weligo so that search takes minutes, not weeks.",
          }),
        },
        {
          title: pick(lang, {
            de: "Vertrauen sollte nicht davon abhängen, wen Sie kennen",
            en: "Trust shouldn't depend on who you know",
          }),
          body: pick(lang, {
            de: "Mundpropaganda übersieht die Familien, die neu in einer Stadt, neu in der Schweiz sind oder einfach nicht die richtigen Verbindungen haben.",
            en: "Word of mouth leaves out the families who are new to a city, new to Switzerland, or simply don't have the right connections.",
          }),
        },
        {
          title: pick(lang, {
            de: "Jede Familie verdient den gleichen Zugang",
            en: "Every family deserves the same access",
          }),
          body: pick(lang, {
            de: "Ob in Zürich oder im Wallis, alleinerziehend oder mit zwei Einkommen — gute Betreuung sollte für alle gleich erreichbar sein.",
            en: "Whether you're in Zurich or Valais, a single parent or a two-income household, great care should be equally within reach.",
          }),
        },
        {
          title: pick(lang, {
            de: "Und jede Familie verdient es, sich sicher zu fühlen",
            en: "And every family deserves to feel safe",
          }),
          body: pick(lang, {
            de: "Sicher in dem, wen Sie zu sich nach Hause einladen. Sicher in der Art, wie Ihr Geld gehandhabt wird. Sicher zu wissen, dass Hilfe da ist, wenn etwas schief läuft.",
            en: "Safe in who you invite into their home. Safe in how your money is handled. Safe in knowing help is there if something goes wrong.",
          }),
        },
      ],
    },
    promise: {
      eyebrow: pick(lang, { de: "UNSER VERSPRECHEN", en: "OUR PROMISE" }),
      title: pick(lang, {
        de: "Worauf jede Weligo-Familie zählen kann.",
        en: "What every Weligo family can count on.",
      }),
      items: [
        {
          title: pick(lang, {
            de: "Jeder Anbieter wird verifiziert, bevor Sie sein Profil sehen.",
            en: "Every provider is verified before you see their profile.",
          }),
          body: pick(lang, {
            de: "Wir überprüfen manuell Identität, Strafregister, Erste-Hilfe-Zertifizierung und Referenzen. Kein Anbieter geht unverifiziert live.",
            en: "We manually check identity, criminal record, first aid certification and references. No provider goes live unverified.",
          }),
        },
        {
          title: pick(lang, {
            de: "Sie kennen den genauen Preis, bevor Sie buchen.",
            en: "You know the exact price before you book.",
          }),
          body: pick(lang, {
            de: "Stundensätze werden von Anbietern festgelegt und im Voraus angezeigt. Wir berechnen 5 % Servicegebühr. Nichts weiter.",
            en: "Hourly rates are set by providers and shown upfront. We add a flat 5% service fee. Nothing else.",
          }),
        },
        {
          title: pick(lang, {
            de: "Ihr Geld wird sicher gehalten, bis die Betreuung bestätigt ist.",
            en: "Your money is held safely until care is confirmed.",
          }),
          body: pick(lang, {
            de: "Sie zahlen auf der Plattform. Wir halten die Gelder, bis Ihre Buchung abgeschlossen ist. Keine Zahlung verlässt Weligo, bis beide Seiten bestätigen.",
            en: "You pay on the platform. We hold the funds until your booking is complete. No payment leaves Weligo until both sides confirm.",
          }),
        },
        {
          title: pick(lang, {
            de: "Stornieren bis 24 Stunden vorher, volle Rückerstattung.",
            en: "Cancel up to 24 hours before, for a full refund.",
          }),
          body: pick(lang, {
            de: "Das Leben ist unvorhersehbar. Unser 24-Stunden-Stornierungsfenster bedeutet, dass Sie nie Geld für einen Planwechsel verlieren.",
            en: "Life is unpredictable. Our 24-hour cancellation window means you never lose money to a change of plan.",
          }),
        },
        {
          title: pick(lang, {
            de: "Wenn etwas schief läuft, sind wir da.",
            en: "If something goes wrong, we're here.",
          }),
          body: pick(lang, {
            de: "Unser Schweizer Team bearbeitet jeden Streitfall direkt. Sie werden nicht zu einem Chatbot geschickt. Echte Menschen. Echte Lösungen.",
            en: "Our Swiss-based team handles every dispute directly. You won't be sent to a chatbot. Real people. Real resolution.",
          }),
        },
        {
          title: pick(lang, {
            de: "Ihre Daten sind privat. Wir verkaufen sie nicht.",
            en: "Your data is private. We don't sell it.",
          }),
          body: pick(lang, {
            de: "Wir sind FADP-konform und verkaufen niemals persönliche Daten an Werbetreibende, Dritte oder irgendjemand sonst.",
            en: "We're FADP-compliant and never sell personal data to advertisers, third parties or anyone else.",
          }),
        },
      ],
      quote: pick(lang, {
        de: "„Das ist kein Marketingtext. Das sind operative Verpflichtungen.“",
        en: "\"This is not marketing copy. These are operational commitments.\"",
      }),
      verifiedBy: pick(lang, {
        de: "Verifiziert von 12.458 Familien in der ganzen Schweiz.",
        en: "Verified by 12,458 families across Switzerland.",
      }),
    },
    pricing: {
      eyebrow: pick(lang, { de: "PREISE", en: "PRICING" }),
      titleA: pick(lang, { de: "Ehrliche", en: "Honest" }),
      titleB: pick(lang, { de: "Preise. Immer.", en: "pricing. Always." }),
      body: pick(lang, {
        de: "Unsere Anbieter legen ihre eigenen Stundensätze fest — ab CHF 22/h. Wir berechnen eine pauschale Servicegebühr von 5 % beim Checkout. Das war's. Keine Abonnements, keine Monatsgebühren, keine versteckten Aufschläge. Sie zahlen nur, wenn Sie buchen.",
        en: "Our providers set their own hourly rates — from CHF 22/hr. We add a flat 5% service fee at checkout. That's it. No subscriptions, no monthly fees, no hidden surcharges. You only pay when you book.",
      }),
      points: [
        pick(lang, {
          de: "Sätze vom Anbieter festgelegt — ab CHF 22/h",
          en: "Rates set by providers — from CHF 22/hr",
        }),
        pick(lang, {
          de: "Pauschale 5 % Servicegebühr — nichts weiter",
          en: "Flat 5% service fee — nothing else",
        }),
        pick(lang, {
          de: "Nur zahlen, wenn Sie buchen — kein Abo",
          en: "Pay only when you book — no subscription",
        }),
      ],
      howLink: pick(lang, {
        de: "So funktionieren Stornierungen und Rückerstattungen",
        en: "How cancellations and refunds work",
      }),
      example: {
        header: pick(lang, {
          de: "BEISPIEL: 2-STÜNDIGE STANDARD-KINDERBETREUUNG",
          en: "EXAMPLE: 2-HOUR STANDARD CHILDCARE SESSION",
        }),
        rate: pick(lang, { de: "CHF 26/h × 2", en: "CHF 26/hr × 2" }),
        fee: pick(lang, { de: "Servicegebühr (5%)", en: "Service fee (5%)" }),
        youPay: pick(lang, { de: "Sie zahlen", en: "You pay" }),
        note: pick(lang, {
          de: "Anbieter erhält CHF 44,20 nach Plattform-Provision.",
          en: "Provider receives CHF 44.20 after platform commission.",
        }),
        meta: pick(lang, {
          de: "Provision: 15% · Servicegebühr: 5% · 24h kostenlos stornieren",
          en: "Commission: 15% · Service fee: 5% · Cancel 24h free",
        }),
      },
    },
    checks: {
      eyebrow: pick(lang, { de: "SICHERHEIT & VERIFIZIERUNG", en: "SAFETY & VERIFICATION" }),
      titleA: pick(lang, { de: "Vier Prüfungen.", en: "Four checks." }),
      titleB: pick(lang, { de: "Keine Abkürzungen.", en: "No shortcuts." }),
      sub: pick(lang, {
        de: "Bevor ein Anbieter in Ihren Suchergebnissen erscheint, durchläuft er einen vierstufigen Verifizierungsprozess. Wir prüfen. Dann prüfen wir nochmal.",
        en: "Before any provider can appear in your search results, they complete a four-step verification process. We check. Then we check again.",
      }),
      items: [
        {
          title: pick(lang, { de: "Identitätsprüfung", en: "Identity check" }),
          body: pick(lang, {
            de: "Gültiger Schweizer Ausweis, Aufenthaltsbewilligung oder Pass — manuell von unserem Trust-Team innerhalb von 48 Stunden verifiziert.",
            en: "Valid Swiss ID, residence permit or passport — verified manually by our trust team within 48 hours.",
          }),
        },
        {
          title: pick(lang, { de: "Strafregisterprüfung", en: "Criminal record check" }),
          body: pick(lang, {
            de: "Strafregisterauszug erforderlich für alle Anbieter in Kinder- und Seniorenbetreuung. Alle 12 Monate erneuert.",
            en: "Strafregisterauszug required for all child-facing and senior care providers. Renewed every 12 months.",
          }),
        },
        {
          title: pick(lang, { de: "Erste-Hilfe-Zertifikat", en: "First aid certificate" }),
          body: pick(lang, {
            de: "Aktuelles Schweizer-Rotes-Kreuz-Erste-Hilfe-Zertifikat für alle Kinder- und Seniorenbetreuer. Ablaufdatum im Profil sichtbar.",
            en: "Current Swiss Red Cross first aid certification for all childcare and senior care providers. Expiry date shown on profile.",
          }),
        },
        {
          title: pick(lang, { de: "Referenzprüfung", en: "Reference check" }),
          body: pick(lang, {
            de: "Zwei berufliche oder persönliche Referenzen werden direkt von unserem Team kontaktiert. Alle Weligo-Bewertungen stammen nur aus verifizierten Buchungen.",
            en: "Two professional or character references contacted directly by our team. All Weligo reviews are verified bookings only.",
          }),
        },
      ],
      passRate: pick(lang, {
        de: "Nur 68 % der Bewerber bestehen unsere Verifizierung.",
        en: "Only 68% of applicants pass our verification.",
      }),
      passSub: pick(lang, {
        de: "Wir lehnen 32 % der Anbieterbewerbungen ab. Das ist der Standard.",
        en: "We reject 32% of provider applications. That's the standard.",
      }),
    },
    cta: {
      title: pick(lang, {
        de: "Ihre Familie verdient grossartige Betreuung.",
        en: "Your family deserves great care.",
      }),
      sub: pick(lang, {
        de: "Tausende Schweizer Familien haben ihren Betreuer auf Weligo gefunden. Ihre könnte die nächste sein.",
        en: "Thousands of Swiss families found their caregiver on Weligo. Yours could be next.",
      }),
      button: pick(lang, { de: "Betreuung für meine Familie finden", en: "Find Care for my family" }),
    },
  };
}

/* ====== PROVIDERS ====== */
export function providersContent(lang: Lang) {
  return {
    hero: {
      eyebrow: pick(lang, { de: "ANBIETER", en: "PROVIDERS" }),
      titleA: pick(lang, { de: "Verdienen Sie", en: "Earn" }),
      titleB: pick(lang, { de: "flexibel. Wirken Sie etwas.", en: "flexibly. Make a difference." }),
      sub: pick(lang, {
        de: "Legen Sie Ihre Sätze fest. Wählen Sie Ihre Stunden. Werden Sie wöchentlich per TWINT bezahlt. Bauen Sie eine Karriere in der Betreuung zu Ihren Bedingungen auf.",
        en: "Set your rates. Choose your hours. Get paid weekly via TWINT. Build a caregiving career on your own terms.",
      }),
      cta: pick(lang, { de: "Anbieter werden", en: "Become a Provider" }),
    },
    earnings: {
      eyebrow: pick(lang, { de: "EINNAHMEN", en: "EARNINGS" }),
      titleA: pick(lang, { de: "Sehen Sie, was Sie", en: "See what you could" }),
      titleB: pick(lang, { de: "verdienen könnten.", en: "earn." }),
      hoursPerWeek: pick(lang, { de: "Stunden pro Woche", en: "Hours per week" }),
      hourlyRate: pick(lang, { de: "Ihr Stundensatz", en: "Your hourly rate" }),
      bookingsPerWeek: pick(lang, { de: "Buchungen pro Woche", en: "Bookings per week" }),
      perMonth: pick(lang, { de: "/Mo", en: "/mo" }),
      estimated: pick(lang, {
        de: "Geschätzt basierend auf {hrs} Std/Woche × CHF {rate}/h × 50 Wochen",
        en: "Estimated based on {hrs} hrs/week × CHF {rate}/hr × 50 weeks",
      }),
      afterFee: pick(lang, {
        de: "Nach 15 % Plattformgebühr — Weligo übernimmt Steuern, Rechnungen und Auszahlungen.",
        en: "After 15% platform fee — Weligo handles taxes, invoicing, and payouts.",
      }),
      takeHome: pick(lang, { de: "Auszahlung (85%)", en: "Take-home (85%)" }),
      platformFee: pick(lang, { de: "Plattformgebühr (15%)", en: "Platform fee (15%)" }),
    },
    built: {
      eyebrow: pick(lang, { de: "WARUM WELIGO", en: "WHY WELIGO" }),
      titleA: pick(lang, { de: "Gebaut für", en: "Built for" }),
      titleB: pick(lang, { de: "Betreuer,", en: "caregivers," }),
      titleA2: pick(lang, { de: "seien Sie Ihr eigener Chef.", en: "be your own Boss." }),
      items: [
        {
          title: pick(lang, { de: "Legen Sie Ihre eigenen Sätze fest", en: "Set your own rates" }),
          body: pick(lang, {
            de: "Von CHF 22 bis CHF 60+ pro Stunde. Jederzeit anpassen, basierend auf Nachfrage und Ihrer Erfahrung.",
            en: "From CHF 22 to CHF 60+ per hour. Adjust anytime based on demand and your experience.",
          }),
        },
        {
          title: pick(lang, { de: "Wählen Sie Ihren eigenen Zeitplan", en: "Choose your own schedule" }),
          body: pick(lang, {
            de: "Blockieren Sie Abende, Wochenenden, Feiertage. Sie legen den Kalender fest — Kunden buchen Ihre freien Slots.",
            en: "Block out evenings, weekends, holidays. You set the calendar — clients book your free slots.",
          }),
        },
        {
          title: pick(lang, { de: "Wöchentlich per TWINT bezahlt", en: "Get paid weekly via TWINT" }),
          body: pick(lang, {
            de: "Bis Sonntag abgeschlossene Buchungen sind bis Dienstag auf Ihrem Konto. Keine Rechnungen, keine Verfolgung.",
            en: "Bookings completed Sunday → in your account by Tuesday. No invoicing, no chasing.",
          }),
        },
        {
          title: pick(lang, { de: "Echter Support, echte Menschen", en: "Real support, real humans" }),
          body: pick(lang, {
            de: "Schweizer Team an 7 Tagen die Woche erreichbar. Streitigkeiten, Fragen, alles — wir sind für Sie da.",
            en: "Swiss-based team available 7 days a week. Disputes, questions, anything — we've got you.",
          }),
        },
      ],
    },
    flow: {
      eyebrow: pick(lang, { de: "WIE ES FUNKTIONIERT", en: "HOW IT WORKS" }),
      titleA: pick(lang, { de: "Von der Anmeldung zur ersten", en: "From signup to first" }),
      titleB: pick(lang, { de: "Buchung in einer Woche.", en: "booking in a week." }),
      steps: [
        {
          title: pick(lang, { de: "Erstellen Sie Ihr Profil", en: "Create your profile" }),
          sub: pick(lang, { de: "10 Minuten", en: "10 Minutes" }),
        },
        {
          title: pick(lang, { de: "Verifiziert werden", en: "Get verified" }),
          sub: pick(lang, { de: "2-3 Werktage", en: "2-3 Business Days" }),
        },
        {
          title: pick(lang, { de: "Buchungsanfrage erhalten", en: "Receive booking request" }),
          sub: pick(lang, { de: "Normalerweise innerhalb 48 Stunden", en: "Usually Within 48 Hours" }),
        },
        {
          title: pick(lang, { de: "Wöchentlich bezahlt werden", en: "Get paid weekly" }),
          sub: pick(lang, { de: "TWINT oder Bank, Ihre Wahl", en: "TWINT Or Bank, Your Choice" }),
        },
      ],
    },
    compare: {
      eyebrow: pick(lang, { de: "WARUM NICHT EINFACH...", en: "WHY NOT JUST..." }),
      titleA: pick(lang, { de: "Wie Weligo", en: "How Weligo" }),
      titleB: pick(lang, { de: "abschneidet.", en: "compares." }),
      cols: [
        {
          name: pick(lang, { de: "Klassische Agentur", en: "Traditional agency" }),
          highlight: false,
          items: [
            pick(lang, {
              de: "Niedrigere Bezahlung (Agentur nimmt einen grossen Anteil)",
              en: "Lower pay (agency takes a large cut)",
            }),
            pick(lang, {
              de: "Strenger Zeitplan wird Ihnen auferlegt",
              en: "Rigid schedule imposed on you",
            }),
            pick(lang, {
              de: "Keine Autonomie über die Kunden, die Sie annehmen",
              en: "No autonomy over which clients you accept",
            }),
          ],
        },
        {
          name: pick(lang, { de: "Facebook / Mundpropaganda", en: "Facebook / Word of mouth" }),
          highlight: false,
          items: [
            pick(lang, { de: "Unzuverlässige Kundenbasis", en: "Unreliable client base" }),
            pick(lang, {
              de: "Sie kümmern sich selbst um Rechnungen und jagen Zahlungen hinterher",
              en: "You handle your own invoicing and chase late payments",
            }),
            pick(lang, {
              de: "Kein Schutz oder Support, wenn etwas schief läuft",
              en: "No protection or support if things go wrong",
            }),
          ],
        },
        {
          name: "Weligo",
          highlight: true,
          items: [
            pick(lang, { de: "Legen Sie Ihre eigenen Sätze fest", en: "Set your own rates" }),
            pick(lang, { de: "Wählen Sie Ihre eigenen Stunden", en: "Choose your own hours" }),
            pick(lang, { de: "Automatisch wöchentlich bezahlt", en: "Get paid automatically weekly" }),
            pick(lang, {
              de: "Voller Plattform-Support und Streitbeilegung",
              en: "Full platform support and dispute resolution",
            }),
          ],
        },
      ],
    },
    verify: {
      eyebrow: pick(lang, { de: "WARUM NICHT EINFACH...", en: "WHY NOT JUST..." }),
      titleA: pick(lang, { de: "Was Sie zur Verifizierung", en: "What you'll need to get" }),
      titleB: pick(lang, { de: "benötigen.", en: "verified." }),
      items: [
        {
          title: pick(lang, { de: "Gültiger Schweizer Ausweis", en: "Valid Swiss ID" }),
          body: pick(lang, {
            de: "Oder eine gültige Schweizer Aufenthaltsbewilligung.",
            en: "Or a valid Swiss residence permit.",
          }),
        },
        {
          title: pick(lang, { de: "Strafregister", en: "Criminal record" }),
          body: pick(lang, { de: "Aktueller Strafregisterauszug.", en: "Recent Strafregisterauszug." }),
        },
        {
          title: pick(lang, { de: "Erste-Hilfe-Zertifikat", en: "First aid certificate" }),
          body: pick(lang, {
            de: "Gültiges Zertifikat (für Kinderbetreuung).",
            en: "Valid certification (for child care).",
          }),
        },
        {
          title: pick(lang, { de: "Referenzen", en: "References" }),
          body: pick(lang, {
            de: "Charakter-Referenzen, die wir kontaktieren können.",
            en: "Character references we can contact.",
          }),
        },
      ],
    },
    cta: {
      title: pick(lang, { de: "Ihr nächstes Kapitel.", en: "Your next chapter." }),
      titleB: pick(lang, { de: "Beginnt hier.", en: "Starts here." }),
      button: pick(lang, { de: "Anbieter werden", en: "Become a provider" }),
    },
  };
}

/* ====== HOW IT WORKS ====== */
export function howItWorksContent(lang: Lang) {
  return {
    hero: {
      eyebrow: pick(lang, { de: "WIE ES FUNKTIONIERT", en: "HOW WELIGO" }),
      titleA: pick(lang, { de: "Einfach,", en: "Simple," }),
      titleB: pick(lang, {
        de: "von Anfang bis Ende.",
        en: "start to finish.",
      }),
      sub: pick(lang, {
        de: "Von Ihrer ersten Suche bis zu Ihrer Buchungsbestätigung — so funktioniert es für Familien und Anbieter.",
        en: "From your first search to your booking confirmation — here's how it works for families and providers.",
      }),
      tabFamilies: pick(lang, { de: "Für Familien", en: "For Families" }),
      tabProviders: pick(lang, { de: "Für Anbieter", en: "For Providers" }),
    },
    families: {
      eyebrow: pick(lang, { de: "FÜR FAMILIEN", en: "FOR FAMILIES" }),
      titleA: pick(lang, {
        de: "Vom Bedarf zur Buchung,",
        en: "From need to booking,",
      }),
      titleB: pick(lang, { de: "in Minuten.", en: "in minutes." }),
      steps: [
        {
          title: pick(lang, { de: "Suchen", en: "Search" }),
          body: pick(lang, {
            de: "Geben Sie Ihren Standort ein, wählen Sie eine Betreuungsart und legen Sie Ihren Zeitplan fest. Unsere intelligente Filterung hilft Ihnen, genau das zu finden, was Sie brauchen.",
            en: "Enter your location, choose a care type, and set your schedule. Our smart filters help you find exactly what you need.",
          }),
          points: [
            pick(lang, {
              de: "Nach Verfügbarkeit, Sprache und Erfahrung filtern",
              en: "Filter by availability, language, and experience",
            }),
            pick(lang, {
              de: "In Echtzeit nach Standorten suchen",
              en: "See real-time provider locations",
            }),
            pick(lang, {
              de: "Sätze, Bewertungen und Profile vergleichen",
              en: "Compare rates, reviews and profiles",
            }),
          ],
          img: AllImages.w1,
        },
        {
          title: pick(lang, {
            de: "Verifizierte Profile durchsuchen",
            en: "Browse verified profiles",
          }),
          body: pick(lang, {
            de: "Jeder Anbieter auf Weligo wurde manuell verifiziert. Lesen Sie Bewertungen, prüfen Sie Zertifikate und finden Sie Ihre Übereinstimmung.",
            en: "Every provider on Weligo has been manually verified. Read reviews, check certifications, and find your match.",
          }),
          points: [
            pick(lang, {
              de: "Identität und Hintergrund verifiziert",
              en: "Identity and background verified",
            }),
            pick(lang, {
              de: "Echte Bewertungen aus abgeschlossenen Buchungen",
              en: "Real reviews from completed bookings",
            }),
            pick(lang, {
              de: "Sehen Sie die Verfügbarkeit live und Zertifikate",
              en: "See live availability and certifications",
            }),
          ],
          img: AllImages.w2,
        },
        {
          title: pick(lang, {
            de: "Nachricht oder Video-Anruf",
            en: "Message or video-call",
          }),
          body: pick(lang, {
            de: "Sprechen Sie zuerst. Stellen Sie Fragen. Treffen Sie sich virtuell, bevor Sie Ihre Buchung bestätigen.",
            en: "Talk first. Ask questions. Meet virtually before you confirm your booking.",
          }),
          points: [
            pick(lang, {
              de: "Sicheres In-App-Messaging",
              en: "Secure in-app messaging",
            }),
            pick(lang, {
              de: "Kostenlose Videoanrufe",
              en: "Free video calls",
            }),
            pick(lang, {
              de: "Antworten in der Regel innerhalb 1 Stunde",
              en: "Replies usually within 1 hour",
            }),
          ],
          img: AllImages.w3,
        },
        {
          title: pick(lang, { de: "Buchen und bezahlen", en: "Book and pay" }),
          body: pick(lang, {
            de: "Bestätigen Sie Ihre Buchung in wenigen Klicks. Zahlen Sie sicher per TWINT oder Karte — Ihr Geld wird gehalten, bis die Betreuung abgeschlossen ist.",
            en: "Confirm your booking in a few taps. Pay securely via TWINT or card — your money is held safely until care is complete.",
          }),
          points: [
            pick(lang, {
              de: "TWINT und Kartenzahlungen",
              en: "TWINT and card payments",
            }),
            pick(lang, {
              de: "Daten reservieren und Buchungen verwalten",
              en: "Reserve dates and manage bookings",
            }),
            pick(lang, {
              de: "Volle Rückerstattung bei Stornierung innerhalb 24 Stunden",
              en: "Full refund on cancellation within 24h",
            }),
          ],
          img: AllImages.w4,
        },
        {
          title: pick(lang, {
            de: "Bewerten und erneut buchen",
            en: "Review & rebook",
          }),
          body: pick(lang, {
            de: "Nach jeder Buchung hinterlassen Sie eine Bewertung, um Ihrem Anbieter zu helfen. Speichern Sie Ihre Lieblingsanbieter für eine einfache erneute Buchung.",
            en: "After each booking, leave a review to help your provider. Save your favourite providers for easy re-booking.",
          }),
          points: [
            pick(lang, {
              de: "Bewertungen aus verifizierten Buchungen",
              en: "Reviews from verified bookings",
            }),
            pick(lang, {
              de: "1-Klick-Wiederbuchung",
              en: "1-click rebooking",
            }),
            pick(lang, {
              de: "Bauen Sie Ihr vertrautes Anbieter-Netzwerk auf",
              en: "Build your trusted provider network",
            }),
          ],
          img: AllImages.w5,
        },
        {
          title: pick(lang, {
            de: "Familien-Dashboard",
            en: "Family Dashboard",
          }),
          body: pick(lang, {
            de: "Alle Ihre Buchungen, in einer Ansicht. Beschreibung. Sehen Sie kommende, abgeschlossene und stornierte Buchungen. Buchen Sie erneut oder stornieren Sie in wenigen Taps.",
            en: "All your bookings, in one view. Description. See upcoming, completed and cancelled bookings. Re-book or cancel in two taps.",
          }),
          points: [
            pick(lang, {
              de: "Alle Ihre Buchungen, in einer Ansicht",
              en: "All your bookings, in one view",
            }),
            pick(lang, {
              de: "Nachrichten an Anbieter verwalten",
              en: "Manage your messages with providers",
            }),
            pick(lang, {
              de: "Alle Zahlungen und Quittungen",
              en: "All payments and receipts",
            }),
          ],
          img: AllImages.w5,
        },
      ],
    },
    providers: {
      eyebrow: pick(lang, { de: "FÜR ANBIETER", en: "FOR PROVIDERS" }),
      titleA: pick(lang, {
        de: "Von der Anmeldung zum Verdienen,",
        en: "From signup to earning,",
      }),
      titleB: pick(lang, { de: "in einer Woche.", en: "in a week." }),
      steps: [
        {
          title: pick(lang, {
            de: "Erstellen Sie Ihr Profil",
            en: "Create your profile",
          }),
          body: pick(lang, {
            de: "Bauen Sie Ihr professionelles Profil in weniger als 30 Minuten auf. Fügen Sie Erfahrung, Zertifikate und Ihren Stundensatz hinzu.",
            en: "Build a professional profile in less than 30 minutes. Add experience, certifications and your hourly rate.",
          }),
          points: [
            pick(lang, {
              de: "Fügen Sie ein Foto und eine Bio hinzu",
              en: "Add a photo and a bio",
            }),
            pick(lang, {
              de: "Legen Sie Ihre Sätze fest (CHF 22-60+)",
              en: "Set your own rates (CHF 22–60+)",
            }),
            pick(lang, {
              de: "Laden Sie Sprachen und Zertifikate hoch",
              en: "Upload languages and certificates",
            }),
          ],
          img: AllImages.w6,
        },
        {
          title: pick(lang, { de: "Verifiziert werden", en: "Get verified" }),
          body: pick(lang, {
            de: "Unser Team prüft Ihre Dokumente und kontaktiert Ihre Referenzen. Die meisten Anbieter werden in weniger als 2 Werktagen verifiziert.",
            en: "Our team reviews your documents and contacts your references. Most providers are verified in less than 2 business days.",
          }),
          points: [
            pick(lang, { de: "Ausweis-Verifizierung", en: "ID verification" }),
            pick(lang, {
              de: "Hintergrundprüfung — Strafregisterauszug",
              en: "Background check — Strafregisterauszug",
            }),
            pick(lang, { de: "Referenzprüfungen", en: "Reference checks" }),
          ],
          img: AllImages.w6,
        },
        {
          title: pick(lang, {
            de: "Buchungsanfragen erhalten",
            en: "Receive booking requests",
          }),
          body: pick(lang, {
            de: "Sobald verifiziert, können Sie Familien finden und buchen. Sie kontrollieren Ihren Kalender — akzeptieren oder lehnen Sie Anfragen zu Ihren Bedingungen ab.",
            en: "Once verified, families can find and book you. You control your calendar — accept or decline requests on your terms.",
          }),
          points: [
            pick(lang, {
              de: "Anfragen in Echtzeit",
              en: "Real-time request alerts",
            }),
            pick(lang, {
              de: "Legen Sie Ihre eigenen Akzeptanzrichtlinien fest",
              en: "Set your own acceptance policies",
            }),
            pick(lang, {
              de: "Verwalten Sie alles in Ihrer App",
              en: "Manage everything in one app",
            }),
          ],
          img: AllImages.w6,
        },
        {
          title: pick(lang, {
            de: "Bieten Sie grossartige Betreuung",
            en: "Provide great care",
          }),
          body: pick(lang, {
            de: "Zeigen Sie sich, machen Sie einen tollen Job, aktualisieren Sie die App und bauen Sie Ihren Ruf auf.",
            en: "Show up, do a great job, update the app log, and build your reputation.",
          }),
          points: [
            pick(lang, {
              de: "Sichere In-App-Nachrichten an Familien",
              en: "Secure in-app messages to families",
            }),
            pick(lang, {
              de: "Foto-Updates und Bewertungen",
              en: "Photo updates and ratings",
            }),
            pick(lang, {
              de: "Bauen Sie Ihre Bewertungen auf",
              en: "Build up your reviews",
            }),
          ],
          img: AllImages.w6,
        },
        {
          title: pick(lang, {
            de: "Wöchentlich bezahlt werden",
            en: "Get paid weekly",
          }),
          body: pick(lang, {
            de: "Abgeschlossene Buchungen werden jeden Dienstag per TWINT auf Ihre Bank überwiesen. Keine Rechnungen, keine Verzögerungen.",
            en: "Completed bookings are paid out every Tuesday via TWINT or bank transfer. No invoicing, no chasing payments.",
          }),
          points: [
            pick(lang, {
              de: "Wöchentliche Auszahlungen per TWINT oder Bank",
              en: "Weekly payouts via TWINT or bank",
            }),
            pick(lang, {
              de: "Klare Einnahmenübersicht",
              en: "Clear earnings overview",
            }),
            pick(lang, {
              de: "Weligo übernimmt Steuern und Papierkram",
              en: "Weligo handles taxes and paperwork",
            }),
          ],
          img: AllImages.w6,
        },
        {
          title: pick(lang, {
            de: "Anbieter-Dashboard",
            en: "Provider Dashboard",
          }),
          body: pick(lang, {
            de: "Ihre Einnahmen auf einen Blick. Beschreibung. Sehen Sie monatliche Einnahmen, abgeschlossene Buchungen und Ihre Bewertung — alles auf einem Bildschirm.",
            en: "Your earnings at a glance. Description. See monthly earnings, completed bookings and your rating — all on one screen.",
          }),
          points: [
            pick(lang, {
              de: "Ihre Einnahmen auf einen Blick",
              en: "Your earnings at a glance",
            }),
            pick(lang, {
              de: "Verwalten Sie Ihren Kalender",
              en: "Manage your calendar",
            }),
            pick(lang, {
              de: "Ihre Bewertungen anzeigen",
              en: "View your reviews",
            }),
          ],
          img: AllImages.w6,
        },
      ],
    },
  };
}

/* ====== ABOUT ====== */
export function aboutContent(lang: Lang) {
  return {
    hero: {
      eyebrow: pick(lang, { de: "ÜBER WELIGO", en: "ABOUT WELIGO" }),
      titleA: pick(lang, { de: "Pflege sollte sich", en: "Care should feel" }),
      titleB: pick(lang, { de: "so gut anfühlen wie sie ist.", en: "as good as care feels." }),
      sub: pick(lang, {
        de: "Wir haben Weligo gebaut, weil vertrauensvolle Betreuung in der Schweiz nicht Tage voller Anrufe und Mundpropaganda kosten sollte. Es sollte sich anfühlen wie das Öffnen einer App.",
        en: "We built Weligo because finding trusted care in Switzerland shouldn't take days of phone calls and word-of-mouth. It should feel like opening an app.",
      }),
    },
    story: {
      eyebrow: pick(lang, { de: "UNSERE GESCHICHTE", en: "OUR STORY" }),
      titleA: pick(lang, { de: "Gegründet in Zürich, gebaut für", en: "Founded in Zürich, built for" }),
      titleB: pick(lang, { de: "die Schweiz.", en: "Switzerland." }),
      paragraphs: [
        pick(lang, {
          de: "Als meine Mutter 2023 nach ihrer Hüftoperation Pflege brauchte, verbrachten wir zwei Wochen mit Telefonaten. Bis wir jemanden fanden, hatte sie das Krankenhaus bereits verlassen. Wir wussten, dass es einen besseren Weg geben musste.",
          en: "When my mother needed care after her hip surgery in 2023, we spent two weeks making calls. By the time we found someone, she'd already left the hospital. We knew there had to be a better way.",
        }),
        pick(lang, {
          de: "Anna und ich hatten jahrelang Software zusammen gebaut, aber das war anders. Hier ging es nicht darum, eine Branche zu disruptieren oder einen Markt zu erobern. Es ging um unsere eigenen Familien — und jede Familie wie unsere.",
          en: "Anna and I had been building software together for years, but this was different. This wasn't about disrupting an industry or capturing a market. This was about our own families — and every family like ours.",
        }),
      ],
      quote: pick(lang, {
        de: "„Wir wussten, dass es einen besseren Weg geben musste.“",
        en: "\"We knew there had to be a better way.\"",
      }),
      paragraphs2: [
        pick(lang, {
          de: "Wir fingen klein an — nur Zürich, nur Kinderbetreuung, eine Handvoll verifizierter Anbieter. Aber jede Familie, der wir halfen, erzählte es zwei weiteren. Jeder Betreuer, der dazukam, empfahl eine Kollegin. Innerhalb von sechs Monaten waren wir in Bern und Basel. Innerhalb eines Jahres in der ganzen Deutschschweiz.",
          en: "We started small — just Zürich, just childcare, just a handful of verified providers. But every family we helped told two more. Every caregiver who joined recommended a colleague. Within six months, we had expanded to Bern and Basel. Within a year, all of German-speaking Switzerland.",
        }),
        pick(lang, {
          de: "Heute verbindet Weligo monatlich Tausende Schweizer Familien mit verifizierten, vertrauensvollen Betreuern. Aber wir genehmigen immer noch jedes Profil manuell. Wir rufen immer noch jede Referenz an. Wir behandeln Vertrauen immer noch als das einzige Feature, das wirklich zählt.",
          en: "Today, Weligo connects thousands of Swiss families with verified, trusted caregivers every month. But we still approve every profile manually. We still call every reference. We still treat trust as the only feature that really matters.",
        }),
        pick(lang, {
          de: "Weil Pflege keine Ware ist. Es ist das, was alles andere möglich macht.",
          en: "Because care isn't a commodity. It's the thing that makes everything else possible.",
        }),
      ],
    },
    values: {
      eyebrow: pick(lang, { de: "WERTE", en: "VALUES" }),
      titleA: pick(lang, { de: "Was wir", en: "What we" }),
      titleB: pick(lang, { de: "glauben.", en: "believe." }),
      items: [
        {
          title: pick(lang, { de: "Vertrauen wird verdient", en: "Trust is earned" }),
          body: pick(lang, {
            de: "Wir verifizieren manuell jedes Profil. Keine Abkürzungen, keine automatischen Genehmigungen. Vertrauen ist das einzige Feature, das in der Pflege zählt.",
            en: "We manually verify every profile. No shortcuts, no automated approvals. Trust is the only feature that matters in caregiving.",
          }),
        },
        {
          title: pick(lang, { de: "Pflege ist Handwerk", en: "Care is a craft" }),
          body: pick(lang, {
            de: "Betreuer sind keine Gig-Worker. Sie sind Profis mit Können, Intuition und Herz. Wir behandeln sie entsprechend.",
            en: "Caregivers aren't gig workers. They're professionals with skill, intuition, and heart. We treat them accordingly.",
          }),
        },
        {
          title: pick(lang, { de: "Einfach ist menschlich", en: "Simple is humane" }),
          body: pick(lang, {
            de: "Komplexität ist eine Steuer auf gestresste Eltern und müde Familien. Jedes Feature, das wir veröffentlichen, macht Pflege leichter zu finden, nicht schwerer.",
            en: "Complexity is a tax on stressed parents and tired families. Every feature we ship makes care easier to find, not harder.",
          }),
        },
        {
          title: pick(lang, { de: "Gebaut, wo es genutzt wird", en: "Built where it's used" }),
          body: pick(lang, {
            de: "Wir sind Schweizer. Unser Team lebt hier, erzieht hier Kinder, kümmert sich hier um Eltern. Wir bauen, was wir für unsere eigenen Familien wollten.",
            en: "We're Swiss. Our team lives here, raises children here, looks after parents here. We build what we'd want for our own families.",
          }),
        },
      ],
    },
    mission: {
      titleA: pick(lang, { de: "Unsere Mission:", en: "Our mission:" }),
      titleB: pick(lang, { de: "Pflege für alle.", en: "care, for everyone." }),
      sub: pick(lang, {
        de: "Wir bauen das vertrauenswürdigste Zuhause der Schweiz für Pflege — einen verifizierten Anbieter nach dem anderen.",
        en: "Building Switzerland's most trusted home for caregiving — one verified provider at a time.",
      }),
    },
  };
}
