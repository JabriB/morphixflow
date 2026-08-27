/**
 * Single source of truth for all site copy.
 *
 * Copy rules applied here (from the design direction):
 *  - No eyebrow/kicker labels above headings, and no "01 / 02" section numbers.
 *    Headings carry their own weight.
 *  - No em or en dashes. German sentences are split or restructured instead.
 *  - Middle dots rationed to at most one per line.
 */

export const site = {
  name: 'MorphixFlow',
  locale: 'de_DE',
  /* The market this site presents itself to, used in marketing copy and the
     footer. NOT an address: the registered seat is `legal.city` (Düren) and
     that is what the Impressum, the Datenschutzerklärung and the schema.org
     PostalAddress use. The two are deliberately allowed to differ. */
  city: 'Aachen',
  country: 'Deutschland',
  email: 'hello@morphixflow.io',

  /** wa.me format: country code plus number, digits only, no plus or spaces. */
  whatsappNumber: '4915755588142',
  whatsappMessage: 'Hallo! Ich interessiere mich für eure Leistungen.',

  meta: {
    title: 'MorphixFlow. Webseiten, Automationen und Werbekampagnen.',
    description:
      'MorphixFlow baut Webseiten, AI Automationen und Werbekampagnen aus einer Hand. Persönliche Beratung aus dem Raum Aachen und Düren. Kostenlose Erstberatung per WhatsApp.',
    ogDescription:
      'Mehr Kunden. Mehr Umsatz. Webseiten, AI Automationen und Werbekampagnen aus einer Hand, persönlich beraten aus dem Raum Aachen.',
  },
} as const

/* ─── Legal identity ──────────────────────────────────────────────
   The only place the Impressum's mandatory §5 DDG details live. Fill
   every field before launch.

   While anything here is still blank, `legalIsComplete()` returns false,
   which keeps the draft banner on both legal pages and keeps the whole
   site out of search indexes. That coupling is deliberate: an incomplete
   Impressum on an indexed German commercial site is an Abmahnung waiting
   to happen, so the two states are not allowed to drift apart.
   ──────────────────────────────────────────────────────────────── */

export const legal: {
  /** Trading name. Shown above the owner's name. */
  businessName: string
  /** Full legal name of the natural person operating the business. */
  fullName: string
  street: string
  postalCode: string
  /** The registered seat. Not necessarily the same as `site.city`, which is
      a market, not an address. */
  city: string
  phone: string
  /** USt-IdNr. Leave blank and set kleinunternehmer if §19 UStG applies. */
  vatId: string
  kleinunternehmer: boolean
} = {
  businessName: 'MorphixFlow',
  fullName: 'Brhan Jabri',
  street: 'Schoellerstr. 33',
  postalCode: '52351',
  city: 'Düren',
  phone: '+49 1575 5588142',
  /* TODO(owner): eines von beiden setzen. Solange beide leer bzw. false sind,
     bleibt der Entwurfshinweis stehen und die Seite auf noindex. Entweder die
     USt-IdNr. eintragen, oder kleinunternehmer auf true setzen, falls die
     Kleinunternehmerregelung nach §19 UStG greift. */
  vatId: '',
  kleinunternehmer: false,
}

/**
 * Details §5 DDG requires unconditionally. While any of these is blank the
 * Impressum is genuinely incomplete, so the page carries a warning and the
 * whole site stays out of search indexes.
 */
export function missingLegalFields(): string[] {
  const missing: string[] = []
  if (!legal.fullName) missing.push('Vollständiger Name')
  if (!legal.street) missing.push('Straße und Hausnummer')
  if (!legal.postalCode) missing.push('PLZ')
  if (!legal.city) missing.push('Ort')
  if (!legal.phone) missing.push('Telefonnummer')
  return missing
}

/**
 * The tax section, which is conditional rather than unconditional.
 *
 * §5 Abs. 1 Nr. 6 DDG requires the USt-IdNr only "sofern vorhanden". A business
 * without one lawfully omits the section, so a blank field cannot by itself
 * make the Impressum incomplete and must not block indexing.
 *
 * The catch is that a blank field cannot distinguish "has none" from "has one
 * and has not entered it yet". Only the owner knows which, so this surfaces as
 * a development-time reminder rather than a public warning.
 *
 * If a USt-IdNr exists, stating it is NOT optional.
 */
