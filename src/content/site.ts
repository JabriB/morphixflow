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
  city: 'Aachen',
  country: 'Deutschland',
  email: 'hello@morphixflow.io',

  /** TODO(real-value): placeholder. Two different numbers existed in the old build. */
  whatsappNumber: '4915123456789',
  whatsappMessage: 'Hallo! Ich interessiere mich für eure Leistungen.',

  meta: {
    title: 'MorphixFlow. Webseiten, Automationen, Ads und AI SEO.',
    description:
      'MorphixFlow baut Webseiten, AI Automationen, Werbekampagnen und AI SEO aus einer Hand. Persönliche Beratung aus Aachen. Kostenlose Erstberatung per WhatsApp.',
    ogDescription:
      'Mehr Kunden. Mehr Umsatz. Webseiten, AI Automationen und Werbekampagnen aus einer Hand, persönlich beraten aus Aachen.',
  },
} as const

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

/* ─── Hero ────────────────────────────────────────────────────────── */

export const hero = {
  headline: ['Mehr Kunden.', 'Mehr Umsatz.'],
  subtext:
    'Webseiten, Automationen und Werbekampagnen aus einer Hand. Persönlich 1:1 per WhatsApp beraten.',
  subtextEmphasis: 'Persönlich 1:1 per WhatsApp beraten.',
  primaryCta: 'Kostenlos beraten lassen',
  secondaryCta: 'Pakete ansehen',
  disciplines: [
    'Webseiten',
    'AI Automationen',
    'Meta & TikTok Ads',
    'Google Ads',
    'AI SEO',
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

export type ServiceSlug = 'web' | 'automation' | 'ads' | 'seo'

export const servicesIntro = {
  heading: 'Alles was dein Business braucht',
  subtext:
    'Von der Webseite bis zur Werbekampagne. Ich kümmere mich um dein digitales Wachstum.',
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
  {
    slug: 'seo',
    name: 'AI SEO & Conversions',
    body: 'KI-gestützte Suchmaschinenoptimierung für nachhaltigen organischen Traffic. Conversion-Optimierung für maximale Ergebnisse.',
    tags: ['AI SEO', 'On-Page SEO', 'Conversion-Rate', 'Analytics'],
  },
]

/* ─── Process ─────────────────────────────────────────────────────── */

export const processIntro = {
  heading: 'So arbeiten wir zusammen',
  subtext: 'Von der ersten Idee bis zum fertigen Ergebnis. Transparent und persönlich.',
} as const

export const processSteps = [
  {
    name: 'Kostenlose Beratung',
    body: 'Wir sprechen 1:1 per WhatsApp Video oder Anruf. Du erzählst mir deine Ziele, ich zeige dir den besten Weg.',
  },
  {
    name: 'Individuelles Konzept',
    body: 'Du bekommst ein maßgeschneidertes Angebot. Kein Copy-Paste. Jedes Projekt wird nach deinen genauen Wünschen geplant.',
  },
  {
    name: 'Umsetzung & Launch',
    body: 'Ich entwickle dein Projekt mit höchster Qualität. Pünktlich, transparent und mit dir im regelmäßigen Austausch.',
  },
  {
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
  subtext: 'Echte Ergebnisse für echte Kunden.',
  projectsHeading: 'Beispiel-Projekte',
} as const

export const projects = [
  {
    name: 'Online-Shop Launch',
    category: 'E-Commerce, Webseite',
    result: '+180% Umsatz im ersten Monat',
  },
  {
    name: 'Lead Automation',
    category: 'AI Automation, CRM',
    result: '40 Stunden pro Monat gespart',
  },
  {
    name: 'Meta Ads Kampagne',
    category: 'Facebook & Instagram Ads',
    result: '4,2x ROAS erzielt',
  },
] as const

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

/* ─── Pricing ─────────────────────────────────────────────────────── */

export type Billing = 'monthly' | 'onetime'

export const pricingIntro = {
  heading: 'Wähle dein Paket',
  subtext: 'Jedes Paket beinhaltet eine persönliche 1:1 Beratung per WhatsApp.',
  toggle: { monthly: 'Monatlich', onetime: 'Einmalig' },
  onetimeNote: 'Einmalzahlung plus Wartungsabo ab 29 € pro Monat, inklusive Updates und Support.',
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
    price: {
      monthly: { main: '99 €', suffix: 'pro Monat', note: null },
      onetime: { main: '499 €', suffix: 'einmalig', note: 'plus 29 € pro Monat Wartung' },
    },
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
    badge: 'Beliebteste Wahl',
    featured: true,
    price: {
      monthly: { main: '149 €', suffix: 'pro Monat', note: null },
      onetime: { main: '799 €', suffix: 'einmalig', note: 'plus 39 € pro Monat Wartung' },
    },
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
    badge: null,
    featured: false,
    price: {
      monthly: { main: '249 €', suffix: 'pro Monat', note: null },
      onetime: { main: '1.499 €', suffix: 'einmalig', note: 'plus 49 € pro Monat Wartung' },
    },
    features: [
      { label: 'Webseite, Landing Page, Web App oder E-Commerce', included: true },
      { label: 'Design nach deinen Wünschen', included: true },
      { label: '1 Automation Workflow (CRM, E-Mail, Leads)', included: true },
      { label: '1 Werbe Kampagne (Meta, TikTok oder Google)', included: true },
      { label: 'Conversion-Optimierung', included: true },
      { label: 'AI SEO Setup', included: true },
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
    price: {
      monthly: { main: 'Auf Anfrage', suffix: null, note: 'Individuelles Angebot' },
      onetime: { main: 'Auf Anfrage', suffix: null, note: 'Individuelles Angebot' },
    },
    features: [
      { label: 'Alles aus All-in-One Premium', included: true },
      { label: 'Alle Werbe Kampagnen (Meta, TikTok und Google)', included: true },
      { label: 'Unbegrenzte Anpassungen', included: true },
      { label: 'AI SEO und Conversion-Optimierung', included: true },
      { label: 'Priority Support und laufende Betreuung', included: true },
      { label: 'Individuelles Full-Service Paket', included: true },
      { label: '1:1 WhatsApp Video oder Anruf Beratung', included: true },
    ],
    cta: 'VIP anfragen',
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
  },
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
  tagline: 'Webseiten, Automationen, Ads und AI SEO aus einer Hand.',
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
