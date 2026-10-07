

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
      titleA: pick(lang, {
        de: "Unterstützung, die zu",
        en: "Support That Fits",
      }),
      titleB: pick(lang, {
        de: "Ihrem Alltag passt.",
        en: "Your Everyday Life.",
      }),
      sub: pick(lang, {
        de: "Vertrauenswürdige Dienstleister entdecken, vergleichen und direkt buchen - einfach und übersichtlich mit Weligo.",
        en: "Discover, compare, and book trusted service providers - simply and conveniently with Weligo.",
      }),
    },
    why: {
      eyebrow: pick(lang, { de: "WARUM WELIGO", en: "WHY WELIGO" }),
      titleA: pick(lang, { de: "Gemacht für den", en: "Built for Real" }),
      titleB: pick(lang, { de: "echten Alltag.", en: "Everyday Life." }),
      items: [
        {
          title: pick(lang, {
            de: "Die richtige Unterstützung zu finden, sollte einfach sein.",
            en: "Finding the right support should be simple.",
          }),
          body: pick(lang, {
            de: "Ob Kinderbetreuung, Nachhilfe, Haushaltshilfe, Seniorenunterstützung oder Tierbetreuung - Weligo bringt verschiedene Dienstleistungen an einem Ort zusammen. So finden Sie einfacher die Unterstützung, die zu Ihnen und Ihrem Alltag passt.",
            en: "Whether you need childcare, tutoring, household help, senior support, or pet care, Weligo brings different everyday services together in one place - making it easier to find support that fits your needs and your life.",
          }),
        },
        {
          title: pick(lang, {
            de: "Vertrauen beginnt mit Transparenz.",
            en: "Trust starts with transparency.",
          }),
          body: pick(lang, {
            de: "Bevor Sie sich entscheiden, können Sie Profile, Erfahrungen, Bewertungen, Preise, Verfügbarkeiten und vorhandene Verifizierungen einsehen. So haben Sie mehr Informationen, um selbst die richtige Wahl zu treffen.",
            en: "Before making a decision, you can explore profiles, experience, reviews, prices, availability, and available verification information. This gives you the information you need to make your own informed choice.",
          }),
        },
        {
          title: pick(lang, {
            de: "Unterstützung sollte zu Ihnen passen.",
            en: "Support should fit your needs.",
          }),
          body: pick(lang, {
            de: "Jeder Mensch und jeder Alltag ist anders. Deshalb können Sie gezielt nach Ihren Bedürfnissen suchen und verschiedene Dienstleister miteinander vergleichen.",
            en: "Every person and every situation is different. Weligo lets you search based on what matters to you and compare different service providers before making a decision.",
          }),
        },
        {
          title: pick(lang, {
            de: "Direkter Kontakt schafft Sicherheit.",
            en: "Direct communication builds confidence.",
          }),
          body: pick(lang, {
            de: "Schreiben Sie Dienstleistern direkt über Weligo, stellen Sie Ihre Fragen und klären Sie wichtige Details vor einer Buchung. Auf Wunsch können Sie sich auch per Videoanruf persönlich kennenlernen.",
            en: "Message service providers directly through Weligo, ask questions, and discuss important details before booking. If you prefer, you can also get to know each other through a video call.",
          }),
        },
      ],
    },
    promise: {
      eyebrow: pick(lang, { de: "UNSER VERSPRECHEN", en: "OUR PROMISE" }),
      title: pick(lang, {
        de: "Darauf können Sie bei Weligo zählen.",
        en: "What You Can Count on with Weligo.",
      }),
      items: [
        {
          title: pick(lang, {
            de: "Transparente Profile",
            en: "Transparent Profiles",
          }),
          body: pick(lang, {
            de: "Sehen Sie wichtige Informationen zu Dienstleistern auf einen Blick – von Erfahrung und angebotenen Dienstleistungen bis zu Preisen, Bewertungen und vorhandenen Verifizierungen.",
            en: "See important information about service providers at a glance – from experience and services offered to prices, reviews, and available verification information.",
          }),
        },
        {
          title: pick(lang, {
            de: "Klare Preise vor der Buchung.",
            en: "Clear Prices Before You Book.",
          }),
          body: pick(lang, {
            de: "Sehen Sie die angegebenen Preise, bevor Sie eine Buchungsanfrage senden. So wissen Sie von Anfang an, welche Kosten Sie erwarten.",
            en: "See the listed prices before sending a booking request, so you know what to expect from the beginning.",
          }),
        },
        {
          title: pick(lang, {
            de: "Direkte Kommunikation",
            en: "Direct Communication",
          }),
          body: pick(lang, {
            de: "Kontaktieren Sie Dienstleister direkt über Weligo, stellen Sie Fragen und besprechen Sie wichtige Details, bevor Sie sich entscheiden.",
            en: "Contact service providers directly through Weligo, ask questions, and discuss important details before making your decision.",
          }),
        },
        {
          title: pick(lang, {
            de: "Persönliches Kennenlernen per Video",
            en: "Get to Know Each Other by Video",
          }),
          body: pick(lang, {
            de: "Bei persönlichen Dienstleistungen ist Vertrauen besonders wichtig. Lernen Sie einen Dienstleister auf Wunsch vor der Buchung bequem per Videoanruf kennen.",
            en: "Trust matters when choosing someone for a personal service. If you wish, meet your service provider through a video call before booking.",
          }),
        },
        {
          title: pick(lang, {
            de: "Bewertungen aus echten Buchungen",
            en: "Reviews from Completed Bookings",
          }),
          body: pick(lang, {
            de: "Bewertungen nach abgeschlossenen Buchungen helfen Ihnen dabei, Erfahrungen anderer Nutzer einzuschätzen und den passenden Dienstleister zu finden.",
            en: "Reviews following completed bookings help you learn from other users' experiences and make a more informed choice.",
          }),
        },
        {
          title: pick(lang, {
            de: "Ihre Daten bleiben geschützt.",
            en: "Your Data Is Protected.",
          }),
          body: pick(lang, {
            de: "Wir behandeln Ihre persönlichen Daten verantwortungsvoll und setzen auf einen sicheren und transparenten Umgang mit Ihren Informationen.",
            en: "We handle your personal information responsibly and are committed to keeping your data secure and treated transparently.",
          }),
        },
      ],
      quote: pick(lang, {
        de: "“Das ist kein Marketingtext. Das sind operative Verpflichtungen.„",
        en: '"This is not marketing copy. These are operational commitments."',
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
      eyebrow: pick(lang, {
        de: "SICHERHEIT & VERIFIZIERUNG",
        en: "SAFETY & VERIFICATION",
      }),
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
          title: pick(lang, {
            de: "Strafregisterprüfung",
            en: "Criminal record check",
          }),
          body: pick(lang, {
            de: "Strafregisterauszug erforderlich für alle Anbieter in Kinder- und Seniorenbetreuung. Alle 12 Monate erneuert.",
            en: "Strafregisterauszug required for all child-facing and senior care providers. Renewed every 12 months.",
          }),
        },
        {
          title: pick(lang, {
            de: "Erste-Hilfe-Zertifikat",
            en: "First aid certificate",
          }),
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
      button: pick(lang, {
        de: "Betreuung für meine Familie finden",
        en: "Find Care for my family",
      }),
    },
  };
}