export function vatStatusUndeclared(): boolean {
  return !legal.vatId && !legal.kleinunternehmer
}

/** True once every unconditionally required Impressum detail is present. */
export function legalIsComplete(): boolean {
  return missingLegalFields().length === 0
}

/* ─── Navigation ──────────────────────────────────────────────────── */

export const navLinks = [
  { label: 'Start', href: '#start' },
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Prozess', href: '#prozess' },
  { label: 'Pakete', href: '#pakete' },
  { label: 'Kontakt', href: '#kontakt' },
] as const

export const navCta = {
  short: 'Kostenlos beraten',
  long: 'Kostenlos beraten lassen',
} as const

export const whatsappWidget = {
  ariaLabel: 'WhatsApp Kontakt öffnen',
  heading: 'Womit können wir starten',
  presets: [
    {
      icon: 'Rocket',
      label: 'Website modernisieren',
      message: '🚀 Ich möchte meine Website modernisieren.',
    },
    {
      icon: 'Lightning',
      label: 'AI Automatisierung',
      message: '⚡ Ich brauche AI Automatisierung.',
    },
    {
      icon: 'ChatCircleDots',
      label: 'Allgemeine Frage',
      message: '💬 Ich habe eine allgemeine Frage.',
    },
  ],
} as const

/* ─── Hero ────────────────────────────────────────────────────────── */

export const hero = {
  headline: ['Mehr Kunden.', 'Mehr Umsatz.'],
  subtext:
    'Webseiten, Automationen und Werbekampagnen aus einer Hand. Messbar mehr Umsatz, in 14 Tagen startklar.',
  subtextEmphasis: 'Messbar mehr Umsatz, in 14 Tagen startklar.',
  primaryCta: 'Kostenlos beraten lassen',
  secondaryCta: 'Pakete ansehen',
  /** The part of `subtext` before `subtextEmphasis`, set at full ink. */
  subtextLead: 'Webseiten, Automationen und Werbekampagnen aus einer Hand.',
  trustNote: 'Unverbindlich, ohne Verkaufsdruck. Antwort meist in unter 24 Stunden.',
  scrollLabel: 'Weiter zu den Leistungen',
} as const

/* ─── Interface strings ───────────────────────────────────────────
   Labels that are never read as prose but are still read aloud:
   landmark names, control labels and units. These lived inline in the
   components and silently stayed German in every locale.
   ──────────────────────────────────────────────────────────────── */

export const ui = {
  homeLabel: 'MorphixFlow, zum Seitenanfang',
  mainNav: 'Hauptnavigation',
  mobileNav: 'Mobile Navigation',
  footerNav: 'Footer Navigation',
  chooseSolution: 'Lösung wählen',
  filterProjects: 'Projekte nach Leistung filtern',
  chooseDevice: 'Gerät wählen',
  daysEstimate: 'Tage geschätzte Laufzeit',
  monthsToPayback: 'Monate bis zur Amortisation',
  askQuestion: 'Frage direkt stellen',
  askQuestionMessage: 'Hallo! Ich habe noch eine Frage zu euren Leistungen.',
  menuOpen: 'Menü öffnen',
  menuClose: 'Menü schließen',
  /** Connector in "ca. 6 bis 7 Tage". */
  rangeTo: 'bis',
  durationRange: 'ca. {low} bis {high} Tage',
} as const

/* ─── Toolchain ───────────────────────────────────────────────────
   The stack actually used in delivery. Named honestly: these are
   tools, not client logos, and the strip is labelled as such so it
   never reads as borrowed credibility.
   ──────────────────────────────────────────────────────────────── */

export const toolchain = {
  label: 'Gebaut mit',
  items: [
    'Next.js',
    'React',
    'TypeScript',
    'Vercel',
    'n8n',
    'Make.com',
    'HubSpot',
    'Meta Ads',
    'Google Ads',
    'TikTok Ads',
    'Stripe',
    'Figma',
  ],
} as const

