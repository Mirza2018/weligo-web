import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "de" | "en";

// All copy lives here. German is primary, English secondary.
export const dict = {
  nav: {
    home: { de: "Startseite", en: "Home" },
    services: { de: "Leistungen", en: "Services" },
    families: { de: "Für Familien", en: "For Families" },
    providers: { de: "Für Dienstleister", en: "For Providers" },
    how: { de: "So funktioniert's", en: "How It Works" },
    about: { de: "Über uns", en: "About Us" },
    login: { de: "Anmelden", en: "Log In" },
    signup: { de: "Registrieren", en: "Sign Up" },
    logout: { de: "abmelden", en: "Log out" },
  },
  common: {
    joinWaitlist: { de: "Warteliste beitreten", en: "Join the waitlist" },
    backHome: { de: "Zurück zur Startseite", en: "Back to home" },
    comingSoon: { de: "Bald verfügbar.", en: "Coming soon." },
    stayTuned: { de: "Bleibt dran.", en: "Stay tuned." },
    comingSoonDesc: {
      de: "Diese Seite ist noch im Ofen. Tritt der Warteliste bei, um beim Start benachrichtigt zu werden.",
      en: "This page is still in the oven. Join the waitlist to be notified at launch.",
    },
  },
  home: {
    eyebrow: { de: "VERTRAUENSVOLLE BETREUUNG", en: "TRUSTED CARE" },
    titleA: {
      de: "Vertrauensvolle Unterstützung für",
      en: "Trusted support for",
    },
    titleB: { de: "das, was wirklich zählt", en: "what truly matters" },
    sub: {
      de: "Verbinde dich mit geprüften Betreuer:innen für Kinderbetreuung, Seniorenbetreuung, Tierbetreuung, Reinigung und Nachhilfe.",
      en: "Connect with verified caregivers for childcare, senior care, pet care, house cleaning and tutoring.",
    },
    servicesEyebrow: { de: "LEISTUNGEN", en: "SERVICES" },
    servicesTitleA: { de: "Betreuung für ", en: "Care for " },
    servicesTitleB: { de: "jeden Lebensabschnitt", en: "every chapter" },
    servicesTitleC: { de: " des Lebens.", en: " of life." },
    svcChildDesc: {
      de: "Finde geprüfte Babysitter und Nannys in deiner Nähe.",
      en: "Find trusted babysitters and nannies near you.",
    },
    svcTutorDesc: {
      de: "Verbinden Sie sich mit Nachhilfelehrern für alle Fächer und Lernstufen.",
      en: "Connect with tutors for all subjects and levels.",
    },
    svcSeniorDesc: {
      de: "Einfühlsame Betreuung für deine Liebsten.",
      en: "Compassionate care for your loved ones.",
    },
    svcPetDesc: {
      de: "Liebevolle Betreuung für deine Tiere.",
      en: "Loving care for your pets when you need it.",
    },
    svcCleanDesc: {
      de: "Zuverlässige Hilfe für ein sauberes Zuhause.",
      en: "Reliable help for a clean and tidy home.",
    },
    svcEverydayDesc: {
      de: "Hilfe bei Besorgungen und täglichen Aufgaben.",
      en: "Help with errands and daily tasks.",
    },
    providersEyebrow: { de: "Dienstleister", en: "PROVIDERS" },
    providersTitleA: { de: "Triff einige unserer ", en: "Meet a few of our " },
    providersTitleB: { de: "Betreuer:innen.", en: "caregivers." },
    familiesEyebrow: { de: "FAMILIEN", en: "FAMILIES" },
    familiesTitleA: {
      de: "Betreuung, die fünf Sterne verdient, ",
      en: "Care that earns five stars, ",
    },
    familiesTitleB: { de: "jedes Mal.", en: "every time." },
    quote: {
      de: "„Die Qualität der Dienstleister auf Weligo ist unübertroffen. Wir haben innerhalb von Stunden den perfekten Hundesitter gefunden.“",
      en: '"The quality of providers on Weligo is unmatched. We found the perfect dog walker within hours."',
    },
    quote2: {
      de: "„Eine:n Nachhilfelehrer:in für unseren Sohn zu buchen, dauerte nur Minuten. Er ist schon viel selbstbewusster in der Schule.“",
      en: '"Booking a tutor for our son took minutes. He\'s already more confident at school."',
    },
    quote3: {
      de: "„Unsere Reinigungskraft ist zuverlässig, freundlich und gründlich. Weligo funktioniert einfach.“",
      en: '"Our cleaner is reliable, kind and thorough. Weligo simply works."',
    },
    howEyebrow: { de: "SO FUNKTIONIERT'S", en: "HOW IT WORKS" },
    howTitleA: { de: "Drei Schritte. ", en: "Three steps. " },
    howTitleB: { de: "Keine Reibung.", en: "No friction." },
    step1Title: {
      de: "Geprüfte Profile durchsuchen",
      en: "Browse verified profiles",
    },
    step1Desc: {
      de: "Suche nach Servicetyp, Standort und Verfügbarkeit. Jede Betreuungsperson wurde einer Hintergrundprüfung unterzogen und verifiziert – mit echten Bewertungen von Schweizer Familien.",
      en: "Search by service type, location, and availability. Every caregiver has been background-checked and verified, with real reviews from Swiss families.",
    },
    step2Title: {
      de: "Chatten und sofort buchen",
      en: "Chat and book instantly",
    },
    step2Desc: {
      de: "Kommunizieren Sie sicher über die App mit den Dienstleister, um alle Details abzustimmen. Sobald Sie bereit sind, buchen Sie mit nur einem Klick – ganz ohne endlose Telefonate.",
      en: "Message providers securely through the app to align on details. Once you're ready, book with a single tap. No endless phone tag.",
    },
    step3Title: {
      de: "Sicher buchen und bezahlen",
      en: "Book and pay securely",
    },
    step3Desc: {
      de: "Bestätigen Sie Buchungen mit nur einem Klick. Bezahlen Sie bequem per TWINT, Kreditkarte oder Rechnung. Betreuungspersonen werden jede Woche automatisch bezahlt.",
      en: "Confirm bookings with a tap. Pay seamlessly via TWINT, credit card, or invoice. Caregivers get paid automatically each week.",
    },
    faqEyebrow: { de: "FRAGEN", en: "QUESTIONS" },
    faqTitleA: { de: "Alles, was du dich ", en: "Everything you " },
    faqTitleB: { de: "fragst", en: "might wonder" },
    // earnTitle: { de: "Flexibel verdienen.", en: "Earn flexibly." },
    // earnTitle2: { de: "Mach den Unterschied.", en: "Make a difference." },
    // earnDesc: {
    //   de: "Legen Sie Ihre Preise fest. Wählen Sie Ihre Arbeitszeiten. Erhalten Sie wöchentliche Auszahlungen per TWINT. Schließen Sie sich Tausenden von Betreuungspersonen an, die Schweizer Familien unterstützen.",
    //   en: "Set your rates. Choose your hours. Get paid weekly via TWINT. Join thousands of caregivers helping Swiss families.",
    // },
    earnTitle: { de: "Seien Sie unter den", en: "Be among the first" },
    earnTitle2: { de: " ersten Familien auf", en: "families on " },
    earnTitle3: { de: "Weligo", en: "Weligo." },
    earnDesc: {
      de: "Wir starten bald in Zürich. Treten Sie der Warteliste bei und erhalten Sie frühen Zugang vor dem öffentlichen Start.",
      en: "We're launching soon in Zürich. Join the waitlist and get early access before the public launch.",
    },
    becomeProvider: { de: "Dienstleister werden", en: "Become a provider" },
    statRateLabel: {
      de: "Durchschnittlicher Stundensatz",
      en: "Average hourly rate",
    },
    statRatingLabel: {
      de: "Bewertungen der Dienstleister",
      en: "Provider ratings",
    },
    statBookingsLabel: { de: "Monatliche Buchungen", en: "Monthly bookings" },
  },
  services: {
    eyebrow: { de: "LEISTUNGEN", en: "SERVICES" },
    titleA: {
      de: "Betreuung, die zu dir kommt",
      en: "Care that meets you ",
    },
    titleB: { de: "wo du bist.", en: "where you are." },
    sub: {
      de: "Jeder Weligo-Dienstleister wird identitätsgeprüft, hintergrundüberprüft und von anderen Schweizer Familien bewertet.",
      en: "Every Weligo provider is identity-checked, background-screened and reviewed by other Swiss families.",
    },
    childcare: { de: "Kinderbetreuung.", en: "Childcare." },
    tutoring: { de: "Nachhilfe.", en: "Tutoring." },
    senior: { de: "Seniorenbetreuung.", en: "Senior Care." },
    cleaning: { de: "Hausreinigung.", en: "House Cleaning." },
    pet: { de: "Tierbetreuung.", en: "Pet Care." },
    everyday: { de: "Alltagshilfe.", en: "Everyday Support." },
    childcareDesc: {
      de: "Von Neugeborenenbetreuung bis zur Nachmittagsbetreuung nach der Schule. Verifiziert, hintergrundgeprüft und von Familien bewertet.",
      en: "From newborn nannies to after-school care. Verified, background-checked, and rated by families.",
    },
    tutoringDesc: {
      de: "Individuelle Nachhilfe, damit Schüler mit Selbstvertrauen lernen, wachsen und erfolgreich sein können.",
      en: "Personalized tutoring to help students learn, grow, and succeed with confidence.",
    },
    seniorDesc: {
      de: "Einfühlsame Seniorenbetreuung und Unterstützung für Komfort, Sicherheit und Wohlbefinden im Alltag.",
      en: "Compassionate senior care and support for comfort, safety, and daily well-being.",
    },
    cleaningDesc: {
      de: "Zuverlässige Hausreinigung für ein sauberes, frisches und komfortables Zuhause.",
      en: "Reliable house cleaning services for a spotless, fresh, and comfortable home.",
    },
    petDesc: {
      de: "Liebevolle Haustierbetreuung, damit Ihre Tiere glücklich, sicher und bestens versorgt sind.",
      en: "Loving pet care services to keep your pets happy, safe, and well cared for.",
    },
    everydayDesc: {
      de: "Verlässliche Unterstützung im Alltag, damit tägliche Aufgaben einfacher und stressfrei werden.",
      en: "Trusted everyday support to make daily tasks easier, smoother, and stress-free.",
    },
    comingSoon: { de: "Bald verfügbar", en: "Coming Soon" },
    providers: { de: "Dienstleister", en: "providers" },
    from: { de: "ab CHF", en: "from CHF" },
    perHr: { de: "/Std", en: "/hr" },
  },
  trust: {
    verified: { de: "Geprüfte Dienstleister", en: "Verified providers" },
    verifiedSub: {
      de: "Jedes Profil ist geprüft",
      en: "Every profile is checked",
    },
    background: { de: "Hintergrundgeprüft", en: "Background checked" },
    backgroundSub: {
      de: "Schweizer Compliance",
      en: "Swiss compliance standards",
    },
    payments: { de: "Sichere Zahlungen", en: "Secure payments" },
    paymentsSub: { de: "Einfach und zuverlässig", en: "Simple & reliable" },
    support: { de: "24/7 Support", en: "24/7 support" },
    supportSub: { de: "Wir sind für dich da", en: "We're here for you" },
  },
  auth: {
    welcomeA: { de: "Willkommen zurück.", en: "Welcome back." },
    welcomeB: { de: "Schön, dich zu sehen.", en: "Good to see you." },
    welcomeDesc: {
      de: "Logge dich ein, um auf dein Konto zuzugreifen und deinen Wartelisten-Status zu verfolgen.",
      en: "Log in to access your account, track your waitlist status, and be ready when we launch.",
    },
    joinA: { de: "Tritt der Warteliste bei.", en: "Join the waitlist." },
    joinB: { de: "Sei früh dabei.", en: "Get in early." },
    joinDesc: {
      de: "Wir starten bald. Registriere dich jetzt für frühen Zugriff, Launch-Rabatte und bevorzugtes Matching.",
      en: "We're launching soon. Register now and get early access, launch discounts and priority matching before the public launch.",
    },
    fullName: { de: "Vollständiger Name", en: "Full Name" },
    fullNamePh: { de: "Gib deinen Namen ein", en: "Enter your full name" },
    email: { de: "E-Mail-Adresse", en: "Email Address" },
    emailHint: {
      de: "Wir senden deine Bestätigung hierhin.",
      en: "We'll send your waitlist confirmation here.",
    },
    password: { de: "Passwort", en: "Password" },
    passwordPh: { de: "Erstelle ein Passwort", en: "Create a password" },
    city: { de: "Stadt", en: "City" },
    cityPh: { de: "Wähle deine Stadt", en: "Select your city" },
    role: { de: "Ich möchte beitreten als…", en: "I want to join in as a..." },
    family: { de: "Familie", en: "Family" },
    provider: { de: "Dienstleister", en: "Provider" },
    login: { de: "Anmelden", en: "Log In" },
    forgot: { de: "Passwort vergessen", en: "Forgot password" },
    noAccount: { de: "Noch nicht registriert?", en: "Didn't register?" },
    registerLink: {
      de: "Wartelisten-Konto erstellen",
      en: "Register your waitlist account",
    },
    hasAccount: { de: "Bereits registriert?", en: "Already registered?" },
    loginLink: {
      de: "In dein Wartelisten-Konto einloggen",
      en: "Log in to your waitlist account",
    },
    joinCta: { de: "Warteliste beitreten", en: "Join the waitlist" },
    strength: {
      0: { de: "Zu schwach", en: "Too weak" },
      1: { de: "Schwach", en: "Weak" },
      2: { de: "Mittel", en: "Fair" },
      3: { de: "Gut", en: "Good" },
      4: { de: "Stark", en: "Strong" },
    } as Record<number, { de: string; en: string }>,
  },
  footer: {
    tagline: { de: "Betreuung, einfach gemacht.", en: "Care, made simple." },
    platform: { de: "Plattform", en: "Platform" },
    families: { de: "Familien", en: "Families" },
    providers: { de: "Dienstleister", en: "Providers" },
    legal: { de: "Rechtliches", en: "Legal" },
    howItWorks: { de: "So funktioniert's", en: "How It Works" },
    aboutUs: { de: "Über uns", en: "About us" },
    trust: { de: "Vertrauen & Sicherheit", en: "Trust & Safety" },
    contact: { de: "Kontakt", en: "Contact" },
    forFamilies: { de: "Für Familien", en: "For Families" },
    findChild: { de: "Kinderbetreuung finden", en: "Find Childcare" },
    findSenior: { de: "Seniorenbetreuung finden", en: "Find Senior Care" },
    forProviders: { de: "Für Dienstleister", en: "For Providers" },
    become: { de: "Betreuer:in werden", en: "Become a Caregiver" },
    help: { de: "Hilfe-Center", en: "Help Center" },
    terms: { de: "AGB", en: "Terms" },
    privacy: { de: "Datenschutz", en: "Privacy" },
    cookies: { de: "Cookies", en: "Cookies" },
    rights: { de: "Alle Rechte vorbehalten.", en: "All rights reserved." },
  },
} as const;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (path: string) => string };
const I18nContext = createContext<Ctx | null>(null);

function resolve(obj: any, path: string): any {
  return path.split(".").reduce((a, k) => (a ? a[k] : undefined), obj);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("de");
  const t = useCallback(
    (path: string) => {
      const node = resolve(dict, path);
      if (node && typeof node === "object" && lang in node) return node[lang];
      return path;
    },
    [lang],
  );
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
