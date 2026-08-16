import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type Lang = "de" | "en";

// All copy lives here. German is primary, English secondary.
export const dict = {
  auth: {
    chooseA: {
      de: "Willkommen bei Weligo.",
      en: "Welcome to Weligo.",
    },
    chooseB: {
      de: "Als wen möchtest du beitreten?",
      en: "Who are you joining as?",
    },
    chooseDesc: {
      de: "Wähle deine Rolle, um zu beginnen.",
      en: "Choose your role to get started.",
    },
    chooseOptionA: {
      de: "Als Familie beitreten",
      en: "Join as a Family",
    },
    chooseOptionADesc: {
      de: "Finde verifizierte Betreuungskräfte für deine Familie",
      en: "Find verified caregivers for your family",
    },
    chooseOptionB: {
      de: "Als Anbieter beitreten",
      en: "Join as a Provider",
    },
    chooseOptionBDesc: {
      de: "Biete Betreuungsdienste an und verdiene flexibel",
      en: "Offer care services and earn flexibly",
    },
    alreday: {
      de: "Bereits ein Konto?",
      en: "Already have an account?",
    },
    login: {
      de: "Anmelden",
      en: "Log in",
    },
    continue: {
      de: "Weiter",
      en: "Continue",
    },
    // sign in
    welcomeA: {
      de: "Willkommen zurück.",
      en: "Welcome back.",
    },
    welcomeB: {
      de: "Schön, dich wiederzusehen.",
      en: "Good to see you.",
    },
    welcomeDesc: {
      de: "Willkommen zurück. Melde dich an, um auf dein Konto zuzugreifen.",
      en: "Welcome back. Log in to access your account",
    },
    email: {
      de: "E-Mail-Adresse",
      en: "Email Address",
    },
    emailPh: {
      de: "Gib deine E-Mail-Adresse ein",
      en: "Enter your email",
    },
    emailHint: {
      de: "Wir senden deine Bestätigung hierhin.",
      en: "We'll send your waitlist confirmation here.",
    },
    password: {
      de: "Passwort",
      en: "Password",
    },
    passwordPh: {
      de: "Erstelle ein Passwort",
      en: "Create a password",
    },
    forgetPassword: {
      de: "Passwort vergessen?",
      en: "Forgot password?",
    },
    noAccount: {
      de: "Noch nicht registriert?",
      en: "Didn't register?",
    },
    registerLink: {
      de: "Jetzt registrieren",
      en: "Register now",
    },

    signUpA: {
      de: "",
      en: "Create your account.",
    },
    signUpB: {
      de: "",
      en: "It's free.",
    },
    signUpDesc: {
      de: "",
      en: "Join thousands of Swiss families already using Weligo.",
    },
    firstName: { de: "", en: "First Name" },
    firstNamePh: { de: "", en: "Enter your first name" },
    lastName: { de: "", en: "Last Name" },
    lastNamePh: { de: "", en: "Enter your last name" },
    city: { de: "", en: "City" },
    cityPh: { de: "", en: "Select your city" },
    postCode: { de: "", en: "Postal Code" },
    postCodePh: { de: "", en: "Type your postal code" },
    address: { de: "", en: "Address" },
    addressPh: { de: "", en: "Enter your address" },
    hasAccount: { de: "Bereits registriert?", en: "Already registered?" },
    agree: {
      de: "",
      en: "I agree to Weligo's",
    },
    terms: {
      de: "",
      en: "Terms of Service",
    },
    privacy: {
      de: "",
      en: "Privacy Policy",
    },
    and: {
      de: "",
      en: "and",
    },
    /////Verify code
    verifyA: { de: "", en: "Submit your code" },
    verifyB: {
      de: "",
      en: "Enter the code we have sent to",
    },
    didNotCode: {
      de: "",
      en: "Didn't get the code? ",
    },
    resend: {
      de: "",
      en: "Resend it",
    },
    verifyCode: {
      de: "",
      en: "Verify code",
    },
    ////
    ////more-info
    moreInfoA: {
      de: "",
      en: "A little about you.",
    },
    moreInfoB: {
      de: "",
      en: "This helps us personalise your experience.",
    },
    phone: {
      de: "",
      en: "Phone number",
    },
    phonePh: {
      de: "",
      en: "Enter your phone number",
    },
    phoneDetails: {
      de: "",
      en: "For booking confirmations only.",
    },
    howHearUs: {
      de: "",
      en: "How did you hear about us?",
    },
    select: {
      de: "",
      en: "Select",
    },
    back: { de: "", en: "Back" },

    ///////WellCome
    welcomePageA: {
      de: "Du bist dabei!",
      en: "You're in!",
    },
    welcomePageB: {
      de: "Willkommen bei Weligo.",
      en: "Welcome to Weligo.",
    },
    welcomePageDesc: {
      de: "Schließe dich Tausenden von Schweizer Familien an, die Weligo bereits nutzen.",
      en: "Join thousands of Swiss families already using Weligo.",
    },
    welcomePage1: {
      de: "Anbieter entdecken",
      en: "Browse providers",
    },
    welcomePage1Desc: {
      de: "Suche, filtere und finde die passende Betreuungskraft",
      en: "Search, filter and find your match",
    },
    welcomePage2: {
      de: "Buchungsanfrage senden",
      en: "Send a booking request",
    },
    welcomePage2Desc: {
      de: "Schreibe Nachrichten und buche in wenigen Minuten",
      en: "Message and book in minutes",
    },
    welcomePage3: {
      de: "Sicher bezahlen",
      en: "Pay securely",
    },
    welcomePage3Desc: {
      de: "TWINT oder Karte – du bist geschützt",
      en: "TWINT or card — you're protected",
    },
    welcomePage4: {
      de: "Verfügbarkeit festlegen",
      en: "Set your availability",
    },
    welcomePage4Desc: {
      de: "Zeige Familien, wann du für Buchungen verfügbar bist",
      en: "Let families know when you're open for bookings",
    },
    welcomePage5: {
      de: "Auf Anfragen antworten",
      en: "Respond to requests",
    },
    welcomePage5Desc: {
      de: "Schreibe Nachrichten und bestätige Buchungen in wenigen Minuten",
      en: "Message and confirm bookings in minutes",
    },
    welcomePage6: {
      de: "Sicher bezahlt werden",
      en: "Get paid securely",
    },
    welcomePage6Desc: {
      de: "TWINT oder Karte - schnelle und geschützte Auszahlungen",
      en: "TWINT or card — fast, protected payouts",
    },
    welcomePageCta: {
      de: "Jetzt entdecken",
      en: "Start browsing",
    },

    ////serice-selection
    serviceSelectionA: {
      de: "Was bietest du an?",
      en: "What do you offer?",
    },
    serviceSelectionDesc: {
      de: "Wähle deine Dienstleistungen und lege deinen Preis fest.",
      en: "Select your services and set your rate.",
    },
    serviceProvide: {
      de: "Angebotene Dienstleistungen",
      en: "Services you provide",
    },
    hourlyCHF: {
      de: "Dein Stundenlohn (CHF)",
      en: "Your hourly rate (CHF)",
    },
    experience: {
      de: "Erfahrung",
      en: "Experience",
    },
    language: {
      de: "Sprache",
      en: "Language",
    },

    // ///// add-certificates
    certificateA: {
      de: "Füge deine Zertifikate hinzu.",
      en: "Add your certificates.",
    },
    certificateDesc: {
      de: "Lade Nachweise über deine Ausbildung oder Lizenzen hoch - verifizierte Profile werden schneller gebucht.",
      en: "Upload proof of training or licenses — verified profiles get booked faster.",
    },
    certificateCta: {
      de: "Zertifikat hinzufügen",
      en: "Add certificate",
    },
    certificateConfirmation: {
      de: "Ich bestätige, dass diese Dokumente gültig, meine eigenen und auf dem neuesten Stand sind.",
      en: "I confirm these documents are valid, mine, and up to date.",
    },

    ///// About
    aboutA: {
      de: "Erzähle Familien etwas über dich.",
      en: "Tell families about you.",
    },
    aboutDesc: {
      de: "Ein aussagekräftiges Profil erhält 3-mal mehr Buchungen.",
      en: "A strong profile gets 3x more bookings.",
    },
    dob: {
      de: "Geburtsdatum",
      en: "Date of birth",
    },
    about1: {
      de: "Nichtraucher",
      en: "Non-smoker",
    },
    about2: {
      de: "Führerschein",
      en: "Driver's license",
    },
    about3: {
      de: "Eigenes Fahrzeug",
      en: "Own vehicle",
    },
    about4: {
      de: "Hat Kinder",
      en: "Has Children",
    },
    about5: {
      de: "Haustiere sind kein Problem",
      en: "Comfortable with pets",
    },

    ////

    fullName: { de: "Vollständiger Name", en: "Full Name" },
    fullNamePh: { de: "Gib deinen Namen ein", en: "Enter your full name" },

    role: { de: "Ich möchte beitreten als…", en: "I want to join in as a..." },
    family: { de: "Familie", en: "Family" },
    provider: { de: "Dienstleister", en: "Provider" },
    forgot: { de: "Passwort vergessen", en: "Forgot password" },

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
    search: {
      categoryLabel: { de: "Was suchst du?", en: "What are you looking for?" },
      categoryPlaceholder: { de: "Kategorie wählen", en: "Choose a category" },
      categoryRequired: {
        de: "Bitte wähle eine Kategorie aus, um zu suchen.",
        en: "Please select a category to search.",
      },
      comingSoon: { de: "Bald verfügbar", en: "Coming soon" },
      locationLabel: { de: "Standort", en: "Location" },
      locationPlaceholder: {
        de: "Ort oder Adresse eingeben",
        en: "Enter a place or address",
      },
      dateLabel: { de: "Datum & Uhrzeit", en: "Date & Time" },
      datePlaceholder: { de: "Beliebig", en: "Anytime" },
      button: { de: "Suchen", en: "Search" },
    },
    noFeatured: {
      de: "Momentan sind keine Anbieter:innen verfügbar.",
      en: "No providers available right now.",
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

  purchase: {
    nav: {
      home: { de: "Startseite", en: "Home" },
      services: { de: "Dienstleistungen", en: "Services" },
      forFamilies: { de: "Für Familien", en: "For Families" },
      forProviders: { de: "Für Anbieter", en: "For Providers" },
      howItWorks: { de: "So funktioniert's", en: "How It Works" },
      aboutUs: { de: "Über uns", en: "About Us" },
      login: { de: "Anmelden", en: "Log In" },
      signup: { de: "Registrieren", en: "Sign Up" },
    },
    steps: {
      chooseProvider: { de: "Anbieter wählen", en: "Choose provider" },
      dateTime: { de: "Datum & Zeit", en: "Date & time" },
      careDetails: { de: "Betreuungsdetails", en: "Care details" },
      review: { de: "Überprüfung", en: "Review" },
      confirmation: { de: "Bestätigung", en: "Confirmation" },
    },
    s1: {
      tag: { de: "01 — IHR ANBIETER", en: "01 — YOUR PROVIDER" },
      heading: { de: "Sie haben {name} gewählt.", en: "You've chosen {name}." },
      perHour: { de: "pro Stunde", en: "per hour" },
      reviews: { de: "Bewertungen", en: "reviews" },
      kmAway: { de: "km entfernt", en: "km away" },
      availableToday: { de: "Heute verfügbar", en: "Available today" },
      viewFullProfile: {
        de: "Vollständiges Profil ansehen",
        en: "View full profile",
      },
      sendRequest: { de: "Buchungsanfrage senden", en: "Send booking request" },
    },
    s2: {
      tag: { de: "02 — WANN?", en: "02 — WHEN?" },
      heading: {
        de: "Wann soll {name} kommen?",
        en: "When would {name} come over?",
      },
      selectDate: { de: "Datum wählen", en: "Select a date" },
      availableOn: {
        de: "{name} ist verfügbar am",
        en: "{name} is available on",
      },
      notAvailable: {
        de: "{name} ist an diesem Tag nicht verfügbar",
        en: "{name} is not available on this day",
      },
      chooseSlot: { de: "Zeitfenster wählen", en: "Choose a time slot" },
      duration: { de: "Dauer", en: "Duration" },
      hours: { de: "Stunden", en: "hours" },
      back: { de: "Zurück", en: "Back" },
      next: { de: "Buchungsanfrage senden", en: "Send booking request" },
      pickDateFirst: {
        de: "Bitte zuerst ein Datum wählen",
        en: "Please choose a date first",
      },
      pickSlot: {
        de: "Bitte ein Zeitfenster wählen",
        en: "Please choose a time slot",
      },
      maxDuration: {
        de: "Maximale Dauer für dieses Fenster ist {n} Stunden",
        en: "Maximum duration for this slot is {n} hours",
      },
      minDuration: {
        de: "Dauer muss mindestens 1 Stunde betragen",
        en: "Duration must be at least 1 hour",
      },
      weekday: {
        mon: { de: "Mo", en: "Mon" },
        tue: { de: "Di", en: "Tue" },
        wed: { de: "Mi", en: "Wed" },
        thu: { de: "Do", en: "Thu" },
        fri: { de: "Fr", en: "Fri" },
        sat: { de: "Sa", en: "Sat" },
        sun: { de: "So", en: "Sun" },
      },
    },
    s3: {
      tag: { de: "03 — DETAILS", en: "03 — DETAILS" },
      heading: {
        de: "Erzählen Sie {name} von Ihrer Buchung.",
        en: "Tell {name} about your booking.",
      },
      ageGroup: { de: "Altersgruppe", en: "Age group" },
      ageGroupPlaceholder: {
        de: "Altersgruppe (z.B.: 2,4,6)",
        en: "Type Age Group, (Ex: 2,4,6)",
      },
      numberOfPerson: { de: "Anzahl Personen", en: "Number of person" },
      tellWhat: {
        de: "Erzählen Sie {name}, was zu erwarten ist",
        en: "Tell {name} what to expect",
      },
      expectPlaceholder: {
        de: "Besondere Anforderungen, Allergien, Routinen...",
        en: "Any special requirements, allergies, routines, or things you would like to share...",
      },
      location: { de: "Standort", en: "Location" },
      atOurHome: { de: "Bei uns zu Hause", en: "At our home" },
      atProviderPlace: { de: "Bei {name} zu Hause", en: "At {name}'s place" },
      willMeal: {
        de: "Mahlzeit während der Buchung wird bereitgestellt",
        en: "Will provide a meal during the booking",
      },
      havePets: {
        de: "Wir haben Haustiere zu Hause",
        en: "We have pets at home",
      },
      back: { de: "Zurück", en: "Back" },
      next: { de: "Buchung überprüfen", en: "Review booking" },
      ageRequired: {
        de: "Altersgruppe ist erforderlich",
        en: "Age group is required",
      },
    },
    s4: {
      tag: { de: "04 — ÜBERPRÜFUNG", en: "04 — REVIEW" },
      heading: {
        de: "Sieht alles richtig aus?",
        en: "Does everything look right?",
      },
      children: { de: "Personen", en: "Children" },
      person: { de: "Person", en: "person" },
      persons: { de: "Personen", en: "persons" },
      paymentSummary: { de: "Zahlungsübersicht", en: "Payment summary" },
      serviceFee: { de: "Servicegebühr (5%)", en: "Service fee (5%)" },
      total: { de: "Gesamt", en: "Total" },
      receivesAfter: {
        de: "{name} erhält {amount} nach Plattform-Provision",
        en: "{name} receives {amount} after platform commission",
      },
      paymentMethod: { de: "Zahlungsmethode", en: "Payment method" },
      twint: { de: "TWINT", en: "TWINT" },
      twintSub: { de: "Schweizer Mobile-Zahlung", en: "Swiss mobile payment" },
      card: { de: "Karte", en: "Card" },
      cardSub: { de: "Visa, Mastercard, Amex", en: "Visa, Mastercard, Amex" },
      payOnly: {
        de: "Zahlung erst bei Bestätigung von {name}",
        en: "Pay only when {name} confirms",
      },
      cancel24: { de: "24h kostenlose Stornierung", en: "Cancel 24h free" },
      encrypted: { de: "Verschlüsselte Zahlung", en: "Encrypted payment" },
      iAgree: { de: "Ich stimme den", en: "I agree to Weligo's" },
      terms: { de: "AGB", en: "Terms of Service" },
      and: { de: "und der", en: "and" },
      cancellation: {
        de: "Stornierungsrichtlinie zu",
        en: "Cancellation Policy",
      },
      back: { de: "Zurück", en: "Back" },
      confirm: { de: "Buchung bestätigen", en: "Confirm Booking" },
      mustAgree: {
        de: "Bitte den Bedingungen zustimmen",
        en: "Please agree to the terms",
      },
    },
    s5: {
      allBooked: { de: "Alles gebucht.", en: "All booked." },
      seeYou: { de: "Wir sehen uns {day}.", en: "See you {day}." },
      notified: {
        de: "{name} wurde benachrichtigt und bestätigt normalerweise innerhalb einer Stunde.",
        en: "{name} has been notified and usually confirms within an hour.",
      },
      paymentHeld: {
        de: "Ihre Zahlung wird sicher gehalten, bis die Buchung beginnt.",
        en: "Your payment is held securely until the booking begins.",
      },
      date: { de: "Datum", en: "Date" },
      time: { de: "Zeit", en: "Time" },
      location: { de: "Standort", en: "Location" },
      totalPaid: { de: "Gesamtbetrag bezahlt", en: "Total paid" },
      bookingId: { de: "Buchungs-ID", en: "Booking ID" },
      whatHappens: {
        de: "Was passiert als Nächstes?",
        en: "What happens next?",
      },
      step1Title: { de: "{name} bestätigt", en: "{name} confirms" },
      step1Desc: {
        de: "Normalerweise innerhalb 1 Stunde",
        en: "Usually within 1 hour via email and notification",
      },
      step2Title: {
        de: "Zahlung gehalten bis zur Buchung",
        en: "Payment held until booking starts",
      },
      step2Desc: {
        de: "Kostenlose Stornierung bis 24h vorher",
        en: "Cancel free up to 24h before",
      },
      step3Title: {
        de: "Bewerten Sie Ihre Erfahrung",
        en: "Rate your experience",
      },
      step3Desc: {
        de: "Helfen Sie anderen Familien tolle Anbieter zu finden",
        en: "Help future families find great providers",
      },
      browseMore: {
        de: "Weitere Anbieter ansehen",
        en: "Browse more providers",
      },
      backHome: { de: "Zurück zur Startseite", en: "Back to home" },
    },
    summary: {
      title: { de: "BUCHUNGSÜBERSICHT", en: "BOOKING SUMMARY" },
      date: { de: "Datum", en: "Date" },
      time: { de: "Zeit", en: "Time" },
      duration: { de: "Dauer", en: "Duration" },
      location: { de: "Standort", en: "Location" },
      notSelected: { de: "Noch nicht ausgewählt", en: "Not selected yet" },
      subtotal: { de: "Zwischensumme", en: "Subtotal" },
      serviceFee: { de: "Servicegebühr (5%)", en: "Service fee (5%)" },
      total: { de: "Gesamt", en: "Total" },
      paymentHeld: {
        de: "Zahlung gehalten bis {name} bestätigt",
        en: "Payment held until {name} confirms",
      },
    },
    footer: {
      tagline: { de: "Pflege, einfach gemacht.", en: "Care, made simple." },
      platform: { de: "Plattform", en: "Platform" },
      families: { de: "Familien", en: "Families" },
      providers: { de: "Anbieter", en: "Providers" },
      legal: { de: "Rechtliches", en: "Legal" },
      howItWorks: { de: "So funktioniert's", en: "How It Works" },
      aboutUs: { de: "Über uns", en: "About us" },
      trust: { de: "Vertrauen & Sicherheit", en: "Trust & Safety" },
      contact: { de: "Kontakt", en: "Contact" },
      forFamilies: { de: "Für Familien", en: "For Families" },
      findChildcare: { de: "Kinderbetreuung finden", en: "Find Childcare" },
      findSenior: { de: "Seniorenbetreuung finden", en: "Find Senior Care" },
      forProviders: { de: "Für Anbieter", en: "For Providers" },
      becomeCaregiver: { de: "Betreuer werden", en: "Become a Caregiver" },
      helpCenter: { de: "Hilfezentrum", en: "Help Center" },
      terms: { de: "AGB", en: "Terms" },
      privacy: { de: "Datenschutz", en: "Privacy" },
      cookies: { de: "Cookies", en: "Cookies" },
      copyright: {
        de: "© 2026 Weligo. Alle Rechte vorbehalten.",
        en: "© 2026 Weligo. All rights reserved.",
      },
    },
    toast: {
      bookingConfirmed: { de: "Buchung bestätigt!", en: "Booking confirmed!" },
      savedDraft: { de: "Entwurf gespeichert", en: "Draft saved" },
    },
  },
  providers: {
    // eyebrow: { de: "LEISTUNGEN", en: "SERVICES" },
    titleA: {
      de: "Betreuung, die zu dir kommt",
      en: "Find trusted",
    },
    titleB: { de: "wo du bist.", en: "childcare" },
    titleC: { de: "wo du bist.", en: "near you" },
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

    // titleA: { de: "Verfügbare", en: "Available" },
    // titleB: { de: "Betreuer:innen", en: "Providers" },
    // titleC: { de: "in deiner Nähe", en: "near you" },
    searchPlaceholder: {
      de: "Nach Name oder Adresse suchen",
      en: "Search by name or address",
    },
    mapSearchPlaceholder: {
      de: "Ort auf der Karte suchen",
      en: "Search a place on the map",
    },
    sortBy: { de: "Sortieren nach", en: "Sort by" },
    sort: {
      nearest: { de: "In der Nähe", en: "Nearest" },
      topRated: { de: "Am besten bewertet", en: "Top rated" },
      priceLow: { de: "Preis (aufsteigend)", en: "Price (Low > High)" },
      priceHigh: { de: "Preis (absteigend)", en: "Price (High > Low)" },
    },
    loadingCount: {
      de: "Anbieter:innen werden geladen…",
      en: "Loading providers…",
    },
    foundCount: {
      de: "{count} Anbieter:innen gefunden",
      en: "{count} Providers found",
    },
    noResultsTitle: {
      de: "Keine Anbieter:innen gefunden",
      en: "No providers found",
    },
    noResultsSub: {
      de: "Versuche es mit anderen Suchbegriffen oder Filtern.",
      en: "Try adjusting your search or filters.",
    },
    error: {
      de: "Anbieter:innen konnten nicht geladen werden. Bitte versuche es erneut.",
      en: "Couldn't load providers. Please try again.",
    },
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

  app: {
    name: { de: "Weligo", en: "Weligo" },
  },
  navbar: {
    overview: { de: "Überblick", en: "Overview" },
    bookings: { de: "Buchungen", en: "Bookings" },
    calendar: { de: "Kalender", en: "Calendar" },
    message: { de: "Nachrichten", en: "Message" },
    favorites: { de: "Favoriten", en: "Favorites" },
    transactions: { de: "Transaktionen", en: "Transactions" },
    earnings: { de: "Einnahmen", en: "Earnings" },
    reviews: { de: "Bewertungen", en: "Reviews" },
    helpSupport: { de: "Hilfe & Support", en: "Help & Support" },
    profileSettings: { de: "Profileinstellungen", en: "Profile Settings" },
  },
  bookingStatus: {
    upcoming: { de: "Bevorstehend", en: "Upcoming" },
    awaitingConfirmation: {
      de: "Bestätigung ausstehend",
      en: "Awaiting Confirmation",
    },
    awaitingPayment: { de: "Zahlung ausstehend", en: "Awaiting Payment" },
    inProgress: { de: "In Bearbeitung", en: "In Progress" },
    completed: { de: "Abgeschlossen", en: "Completed" },
    requested: { de: "Angefragt", en: "Requested" },
    pending: { de: "Ausstehend", en: "Pending" },
    cancelled: { de: "Storniert", en: "Cancelled" },
    paid: { de: "Bezahlt", en: "Paid" },
    report: {
      de: "Problem melden",
      en: "Report an Issue",
    },
  },
  provider: {
    earnings: { de: "Einnahmen", en: "Earnings" },
    totalEarned: { de: "Gesamteinnahmen", en: "Total earned" },
    pendingPayout: { de: "Ausstehende Auszahlung", en: "Pending payout" },
    paidOut: { de: "Ausgezahlt", en: "Paid Out" },
    yourCalendar: { de: "Ihr Kalender", en: "Your Calendar" },
    earningsOverview: { de: "Einnahmenübersicht", en: "Earnings overview" },
    yourClients: { de: "Ihre Klienten", en: "Your Clients" },
    id: { de: "ID", en: "ID" },
    clientName: { de: "Kundenname", en: "Client Name" },
    gross: { de: "Brutto", en: "Gross" },
    commission: { de: "Provision", en: "Commission" },
    netPayout: { de: "Nettoauszahlung", en: "Net payout" },
    addEvent: { de: "Termin hinzufügen", en: "Add Event" },
    eventTitle: { de: "Titel", en: "Event title" },
    eventDate: { de: "Datum", en: "Date" },
    eventStart: { de: "Start", en: "Start" },
    eventEnd: { de: "Ende", en: "End" },
    save: { de: "Speichern", en: "Save" },
    delete: { de: "Löschen", en: "Delete" },
    eventSaved: { de: "Termin gespeichert", en: "Event saved" },
    eventDeleted: { de: "Termin gelöscht", en: "Event deleted" },
  },

  overview: {
    title: { de: "Überblick", en: "Overview" },
    hello: { de: "Hallo", en: "Hello" },
    upcomingBookings: {
      de: "Bevorstehende Buchungen",
      en: "Upcoming Bookings",
    },
    completedBookings: {
      de: "Abgeschlossene Buchungen",
      en: "Completed bookings",
    },
    averageRating: { de: "Durchschnittliche Bewertung", en: "Average rating" },
    totalSpent: { de: "Gesamtausgaben", en: "Total spent" },
    nextBooking: { de: "Nächste Buchung", en: "Next Booking" },
    recentMessages: { de: "Neueste Nachrichten", en: "Recent Messages" },
    yourBookings: { de: "Ihre Buchungen", en: "Your Bookings" },
    yourFavorites: { de: "Ihre Favoriten", en: "Your Favorites" },
    spendingOverview: { de: "Ausgabenübersicht", en: "Spending overview" },
    viewAll: { de: "Alle anzeigen", en: "View All" },
    sendMessage: { de: "Nachricht senden", en: "Send Message" },
    viewDetails: { de: "Details anzeigen", en: "View Details" },
    date: { de: "Datum", en: "Date" },
    time: { de: "Zeit", en: "Time" },
    location: { de: "Standort", en: "Location" },
    atOurHome: { de: "Bei uns zu Hause", en: "At our home" },
  },
  bookings: {
    title: { de: "Meine Buchungen", en: "My bookings" },
    all: { de: "Alle", en: "All" },
    search: { de: "Suchen...", en: "Search..." },
    id: { de: "ID", en: "ID" },
    provider: { de: "Anbieter", en: "Provider Name" },
    service: { de: "Service", en: "Service" },
    date: { de: "Datum", en: "Date" },
    time: { de: "Zeit", en: "Time" },
    amount: { de: "Betrag", en: "Amount" },
    status: { de: "Status", en: "Status" },
    action: { de: "Aktion", en: "Action" },
    previous: { de: "Zurück", en: "Previous" },
    next: { de: "Weiter", en: "Next" },
  },
  details: {
    bookingHeading: { de: "Buchung", en: "Booking" },
    bookedOn: { de: "Gebucht am", en: "Booked on" },
    bookingDetails: { de: "Buchungsdetails", en: "Booking details" },
    payment: { de: "Zahlung", en: "Payment" },
    actions: { de: "Aktionen", en: "Actions" },
    yourReview: { de: "Ihre Bewertung", en: "Your Review" },
    service: { de: "Service", en: "Service" },
    date: { de: "Datum", en: "Date" },
    time: { de: "Zeit", en: "Time" },
    duration: { de: "Dauer", en: "Duration" },
    location: { de: "Standort", en: "Location" },
    address: { de: "Adresse", en: "Address" },
    notes: { de: "Notizen", en: "Notes" },
    noNotes: { de: "Keine Notizen", en: "No notes added" },
    hourlyRate: { de: "Stundensatz", en: "Hourly rate" },
    serviceFee: { de: "Servicegebühr", en: "Service fee" },
    total: { de: "Gesamt", en: "Total" },
    downloadInvoice: { de: "Rechnung herunterladen", en: "Download Invoice" },
    paymentHeld: {
      de: "Zahlung wird von Weligo gehalten, bis beide Parteien die Buchung als abgeschlossen bestätigen.",
      en: "Payment held by Weligo until booking is confirmed complete by both parties.",
    },
    reviewsAway: { de: "Bewertungen", en: "reviews" },
    kmAway: { de: "km entfernt", en: "km away" },
    markComplete: { de: "Als abgeschlossen markieren", en: "Mark As Complete" },
    rescheduleBooking: { de: "Buchung verschieben", en: "Reschedule Booking" },
    cancelBooking: { de: "Buchung stornieren", en: "Cancel booking" },
    learnMore: { de: "Mehr erfahren", en: "Learn more" },
    leaveReview: { de: "Bewertung abgeben", en: "Leave Review" },
    rebook: { de: "Erneut buchen", en: "Rebook" },
    messageProvider: { de: "Nachricht senden", en: "Message" },
    withdrawRequest: { de: "Anfrage zurückziehen", en: "Withdraw Request" },
    helpFamilies: {
      de: "Ihre Sitzung ist abgeschlossen. Helfen Sie anderen Familien mit einer ehrlichen Bewertung.",
      en: "Your session is complete. Help other families by leaving an honest review.",
    },
    sessionInProgress: {
      de: "Ihre Sitzung läuft gerade. Sie werden gebeten zu bestätigen, sobald der Anbieter die Sitzung als abgeschlossen markiert.",
      en: "Your session is currently in progress. You'll be asked to confirm once {provider} marks it complete.",
    },
    providerMarkedComplete: {
      de: "{provider} hat diese Sitzung als abgeschlossen markiert. Bitte bestätigen Sie, um die Zahlung freizugeben.",
      en: "{provider} has marked this session as complete. Please confirm to release their payment.",
    },
    cancellationPolicy: {
      de: "Kostenlose Stornierung bis 24 Stunden vor Buchungsbeginn. Danach fällt eine Gebühr von 50% an.",
      en: "Free cancellation up to 24 hours before the booking starts. After that, a 50% fee applies.",
    },
    waitingProvider: {
      de: "Warten auf Bestätigung von {provider}. Es fällt keine Belastung an, bis bestätigt wird.",
      en: "Waiting for {provider} to accept your request. You won't be charged until they confirm.",
    },
    providerReplied: { de: "antwortete", en: "replied" },
  },
  reportIssue: {
    title: { de: "Problem melden", en: "Report an issue" },
    description: {
      de: "Erzählen Sie uns, was bei dieser Buchung passiert ist. Unser Trust & Safety-Team prüft jede Meldung innerhalb von 24 Stunden, Ihre Identität bleibt vertraulich.",
      en: "Tell us what happened with this booking. Our Trust & Safety team reviews every report within 24 hours and your identity stays confidential.",
    },
    reasonLabel: { de: "Grund", en: "Reason" },
    reasons: {
      noShow: { de: "Nicht erschienen", en: "No-show" },
      inappropriateBehavior: {
        de: "Unangemessenes Verhalten",
        en: "Inappropriate behavior",
      },
      safetyConcern: { de: "Sicherheitsbedenken", en: "Safety concern" },
      paymentIssue: { de: "Zahlungsproblem", en: "Payment issue" },
      communicationIssue: {
        de: "Kommunikationsproblem",
        en: "Communication issue",
      },
      other: { de: "Sonstiges", en: "Other" },
    },
    detailsPlaceholder: {
      de: "Weitere Details hinzufügen (optional)",
      en: "Add more details (optional)",
    },
    reasonRequired: {
      de: "Bitte wählen Sie einen Grund aus",
      en: "Please select a reason",
    },
    cancel: { de: "Abbrechen", en: "Cancel" },
    submit: { de: "Meldung senden", en: "Submit report" },
  },
  form: {
    sendMessage: { de: "Nachricht senden", en: "Send Message" },
    messageLabel: { de: "Nachricht", en: "Message" },
    messagePlaceholder: {
      de: "Schreiben Sie Ihre Nachricht...",
      en: "Write your message...",
    },
    send: { de: "Senden", en: "Send" },
    cancel: { de: "Abbrechen", en: "Cancel" },
    required: { de: "Pflichtfeld", en: "Required" },
    tooShort: {
      de: "Mindestens 3 Zeichen",
      en: "Must be at least 3 characters",
    },
  },
  toast: {
    messageSent: { de: "Nachricht gesendet", en: "Message sent" },
    messageFailed: {
      de: "Senden fehlgeschlagen",
      en: "Failed to send message",
    },
    bookingCancelled: { de: "Buchung storniert", en: "Booking cancelled" },
    requestWithdrawn: { de: "Anfrage zurückgezogen", en: "Request withdrawn" },
    markedComplete: {
      de: "Als abgeschlossen markiert",
      en: "Booking marked as complete",
    },
    rescheduleSoon: { de: "Bald verfügbar", en: "Rescheduling coming soon" },
    invoiceDownloaded: {
      de: "Rechnung wird heruntergeladen",
      en: "Invoice download started",
    },
  },
} as const;

type TranslateParams = Record<string, string | number>;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (path: string, params?: TranslateParams) => string;
};
const I18nContext = createContext<Ctx | null>(null);

function resolve(obj: any, path: string): any {
  return path.split(".").reduce((a, k) => (a ? a[k] : undefined), obj);
}

// Change this

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = useCallback(
    (path: string, params?: Record<string, string | number>) => {
      const node = resolve(dict, path);

      if (node && typeof node === "object" && lang in node) {
        let text = String(node[lang]);

        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            text = text.replaceAll(`{${key}}`, String(value));
          });
        }

        return text;
      }

      return path;
    },
    [lang],
  );
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