/* ─── Proof figures ───────────────────────────────────────────────
   Shown once, in Results only. The old build repeated the same four
   numbers in the hero and again in Results.
   TODO(real-value): confirm these are defensible before launch.
   ──────────────────────────────────────────────────────────────── */

export const figures = [
  { value: '50+', label: 'Projekte umgesetzt' },
  { value: '98%', label: 'Kundenzufriedenheit' },
  { value: '3x', label: 'Durchschnittlicher ROI' },
  { value: '24h', label: 'Antwortzeit' },
] as const

/* ─── Services ────────────────────────────────────────────────────── */

export type ServiceSlug = 'web' | 'automation' | 'ads'

export const servicesIntro = {
  heading: 'Alles was dein Business braucht',
  subtext:
    'Von der Webseite bis zur Werbekampagne. Jede Leistung zahlt direkt auf mehr Umsatz und weniger Aufwand für dich ein.',
} as const

export const services: ReadonlyArray<{
  slug: ServiceSlug
  name: string
  body: string
  tags: readonly string[]
}> = [
  {
    slug: 'web',
    name: 'Web Development',
    body: 'Professionelle Webseiten, Landing Pages, Web Apps und E-Commerce, komplett nach deinen Vorstellungen. Design, Farben, Logo. Du entscheidest.',
    tags: ['Webseite', 'Landing Page', 'Web App', 'E-Commerce'],
  },
  {
    slug: 'automation',
    name: 'AI Automationen',
    body: 'Intelligente Workflow-Automationen die dein Business auf Autopilot stellen. CRM, Lead-Generierung, E-Mail und mehr, powered by KI.',
    tags: ['n8n', 'Make.com', 'CRM-Sync', 'AI-Powered'],
  },
  {
    slug: 'ads',
    name: 'Werbe Kampagnen',
    body: 'Datengetriebene Werbekampagnen auf Meta, TikTok und Google Ads. Maximale Reichweite, echte Conversions.',
    tags: ['Meta Ads', 'TikTok Ads', 'Google Ads', 'Retargeting'],
  },
]

/* ─── Craft & Performance Showcase ────────────────────────────────── */

export const showcaseIntro = {
  heading: 'Handwerk, das man sofort spürt',
  subtext:
    'Ein Blick hinter die Kulissen. So fühlt sich eine Seite an, die wir gebaut haben, auf jedem Gerät.',
  disclaimer:
    'Beispielhafte Werte zur Veranschaulichung. Keine Messung deiner aktuellen Seite.',
} as const

export const showcaseDevices = [
  { id: 'desktop', label: 'Desktop', frameWidth: 16, frameHeight: 10 },
  { id: 'tablet', label: 'Tablet', frameWidth: 4, frameHeight: 3 },
  { id: 'mobile', label: 'Mobile', frameWidth: 9, frameHeight: 19 },
] as const

export type DeviceId = (typeof showcaseDevices)[number]['id']

export const performanceComparison = [
  { metric: 'Lighthouse Score', unit: '/100', wordpress: 42, morphixflow: 100, higherIsBetter: true },
  { metric: 'Ladezeit (LCP)', unit: 's', wordpress: 4.2, morphixflow: 0.6, higherIsBetter: false },
  { metric: 'Interaktionsbereit (TTI)', unit: 's', wordpress: 6.8, morphixflow: 0.9, higherIsBetter: false },
  { metric: 'Seitengewicht', unit: 'MB', wordpress: 4.8, morphixflow: 0.8, higherIsBetter: false },
] as const

/* ─── Process ─────────────────────────────────────────────────────── */

export const processIntro = {
  heading: 'So arbeiten wir zusammen',
  subtext: 'Von der ersten Idee bis zum fertigen Ergebnis. Transparent und persönlich, in 14 Tagen live.',
} as const