/* ====== PROVIDERS ====== */
export function providersContent(lang: Lang) {
  return {
    hero: {
      eyebrow: pick(lang, { de: "ANBIETER", en: "PROVIDERS" }),
      titleA: pick(lang, { de: "Verdienen Sie", en: "Earn" }),
      titleB: pick(lang, {
        de: "flexibel. Wirken Sie etwas.",
        en: "flexibly. Make a difference.",
      }),
      sub: pick(lang, {
        de: "Legen Sie Ihre Sätze fest. Wählen Sie Ihre Stunden. Werden Sie wöchentlich per TWINT bezahlt. Bauen Sie eine Karriere in der Betreuung zu Ihren Bedingungen auf.",
        en: "Set your rates. Choose your hours. Get paid weekly via TWINT. Build a caregiving career on your own terms.",
      }),
      cta: pick(lang, { de: "Anbieter werden", en: "Become a Provider" }),
    },
    earnings: {
      eyebrow: pick(lang, { de: "EINNAHMEN", en: "EARNINGS" }),
      titleA: pick(lang, {
        de: "Sehen Sie, was Sie",
        en: "See what you could",
      }),
      titleB: pick(lang, { de: "verdienen könnten.", en: "earn." }),
      hoursPerWeek: pick(lang, {
        de: "Stunden pro Woche",
        en: "Hours per week",
      }),
      hourlyRate: pick(lang, { de: "Ihr Stundensatz", en: "Your hourly rate" }),
      bookingsPerWeek: pick(lang, {
        de: "Buchungen pro Woche",
        en: "Bookings per week",
      }),
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
      platformFee: pick(lang, {
        de: "Plattformgebühr (15%)",
        en: "Platform fee (15%)",
      }),
    },
    built: {
  
      // titleA2: pick(lang, {
      //   de: "seien Sie Ihr eigener Chef.",
      //   en: "be your own Boss.",
      // }),
      eyebrow: pick(lang, { de: "WARUM WELIGO", en: "WHY WELIGO" }),
      titleA: pick(lang, {
        de: "Arbeiten Sie selbstbestimmt",
        en: "Work on Your Terms",
      }),
      titleB: pick(lang, { de: "mit Weligo.", en: "with Weligo." }),
      items: [
        {
          title: pick(lang, {
            de: "Bestimmen Sie Ihren eigenen Preis",
            en: "Set Your Own Prices",
          }),
          body: pick(lang, {
            de: "Sie entscheiden, was Ihre Dienstleistung wert ist. Legen Sie Ihre Preise selbst fest und passen Sie diese jederzeit an.",
            en: "You decide what your services are worth. Set your own prices and adjust them whenever you need to.",
          }),
        },
        {
          title: pick(lang, {
            de: "Arbeiten Sie, wann es zu Ihnen passt",
            en: "Work When It Suits You",
          }),
          body: pick(lang, {
            de: "Sie bestimmen Ihre Verfügbarkeit und Ihren Einsatzbereich selbst. Entscheiden Sie, wann, wo und wie viel Sie arbeiten möchten.",
            en: "You decide your own availability and service area. Choose when, where, and how much you want to work.",
          }),
        },
        {
          title: pick(lang, {
            de: "Direkt auf Ihr Bankkonto",
            en: "Paid Directly to Your Bank Account",
          }),
          body: pick(lang, {
            de: "Ihre Einnahmen werden sicher und unkompliziert direkt auf Ihr hinterlegtes Bankkonto überwiesen.",
            en: "Your earnings are transferred securely and conveniently directly to your registered bank account.",
          }),
        },
        {
          title: pick(lang, {
            de: "Bauen Sie Vertrauen & Ihren Ruf auf",
            en: "Build Trust & Your Reputation",
          }),
          body: pick(lang, {
            de: "Mit einem starken Profil, Verifizierungen und guten Bewertungen bauen Sie sich auf Weligo Schritt für Schritt einen vertrauenswürdigen Ruf auf und können von neuen Kunden entdeckt werden.",
            en: "Build a trusted reputation on Weligo through a strong profile, verification, and positive reviews - helping new customers discover and choose your services.",
          }),
        },
      ],
    },
    flow: {
      eyebrow: pick(lang, { de: "WIE ES FUNKTIONIERT", en: "HOW IT WORKS" }),
      titleA: pick(lang, {
        de: "Von der Anmeldung zur ersten",
        en: "From signup to first",
      }),
      titleB: pick(lang, {
        de: "Buchung in einer Woche.",
        en: "booking in a week.",
      }),
      steps: [
        {
          title: pick(lang, {
            de: "Erstellen Sie Ihr Profil",
            en: "Create your profile",
          }),
          sub: pick(lang, { de: "10 Minuten", en: "10 Minutes" }),
        },
        {
          title: pick(lang, { de: "Verifiziert werden", en: "Get verified" }),
          sub: pick(lang, { de: "2-3 Werktage", en: "2-3 Business Days" }),
        },
        {
          title: pick(lang, {
            de: "Buchungsanfrage erhalten",
            en: "Receive booking request",
          }),
          sub: pick(lang, {
            de: "Normalerweise innerhalb 48 Stunden",
            en: "Usually Within 48 Hours",
          }),
        },
        {
          title: pick(lang, {
            de: "Wöchentlich bezahlt werden",
            en: "Get paid weekly",
          }),
          sub: pick(lang, {
            de: "TWINT oder Bank, Ihre Wahl",
            en: "TWINT Or Bank, Your Choice",
          }),
        },
      ],
    },
    compare: {
      eyebrow: pick(lang, {
        de: "WARUM NICHT EINFACH...",
        en: "WHY NOT JUST...",
      }),
      titleA: pick(lang, { de: "Wie Weligo", en: "How Weligo" }),
      titleB: pick(lang, { de: "abschneidet.", en: "compares." }),
      cols: [
        {
          name: pick(lang, {
            de: "Klassische Agentur",
            en: "Traditional agency",
          }),
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
          name: pick(lang, {
            de: "Facebook / Mundpropaganda",
            en: "Facebook / Word of mouth",
          }),
          highlight: false,
          items: [
            pick(lang, {
              de: "Unzuverlässige Kundenbasis",
              en: "Unreliable client base",
            }),
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
            pick(lang, {
              de: "Legen Sie Ihre eigenen Sätze fest",
              en: "Set your own rates",
            }),
            pick(lang, {
              de: "Wählen Sie Ihre eigenen Stunden",
              en: "Choose your own hours",
            }),
            pick(lang, {
              de: "Automatisch wöchentlich bezahlt",
              en: "Get paid automatically weekly",
            }),
            pick(lang, {
              de: "Voller Plattform-Support und Streitbeilegung",
              en: "Full platform support and dispute resolution",
            }),
          ],
        },
      ],
    },
    verify: {
      eyebrow: pick(lang, {
        de: "WARUM NICHT EINFACH...",
        en: "WHY NOT JUST...",
      }),
      titleA: pick(lang, {
        de: "Was Sie zur Verifizierung",
        en: "What you'll need to get",
      }),
      titleB: pick(lang, { de: "benötigen.", en: "verified." }),
      items: [
        {
          title: pick(lang, {
            de: "Gültiger Schweizer Ausweis",
            en: "Valid Swiss ID",
          }),
          body: pick(lang, {
            de: "Oder eine gültige Schweizer Aufenthaltsbewilligung.",
            en: "Or a valid Swiss residence permit.",
          }),
        },
        {
          title: pick(lang, { de: "Strafregister", en: "Criminal record" }),
          body: pick(lang, {
            de: "Aktueller Strafregisterauszug.",
            en: "Recent Strafregisterauszug.",
          }),
        },
        {
          title: pick(lang, {
            de: "Erste-Hilfe-Zertifikat",
            en: "First aid certificate",
          }),
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
      title: pick(lang, {
        de: "Ihr nächstes Kapitel.",
        en: "Your next chapter.",
      }),
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
      eyebrow: pick(lang, { de: "FÜR KUNDEN", en: "FOR CUSTOMERS" }),
      titleA: pick(lang, {
        de: "Von der Suche zur passenden Unterstützung",
        en: "From searching to finding the right support",
      }),
      titleB: pick(lang, {
        de: "einfach und unkompliziert.",
        en: "simple and straightforward.",
      }),
      steps: [
        {
          title: pick(lang, {
            de: "Suchen & entdecken",
            en: "Search & Discover",
          }),
          body: pick(lang, {
            de: "Wählen Sie die gewünschte Dienstleistung, geben Sie Ihren Standort ein und entdecken Sie passende Dienstleister in Ihrer Umgebung.",
            en: "Choose the service you need, enter your location, and discover suitable service providers in your area.",
          }),
          points: [
            pick(lang, {
              de: "Nach Standort und Entfernung suchen",
              en: "Search by location and distance",
            }),
            pick(lang, {
              de: "Nach Preis, Verfügbarkeit und weiteren Kriterien filtern",
              en: "Filter by price, availability, and other criteria",
            }),
            pick(lang, {
              de: "Passende Dienstleister entdecken",
              en: "Discover suitable service providers",
            }),
          ],
          img: AllImages.w1,
        },
        {
          title: pick(lang, {
            de: "Profile vergleichen",
            en: "Compare Profiles",
          }),
          body: pick(lang, {
            de: "Schauen Sie sich die Profile der Dienstleister an und finden Sie die Person, die am besten zu Ihren Bedürfnissen passt.",
            en: "Explore service provider profiles and find the person who best matches your individual needs.",
          }),
          points: [
            pick(lang, {
              de: "Erfahrungen und Qualifikationen ansehen",
              en: "View experience and qualifications",
            }),
            pick(lang, {
              de: "Preise und Verfügbarkeiten vergleichen",
              en: "Compare prices and availability",
            }),
            pick(lang, {
              de: "Bewertungen anderer Nutzer lesen",
              en: "Read reviews from other users",
            }),
            pick(lang, {
              de: "Zertifikate und Verifizierungen einsehen",
              en: "View certificates and verification status",
            }),
          ],
          img: AllImages.w2,
        },
        {
          title: pick(lang, {
            de: "Kontakt aufnehmen & kennenlernen",
            en: "Connect & Get to Know Each Other",
          }),
          body: pick(lang, {
            de: "Sie haben einen passenden Dienstleister gefunden? Schreiben Sie direkt über Weligo und klären Sie offene Fragen. Auf Wunsch können Sie sich vor der Buchung auch persönlich per Videoanruf kennenlernen.",
            en: "Found a service provider who seems like the right fit? Send them a message directly through Weligo and clarify any questions. If you prefer, you can also get to know each other through a video call before booking.",
          }),
          points: [
            pick(lang, {
              de: "Sichere Nachrichten über Weligo",
              en: "Secure messaging through Weligo",
            }),
            pick(lang, {
              de: "Fragen und Details direkt klären",
              en: "Discuss questions and important details directly",
            }),
            pick(lang, {
              de: "Persönliches Kennenlernen per Videoanruf",
              en: "Get to know each other through a video call",
            }),
          ],
          img: AllImages.w3,
        },
        {
          title: pick(lang, {
            de: "Buchungsanfrage senden",
            en: "Send a Booking Request",
          }),
          body: pick(lang, {
            de: "Wählen Sie den gewünschten Termin und senden Sie eine Buchungsanfrage. Der Dienstleister kann die Anfrage prüfen und bestätigen.",
            en: "Choose your preferred date and time and send a booking request. The service provider can review the details and confirm your request.",
          }),
          points: [
            pick(lang, {
              de: "Datum und Uhrzeit auswählen",
              en: "Select your preferred date and time",
            }),
            pick(lang, {
              de: "Buchungsanfrage direkt senden",
              en: "Send a booking request directly",
            }),
            pick(lang, {
              de: "Bestätigung vom Dienstleister erhalten",
              en: "Receive confirmation from the service provider",
            }),
            pick(lang, {
              de: "Buchungsstatus jederzeit einsehen",
              en: "Check your booking status at any time",
            }),
          ],
          img: AllImages.w4,
        },
        {
          title: pick(lang, {
            de: "Bewerten & wieder buchen",
            en: "Review & Book Again",
          }),
          body: pick(lang, {
            de: "Nach einer abgeschlossenen Buchung können Sie Ihre Erfahrung teilen und den Dienstleister bewerten. War alles passend? Dann finden Sie Ihren bevorzugten Dienstleister schnell wieder.",
            en: "After a completed booking, you can share your experience and leave a review. Found someone you trust? Save your preferred service providers and easily book them again.",
          }),
          points: [
            pick(lang, {
              de: "Bewertungen nach abgeschlossenen Buchungen",
              en: "Leave reviews after completed bookings",
            }),
            pick(lang, {
              de: "Favorisierte Dienstleister speichern",
              en: "Save your favourite service providers",
            }),
            pick(lang, {
              de: "Einfach erneut anfragen und buchen",
              en: " Easily request and book again",
            }),
          ],
          img: AllImages.w5,
        },
        {
          title: pick(lang, {
            de: "Ihr Kunden-Dashboard-",
            en: "Your Customer Dashboard",
          }),
          body: pick(lang, {
            de: "Behalten Sie alles an einem Ort im Blick. Über Ihr persönliches Dashboard verwalten Sie Ihre Buchungen, Nachrichten und Favoriten.",
            en: "Keep everything in one place. Your personal dashboard gives you an overview of your bookings, messages, favourites, and important information.",
          }),
          points: [
            pick(lang, {
              de: "Aktuelle und vergangene Buchungen verwalten",
              en: "Manage current and previous bookings",
            }),
            pick(lang, {
              de: "Nachrichten zentral einsehen",
              en: "View all messages in one place",
            }),
            pick(lang, {
              de: "Favoriten speichern",
              en: "Save your favourite service providers",
            }),
            pick(lang, {
              de: "Buchungen ändern oder stornieren",
              en: "Reschedule or cancel bookings",
            }),
          ],
          img: AllImages.w5,
        },
      ],
    },
    providers: {
      eyebrow: pick(lang, {
        de: "FÜR DIENSTLEISTER",
        en: "FOR SERVICE PROVIDERS",
      }),
      titleA: pick(lang, {
        de: "Vom eigenen Profil zum passenden Auftrag",
        en: "From creating your profile to finding the right opportunities",
      }),
      titleB: pick(lang, {
        de: "einfach mit Weligo.",
        en: "simple with Weligo",
      }),
      steps: [
        {
          title: pick(lang, {
            de: "Profil erstellen",
            en: "Create Your Profile",
          }),
          body: pick(lang, {
            de: "Erstellen Sie Ihr persönliches Profil und zeigen Sie potenziellen Kunden, wer Sie sind und welche Dienstleistungen Sie anbieten.",
            en: "Create your personal profile and show potential customers who you are and which services you offer.",
          }),
          points: [
            pick(lang, {
              de: "Profilfoto und persönliche Beschreibung hinzufügen",
              en: "Add a profile photo and personal introduction",
            }),
            pick(lang, {
              de: "Dienstleistungen auswählen",
              en: "Select the services you offer",
            }),
            pick(lang, {
              de: "Eigene Preise festlegen",
              en: "Set your own prices",
            }),
            pick(lang, {
              de: "Erfahrung, Sprachen und Qualifikationen angeben",
              en: "Add your experience, languages, and qualifications",
            }),
            pick(lang, {
              de: "Verfügbarkeit und Einsatzgebiet festlegen",
              en: "Set your availability and service area",
            }),
          ],
          img: AllImages.w6,
        },
        {
          title: pick(lang, { de: "Profil verifizieren", en: "Get Verified" }),
          body: pick(lang, {
            de: "Schaffen Sie zusätzliches Vertrauen, indem Sie Ihre Identität bestätigen und relevante Dokumente oder Zertifikate hinterlegen.",
            en: "Build additional trust by verifying your identity and adding relevant documents or certificates to your profile.",
          }),
          points: [
            pick(lang, {
              de: "Identität bestätigen",
              en: "Verify your identity",
            }),
            pick(lang, {
              de: "Dokumente und Zertifikate hochladen",
              en: "Upload documents and certificates",
            }),
            pick(lang, {
              de: "Relevante Nachweise hinterlegen",
              en: "Add relevant qualifications and credentials",
            }),
            pick(lang, {
              de: "Verifizierungsstatus im Profil anzeigen",
              en: "Set your availability and service area",
            }),
          ],
          img: AllImages.w6,
        },
        {
          title: pick(lang, {
            de: "Buchungsanfragen erhalten",
            en: "Receive booking requests",
          }),
          body: pick(lang, {
            de: "Kunden können Ihr Profil entdecken, Sie kontaktieren und Ihnen Buchungsanfragen senden. Sie entscheiden selbst, welche Aufträge zu Ihnen passen.",
            en: "Customers can discover your profile, contact you, and send booking requests. You decide which opportunities are right for you.",
          }),
          points: [
            pick(lang, {
              de: "Neue Buchungsanfragen erhalten",
              en: "Receive new booking requests",
            }),
            pick(lang, {
              de: "Termin und Details prüfen",
              en: "Review dates and booking details",
            }),
            pick(lang, {
              de: "Direkt mit Kunden kommunizieren",
              en: "Communicate directly with customers",
            }),
            pick(lang, {
              de: "Anfragen annehmen oder ablehnen",
              en: "Accept or decline requests",
            }),
          ],
          img: AllImages.w6,
        },
        {
          title: pick(lang, {
            de: "Kunden kennenlernen & Auftrag durchführen",
            en: "Connect & Provide Your Service",
          }),
          body: pick(lang, {
            de: "Klären Sie offene Fragen über den Weligo-Chat oder lernen Sie den Kunden vorab per Videoanruf kennen. Nach der Bestätigung können Sie den vereinbarten Auftrag durchführen.",
            en: "Discuss any remaining questions through Weligo messaging or get to know the customer through a video call before the appointment. Once everything is confirmed, provide the agreed service.",
          }),
          points: [
            pick(lang, {
              de: "Direkte Nachrichten über Weligo",
              en: "Communicate directly through Weligo",
            }),
            pick(lang, {
              de: "Videoanrufe für ein persönliches Kennenlernen",
              en: "Use video calls to get to know customers",
            }),
            pick(lang, {
              de: "Termine und Buchungen verwalten",
              en: "Manage appointments and bookings",
            }),
            pick(lang, {
              de: "Dienstleistung wie vereinbart durchführen",
              en: "Provide the agreed service",
            }),
          ],
          img: AllImages.w6,
        },
        {
          title: pick(lang, {
            de: "Bewertungen & Vertrauen aufbauen",
            en: "Build Reviews & Trust",
          }),
          body: pick(lang, {
            de: "Nach abgeschlossenen Buchungen können Kunden ihre Erfahrung bewerten. Gute Bewertungen stärken Ihr Profil und helfen zukünftigen Kunden bei ihrer Entscheidung.",
            en: "After completed bookings, customers can share their experience and leave a review. Positive reviews strengthen your profile and help future customers make informed decisions.",
          }),
          points: [
            pick(lang, {
              de: "Bewertungen von Kunden erhalten",
              en: "Receive reviews from customers",
            }),
            pick(lang, {
              de: "Vertrauen und Reputation aufbauen",
              en: "Build trust and your reputation",
            }),
            pick(lang, {
              de: "Profil mit Erfahrungen weiter stärken",
              en: "Strengthen your profile with experience",
            }),
            pick(lang, {
              de: "Von neuen Kunden entdeckt werden",
              en: "Get discovered by new customers",
            }),
          ],
          img: AllImages.w6,
        },
        {
          title: pick(lang, {
            de: "Ihr Dienstleister-Dashboard",
            en: "Your Service Provider Dashboard",
          }),
          body: pick(lang, {
            de: "Verwalten Sie Ihre Tätigkeit auf Weligo zentral an einem Ort. Behalten Sie Anfragen, Buchungen, Nachrichten, Verfügbarkeit und Bewertungen im Überblick.",
            en: "Manage your activity on Weligo from one central place. Keep track of requests, bookings, messages, availability, and reviews.",
          }),
          points: [
            pick(lang, {
              de: "Buchungsanfragen und Aufträge verwalten-",
              en: "Manage booking requests and jobs",
            }),
            pick(lang, {
              de: "Kalender und Verfügbarkeit aktualisieren",
              en: "Update your calendar and availability",
            }),
            pick(lang, {
              de: "Nachrichten zentral verwalten",
              en: "Manage messages in one place",
            }),
            pick(lang, {
              de: "Dienstleistungen und Preise anpassen",
              en: "Update your services and prices",
            }),
            pick(lang, {
              de: "Bewertungen einsehen",
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
      titleA: pick(lang, {
        de: "Unterstützung im Alltag.",
        en: "Support for Everyday Life.",
      }),
      titleB: pick(lang, {
        de: "Menschen, denen man vertrauen kann.",
        en: "People You Can Trust.",
      }),
      sub: pick(lang, {
        de: "Weligo wurde mit einer einfachen Idee gegründet: Menschen dabei zu helfen, schnell und unkompliziert vertrauenswürdige Unterstützung für ihren Alltag zu finden. Ob Kinderbetreuung, Nachhilfe, Haushaltshilfe, Seniorenbetreuung oder andere Dienstleistungen - die Suche nach der richtigen Person sollte einfach, transparent und zuverlässig sein. Genau dafür gibt es Weligo.",
        en: "Weligo was founded with a simple idea: to help people find trustworthy support for everyday life quickly and easily. Whether it's childcare, tutoring, household help, senior support, or other services, finding the right person should be simple, transparent, and reliable. That's what Weligo is here for",
      }),
    },
    story: {
      eyebrow: pick(lang, { de: "UNSERE GESCHICHTE", en: "OUR STORY" }),
      titleA: pick(lang, {
        de: "Gegründet in Zürich. Für",
        en: "Founded in Zurich. Built for",
      }),
      titleB: pick(lang, { de: "die Schweiz.", en: "Switzerland." }),
      paragraphs: [
        pick(lang, {
          de: "Die Idee hinter Weligo entstand aus einer einfachen Frage:",
          en: "The idea behind Weligo started with a simple question:",
        }),
        pick(lang, {
          de: "Warum ist es heute noch so kompliziert, die richtige Person zu finden, wenn man Unterstützung im Alltag braucht?",
          en: "Why is it still so complicated to find the right person when you need support in everyday life?",
        }),
        pick(lang, {
          de: "Heute können wir fast alles innerhalb weniger Minuten online organisieren. Doch wenn es darum geht, eine vertrauenswürdige Person für alltägliche Aufgaben und persönliche Unterstützung zu finden, ist die Suche oft noch zeitaufwendig und unübersichtlich.",
          en: "Today, we can organize almost everything online within minutes. Yet when it comes to finding someone you can trust with everyday tasks and personal support, the process can still be time-consuming and complicated.",
        }),
      ],
      quote: pick(lang, {
        de: "„Wir glauben, dass es einen einfacheren Weg geben sollte.“",
        en: '"We believe there should be an easier way."',
      }),
      paragraphs2: [
        pick(lang, {
          de: "Mit Weligo schaffen wir eine Plattform, auf der Menschen passende Dienstleister entdecken, Profile vergleichen, Verfügbarkeiten prüfen, direkt miteinander kommunizieren und die gewünschte Unterstützung organisieren können - alles an einem Ort.",
          en: "With Weligo, we are building a platform where people can discover suitable service providers, compare profiles, check availability, communicate directly, and organize the support they need - all in one place.",
        }),
        pick(lang, {
          de: "Es geht darum, Menschen zusammenzubringen.",
          en: "It's about bringing people together.",
        }),
        pick(lang, {
          de: "Vertrauen, Transparenz und Einfachheit stehen im Mittelpunkt von Weligo. Unser Ziel ist es, unseren Nutzern die Informationen und Werkzeuge zu geben, die sie brauchen, um selbst die passende Person für ihre individuellen Bedürfnisse zu finden.",
          en: "Trust, transparency, and simplicity are at the heart of Weligo. Our goal is to give users the information and tools they need to choose the right person for their individual needs.",
        }),
        pick(lang, {
          de: "Weligo startet mit der Kinderbetreuung und wird Schritt für Schritt um weitere Bereiche wie Nachhilfe, Haushaltshilfe, Seniorenbetreuung, Tierbetreuung und weitere Dienstleistungen erweitert.",
          en: "Weligo is starting with childcare and will gradually expand into additional areas such as tutoring, household help, senior support, pet care, and other everyday services.",
        }),
        pick(lang, {
          de: "Unsere Vision ist einfach:",
          en: "Our vision is simple:",
        }),
        pick(lang, {
          de: "Eine vertrauenswürdige Plattform für Unterstützung im Alltag - in der ganzen Schweiz.",
          en: "One trusted platform for everyday support across Switzerland.",
        }),
        pick(lang, {
          de: "Aus Zürich. Für die Schweiz. Für den Alltag..",
          en: "From Zurich. For Switzerland. For everyday life.",
        }),
      ],
    },
    values: {
      eyebrow: pick(lang, { de: "WERTE", en: "VALUES" }),
      titleA: pick(lang, { de: "Was wir", en: "What we" }),
      titleB: pick(lang, { de: "Glauben.", en: "Believe." }),
      items: [
        {
          title: pick(lang, {
            de: "Vertrauen steht an erster Stelle",
            en: "Trust Comes First",
          }),
          body: pick(lang, {
            de: "Wenn Menschen Unterstützung in ihren Alltag holen, ist Vertrauen entscheidend. Weligo schafft Transparenz und gibt Nutzern die Informationen, die sie brauchen, um selbst die richtige Person zu finden.",
            en: "When people invite support into their everyday lives, trust matters. Weligo creates transparency and gives users the information they need to choose the right person for themselves.",
          }),
        },
        {
          title: pick(lang, {
            de: "Menschen machen den Unterschied",
            en: "People Make the Difference",
          }),
          body: pick(lang, {
            de: "Hinter jeder Dienstleistung steht ein Mensch. Weligo bringt Menschen zusammen, die Unterstützung suchen und anbieten - persönlich, direkt und auf Augenhöhe.",
            en: "Behind every service is a person. Weligo brings together people who need support and people who provide it - personally, directly, and on equal terms.",
          }),
        },
        {
          title: pick(lang, {
            de: "Einfach soll auch einfach sein",
            en: "Simple Should Be Simple",
          }),
          body: pick(lang, {
            de: "Die Suche nach Unterstützung sollte nicht kompliziert sein. Profile entdecken, vergleichen, kommunizieren und organisieren - Weligo bringt alles übersichtlich an einen Ort.",
            en: "Finding support shouldn't be complicated. Discover profiles, compare options, communicate, and organize everything you need - Weligo brings it all together in one place.",
          }),
        },
        {
          title: pick(lang, {
            de: "Für den Alltag gemacht",
            en: "Made for Everyday Life",
          }),
          body: pick(lang, {
            de: "Jeder Alltag ist anders. Deshalb entwickelt sich Weligo mit den Bedürfnissen seiner Nutzer - von Kinderbetreuung und Nachhilfe bis hin zu Haushaltshilfe, Seniorenbetreuung und Tierbetreuung.",
            en: "Everyday life is different for everyone. That's why Weligo grows with the needs of its users - from childcare and tutoring to household help, senior support, and pet care.",
          }),
        },
      ],
    },
    mission: {
      titleA: pick(lang, { de: "Unsere Mission", en: "Our Mission" }),
      titleB: pick(lang, {
        de: "Unterstützung im Alltag einfacher machen.",
        en: "Making Everyday Support Easier.",
      }),
      sub: pick(lang, {
        de: "Wir bringen Menschen in der ganzen Schweiz mit vertrauenswürdigen Dienstleistern zusammen - einfach, transparent und an einem Ort.",
        en: "We connect people across Switzerland with trustworthy service providers - simply, transparently, and all in one place.",
      }),
    },
  };
}
