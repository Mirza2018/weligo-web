import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "de" | "en";

// All copy lives here. German is primary, English secondary.
export const dict = {
  nav: {
    home: { de: "Startseite", en: "Home" },
    services: { de: "Leistungen", en: "Services" },
    families: { de: "Für Familien", en: "For Families" },
    providers: { de: "Für Anbieter", en: "For Providers" },
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
      de: "Tutor:innen für alle Fächer und Stufen.",
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
    providersEyebrow: { de: "ANBIETER", en: "PROVIDERS" },
    providersTitleA: { de: "Triff einige unserer ", en: "Meet a few of our " },
    providersTitleB: { de: "Betreuer:innen.", en: "caregivers." },
    familiesEyebrow: { de: "FAMILIEN", en: "FAMILIES" },
    familiesTitleA: {
      de: "Betreuung, die fünf Sterne verdient, ",
      en: "Care that earns five stars, ",
    },
    familiesTitleB: { de: "jedes Mal.", en: "every time." },
    quote: {
      de: "„Die Qualität der Anbieter auf Weligo ist unübertroffen. Wir haben innerhalb von Stunden den perfekten Hundesitter gefunden.“",
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
      de: "Suche nach Leistungsart, Standort und Verfügbarkeit. Jede:r Betreuer:in ist hintergrundgeprüft und verifiziert.",
      en: "Search by service type, location, and availability. Every caregiver is background-checked and verified.",
    },
    step2Title: {
      de: "Chatten und sofort buchen",
      en: "Chat and book instantly",
    },
    step2Desc: {
      de: "Schreibe Anbieter:innen sicher über die App. Sobald du bereit bist, buche mit einem einzigen Tippen.",
      en: "Message providers securely through the app. Once you're ready, book with a single tap.",
    },
    step3Title: {
      de: "Sicher buchen und bezahlen",
      en: "Book and pay securely",
    },
    step3Desc: {
      de: "Bestätige Buchungen mit einem Tippen. Bezahle nahtlos via TWINT, Kreditkarte oder Rechnung.",
      en: "Confirm bookings with a tap. Pay seamlessly via TWINT, credit card, or invoice.",
    },
    faqEyebrow: { de: "FRAGEN", en: "QUESTIONS" },
    faqTitleA: { de: "Alles, was du dich ", en: "Everything you " },
    faqTitleB: { de: "fragst", en: "might wonder" },
    earnTitle: { de: "Flexibel verdienen.", en: "Earn flexibly." },
    earnTitle2: { de: "Mach den Unterschied.", en: "Make a difference." },
    earnDesc: {
      de: "Bestimme deinen Preis. Wähle deine Stunden. Erhalte wöchentlich Auszahlungen via TWINT.",
      en: "Set your rates. Choose your hours. Get paid weekly via TWINT.",
    },
    becomeProvider: { de: "Anbieter:in werden", en: "Become a provider" },
    statRateLabel: {
      de: "Durchschnittlicher Stundensatz",
      en: "Average hourly rate",
    },
    statRatingLabel: { de: "Anbieter-Bewertungen", en: "Provider ratings" },
    statBookingsLabel: { de: "Monatliche Buchungen", en: "Monthly bookings" },
  },
  services: {
    eyebrow: { de: "LEISTUNGEN", en: "SERVICES" },
    titleA: {
      de: "Betreuung, die zu dir kommt — ",
      en: "Care that meets you ",
    },
    titleB: { de: "wo du bist.", en: "where you are." },
    sub: {
      de: "Jede:r Weligo-Anbieter:in ist identitätsgeprüft, hintergrundgeprüft und von anderen Schweizer Familien bewertet.",
      en: "Every Weligo provider is identity-checked, background-screened and reviewed by other Swiss families.",
    },
    childcare: { de: "Kinderbetreuung.", en: "Childcare." },
    tutoring: { de: "Nachhilfe.", en: "Tutoring." },
    senior: { de: "Seniorenbetreuung.", en: "Senior Care." },
    cleaning: { de: "Hausreinigung.", en: "House Cleaning." },
    pet: { de: "Tierbetreuung.", en: "Pet Care." },
    everyday: { de: "Alltagshilfe.", en: "Everyday Support." },
    cardDesc: {
      de: "Von der Säuglingsbetreuung bis zur Nachmittagshilfe. Verifiziert, hintergrundgeprüft und von Familien bewertet.",
      en: "From newborn nannies to after-school care. Verified, background-checked, and rated by families.",
    },
    comingSoon: { de: "Bald verfügbar", en: "Coming Soon" },
    providers: { de: "Anbieter:innen", en: "providers" },
    from: { de: "ab CHF", en: "from CHF" },
    perHr: { de: "/Std", en: "/hr" },
  },
  trust: {
    verified: { de: "Geprüfte Anbieter:innen", en: "Verified providers" },
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
    provider: { de: "Anbieter:in", en: "Provider" },
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
    providers: { de: "Anbieter", en: "Providers" },
    legal: { de: "Rechtliches", en: "Legal" },
    howItWorks: { de: "So funktioniert's", en: "How It Works" },
    aboutUs: { de: "Über uns", en: "About us" },
    trust: { de: "Vertrauen & Sicherheit", en: "Trust & Safety" },
    contact: { de: "Kontakt", en: "Contact" },
    forFamilies: { de: "Für Familien", en: "For Families" },
    findChild: { de: "Kinderbetreuung finden", en: "Find Childcare" },
    findSenior: { de: "Seniorenbetreuung finden", en: "Find Senior Care" },
    forProviders: { de: "Für Anbieter", en: "For Providers" },
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