export const processSteps = [
  {
    day: 'Tag 1',
    dayRange: 'Tag 1 bis 3',
    name: 'Kostenlose Beratung',
    body: 'Wir sprechen 1:1 per WhatsApp Video oder Anruf. Du erzählst mir deine Ziele, ich zeige dir den besten Weg.',
  },
  {
    day: 'Tag 4',
    dayRange: 'Tag 4 bis 8',
    name: 'Individuelles Konzept',
    body: 'Du bekommst ein maßgeschneidertes Angebot. Kein Copy-Paste. Jedes Projekt wird nach deinen genauen Wünschen geplant.',
  },
  {
    day: 'Tag 9',
    dayRange: 'Tag 9 bis 13',
    name: 'Umsetzung & Launch',
    body: 'Ich entwickle dein Projekt mit höchster Qualität. Pünktlich, transparent und mit dir im regelmäßigen Austausch.',
  },
  {
    day: 'Tag 14',
    dayRange: 'Ab Tag 14',
    name: 'Wachstum & Optimierung',
    body: 'Nach dem Launch bist du nicht allein. Laufende Optimierung, Support und Skalierung für nachhaltige Ergebnisse.',
  },
] as const

export const processNote = {
  before: 'Jedes Paket beinhaltet eine ',
  emphasis: '1:1 WhatsApp Video oder Anruf Beratung',
} as const

/* ─── Results ─────────────────────────────────────────────────────── */

export const resultsIntro = {
  heading: 'Zahlen sprechen für sich',
  subtext: 'Umsatz, Zeitersparnis und Sichtbarkeit, die sich in echten Kundenzahlen zeigen.',
  projectsHeading: 'Beispiel-Projekte',
  filterAll: 'Alle',
} as const

export const projects: ReadonlyArray<{
  name: string
  category: string
  result: string
  slug?: ServiceSlug
}> = [
  {
    name: 'Online-Shop Launch',
    category: 'E-Commerce, Webseite',
    result: '+180% Umsatz im ersten Monat',
    slug: 'web',
  },
  {
    name: 'Lead Automation',
    category: 'AI Automation, CRM',
    result: '40 Stunden pro Monat gespart',
    slug: 'automation',
  },
  {
    name: 'Meta Ads Kampagne',
    category: 'Facebook & Instagram Ads',
    result: '4,2x ROAS erzielt',
    slug: 'ads',
  },
]

/* ─── Reviews ─────────────────────────────────────────────────────── */

export const reviewsIntro = {
  heading: 'Was Kunden sagen',
  subtext: 'Echte Erfahrungen echter Kunden, direkt von Google.',
  ctaLine: 'Überzeuge dich selbst und werde der nächste Erfolg.',
  ctaLabel: 'Kostenlos starten',
} as const

export const reviews = [
  {
    name: 'Lena Hoffmann',
    initials: 'LH',
    when: 'vor 2 Wochen',
    rating: 5,
    body: 'Absolut top! MorphixFlow hat unsere neue Website innerhalb kürzester Zeit umgesetzt. Modern, schnell und genau nach unseren Vorstellungen. Die WhatsApp-Kommunikation war super unkompliziert.',
  },
  {
    name: 'Marco Schneider',
    initials: 'MS',
    when: 'vor 1 Monat',
    rating: 5,
    body: 'Die AI-Automation hat uns wöchentlich Stunden gespart. Lead-Erfassung, CRM-Sync, E-Mail-Follow-ups. Alles läuft jetzt automatisch. Die Investition hat sich bereits im ersten Monat rentiert.',
  },
  {
    name: 'Sophie Wagner',
    initials: 'SW',
    when: 'vor 3 Wochen',
    rating: 5,
    body: 'Unsere Meta-Kampagne hat einen ROAS von 4,8x erzielt. Sehr professionelle Betreuung, schnelle Reaktionszeiten und transparente Reportings. Klare Empfehlung für jeden, der online wachsen will!',
  },
  {
    name: 'Felix Bauer',
    initials: 'FB',
    when: 'vor 5 Wochen',
    rating: 5,
    body: 'E-Commerce-Shop von Grund auf neu aufgebaut. Design war genau was ich mir vorgestellt hatte, mobile Optimierung perfekt. Der Google Ads ROI hat sich in 6 Wochen verdreifacht.',
  },
  {
    name: 'Anna Müller',
    initials: 'AM',
    when: 'vor 2 Monaten',
    rating: 5,
    body: 'Dank AI SEO ranken wir jetzt für unsere wichtigsten Keywords auf Seite 1. MorphixFlow erklärt alles verständlich und liefert messbare Ergebnisse. Sehr zu empfehlen!',
  },
  {
    name: 'Jonas Weber',
    initials: 'JW',
    when: 'vor 6 Wochen',
    rating: 5,
    body: 'Landing Page und TikTok-Ads-Kampagne in unter 2 Wochen live. Conversion-Rate ist deutlich gestiegen. Super netter Kontakt über WhatsApp, immer erreichbar und hilfsbereit.',
  },
] as const

/* ─── ROI Rechner ─────────────────────────────────────────────────── */

export const calculatorIntro = {
  heading: 'Was würde sich für dich lohnen',
  subtext: 'Wähle deine Lösung und bewege den Regler. Die Zahlen passen sich sofort an.',
  cta: 'Ergebnis per WhatsApp besprechen',
} as const

export const calculatorDisclaimer =
  'Richtwerte auf Basis bisheriger Projekte. Dein individuelles Angebot besprechen wir persönlich per WhatsApp.'

export const calculatorContent: Record<
  ServiceSlug,
  {
    sliderLabel: string
    sliderMin: number
    sliderMax: number
    sliderStep: number
    sliderUnit: string
    sliderDefault: number
    baseDurationDays: number
    durationPerUnitDays: number
    valuePerUnit: number
    valueLabel: string
    valueNote: string
    relevantPackageId: (typeof packages)[number]['id']
    waMessageTemplate: string
  }
> = {
  web: {
    sliderLabel: 'Wie viele Unterseiten brauchst du etwa',
    sliderMin: 1,
    sliderMax: 20,
    sliderStep: 1,
    sliderUnit: 'Unterseiten',
    sliderDefault: 5,
    baseDurationDays: 4,
    durationPerUnitDays: 0.5,
    valuePerUnit: 40,
    valueLabel: 'Geschätzter zusätzlicher Umsatz pro Monat',
    valueNote: 'Angenommener Umsatzwert: 40 € pro Unterseite und Monat.',
    relevantPackageId: 'essential',
    waMessageTemplate:
      'Hallo! Ich interessiere mich für eine Webseite mit etwa {value} Unterseiten. Geschätzte Laufzeit laut Rechner: {duration}.',
  },
  automation: {
    sliderLabel: 'Wie viele Stunden manuelle Arbeit pro Woche willst du automatisieren',
    sliderMin: 1,
    sliderMax: 40,
    sliderStep: 1,
    sliderUnit: 'Stunden pro Woche',
    sliderDefault: 10,
    baseDurationDays: 5,
    durationPerUnitDays: 0.3,
    valuePerUnit: 150,
    valueLabel: 'Geschätzter Wert der eingesparten Zeit pro Monat',
    valueNote: 'Angenommener Stundensatz: 35 €, hochgerechnet auf einen Monat.',
    relevantPackageId: 'customized',
    waMessageTemplate:
      'Hallo! Ich möchte etwa {value} Stunden pro Woche automatisieren. Geschätzte Laufzeit laut Rechner: {duration}.',
  },
  ads: {
    sliderLabel: 'Wie hoch ist dein geplantes monatliches Werbebudget',
    sliderMin: 300,
    sliderMax: 10000,
    sliderStep: 100,
    sliderUnit: '€ pro Monat',
    sliderDefault: 1500,
    baseDurationDays: 6,
    durationPerUnitDays: 0.002,
    valuePerUnit: 2.2,
    valueLabel: 'Geschätzter zusätzlicher Umsatz pro Monat',
    valueNote: 'Angenommener Return: das 3,2fache des Werbebudgets, abzüglich Einsatz.',
    relevantPackageId: 'premium',
    waMessageTemplate:
      'Hallo! Ich plane ein monatliches Werbebudget von etwa {value} €. Geschätzte Laufzeit laut Rechner: {duration}.',
  },
} as const

/* ─── Pricing ─────────────────────────────────────────────────────── */

export const pricingIntro = {
  heading: 'Wähle dein Paket',
  subtext: 'Jedes Paket beinhaltet eine persönliche 1:1 Beratung per WhatsApp.',
  vatNote: 'Alle Preise verstehen sich inkl. 19% gesetzlicher Mehrwertsteuer.',
  nudge: 'Nicht sicher welches Paket passt? Kein Problem.',
  nudgeCta: 'Kostenlos per WhatsApp beraten lassen',
} as const

export const packages = [
  {
    id: 'essential',
    name: 'Essential',
    tagline: 'Dein digitaler Auftritt',
    badge: null,
    featured: false,
    price: { main: '299 €', suffix: 'einmalig', note: 'zzgl. 99 € pro Monat Wartung' },
    features: [
      { label: 'Webseite, Landing Page, Web App oder E-Commerce', included: true },
      { label: 'Design nach deinen Wünschen (Farben, Logo, Stil)', included: true },
      { label: 'Mobile-optimiert und schnell', included: true },
      { label: 'SEO-Grundoptimierung', included: true },
      { label: '1:1 WhatsApp Video oder Anruf Beratung', included: true },
      { label: 'Automation Workflow', included: false },
      { label: 'Werbe Kampagne', included: false },
    ],
    cta: 'Jetzt anfragen',
  },
  {
    id: 'customized',
    name: 'Customized',
    tagline: 'Website plus Automation',
    badge: null,
    featured: false,
    price: { main: '599 €', suffix: 'einmalig', note: 'zzgl. 99 € pro Monat Wartung' },
    features: [
      { label: 'Webseite, Landing Page, Web App oder E-Commerce', included: true },
      { label: 'Design nach deinen Wünschen', included: true },
      { label: '1 Automation Workflow (CRM, E-Mail, Leads)', included: true },
      { label: 'Step-by-step Umsetzung nach Wunsch', included: true },
      { label: 'Bis zu 3x kostenlose Anpassungen', included: true },
      { label: '1:1 WhatsApp Video oder Anruf Beratung', included: true },
      { label: 'Werbe Kampagne', included: false },
    ],
    cta: 'Jetzt anfragen',
  },
  {
    id: 'premium',
    name: 'All-in-One Premium',
    tagline: 'Das Komplettpaket',
    badge: 'Beliebteste Wahl',
    featured: true,
    price: { main: '999 €', suffix: 'einmalig', note: 'zzgl. 99 € pro Monat Wartung' },
    features: [
      { label: 'Webseite, Landing Page, Web App oder E-Commerce', included: true },
      { label: 'Design nach deinen Wünschen', included: true },
      { label: '1 Automation Workflow (CRM, E-Mail, Leads)', included: true },
      { label: '1 Werbe Kampagne (Meta, TikTok oder Google)', included: true },
      { label: 'Conversion-Optimierung', included: true },
      { label: '1:1 WhatsApp Video oder Anruf Beratung', included: true },
    ],
    cta: 'Jetzt anfragen',
  },
  {
    id: 'vip',
    name: 'VIP',
    tagline: 'Alles ohne Kompromisse',
    badge: 'Exklusiv',
    featured: false,
    price: { main: 'Auf Anfrage', suffix: null, note: 'Individuelles Angebot' },
    features: [
      { label: 'Alles aus All-in-One Premium', included: true },
      { label: 'Alle Werbe Kampagnen (Meta, TikTok und Google)', included: true },
      { label: 'Unbegrenzte Anpassungen', included: true },
      { label: 'Priorisierte Conversion-Optimierung', included: true },
      { label: 'Priority Support und laufende Betreuung', included: true },
      { label: 'Individuelles Full-Service Paket', included: true },
      { label: '1:1 WhatsApp Video oder Anruf Beratung', included: true },
    ],
    cta: 'VIP anfragen',
  },
] as const

/* ─── Eigenes Paket ───────────────────────────────────────────────── */

export const builderIntro = {
  heading: 'Oder stell dir dein eigenes Paket zusammen',
  subtext: 'Wähle genau die Leistungen, die du brauchst. Der Preis passt sich sofort an.',
} as const

export const builderBase = {
  label: 'Basis Website',
  price: 299,
  features: [
    'Webseite, Landing Page, Web App oder E-Commerce',
    'Design nach deinen Wünschen',
    'Mobile optimiert und schnell',
    'SEO-Grundoptimierung',
    '1:1 WhatsApp Beratung',
  ],
} as const

export const builderAddons = [
  {
    id: 'automation',
    label: 'AI Automation Workflow',
    body: 'CRM, E-Mail und Lead Automation',
    price: 300,
  },
  {
    id: 'ads',
    label: 'Werbekampagne',
    body: 'Meta, TikTok oder Google Ads Setup',
    price: 400,
  },
  {
    id: 'customizations',
    label: 'Erweiterte Anpassungen',
    body: 'Bis zu 3 zusätzliche Änderungswünsche',
    price: 100,
  },
] as const

export const builderMaintenance = 99

export const builderNote =
  'Einmalzahlung, zzgl. 99 € pro Monat Wartung. Alle Preise inkl. 19% gesetzlicher Mehrwertsteuer.'

export const builderCta = 'Mein Paket per WhatsApp anfragen'

export const builderWaTemplate =
  'Hallo! Ich habe mir folgendes Paket zusammengestellt: {items}. Geschätzter Preis: {price} einmalig (inkl. 19% MwSt.), zzgl. 99 € pro Monat Wartung.'

/* ─── Statement ───────────────────────────────────────────────────
   One editorial pause between two dense sections. Carries the
   positioning in the owner's own voice, so the page has a moment
   that is argued rather than listed.
   ──────────────────────────────────────────────────────────────── */

export const statement = {
  lead: 'Die meisten Agenturen verkaufen dir eine Webseite.',
  emphasis: 'Ich verkaufe dir Anfragen.',
  body: 'Design, Technik und Werbung greifen bei mir ineinander, weil sie aus einer Hand kommen. Keine Übergaben, keine Schnittstellen, kein gegenseitiges Zuschieben. Du hast einen Ansprechpartner und ein Ergebnis, an dem sich alles messen lässt.',
  signature: 'Brhan Jabri, Gründer von MorphixFlow',
} as const

/* ─── FAQ ─────────────────────────────────────────────────────────
   Objection handling, ordered by how early the doubt shows up in a
   real sales conversation.
   ──────────────────────────────────────────────────────────────── */

export const faqIntro = {
  heading: 'Bevor du fragst',
  subtext: 'Die Punkte, die in fast jedem Erstgespräch aufkommen. Falls etwas fehlt, schreib mir einfach.',
} as const

export const faqs = [
  {
    q: 'Wie lange dauert es, bis meine Seite online ist?',
    a: 'In der Regel 14 Tage ab dem Moment, in dem deine Texte und Bilder vorliegen. Der Ablauf ist in vier Etappen aufgeteilt, du siehst nach jeder Etappe einen Zwischenstand und gibst ihn frei.',
  },
  {
    q: 'Was passiert, wenn mir das Ergebnis nicht gefällt?',
    a: 'Im Preis sind zwei vollständige Korrekturschleifen enthalten. Weil du nach jeder Etappe freigibst, entstehen große Überraschungen am Ende praktisch nicht. Weitere Änderungswünsche kannst du jederzeit einzeln dazubuchen.',
  },
  {
    q: 'Gibt es versteckte Kosten?',
    a: 'Nein. Der Paketpreis ist einmalig und enthält bereits die 19% Mehrwertsteuer. Dazu kommen 99 € pro Monat für Hosting, Updates, Backups und Sicherheit. Werbebudget für Meta oder Google zahlst du direkt an die Plattform, daran verdiene ich nichts.',
  },
  {
    q: 'Gehört die Seite danach wirklich mir?',
    a: 'Ja. Domain, Code und alle Zugänge laufen auf deinen Namen. Wenn du die Zusammenarbeit beendest, nimmst du das komplette Projekt mit. Es gibt keine Mindestlaufzeit und keine Bindung an ein Baukastensystem.',
  },
  {
    q: 'Ich habe schon eine Webseite. Lohnt sich das trotzdem?',
    a: 'Meistens ja, aber nicht immer. Schick mir deine Adresse und ich sage dir ehrlich, ob eine Überarbeitung reicht oder ob ein Neubau sinnvoller ist. Wenn deine Seite gut läuft, sage ich dir das auch.',
  },
  {
    q: 'Arbeitest du auch außerhalb der Region Aachen?',
    a: 'Ja. Der gesamte Ablauf funktioniert per Video und WhatsApp, meine Kunden sitzen im ganzen deutschsprachigen Raum. Im Raum Aachen und Düren treffe ich mich auf Wunsch gerne persönlich.',
  },
] as const

/* ─── Contact ─────────────────────────────────────────────────────── */

export const contact = {
  heading: 'Lass uns gemeinsam loslegen',
  subtext: 'Schreib mir. Ich antworte innerhalb von 24 Stunden persönlich.',
  whatsappCta: 'Direkt per WhatsApp schreiben',
  divider: 'oder Formular nutzen',
  submit: 'Anfrage senden',
  fields: {
    name: { label: 'Vollständiger Name', placeholder: 'Max Mustermann' },
    email: { label: 'E-Mail-Adresse', placeholder: 'max@firma.de' },
    phone: { label: 'Telefonnummer', placeholder: '+49 151 12345678' },
    paket: { label: 'Welches Paket interessiert dich?', placeholder: 'Paket wählen' },
    message: {
      label: 'Erzähle mir von deinem Projekt',
      placeholder: 'Beschreibe kurz dein Projekt, deine Ziele und was du dir vorstellst.',
    },
  },
  paketOptions: ['Essential', 'Customized', 'All-in-One Premium', 'VIP', 'Noch unsicher'],
  errors: {
    name: 'Bitte trage deinen Namen ein.',
    emailRequired: 'Bitte trage deine E-Mail-Adresse ein.',
    emailInvalid: 'Diese E-Mail-Adresse sieht nicht gültig aus.',
    phone: 'Bitte trage deine Telefonnummer ein.',
    message: 'Bitte beschreibe kurz dein Projekt.',
    tooLong: 'Diese Eingabe ist zu lang.',
    consent: 'Bitte stimme der Verarbeitung deiner Daten zu.',
  },

  /* DSGVO Art. 6 Abs. 1 lit. a. The data leaves the EU for HubSpot, so
     consent has to be explicit, opt in, and never pre-ticked. */
  consent: {
    label:
      'Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage gespeichert und verarbeitet werden.',
    linkLabel: 'Datenschutzerklärung',
    linkHref: '/datenschutz',
    note: 'Die Einwilligung kann jederzeit per E-Mail widerrufen werden.',
  },
  submitPending: 'Wird gesendet',
  toastInvalid: 'Bitte prüfe deine Eingaben.',
  toastRateLimited:
    'Zu viele Anfragen in kurzer Zeit. Bitte versuche es in ein paar Minuten noch einmal oder schreib mir direkt per WhatsApp.',
  toastFailed:
    'Deine Anfrage konnte nicht gesendet werden. Schreib uns direkt per WhatsApp.',
  success: {
    heading: 'Nachricht gesendet',
    body: 'Vielen Dank! Ich melde mich innerhalb von 24 Stunden bei dir.',
  },
  trust: [
    { label: 'hello@morphixflow.io', icon: 'mail' },
    { label: 'Aachen, Deutschland', icon: 'pin' },
    { label: 'Antwort in 24 Stunden', icon: 'clock' },
  ],
} as const

/* ─── Footer ──────────────────────────────────────────────────────── */

export const footer = {
  tagline: 'Webseiten, Automationen und Werbekampagnen aus einer Hand.',

  /* KI-Kennzeichnung, EU AI Act Art. 50, verbindlich seit 02.08.2026.
     Bildmaterial, das mit KI erzeugt wurde, muss als solches erkennbar sein.
     TODO(real-value): entfernen, sobald ausschließlich eigene Fotografie
     verwendet wird. Im Zweifel stehen lassen: zu viel Transparenz kostet
     nichts, zu wenig ist ein Verstoß. */
  aiNotice: 'Bildmaterial auf dieser Seite ist teilweise KI-generiert.',
  /** TODO(real-value): all three are placeholders in the current build. */
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'TikTok', href: '#' },
    { label: 'WhatsApp', href: '#' },
  ],
  legal: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
  copyright: `© ${new Date().getFullYear()} MorphixFlow. Alle Rechte vorbehalten.`,
} as const
